import { Cancel } from "@material-ui/icons";
import { MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import BusinessService from "../../../services/BusinessService";
import { discountCalculator } from "../../../utils/BusinessLogic";
import { PreselectedValues } from "../../../utils/PreselectedData";
import "./BN_Style.scss";

const TableComponet = ({ pducts, byb, setTell }) => {
  useEffect(() => {
    // console.log("op", pducts);
  }, [pducts?.customer_email]);

  return (
    <>
      <div className="business-note-container POrders-note-container">
        <div className="business-note-table porders-note-table">
          <div className="business-note-table-header porders-note-table-header">
            {/* <span>{date ? date : "02/02/22"}</span> */}
            <div className="userid">
              {byb ? (
                <p>Customer's Mail: {pducts?.customer_email}</p>
              ) : (
                <p>Vendor's mail: {pducts?.email}</p>
              )}
              {byb && (
                <p>Customer's Name: {pducts?.customer_first_name}</p>
              ) }
              {byb ? (
                <p>Customer's Phone: {pducts?.customer_phone_number}</p>
              ) : (
                <p>Vendor's Phone: {pducts?.phone}</p>
              )}
            </div>
          </div>

          <hr className="first-hr" />
          {/* header */}
          <div className="business-note-table-body porders-note-table-body body-header">
            <p>Product name</p>
            <ul>
              <li>Quantity</li>
              <li>Price (Gh₵)</li>
              <li>Total</li>
              <li>status</li>
            </ul>
          </div>
          <hr />
          <div className="business-note-table-body porders-note-table-body  body-data">
            {pducts.order_products &&
              pducts.order_products.map((opi, i) => (
                <SingleValue key={i} opi={opi} byb={byb} setTell={setTell} />
              ))}
          </div>
        </div>
        {pducts.order_product && pducts.order_products.length > 1 && (
          <div className="mini-ttl">
            <p className="title">
              Total: Gh₵
              {pducts.order_products.length > 0
                ? pducts.order_products
                    .map(
                      (item) =>
                        discountCalculator(item.price, item.discount) *
                        item.quantity
                    )
                    .reduce((a, b) => a + b)
                : 0}
            </p>
          </div>
        )}
        {pducts.pduts && pducts.pduts.length > 1 && (
          <div className="mini-ttl">
            <p className="title">
              Total: Gh₵
              {pducts.pduts.length > 0
                ? pducts.pduts
                    .map(
                      (item) =>
                        discountCalculator(item.price, item.discount) *
                        item.quantity
                    )
                    .reduce((a, b) => a + b)
                : 0}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TableComponet;

function SingleValue({ opi, byb, setTell }) {
  useEffect(() => {}, [opi?.status]);

  const options = [
    { value: "pending", label: "pending" },
    { value: "cancelled", label: "cancelled" },
    { value: "delivered", label: "delivered" },
  ];
  function getSelected() {
    if (byb) {
      switch (opi.status) {
        case "p":
          return options[0].value;
        case "c":
          return options[1].value;
        case "d":
          return options[2].value;
        default:
          break;
      }
    }
  }
  function _o_({ target }) {
    // console.log('opi.uuid',target.value)
    BusinessService.changeOrderStatus({
      uid: opi.uuid,
      status: PreselectedValues.getStatusCode(target.value),
    }).then((res) => {
      if (res.status === 200) {
        setTell((prev) => {
          return { ...prev, text: "Status changed successfully", value: true };
        });
      }
    });
  }
  return (
    <div className="single">
      <p>{opi.name ? opi.name : "product name"}</p>
      <ul>
        <li>{opi.quantity ? opi.quantity : "quantity"}</li>
        <li>
          {opi.price
            ? discountCalculator(opi.price, opi.discount)
            : "unit price"}
        </li>
        <li>
          {opi.quantity && opi.price
            ? (
                discountCalculator(opi.price, opi.discount) * opi.quantity
              ).toFixed(3)
            : "0.0"}
        </li>
        <li>
          {byb ? (
            <TextField
              select
              value={getSelected()}
              className="select-container"
              onChange={_o_}
            >
              {options.map((option) => (
                <MenuItem
                  style={{ display: "block" }}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <p
              className={
                opi.status === "p" ? "sp" : opi.status === "c" ? "sc" : "sd"
              }
            >
              {PreselectedValues.getStatusValueWithCode(opi.status)}
            </p>
          )}
        </li>
      </ul>
    </div>
  );
}

export function Tell({ tell, setTell }) {
  useEffect(() => {
    setTimeout(() => {
      setTell((prev) => {
        return { ...prev, value: false };
      });
    }, 5000);
  }, [tell,setTell]);

  const style1 = {
    width: "15vw",
    height: "3vh",
    backgroundColor: "#1af",
    boxShadow: "1px 1px ",
    position: "fixed",
    display: "flex",
    justifyContent: "space-round",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: "5px",
    top: "145px",
    zIndex: "500",
  };
  const style2 = {
    width: "90%",
    height: "100%",
    backgroundColor: "#1af",
    borderRadius: "5px",
    display: "flex",
    placeItems: "center",
  };
  return (
    <div className="tell-wrapper" style={style1}>
      <div style={style2}>
        <p style={{ fontSize: "0.9em", width: "100%", textAlign: "center" }}>
          {tell.text}
        </p>
      </div>
      <Cancel style={{ cursor: "pointer", color: "white", fontSize: "1em" }} />
    </div>
  );
}
