import React from "react";
import "./PO_ROW_Style.scss";

const PO_ROW = () => {
  return (
    <div className="po_row_wrapper">
      <div className="head">
        <p>EMAIL: Ampomah.winston@amalitech.org</p>
        <p>CONTACT:</p>
      </div>
      <div className="mid">
        <p>Product name</p>
        <ul>
          <li>Quantity</li>
          <li>Price</li>
          <li>Total</li>
          <li>Status</li>
        </ul>
      </div>
      <hr />
      <div className="lower">
        <p>Product name</p>
        <ul>
          <li>Quantity</li>
          <li>Price</li>
          <li>Total</li>
          <li>Status</li>
        </ul>    
    </div>
    </div>
  );
};

export default PO_ROW;
