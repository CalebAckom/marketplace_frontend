import React, { useState, useEffect, useRef, useMemo } from "react";
import { useHistory } from "react-router-dom";
import "../../assets/css/homepage.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FormControl from "@mui/material/FormControl";
import CarouselSlider from "../../../src/components/Carousel/CarouselSlider";
import Searchproduct from "../../../src/components/Searchproducts/Searchproduct";
import Searchbycategory from "../../../src/components/Searchproducts/Searchbycategory";
import { addToRemoteCart } from "../../services/features/slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../utils/config";
import {
  fetchProductbyCategoryR,
  fetchProductR,
  fetchProductSimilar,
  singlePductSelec,
  fetchProductRecommended,
} from "../../services/features/slices/ProductSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Pagination from "../../../src/components/Pagination/Pagination";



const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export function generateRandomCode() {
  let result = "";
  let charactersLength = characters.length;
  for (var i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const promptLoginBefore = () => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div class="customui text-center">
          <h4 class="text-white p-3 prompt-info">
            Please Login or Register to add to cart
          </h4>
          <div class="prompt-login">
            <button
            style={{width:"100%"}}
              class="btn bg-white text-dark fw-bold m-1"
              onClick={onClose}
            >
              Cancel
            </button>
            <button style={{width:"100%"}}
              class="btn bg-white text-dark fw-bold m-1"
              onClick={() => {
                window.location = "/login";
              }}
            >
              Login or Register
            </button>
          </div>
        </div>
      );
    },
  });
};

function Product() {
  //redux
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cr.items);
  const cartKey = useSelector((state) => state.cr.cartKey);
  const userDoc = useSelector(({ userReducer }) => userReducer.userDoc);
  const hmPds = useSelector(({ allP }) => allP);
  const PaginatehmPds = useSelector(({ allP }) => allP.homeproducts);
  const history = useHistory();
  const [isloading, setIsLoading] = useState(true);
  const [loadingitem, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [categ, setCateg] = useState("");
  const [minprice, setMinprice] = useState("");
  const [maxprice, setMaxprice] = useState("");
  const [ownercity, setOwnerCity] = useState("");
  const [depositedAmount, setDepositedAmount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let PageSize = hmPds.homeproducts.length < 30 ? 30 : 30;

  //filter state
  const [filters, setFilters] = useState({
    owner__city: "",
    name: "",
    category: "",
    product_type: "",
    min_price: 0,
    max_price: 1000000,
    search: "",
  });

  const moveToPage = (page) => {
    dispatch(fetchProductR(JSON.stringify({ pageNumber: page })));
    setCurrentPage(page);
  };

  const clearAll = () => {
    window.scroll(0, 0);
    setSearch("");
    setMinprice("");
    setMaxprice("");
    setOwnerCity("");
    setDepositedAmount("");
    setCateg("");
    setCurrentPage(currentPage);
    dispatch(fetchProductbyCategoryR());
    dispatch(fetchProductR());
    window.location.reload();
  };

  const [image, setImage] = useState(
    "http://cdn.home-designing.com/wp-content/uploads/2018/03/loading.gif"
  );

  const passProductData = (product) => {
    history.push(`/products/${generateRandomCode() + product.id}`, {
      params: product,
    });
    dispatch(singlePductSelec(product));
    dispatch(
      fetchProductRecommended(
        JSON.stringify({ cat: product.category, pid: product.id })
      )
    );
    dispatch(fetchProductSimilar({ uid: product.owner.id, pid: product.id }));
  };


  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return hmPds.homeproducts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const createCart = async () => {
    await fetch(`${BASE_URL}/marketplace/shopping-cart/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        // setUserCartId(responseJSON.key);
      });
  };

  useEffect(() => {
    window.scroll(0, 0);
    moveToPage(currentPage);
    dispatch(fetchProductR());
    dispatch(fetchProductbyCategoryR());
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setTimeout(() => {
      setImage(image);
      setLoading(false);
    }, 2000);
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
  }, [currentPage]);

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
        <div class="displayProductStyle">
          <div class="w-100 carosel-margin h-auto"><CarouselSlider /></div>

          <div class="productwrapper mx-auto">
            <div class="row">
              <div class="col-md-4 position-sticky col4-style" style={{top:"6rem"}}>
                <div class="p-2">
                  <button
                    class="btn"
                    onClick={() => {
                      clearAll();
                    }}
                    style={{
                      color: "#7882A4",
                      float: "right",
                      fontFamily: "Roboto,sans-serif",
                    }}
                  >
                    Clear All
                  </button>
                  <div>
                    <Searchproduct
                      clearAll={clearAll}
                      search={search}
                      products={hmPds}
                      setSearch={setSearch}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  </div>
                  <FormControl
                    style={{
                      width: "100%",
                      textAlign: "left",
                      color: "white",
                      marginBottom: 0,
                      display: "block",
                    }}
                  >
                    <Searchbycategory
                      filters={filters}
                      setFilters={setFilters}
                      categ={categ}
                      minprice={minprice}
                      setMinprice={setMinprice}
                      maxprice={maxprice}
                      setMaxprice={setMaxprice}
                      setCateg={setCateg}
                      ownercity={ownercity}
                      setOwnerCity={setOwnerCity}
                      depositedAmount={depositedAmount}
                      setDepositedAmount={setDepositedAmount}
                      hmPds={hmPds}
                      // clearAll={clearAll}
                    />
                  </FormControl>
                </div>
              </div>

              <div
                class="col-md-8  position-relative bglight col8-style"
                style={{ fontFamily: "Roboto,sans-serif" }}
              >
                {isloading ? (
                  <div class="position-absolute top-50 start-50">
                    {/* <span
                  class="spinner-grow spinner-grow-sm text-light"
                  style={{ width: "100px", height: "100px" }}
                ></span> */}
                  </div>
                ) : (
                  <div class="d-flex flex-row flex-wrap mt-2 justify-content-center">
                    {hmPds?.homeproducts.length === 0 ? (
                      <div class="fs-4 mx-auto bg-primary">
                        <img
                          style={{
                            height: "200px",
                            width: "auto",
                            objectFit: "cover",
                            // marginTop:"50px"
                          }}
                          src="http://www.roch-online.com/assests/images/noproductfound.png"
                          alt="oops"
                        />
                      </div>
                    ) : (
                      hmPds?.homeproducts.map((product) => (
                        <div class="product-items p-2" index={product.id}>
                          <div
                            class="card col m-1 position-relative"
                          >
                           
                            {" "}
                            {product.discount === 0 ? (
                              ""
                            ) : (
                              <span
                                class="position-absolute top-0 start-0 fs-6 discount-color text-danger"
                                style={{ fontFamily: "Roboto,sans-serif" }}
                              >
                                -{product.discount}%
                              </span>
                            )}{" "}
                               {!userDoc["userType"] && !userDoc["isStaff"] && (
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
                              class="card-img-top rounded-0 img-fluid recommend-style imgBox"
                              src={
                                image !== null && loadingitem
                                  ? image
                                  : product.image_1
                              }
                              alt="item"
                              onClick={() => {
                                passProductData(product);
                              }}
                            />
                          </div>
                          <div class="card-body">
                            <p
                              class="card-text col-sm-12 mb-0 text-truncate text-dark fw-bold fs-6"
                              style={{ fontFamily: "Roboto,sans-serif" }}
                            >
                              {product.name}
                            </p>{" "}
                            {product.discount === 0 ? (
                              <div
                                class="card-text text-dark fs-6"
                                style={{ fontFamily: "Roboto,sans-serif" }}
                              >
                                Gh&#x20B5;{product.price}
                              </div>
                            ) : (
                              <div
                                class="card-text d-flex flex-row flex-wrap"
                                style={{ fontFamily: "Roboto,sans-serif" }}
                              >
                                <div
                                  class="text-muted fs-6"
                                  style={{ fontFamily: "Roboto,sans-serif" }}
                                >
                                  <s>Gh&#x20B5;{product.price}</s>
                                </div>
                                <div
                                  class="card-text fw-bold fs-6 ms-1"
                                  style={{ fontFamily: "Roboto,sans-serif" }}
                                >
                                  Gh&#x20B5;
                                  {(
                                    product.price -
                                    product.price * (product.discount / 100)
                                  ).toFixed(2)}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                    
                  </div>
                )}
              </div>
            </div>
          </div>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={hmPds?.count}
            pageSize={hmPds.homeproducts.length < 30 ? 30 : 30}
            onPageChange={moveToPage}
          />
        </div>
      )}
    </>
  );
}

export default Product;
