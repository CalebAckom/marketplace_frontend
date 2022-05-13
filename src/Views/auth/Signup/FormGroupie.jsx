import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import { FormControlLabel, Icon, Radio, RadioGroup } from "@mui/material";
import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { emailVerification } from "../../../services/validation";
import PasswordStrength from "./PasswordStrength";

const FormGroupie = ({
  label,
  placeholder,
  intent,
  value,
  setValue,
  type,
  style,
  setOption,
  misMatchErr,
  extra,
}) => {
  function handleChange(e) {
    setValue(e.target.value);
  }

  const [emailError, seEmailError] = useState(true);
  const [showPWD, setShowPWD] = useState(false);

  function handleShowPassword(e) {
    setShowPWD(!showPWD);
  }

  return (
    <div className="form-group" style={{ ...style }}>
      {label && (
        <label
          htmlFor={
            intent === "email"
              ? "email"
              : intent === "password"
              ? "password"
              : intent === "confirm"
              ? "confirm"
              : null
          }
        >
          {label}
        </label>
      )}
      {intent === "email" && (
        <input
          type="text"
          id="email"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={() => {
            seEmailError(emailVerification(value));
          }}
          style={{ height: "5.5vh" }}
        />
      )}
      {intent === "email" && !emailError && (
        <h6 className="info">Invalid email</h6>
      )}
      {extra && intent === "email" && <h6 className="info">{extra}</h6>}
      {type === "password" && (
        <div className="password-input-wrapper">
          <input
            type={showPWD ? "text" : "password"}
            id="password"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
          <Button
            className="show-password "
            onClick={handleShowPassword}
            arial-label={showPWD ? "show password" : "hide password"}
          >
            {showPWD ? (
              <Icon
                className="icon"
                children={<VisibilityOutlined style={{ color: "#7e7e80" }} />}
              />
            ) : (
              <Icon
                className="icon"
                children={
                  <VisibilityOffOutlined style={{ color: "#7e7e80" }} />
                }
              />
            )}
          </Button>
        </div>
      )}
      {intent === "password" && <PasswordStrength password={value} />}
      {intent === "confirm" && misMatchErr === "nomatch" && (
        <p
          style={{
            fontSize: "0.8em",
            textAlign: "right",
            color: "#ff3a3a",
            margin: "0px",
          }}
        >
          Password mistach
        </p>
      )}
      {intent === "option" && (
        <div className="option-group">
          <RadioGroup
            aria-label="user-type"
            defaultValue="Individual"
            name="radio-buttons-group"
            row
            onChange={setOption}
          >
            <FormControlLabel
              value="Organization / Business"
              control={
                <Radio
                  style={{
                    // color: "#1b98e0",
                    fontWeight: "300",
                    fontSize: "12px",
                  }}
                  color={"primary"}
                />
              }
              label="Organization / Business"
              sx={{
                fontSize: "13px",
                color: "#707070",
                fontWeight: "300",
              }}
              color={"primary"}
            />
            <FormControlLabel
              value="Individual"
              control={<Radio style={{ fontWeight: "300" }} />}
              label="Individual"
              sx={{ fontSize: "13px", color: "#707070", fontWeight: "300" }}
            />
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

export default FormGroupie;
