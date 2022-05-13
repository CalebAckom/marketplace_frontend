import React from "react";
import "../../assets/css/homepage.css";
import FormControl from "@mui/material/FormControl";
import { fetchProductbyCategoryR } from "../../services/features/slices/ProductSlice";
import { useDispatch } from "react-redux";

const Searchproduct = ({ setSearch, filters, setFilters }) => {
  const dispatch = useDispatch();

  const searchItem = (value)=>{
    filters.search = value;
    setFilters(filters);
    setSearch(value);
    dispatch(fetchProductbyCategoryR(filters));
  }

  return (
    <div class="searchbar-pulldown clearAllbtn-right">
      <FormControl
        style={{
          width: "100%",
          marginTop: "5px",
          marginBottom: "8px",
          display: "flex",
          textAlign: "left",
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
            type="text"
            placeholder="Search products and services..."
            onChange={(e) => {
              searchItem(e.target.value);
            }}
            autoComplete="off"
          />
        </form>
      </FormControl>
    </div>
  );
};

export default Searchproduct;
