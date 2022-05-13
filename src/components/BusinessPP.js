import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "../assets/css/businesspp.css";
import "../assets/css/viewproduct.css";
import "../assets/css/recommend.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LanguageIcon from "@mui/icons-material/Language";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import ProfilePageService from "../services/ProfileService";
import { generateRandomCode, promptLoginBefore } from "./Products/Product";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addToRemoteCart } from "../services/features/slices/CartSlice";

import { PreselectedValues } from "../utils/PreselectedData";

const Businesspp = ({ setIsLog }) => {
  const history = useHistory();
  const location = useLocation();
  //redux
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cr.items);
  const cartKey = useSelector((state) => state.cr.cartKey);
  const userDoc = useSelector(({ userReducer }) => userReducer.userDoc);
  const [isReady, setIsReady] = useState(false);
  const [businessPageproduct, setBussinessPageProduct] = useState([]);
  const [buspagedata, setBusPageData] = useState({});

  const getBusinessProfileproduct = async () => {
    const data = await ProfilePageService.getBussinessPageProduct(
      location.state.params.owner.slug
    );
    setBussinessPageProduct(data?.data?.results);
  };

  const getBusinessProfilepage = async () => {
    const data = await ProfilePageService.getSingleBusinessPage(
      location.state.params.owner.slug
    );
    setBusPageData(data?.data);
  };

  const passProductData = (product) => {
    history.push(`/products/${generateRandomCode()} + ${product.id}`, {
      params: product,
    });
  };

  function addToCart(data) {
    const pduct = {
      quantity: 1,
      product: data.id,
      shopping_cart: cartKey,
    };

    const findix = cartState.findIndex((item) => item.product === data.id);
    if (findix < 0) {
      dispatch(addToRemoteCart(pduct));
    } else {
      // dispatch(updateRemoteItemQty());
    }
  }

  useEffect(() => {
    window.scroll(0, 0);
    getBusinessProfilepage();
    getBusinessProfileproduct();
    setIsLog(true);
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  }, []);

  return (
    <>
      {!isReady ? (
        <div class="d-flex justify-content-center" style={{ height: "100vh" }}>
          <span
            className="spinner-border text-secondary"
            style={{ width: "100px", height: "100px", marginTop: "100px" }}
          ></span>
        </div>
      ) : (
        <div
          class="position-relative"
          style={{ width: "100%", height: "auto" }}
        >
          <div class="bg-light containPC">
            <div class="container bg-white mt-1 pageContainer">
              <div class="" style={{ height: "100%" }}>
                <div class="row">
                  <div class="col-md-3">
                    <div class=" p-2 ">
                      <div class="d-grid gap-2 d-md-flex justify-content-center">
                        <img
                          src={
                            buspagedata.image === null
                              ? "../images/user.png"
                              : buspagedata.image
                          }
                          class=" rounded-circle shadow card-img-top img-fluid"
                          style={{ width: "180px", height: "180px" }}
                          alt="imgg"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-9">
                    <div
                      class="container g-0 mt-1 mb-1 fs-1"
                      style={{ fontFamily: "Roboto,sans-serif" }}
                    >
                      {buspagedata.title}
                    </div>

                    <div class="container">
                      <div class="row">
                        <div class="col-md-4 p-1">
                          <h5>
                            <strong class="text-muted">Email </strong>
                          </h5>
                          <span class="text-muted" style={{ fontSize: "14px" }}>
                            <EmailIcon />
                            {buspagedata.email}
                          </span>
                        </div>
                        <div class="col-md-4 p-2">
                          <h5>
                            <strong class="text-muted">Phone </strong>
                          </h5>{" "}
                          <span class="text-muted" style={{ fontSize: "14px" }}>
                            <LocalPhoneIcon />
                            {buspagedata.phone_number2 === ""
                              ? "not provided"
                              : buspagedata.phone_number2}
                          </span>
                        </div>
                        <div class="col-md-4 p-2">
                          <h5>
                            <strong class="text-muted">Website</strong>
                          </h5>{" "}
                          <span class="text-muted" style={{ fontSize: "14px" }}>
                            <LanguageIcon />
                            <a
                              class="text-decoration-none text-muted text-lowercase"
                              style={{ fontSize: "14px" }}
                              target="_blank"
                              rel="noreferrer"
                              href={buspagedata.website}
                            >
                              {buspagedata.website === ""
                                ? "not provided"
                                : `${buspagedata.website}`}
                            </a>
                          </span>
                        </div>
                        <div class="col-md-4 p-2">
                          <h5>
                            <strong class="text-muted">Town </strong>
                          </h5>{" "}
                          <span class="text-muted" style={{ fontSize: "14px" }}>
                            <LocationCityIcon />
                            {PreselectedValues.getTownValueWithCode(
                              buspagedata.city
                            ) !== ""
                              ? PreselectedValues.getTownValueWithCode(
                                  buspagedata.city
                                )
                              : "not provided"}{" "}
                          </span>
                        </div>
                        <div class="col-md-4 p-2">
                          <h5>
                            <strong class="text-muted">Region</strong>
                          </h5>{" "}
                          <span class="text-muted" style={{ fontSize: "14px" }}>
                            <LocationOnIcon />{" "}
                            {PreselectedValues.getRegionValueWithCode(
                              buspagedata.region
                            ) !== ""
                              ? PreselectedValues.getRegionValueWithCode(
                                  buspagedata.region
                                )
                              : "not provided"}{" "}
                          </span>
                        </div>
                        <div class="col-md-4 p-2">
                          <h5>
                            <strong class="text-muted">Category </strong>
                          </h5>{" "}
                          <span class="text-muted" style={{ fontSize: "14px" }}>
                            <CategoryIcon />
                            {PreselectedValues.getCategoryValueWithCode(
                              buspagedata.category
                            ) !== ""
                              ? PreselectedValues.getCategoryValueWithCode(
                                  buspagedata.category
                                )
                              : "not provided"}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-8">
                  <div
                    style={{
                      display: "block",
                      width: "100%",
                      marginTop: "12px",
                    }}
                  >
                    <Tabs defaultActiveKey="first">
                      <Tab
                        tabClassName="firsttab"
                        eventKey="first"
                        title="Market"
                      >
                        <div class="blog-post">
                          <div
                            class="album py-1 bg-light"
                            style={{ height: "auto" }}
                          >
                            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 h-auto">
                              {businessPageproduct.map((product) => (
                                <div class="col">
                                  <div class="card rounded-0 position-relative shadow-sm">
                                    {product.discount === 0 ? (
                                      ""
                                    ) : (
                                      <span class="position-absolute top-0 start-0 discount-color text-danger">
                                        -{product.discount}%
                                      </span>
                                    )}
                                    {!userDoc["userType"] &&
                                      !userDoc["isStaff"] && (
                                        <span class="position-absolute top-0 end-0 bradius p-1 bg-white">
                                          <ShoppingCartIcon
                                            onClick={() => {
                                              if (userDoc["statusLog"]) {
                                                addToCart(product);
                                              } else {
                                                promptLoginBefore();
                                              }
                                            }}
                                            style={{
                                              width: "20px",
                                              cursor: "pointer",
                                              color: "#10316B",
                                            }}
                                          />
                                        </span>
                                      )}
                                    <img
                                      src={product.image_1}
                                      class="card-img-top rounded-0 recommend-style imgBox img-fluid"
                                      alt="busitem"
                                      onClick={() => {
                                        passProductData(product);
                                      }}
                                    />

                                    <div class="card-body">
                                      <p class="mb-0 text-truncate">
                                        {product.description}
                                      </p>

                                      {product.discount === 0 ? (
                                        <div
                                          class="text-dark fs-6"
                                          style={{
                                            fontFamily: "Roboto,sans-serif",
                                          }}
                                        >
                                          Gh&#x20B5;{product.price}
                                        </div>
                                      ) : (
                                        <div
                                          class="d-flex flex-row flex-wrap"
                                          style={{
                                            fontFamily: "Roboto,sans-serif",
                                          }}
                                        >
                                          <div class="card-text">
                                            <s
                                              class="text-muted"
                                              style={{ fontSize: "14px" }}
                                            >
                                              Gh&#x20B5;{product.price}
                                            </s>
                                            <p class="card-text">
                                              {" "}
                                              Gh&#x20B5;
                                              {(
                                                product.price -
                                                product.price *
                                                  (product.discount / 100)
                                              ).toFixed(2)}
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Tab>
                      {/* <Tab tabClassName="secondtab" eventKey="second" title="More Info">
                      Hii, I am 2nd tab content
                    </Tab> */}
                    </Tabs>
                  </div>
                </div>

                <div class="col-md-4 h-auto">
                  <div class="position-sticky" style={{ top: "10rem" }}>
                    <div class="p-4 mb-3 rounded mt-3">
                      <h4 class="fst-italic">About</h4>
                      <p class="mb-0">
                        {buspagedata.description === ""
                          ? "Describe what your business is about here..."
                          : `${buspagedata.description}`}
                      </p>
                    </div>
                    <div class="p-4">
                      <button type="button" class="btn m-1 btn-outline-dark">
                        <MoreHorizIcon />
                      </button>
                      <button type="button" class="btn m-1 btn-outline-dark">
                        <MailOutlineIcon />
                      </button>
                      <button type="button" class="btn btn-primary m-1">
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Businesspp;
