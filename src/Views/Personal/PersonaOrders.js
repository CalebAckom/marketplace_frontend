import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeViewLook1,
  fetchMyOrders,
} from "../../services/features/slices/myProductsSlice";
import Timeline from "../Business/Notification/Timeline";
import "./POrdersStyle.scss";
import Pagination from "../../components/Pagination/Pagination";
import { FormControlLabel, Radio } from "@material-ui/core";

const PersonaOrders = () => {
  const dispatch = useDispatch();
  const mastif = useSelector(({ mpr }) => mpr["mastif"]);
  const myOrders = useSelector(({ mpr }) => mpr["myOrders"]);
  const myorderCount = useSelector(({ mpr }) => mpr["count"]);

  const [curPage, setcurPage] = useState(1);
  const [selectedView, setselectedView] = useState("all");

  function getNewDataSet(number) {
    setcurPage(number);
    dispatch(fetchMyOrders(`/marketplace/order-item?page=${number}`));
  }
  const handleRadioChange = (event) => {
    setselectedView(event.target.value);
    dispatch(changeViewLook1({ raw: myOrders, value: event.target.value }));
  };
  useEffect(() => {
    dispatch(fetchMyOrders(`/marketplace/order-item?page=${curPage}`));
  }, [dispatch, curPage]);
  return (
    <div className="porders-wrapper">
      <div className="porders-note-title-bar-wrapper">
        <div className="porders-note-title-bar-content">
          <p>MY ORDERS</p>
          <div className="view-order">
            <FormControlLabel
              label="All"
              control={
                <Radio
                  checked={selectedView === "all"}
                  onChange={handleRadioChange}
                  value="all"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                  style={{ color: "gray" }}
                />
              }
            />
            <FormControlLabel
              label="Pending"
              control={
                <Radio
                  checked={selectedView === "pending"}
                  onChange={handleRadioChange}
                  value="pending"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "B" }}
                  style={{ color: "orange" }}
                />
              }
            />
            <FormControlLabel
              label="Delivered"
              control={
                <Radio
                  checked={selectedView === "delivered"}
                  onChange={handleRadioChange}
                  value="delivered"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "B" }}
                  style={{ color: "lightgreen" }}
                />
              }
            />
            <FormControlLabel
              label="Cancelled"
              control={
                <Radio
                  checked={selectedView === "cancelled"}
                  onChange={handleRadioChange}
                  value="cancelled"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "B" }}
                  style={{ color: "crimson" }}
                />
              }
            />
          </div>
        </div>
      </div>
      <div className="porders-note-content">
        {/* eslint-disable-next-line array-callback-return */}
        {mastif?.map((item, i, arr) => {
          if (item?.body?.some((d1) => d1.order_products.length > 0)) {
            return (
              <>
                <Timeline key={i} data={item} />
                {i !== arr.length - 1 && <hr style={{ height: "2px" }} />}
              </>
            );
          }
        })}
      </div>
      <div className="porders-note-footer">
        <div></div>
        <div className="actions">
          {myorderCount >= 30 && (
            <Pagination
              className="pagination-bar"
              currentPage={curPage}
              totalCount={myorderCount}
              pageSize={30}
              onPageChange={getNewDataSet}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonaOrders;
