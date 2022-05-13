import React from "react";
import zxcvbn from "zxcvbn";

function checkPword(string) {
  return /[*@!#%&()^~{}]+/.test(string);
}

function scorePer(valuer, pword) {
  const percent = (100 / 4) * valuer;
  checkPword(pword);
  switch (percent) {
    case 0:
      return {
        color: "#ff3a3a",
        width: percent,
        strength: checkPword(pword)
          ? "very weak"
          : "very weak and no special character",
      };
    case 25:
      return {
        color: "#ff3a3a92",
        width: percent,
        strength: checkPword(pword) ? "weak" : "weak and no special character",
      };
    case 50:
      return {
        color: checkPword(pword) ? "#fd7322" : "#ff3a3a92",
        width: percent,
        strength: checkPword(pword) ? "fair" : "fair but not special character",
      };
    case 75:
      return {
        color: checkPword(pword) ? "#21f761" : "#ff3a3a92",
        width: percent,
        strength: checkPword(pword)
          ? "strong"
          : "strong but not special character",
      };
    case 100:
      return {
        color: checkPword(pword) ? "#10ac3e" : "#ff3a3a92",
        width: percent,
        strength: checkPword(pword)
          ? "very strong"
          : "very strong but not special character",
      };
    default:
      return;
  }
}

const PasswordStrength = ({ password }) => {
  const passGood = zxcvbn(password);
  const { width, color, strength } = scorePer(passGood.score, password);

  return (
    <div className="ps-wrapper">
      <div className="ps-indicator-wrapper">
        <div
          className="ps-indicator"
          style={{
            width: `${width}%`,
            background: `${color}`,
          }}
        ></div>
        {password && (
          <p className="info" style={{ color: `${color}` }}>
            {strength}
          </p>
        )}
      </div>
    </div>
  );
};

export default PasswordStrength;
