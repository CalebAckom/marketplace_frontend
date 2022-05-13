import React, { useEffect, useState, useContext } from "react";
import { emailVerification } from "../../../services/validation";
import FormGroupie from "./FormGroupie";
import { useHistory } from "react-router-dom";
import auth from "../../../services/auth";
import { Close } from "@mui/icons-material";

//import context signupContext to manage global email state
import { SignupContext } from "../../../Context/SignupAuthContext";
import { checkPassword } from "../../../utils/test";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [passWD, setPassWD] = useState("");
  const [confirmPWD, setConfirmPWD] = useState("");
  const [userType, setUserType] = useState("Individual");
  const [extra, setExtra] = useState("");

  const [misMatchErr, setMisMatchErr] = useState("match");

  //server error states
  const [errMsg, setErrMsg] = useState("");
  const [isButton, setIsButton] = useState(false);
  //state to switch modal up or down
  const [openModal, setOpenModal] = useState(false);

  //another state to switch sign up button disable
  const [enableSignupBtn, setEnableSignupBtn] = useState(true);

  //initiating signup email context state: this should be available t0 the confirm component
  const [signupMail, setSignupMail] = useContext(SignupContext);
  console.log("Mail", signupMail);

  //check to enable or disable button
  function testOpen() {
    return (
      emailVerification(email) &&
      passWD === confirmPWD &&
      confirmPWD.length >= 8 &&
      checkPassword(confirmPWD) &&
      enableSignupBtn
    );
  }
  //sakkuyultu@vusra.com
  function handleFormSubmit(e) {
    e.preventDefault();
    setEnableSignupBtn(false);
    const response = auth.SignUpUser({
      authentication_property: email,
      password: passWD,
      is_organization: userType === "Individual" ? false : true,
    });
    response
      .then(({ message, status }) => {
        console.dir(message, status);
        if (status === 201) {
          setErrMsg(`A confirmation has been sent to your email. Please retrieve the code
          and confirm your account.`);
          //changing signup email context state
          setSignupMail((prev) => {
            return { ...prev, email, allow: true };
          });
          setIsButton(true);
          setOpenModal(true);
        } else if (status === 400) {
          setSignupMail((prev) => prev);
          setErrMsg(message);
          setIsButton(false);
          setOpenModal(true);
          setEnableSignupBtn(true);
        } else if (status === 500) {
          setSignupMail((prev) => prev);
          setErrMsg(`${message}, please check your internet connection`);
          setIsButton(false);
          setOpenModal(true);
          setEnableSignupBtn(true);
        }
      })
      .catch((exp) => console.log("bad", exp));
  }

  useEffect(() => {
    if (passWD === confirmPWD) {
      setMisMatchErr("match");
    } else {
      setMisMatchErr("nomatch");
    }
  }, [passWD, confirmPWD]);

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <form onSubmit={handleFormSubmit}>
          <p className="signup-header">Register</p>
          <FormGroupie
            label="Email"
            intent="email"
            value={email}
            setValue={setEmail}
            placeholder="eg. example@tmail.com"
            extra={extra}
          />
          <FormGroupie
            label="Password"
            intent="password"
            value={passWD}
            setValue={setPassWD}
            type="password"
            placeholder="Password"
          />
          <FormGroupie
            label="Confirm Password"
            intent="confirm"
            value={confirmPWD}
            setValue={setConfirmPWD}
            type="password"
            style={{ height: "12vh" }}
            misMatchErr={misMatchErr}
            placeholder="Confirm password"
          />
          <FormGroupie
            intent="option"
            style={{
              height: "auto",
            }}
            setOption={setUserType}
          />
          <FormGroupie
            intent="signup"
            type="button"
            style={{
              marginUp: "30px",
              height: "auto",
            }}
          />
          <button disabled={!testOpen()} className="go-button">
            Create account
          </button>
          <div className="signup-footer">
            <p>By clicking sign up, you agree to the marketplace </p>
            <i style={{ fontWeight: "bold" }}>
              Terms & Conditions, Privacy Policy and Cookie Policy
            </i>
          </div>

          <p className="form-pre-registered">Already registered? </p>
        </form>
      </div>

      {openModal && (
        <Modal close={setOpenModal} msg={errMsg} isButton={isButton} />
      )}
    </div>
  );
};

export const Modal = ({ msg, isButton, close }) => {
  const history = useHistory();
  return (
    <div className="signup-go-confirm">
      <div className="click-box">
        {!isButton && (
          <Close
            className="icon"
            onClick={() => {
              close(false);
            }}
          />
        )}
        <p>{msg}</p>
        {isButton && (
          <button
            onClick={() => {
              history.push("/signup/confirm");
              close(false);
            }}
          >
            Confirm account
          </button>
        )}
      </div>
    </div>
  );
};

export default SignUp;
