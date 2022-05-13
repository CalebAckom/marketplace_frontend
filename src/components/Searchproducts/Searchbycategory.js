import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Select from "react-select";
import { PreselectedValues } from "../../utils/PreselectedData";
import { useDispatch } from "react-redux";
import { fetchProductbyCategoryR } from "../../services/features/slices/ProductSlice";

const scale = (value) => {
  const previousMarkIndex = Math.floor(value / 25);
  const previousMark = PreselectedValues.PriceMarks[previousMarkIndex];
  const remainder = value % 25;
  if (remainder === 0) {
    return previousMark.scaledValue;
  }
  const nextMark = PreselectedValues.PriceMarks[previousMarkIndex + 1];
  const increment = (nextMark.scaledValue - previousMark.scaledValue) / 25;
  return remainder * increment + previousMark.scaledValue;
};

function numFormatter(num) {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(0) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(0) + "M"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
}

const rx_live = /^[+-]?\d*(?:[.,]\d*)?$/;

function valuetext(value) {
  return `${value}°C`;
}

const Searchbycategory = ({
  filters,
  setFilters,
  setCateg,
  setMaxprice,
  setMinprice,
  setOwnerCity,
}) => {
  const [value, setValue] = useState([0, 9999]);
  const [isReady, setIsReady] = useState(false);

  //redux
  const dispatch = useDispatch();

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    filters.min_price = newValue[0];
    filters.max_price = newValue[1];
    setFilters(filters);
    setMinprice(newValue[0]);
    setMaxprice(newValue[1]);
    dispatch(fetchProductbyCategoryR(filters));
  };

  const customFilter = (value) => {
    if (rx_live.test(value)) 
    filters.min_price = value;
    filters.max_price = value;
    setFilters(filters);
    setMinprice(value);
    setMaxprice(value);
    dispatch(fetchProductbyCategoryR(filters));
  };

  const categoryFilter = (value) => {
    filters.category = value;
    setFilters(filters);
    setCateg(value);
    dispatch(fetchProductbyCategoryR(filters));
  };

  const locationFilter = (value) => {
    filters.owner__city = value;
    setFilters(filters);
    setOwnerCity(value);
    dispatch(fetchProductbyCategoryR(filters));
  };
  useEffect(() => {}, []);

  const style = {
    control: (base) => ({
      ...base,
      cursor: "pointer",
      // This line disable the blue border
      boxShadow: "none",
    }),
  };

  return (
    <>
      {/* filter by Category */}
      <Select
        styles={style}
        className="basic-single text-dark"
        classNamePrefix="select"
        name="categ"
        options={PreselectedValues.PRODUCT_CATEG}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.name}
        placeholder="Filter by category"
        components={{ IndicatorSeparator: null }}
        onChange={(e) => {
          categoryFilter(e.key);
        }}
      />

      {/* filter by location */}
      <div
        class="mx-auto mt-2"
        style={{
          margin: "auto",
          display: "block",
          width: "100%%",
          color: "black",
        }}
      >
        <Select
          styles={style}
          className="basic-single text-dark"
          classNamePrefix="select"
          name="color"
          options={PreselectedValues.FILTER_LOCATION}
          getOptionLabel={(option) => option.local}
          getOptionValue={(option) => option.local}
          placeholder="Filter by location"
          components={{ IndicatorSeparator: null }}
          onChange={(e) => {
            locationFilter(e.key);
          }}
        />
      </div>

      {/* filter by Price */}
      <div
        class="mx-auto mt-2"
        style={{
          margin: "auto",
          display: "block",
          width: "95%",
          color: "black",
        }}
      >
        <Typography
          id="non-linear-slider"
          class="text-muted"
          style={{ fontFamily: "Roboto,sans-serif", fontSize: "12px" }}
          gutterBottom
        >
          FILTER BY PRICE
        </Typography>
        <Slider
          style={{ color: "#1b98e0" }}
          value={value}
          valueLabelFormat={numFormatter}
          min={0}
          step={1}
          max={9999}
          marks={PreselectedValues.PriceMarks}
          onChange={rangeSelector}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
        <div class="text-center">
          Min: <span class="fw-bold">{value[0]}</span> Max:{" "}
          <span class="fw-bold">{value[1]}</span>
        </div>
      </div>

      {/* filter by Price custom */}
      <div
        class="mx-auto mt-2"
        style={{
          fontFamily: "Roboto,sans-serif",
          margin: "auto",
          display: "block",
          width: "100%",
          color: "black",
        }}
      >
        <form
          style={{
            fontFamily: "Roboto,sans-serif",
            margin: 0,
            display: "flex",
            justifyContent: "center",
            width: "100%",
            color: "black",
          }}
        >
          <input
            style={{
              border: "2px solid #D1D1D1",
              height: "40px",
              fontFamily: "Roboto,sans-serif",
            }}
            class="form-control border-radius-0"
            type="number"
            id="depositedAmount"
            maxLength={9}
            pattern="[+-]?\d+(?:[.,]\d+)?"
            placeholder="Enter own price"
            //  value={depositedAmount}
            onChange={(e) => {
              console.log("EEEEr", e);
              customFilter(e.target.value);
            }}
            autoComplete="off"
          />
        </form>
      </div>
    </>
  );
};

export default Searchbycategory;
