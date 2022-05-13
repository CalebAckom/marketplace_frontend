import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/homepage.css";
import Product from "../components/Products/Product";
import { getAllCart } from "../services/features/slices/CartSlice";
import Generalinfo from "../components/GeneralInfo";
// import CarouselSlider from "../../src/components/Carousel/CarouselSlider";


const HomePage = ({ setIsLog }) => {
  const dispatch = useDispatch();
  const cartStateKey = useSelector((state) => state.cr.cartKey);
  useEffect(() => {
    dispatch(getAllCart(cartStateKey));
    setIsLog(true);
  }, [cartStateKey]);

  return (
    <>
      <Product />
      <div
        style={{ width: "100%", backgroundColor: "#F7F7F7", marginTop: "15px" }}
      >
        <Generalinfo />
      </div>
    </>
  );
};

export default HomePage;
