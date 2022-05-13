import React from "react";
import { discountCalculator } from "../../../utils/BusinessLogic";
import TableComponet from "./TableComponet";

const Timeline = ({ data, byb, setTell }) => {
  function calculateBt() {
    // eslint-disable-next-line array-callback-return
    let t = data.body.map((pduct) => {
      if (pduct.order_products.length > 0) {
        return pduct.order_products
          .map(
            (pdi) =>
              Number(discountCalculator(pdi.price, pdi.discount)) * pdi.quantity
          )
          .reduce((a, b) => a + b);
      }
    });
    t = t.filter((r) => typeof r != "undefined");
    if (t.length > 0) {
      t = t.reduce((a, b) => a + b);
    }
    return t;
  }

  return (
    <div className="timeline-wrapper">
      <div className="header">
        <p>{data.head}</p>
      </div>
      {data?.body?.map((item, idx) => {
          if (item.order_products?.length > 0) {
            return (
              <TableComponet
                key={idx}
                pducts={item}
                byb={byb}
                setTell={setTell}
              />
            );
          }
        })}
      {byb
        ? data?.body?.length > 1 && (
            <div className="footer">
              <p>
                Net Total: Gh₵
                {calculateBt()}
              </p>
            </div>
          )
        : data.body.length > 1 && (
            <div className="footer">
              <p>
                Net Total: Gh₵
                {calculateBt()}
              </p>
            </div>
          )}
    </div>
  );
};

export default Timeline;
