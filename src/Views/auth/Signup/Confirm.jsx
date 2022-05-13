import { RestartAlt } from "@mui/icons-material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import auth from "../../../services/auth";
import { Modal } from "./SignUp";

//context path
import { SignupContext } from "../../../Context/SignupAuthContext";

const Confirm = () => {
  //ids for inputs
  const inputs = ["one", "two", "three", "four"];
  //state of digits
  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");
  const [digit4, setDigit4] = useState("");

  // references to inputs
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();

  //
  const locator = useHistory();

  //to setCountdown and resend button actioations
  const [countDown, setCountDown] = useState(60);
  const [disabled, setDisabled] = useState(true);

  //set modal state for error handling
  const [errMsg, setErrMsg] = useState("");
  const [isButton, setIsButton] = useState(false);

  //state to open and close error modal
  const [openModal, setOpenModal] = useState(false);

  //useContext to retrieve user email
  const [signupMail, setSignupMail] = useContext(SignupContext);

  //countdown to confirmButton activation
  function countdown(minutes) {
    var seconds = 60;
    var mins = minutes;
    setDisabled(true);
    function tick() {
      //This script expects an element with an ID = "counter". You can change that to what ever you want.

      var current_minutes = mins - 1;
      seconds--;
      const cnt =
        current_minutes.toString() +
        ":" +
        (seconds < 10 ? "0" : "") +
        String(seconds);
      if (seconds > 0) {
        setTimeout(tick, 1000);
      } else if (mins > 1) {
        countdown(mins - 1);
      } else {
        setDisabled(false);
      }
      setCountDown(cnt);
    }
    tick();
  }

  function resendVerification() {
    auth
      .ResendVerification(signupMail["email"])
      .then(({ data, status }) => {
        if (status === 201) {
          setErrMsg("A new verification code has been sent to your email");
          setIsButton(false);
          setOpenModal(true);
          setDisabled(true);
          countdown(2);
        } else if (status === 500) {
          setErrMsg("Network error please check your internet connection");
          setIsButton(false);
          setOpenModal(true);
        } else {
          setErrMsg("Oops, something happen, please retry");
          setIsButton(false);
          setOpenModal(true);
        }
      })
      .catch((exp) => {
        console.log(exp);
      });
  }

  function handleChange({ target }) {
    const value = target.value;
    if (target.id === inputs[0]) {
      if (new RegExp("[0-9]{1}").test(value) || value === "") {
        setDigit1(target.value);
        if (value !== "") {
          input2.current.focus();
        }
      }
    } else if (target.id === inputs[1]) {
      if (new RegExp("[0-9]{1}").test(value) || value === "") {
        setDigit2(target.value);
        if (value !== "") {
          input3.current.focus();
        }
      }
    } else if (target.id === inputs[2]) {
      if (new RegExp("[0-9]{1}").test(value) || value === "") {
        setDigit3(target.value);
        if (value !== "") {
          input4.current.focus();
        }
      }
    } else if (target.id === inputs[3]) {
      if (new RegExp("[0-9]{1}").test(value) || value === "") {
        setDigit4(target.value);
        if (value !== "") {
          input1.current.focus();
        }
      }
    }
  }

  function handleBlur() {
    // console.log(digit);
  }

  useEffect(() => {
    if (countDown === 60) countdown(2);
  }, [signupMail]);

  return (
    <div className="confirm-account">
      <div className="confirm-main">
        <p className="confirm-title">Enter code for verification</p>
        <div className="confirm-input-wrapper">
          {inputs.map((e, i) => (
            <input
              type="text"
              key={i}
              maxLength={1}
              value={
                i === 0 ? digit1 : i === 1 ? digit2 : i === 2 ? digit3 : digit4
              }
              onChange={handleChange}
              ref={
                i === 0 ? input1 : i === 1 ? input2 : i === 2 ? input3 : input4
              }
              id={e}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <button
          className="confirm-button"
          onClick={() => {
            auth
              .ConfirmCode(`${digit1}${digit2}${digit3}${digit4}`)
              .then(({ status, data }) => {
                if (status === 404) {
                  setIsButton(false); //property of error modal
                  setErrMsg("Invalid key inputs"); //property of error modal
                  setOpenModal(true); //property of error modal
                } else if (status === 200) {
                  setSignupMail({ email: "blue@Tmail.can", allow: false });
                  console.log(signupMail);
                  window.location.assign("/login");
                }
              })
              .catch(() => {});
          }}
        >
          Continue
        </button>
        <p className="confirm-prompt">
          If you don't receive the code within 2mins, click below to re-send it.
        </p>
        <div className="confirm-processing-wrapper">
          <button
            disabled={disabled} //disabled
            className="resend-button"
            onClick={resendVerification}
          >
            <div>Resend code</div>
            <RestartAlt />
          </button>
          <div className="timer">
            <p>{countDown}</p>
          </div>
        </div>
        {openModal && (
          <Modal isButton={isButton} msg={errMsg} close={setOpenModal} />
        )}
      </div>
    </div>
  );
};

export default Confirm;
