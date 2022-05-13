import React, { useState, useContext, useEffect } from "react";
// import Accordion from "react-bootstrap/Accordion";
import "./account-settings.css";
import AuthContext from "../../Context/AuthContext";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { BASE_URL, LOCALHOST_AUTH_TOKENS } from "../../utils/config";
import Prompt from "./Prompt";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "../../assets/css/custom.css";
import Accordion from "@material-ui/core/Accordion";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";

const AccountSettings = ({ setIsLog }) => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  let [data, setData] = useState([]);
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [prompt_title, setPromptTitle] = useState("");
  const [prompt_body, setPromptBody] = useState("");
  const [link_to, setLinkTo] = useState("");
  const [link_text, setLinkText] = useState("");
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const [newpass, setNewPassValues] = React.useState({
    newpassword: "",
    showNewPassword: false,
  });
  const [confirmnewpass, setConfirmValues] = React.useState({
    confirmnewpassword: "",
    showConfirmPassword: false,
  });

  useEffect(() => {
    setIsLog(true);
  }, []);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowNewPassword = () => {
    setNewPassValues({ ...newpass, showNewPassword: !newpass.showNewPassword });
  };

  const handleNewPasswordMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleNewPasswordChange = (prop) => (event) => {
    setNewPassValues({ ...newpass, [prop]: event.target.value });
  };

  const handleClickConfirmShowNewPassword = () => {
    setConfirmValues({
      ...confirmnewpass,
      showConfirmPassword: !confirmnewpass.showConfirmPassword,
    });
  };

  const handleConfirmPasswordMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleConfirmPasswordChange = (prop) => (event) => {
    setConfirmValues({ ...confirmnewpass, [prop]: event.target.value });
  };

  const handleClose = () => setShow(false);

  const callPrompt = (title, link, link_text, message) => {
    setShow(true);
    setPromptTitle(title);
    setLinkText(link_text);
    setLinkTo(link);
    setPromptBody(message);
  };

  const userChangePassword = async (e) => {
    e.preventDefault();
    if (values.password.length === 0) {
      callPrompt(
        "Change Password",
        "",
        "Close",
        "Current password field can not be empty"
      );
      return;
    }
    if (newpass.newpassword.length === 0) {
      callPrompt(
        "Change Password",
        "",
        "Close",
        "New password field can not be empty"
      );
      return;
    }
    if (confirmnewpass.confirmnewpassword.length === 0) {
      callPrompt(
        "Change Password",
        "",
        "Close",
        "Confirm password field can not be empty"
      );
      return;
    }
    if (newpass.newpassword !== confirmnewpass.confirmnewpassword) {
      callPrompt("Change Password", "", "Close", "Password does not match");
      return;
    }
    let upperCaseLetters = /[A-Z]/g;
    if (!newpass.newpassword.match(upperCaseLetters)) {
      callPrompt(
        "Sign Up",
        "",
        "Close",
        "Check Password: There should be at least one uppercase character"
      );
      return;
    }
    // Validate numbers
    let numbers = /[0-9]/g;
    if (!newpass.newpassword.match(numbers)) {
      callPrompt(
        "Sign Up",
        "",
        "Close",
        "Check Password: There should be at least one numeric character"
      );
      return;
    }
    // Validate length
    if (newpass.newpassword.length < 8) {
      callPrompt(
        "Sign Up",
        "",
        "Close",
        "Check Password: Password should be eight or more characters long"
      );
      return;
    }
    // const result = await auth_api.changePassword(
    //   password,
    //   newpassword,
    //   confirmnewpassword
    // );
    // if (result.password) {
    //   callPrompt('Change Password', '', 'Close', result.password);
    //   return;
    // }
    callPrompt("Change Password", "", "Close", "Password changed successfully");
    setValues("");
    setNewPassValues("");
    setConfirmValues("");

    try {
      const res = await fetch(`${BASE_URL}/auth/change-password/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.access}`,
        },
        body: JSON.stringify({
          password: values.password,
          new_password: newpass.newpassword,
          confirm_password: confirmnewpass.confirmnewpassword,
        }),
      });
      data = await res.json();
      setData(data);
      console.log("res", res);
      console.log("passwordData", data);

      await fetch(`${BASE_URL}/auth/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          authentication_property: e.target.authentication_property.value,
          password: e.target.password.value,
        }),
      });
      data = await res.json();

      if (res.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem(LOCALHOST_AUTH_TOKENS, JSON.stringify(data));
        history.push("/profile");
        console.log("Password changed successfully!");
      } else {
        // setMessage('Email or password is not correct!');
        // console.log(data.detail);
        console.log("Password change failed!");
      }
    } catch (err) {
      console.log("Error here:" + err);
    }
  };

  return (
    <div className="box">
      <div class="inputWrapper mt-4 mb-4">
        <Prompt
          title={prompt_title}
          linkTo={link_to}
          linkText={link_text}
          show={show}
          success={link_to.length > 0 ? true : false}
          handleClose={handleClose}
        >
          <p>{prompt_body}</p>
        </Prompt>

        <label class="fs-3 fw-bold bgcolor">Account Settings</label>
        <Accordion
          class="shadow border-radius-0 bg-white"
          style={{ width: "100%" }}
        >
          <AccordionSummary aria-controls="panel1a-content">
            <span class="editPassword fw-bold">Edit</span>
            <Typography
              class="fw-bold"
              style={{
                marginLeft: 0,
              }}
            >
              Change Password <br />
              <span class="text-muted" style={{ fontSize: "11px" }}>
                Keep your account secure, don't share password
              </span>
            </Typography>
          </AccordionSummary>

          <form onSubmit={userChangePassword} class="ms-2 me-2">
            <div className="form-group changePasswordInput mb-1">
              <label className="fs-6  fw-bold mt-2 mb-2">
                Current Password
              </label>
              <br />
              <Input
                className="form-control form-rounded"
                style={{ border: "2px solid" }}
                disableUnderline={true}
                type={values.showPassword ? "password" : "text"}
                onChange={handlePasswordChange("password")}
                placeholder="Enter password"
                value={values.password}
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                autoComplete="off"
              />
            </div>
            <div className="form-group changePasswordInput mb-1">
              <label className="fs-6 mt-2 mb-2 fw-bold">New Password</label>
              <br />
              <Input
                className="form-control form-rounded  border-dark"
                style={{ border: "2px solid" }}
                disableUnderline={true}
                type={newpass.showNewPassword ? "password" : "text"}
                onChange={handleNewPasswordChange("newpassword")}
                value={newpass.newpassword}
                placeholder="Password must be atleast 8 characters"
                name="newpassword"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowNewPassword}
                      onMouseDown={handleNewPasswordMouseDownPassword}
                    >
                      {newpass.showNewPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                autoComplete="off"
              />
            </div>
            <div className=" form-group changePasswordInput mb-1">
              <label className="fs-6 fw-bold mt-2 mb-2">
                Confirm New Password
              </label>
              <br />
              <Input
                className="form-control form-rounded border-dark"
                style={{ border: "2px solid" }}
                disableUnderline={true}
                type={confirmnewpass.showConfirmPassword ? "password" : "text"}
                onChange={handleConfirmPasswordChange("confirmnewpassword")}
                value={confirmnewpass.confirmnewpassword}
                name="confirmnewpassword"
                placeholder="Confirm password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickConfirmShowNewPassword}
                      onMouseDown={handleConfirmPasswordMouseDownPassword}
                    >
                      {confirmnewpass.showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                autoComplete="off"
              />
            </div>

            <div className="changePasswordInput mb-3 mt-3">
              <button
                type="submit"
                id="account-pass-save"
                className="btn btn-primary mobileButton ms-0 mb-2 p-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Accordion>
      </div>
    </div>
  );
};
export default AccountSettings;
