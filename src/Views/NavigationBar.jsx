import {
  ArrowDropDown,
  Face,
  Apple,
  Settings,
  Logout,
  Add,
  Notifications,
  Dock,
  ListAlt,
} from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import React, { useEffect, useState,useContext } from "react";
import AuthContext from "../Context/AuthContext";
import OutsideClickHandler from "react-outside-click-handler";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../services/features/slices/userSlice";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { clearCart } from "../services/features/slices/CartSlice";
import {
  checkStatus,
  clearPlacedOrders,
} from "../services/features/slices/BusinessSlice";
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles({
  root: {
    color: "#000",
    zIndex: 10,
  },
});

const NavigationBar = () => {
  const [showD, setShowD] = useState(false);
  const { logoutUser } = useContext(AuthContext);

  //redux
  const userDoc = useSelector(({ userReducer }) => userReducer.userDoc);
  const cartsize = useSelector(({ cr }) => (cr.items ? cr.items.length : 0));
  const dispatch = useDispatch();

  const history = useHistory();

  let readQuest = "";
  const gotoProfile = () =>
    history.push(userDoc["userType"] ? "/business-page" : "/profile");

  const ro_hasPending = useSelector(({ ro }) => ro.hasPending);

  const viewNotification = () => {
    history.push("/business-notification");
  };

  useEffect(() => {
    if (userDoc["userType"]) {
      readQuest = setInterval(() => {
        dispatch(checkStatus("/marketplace/order/check-business-orders-status"));
      }, 1000 * 5);
    }
    return () => {
      if (userDoc["userType"]) {
        clearInterval(readQuest);
      }
    };
  }, [userDoc["userType"]]);
  return (
    <nav className="x-nav-wrapper">
      <div className="nav-content">
        <div className="icon-container">
          <img
            src="/images/Marketplace_logo_final.png"
            alt="Logo"
            className="page-logo"
            onClick={() => (window.location = "/")}
          />
        </div>
        {/* <div className="srch-container"></div> */}
        <div className="later-container">
          {!userDoc["statusLog"] ? (
            <div className="log-actions">
              <button
                class="btn-log btn-select"
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Login
              </button>
              <button
                class="btn-log"
                onClick={() => {
                  history.push("/signup");
                }}
              >
                Register
              </button>
            </div>
          ) : (
            <>
              {/* check if is business or not */}
              {userDoc["userType"] && (
                <div className="common-business-actions">
                  <div
                    className="post-product"
                    onClick={() => {
                      history.push("/post-product");
                    }}
                  >
                    Add Product
                  </div>
                  <div
                    className="post-product-alt"
                    onClick={() => {
                      history.push("/post-product");
                    }}
                  >
                    <Add color="white" fontSize="0.8em" />
                  </div>
                  <div className="notification" onClick={viewNotification}>
                    <div className="bellholder">
                      {ro_hasPending && (
                        <div className="noter" />
                      )}
                      <Tooltip
                        title="See your orders"
                        placement="top"
                        arrow
                      >
                        <Notifications style={{ cursor: "pointer" }} />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              )}
              {!userDoc["userType"] && !userDoc["isStaff"] && (
                <div className="me-4">
                  <IconButton onClick={() => history.push("/cart-list")}>
                    <Badge badgeContent={cartsize} color="error">
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </IconButton>
                </div>
              )}
              {/* describe both customer and business ddown layout */}
              <div
                className="profile-actions"
                onClick={() => {
                  setShowD(!showD);
                }}
              >
                <img className="ico" src={userDoc["img"]} alt="userimg" />
                <div
                  className="d-down"
                  onClick={() => {
                    setShowD(!showD);
                  }}
                  onBlur={() => {
                    setShowD(false);
                  }}
                >
                  <ArrowDropDown />
                  {showD && (
                    <div className="m-n">
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setShowD(false);
                        }}
                      >
                        {userDoc["isStaff"] && (
                          <>
                            <div
                              className="one"
                              onClick={() => {
                                history.push("/amali-tech-adminpage");
                              }}
                            >
                              <AdminPanelSettingsIcon /> Admin Portal
                            </div>
                          </>
                        )}

                        {!userDoc["isStaff"] && (
                          <>
                            <div
                              className="one"
                              onClick={() => {
                                gotoProfile();
                              }}
                            >
                              <Face /> My Profile
                            </div>
                            {userDoc["userType"] && (
                              <div
                                className="one"
                                onClick={() => {
                                  history.push("/my-products");
                                }}
                              >
                                <Apple /> My Products
                              </div>
                            )}
                            {!userDoc["userType"] && (
                              <div
                                className="one"
                                onClick={() => {
                                  history.push("/my-orders");
                                }}
                              >
                                <ListAlt /> My Orders
                              </div>
                            )}
                            <div
                              className="two"
                              onClick={() => {
                                history.push("/account-settings");
                              }}
                            >
                              <Settings /> Account Settings
                            </div>{" "}
                          </>
                        )}

                        <div
                          className="one"
                          onClick={() => {
                            history.push("/");
                            logoutUser();
                            dispatch(logout());
                            dispatch(clearCart());
                            dispatch(clearPlacedOrders());
                            localStorage.clear("persist:root");
                          }}
                        >
                          <Logout /> Logout
                        </div>
                      </OutsideClickHandler>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
