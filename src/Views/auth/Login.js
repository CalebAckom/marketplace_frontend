import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../Context/AuthContext";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import Form from "react-validation/build/form";
import Inputs from "react-validation/build/input";
import { required, email } from "../../services/validation";
import { Modal, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";


const Login = ({ setIsLog }) => {
  const {
    loginUser,
    isDisabled,
    message,
    isLoading,
    show,
    setShow,
    timer,
    Completionist,
  } = useContext(AuthContext);
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const [authentication_property, setAuthProp] = useState("");

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onEmailChange = (e) => {
    setAuthProp(e.target.value);
  };

  useEffect(() => {
    setIsLog(false);
  }, []);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal class="my-modal"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {timer && (
              <Countdown className="textColor" date={Date.now() + 60000}>
                <Completionist />
              </Countdown>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="text-center justify-content-center">
            <Col>{message && <span className="textRed">{message}</span>}</Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn bg-white border-0" onClick={props.onHide}>
            CLOSE
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="bgcolor myloginHeight w-100">
      <div className="container w-100">
        <div className="row align-items-center">
          <div className="col-lg-6 mx-auto py-5 col-lg-5">
            <Form
              className="p-4 w-100 py-5 shadow bg-white"
              onSubmit={loginUser}
              disabled={isDisabled}
            >
              <h3 className="text-center textColor">Log in</h3>
              <div className="form-group mb-3">
                <label className="text-dark mb-2 fw-bold" htmlFor="email">
                  Email
                </label>
                <Inputs
                  type="text"
                  disabled={isDisabled}
                  className="form-control rounded-3" style={{border:"2px solid", padding:"11.5px"}}
                  placeholder="Enter your email address"
                  name="authentication_property"
                  value={authentication_property}
                  onChange={onEmailChange}
                  validations={[required, email]}
                />
              </div>
              <div className="form-group mb-3">
                <label className="text-dark mb-2 fw-bold" htmlFor="password">
                  Password
                </label>
                <Input
                  disabled={isDisabled}
                  className="form-control border-dark p-2 rounded-3" style={{border:"2px solid"}}
                  disableUnderline={true}
                  type={values.showPassword ? "password" : "text"}
                  onChange={handlePasswordChange("password")}
                  value={values.password}
                  name="password"
                  placeholder="**************"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton 
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  autoComplete="on"
                />
              </div>
              <div className="form-group text-end textColor mb-3">
              <Link className="textColor text-decoration-none"
                      to="/forgot-password"
                    >
                  Forgot Password?
              </Link>
              </div>

              {!isLoading ? (
                <div className="form-group">
                  <button
                    onClick={() => setShow(true)}
                    className="btn btn-secondary w-100 btn btn-lg"
                    disabled={isDisabled}
                  >
                    <span>Login</span>
                  </button>
                </div>
              ) : (
                isLoading && (
                  <div className="form-group">
                    <button
                      className="btn btn-primary w-100 btn btn-lg"
                      disabled={!isDisabled}
                    >
                      {isLoading && (
                        <span className="spinner-border spinner-border-sm text-light"></span>
                      )}
                      <span className="ms-2 loadingFont">
                        Logging In! Please wait...
                      </span> 
                    </button>
                  </div>
                )
              )}

              <MyVerticallyCenteredModal
                show={show}
                onHide={() => setShow(false)}
              />

              <div className="displayMobile">
                <h6 className="text-center fw-light text-muted">
                  Dont have an account?{" "}
                  <span className="text-center fw-light textColor">
                    {" "}
                    <Link
                      className="textColor text-decoration-none"
                      to="/signup"
                    >
                      Create one now!
                    </Link>
                  </span>
                </h6>{" "}
                <br />
                <div className="b-light">
                  <h5 className="text-center fw-light">Protect Your Account</h5>
                  <h6 className="text-center fw-light text-muted">
                    Ensure that whenever you sign in to marketplace, the web
                    address in your browser starts with
                    https://www.marketplace.com
                  </h6>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
