import React, { useEffect } from "react";
import { PreselectedValues } from "../../utils/PreselectedData";
 
import { FormControlLabel,Radio, RadioGroup } from "@mui/material";

const EditSnipet = ({
  title,
  important,
  value,
  setValue,
  source,
  style,
  intent,
  onOption,
  setOption,
  disabled,
  placeholder,
  setRegionValue,
}) => {
  useEffect(() => {}, [value]);
  return (
    <div className="EditSnipet" style={{ ...style }}>
      <div className="title-box">
        <span style={{ fontWeight: "bold" }}>
          {intent !== "ctrl-box" && title.toLowerCase()}
        </span>
        {important && <span style={{ color: "red" }}> * </span>}
      </div>
      {intent === "cbo" ? (
        <div className="input-box">
          <select
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              setValue({data:e.target.value});
              if (title === "TOWN") {
                setRegionValue(
                  PreselectedValues.getRegionFromTown(e.target.value)
                );
              }
            }}
            disabled={disabled}
          >
            <option>{PreselectedValues.getCategoryDefault()}</option>
            {source.map((e, idx) => {
              return <option key={`${e}${idx}`}>{e}</option>;
            })}
          </select>
        </div>
      ) : intent === "text-area" ? (
        <div className="input-box-area">
          <textarea
            placeholder={placeholder}
            cols={4}
            value={value}
            disabled={disabled}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          ></textarea>
        </div>
      ) : intent === "ctrl-box" ? (
        <div className="ctrl-box"></div>
      ) : intent === "text" ? (
        <div className="input-box">
          <input
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={disabled}
          />
        </div>
      ) : onOption === "option" ? (
        <div className="option-group">
          <RadioGroup
            aria-label="user-type"
            defaultValue="Female"
            name="radio-buttons-group"
            row
            onChange={setOption}
          >
            <FormControlLabel
              value="Female"
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
              label="Female"
              sx={{
                fontSize: "13px",
                color: "#707070",
                fontWeight: "300",
              }}
              color={"primary"}
            />
            <FormControlLabel
              value="Male"
              control={<Radio style={{ fontWeight: "300" }} />}
              label="Male"
              sx={{ fontSize: "13px", color: "#707070", fontWeight: "300" }}
            />
          </RadioGroup>
        </div>
      ) : null}
    </div>
  );
};

export default EditSnipet;
