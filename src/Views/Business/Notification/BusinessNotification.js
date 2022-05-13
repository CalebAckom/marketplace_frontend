import "./BN_Style.scss";

import { Tell } from "./TableComponet";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";
import {
  changeViewLook,
  getPlacedOrders,
  saveDownload,
} from "../../../services/features/slices/BusinessSlice";
import { CSVDownload, CSVLink } from "react-csv";
import Timeline from "./Timeline";
import { Radio } from "@material-ui/core";
import { styled, makeStyles } from "@material-ui/core/styles";
import { FormControlLabel, Tooltip } from "@mui/material";
import Pagination from "../../../components/Pagination/Pagination";
import BusinessService from "../../../services/BusinessService";
import xXtrct from "./xXtrct";
import { Download } from "@mui/icons-material";

const BusinessNotification = () => {
  const dispatch = useDispatch();
  const ro_mastif = useSelector(({ ro }) => ro.mastif);
  const ro_count = useSelector(({ ro }) => ro.count);
  const download = useSelector(({ ro }) => ro.download);

  const [tell, setTell] = useState({
    value: false,
    text: "",
  });
  const [selectedView, setselectedView] = useState("all");
  const [curPage, setcurPage] = useState(1);

  const handleRadioChange = (event) => {
    setselectedView(event.target.value);
    dispatch(changeViewLook(event.target.value));
  };

  function getNewDataSet(pgNum) {
    setcurPage(pgNum);
    dispatch(
      getPlacedOrders(`/marketplace/order/get-business-orders?page=${pgNum}`)
    );
    dispatch(changeViewLook(selectedView));
  }

  function downnLoadData2(event, done) {
    BusinessService.loadAllOrders()
      .then((res) => {
        let extrct = xXtrct.maxify(res.data);
        dispatch(saveDownload(extrct));
        done(true);
      })
      .catch((error) => {
        console.log(error);
        done(false);
      });
  }

  useEffect(() => {
    dispatch(
      getPlacedOrders(`/marketplace/order/get-business-orders?page=${curPage}`)
    );
  }, [dispatch, curPage]);

  return (
    <div className="business-note-wrapper">
      {tell.value && <Tell tell={tell} setTell={setTell} />}
      <div className="business-note-title-bar-wrapper">
        <div className="business-note-title-bar-content">
          <p>RECEIVED ORDERS</p>
          <div className="misc">
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
                    sx={{'&.MuiTypography-root ':{
                      fontSize:'12px'
                    }}}
                    // size='small'
                  />
                }
              />
            </div>
            <Tooltip title="Download your orders">
              <button className="download-button">
                <CSVLink
                  data={download}
                  filename={`Orders`}
                  style={{ textDecoration: "none" }}
                  asyncOnClick={true}
                  onClick={downnLoadData2}
                >
                  <Download />
                </CSVLink>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="business-note-content">
        {
          // eslint-disable-next-line array-callback-return

          ro_mastif?.map((item, i, arr) => {
            if (item.body.some((d1) => d1.order_products.length > 0)) {
              return (
                <>
                  <Timeline key={i} data={item} byb={true} setTell={setTell} />
                  {i !== arr.length - 1 && <hr style={{ height: "2px" }} />}
                </>
              );
            }
          })
        }
      </div>
      <div className="business-note-footer">
        {ro_count >= 30 && (
          <Pagination
            className="pagination-bar"
            currentPage={curPage}
            totalCount={ro_count}
            pageSize={30}
            onPageChange={getNewDataSet}
          />
        )}
      </div>
    </div>
  );
};

export default memo(BusinessNotification);
