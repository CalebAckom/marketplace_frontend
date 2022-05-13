import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import ProductService from "../../../src/services/ProductService";
import "../../assets/css/recommend.css";
import { generateRandomCode } from "../../../src/components/Products/Product";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductSimilar,
  singlePductSelec, fetchProductRecommended
} from "../../services/features/slices/ProductSlice";

const Recommend = ({ recommend, productid }) => {
  const history = useHistory();
  // const [recommededProducts, setrecommededProducts] = useState([]);
  const [isReady, setIsReady] = useState(false);
  //
  const recommendsd = useSelector((state) => state.allP.recommendsd);
  const dispatch = useDispatch();

  // const getRecommendedProducts = async () => {
  //   console.log(recommend, productid);
  //   const data = await ProductService.fetchRecommendedProduct(
  //     `${recommend}`,
  //     `${productid}`
  //   );
  //   setrecommededProducts(data);
  // };

  const passRecommendedData = (product) => {
    window.scroll(0,0)
    history.push(`/products/${product.category}/${product.id + generateRandomCode()}/`, {
      params: product,
    });
    console.log("Access Recommended Data ", product);
    dispatch(singlePductSelec(product));
    dispatch(
      fetchProductSimilar(
        JSON.stringify({ uid: product.owner.id, pid: product.id })
      )
    );
    dispatch(fetchProductRecommended(JSON.stringify({ cat:product.category,
      pid:product.id})));
  };

  useEffect(() => {
    window.scroll(0,0)
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
    // getRecommendedProducts();
    // console.log(recommededProducts);
  }, []);

  return (
    <div class="container">
      {!isReady ? (
        <div class="d-flex justify-content-center" style={{ height: "100vh" }}>
          <span
            className="spinner-border text-secondary"
            style={{ width: "100px", height: "100px", marginTop: "100px" }}
          ></span>
        </div>
      ) : (
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          {recommendsd?.length === 0 ? (
            <div class="mx-auto">
              <div class="fs-4 fw-bold mb-5">No Recommended Products yet</div>
            </div>
          ) : (
            recommendsd?.map((product) => (
              <div class="col mb-4" index={product.id}>
                <div class="card h-100">
                  <div
                    class="position-relative"
                    onClick={() => {
                      passRecommendedData(product);
                    }}
                  >
                    {product.discount === 0 ? (
                      ""
                    ) : (
                      <span class="position-absolute top-0 start-0 discount-color text-danger">
                        -{product.discount}%
                      </span>
                    )}
                    <img
                      src={product.image_1}
                      class="card-img-top img-fluid recommend-style imgBox"
                      alt={product.name}
                    />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{product.name}</h5>
                    <s class="text-muted" style={{ fontSize: "14px" }}>
                      Gh&#x20B5;{product.price}
                    </s>
                    <p class="card-text">
                      {" "}
                      Gh&#x20B5;
                      {(
                        product.price -
                        product.price * (product.discount / 100)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Recommend;
