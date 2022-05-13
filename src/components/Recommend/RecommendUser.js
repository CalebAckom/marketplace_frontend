import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
// import ProductService from "../../../src/services/ProductService";
import "../../assets/css/viewproduct.css";
import { generateRandomCode } from "../../../src/components/Products/Product";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductSimilar,
  fetchProductRecommended,
  singlePductSelec,
} from "../../services/features/slices/ProductSlice";

const RecommendUser = ({ userid, productid }) => {
  const history = useHistory();
  // const [similarProducts, setsimilarProducts] = useState([]);
  const [isReady, setIsReady] = useState(false);
  //
  const similarR = useSelector((state) => state.allP.similar);
  const dispatch = useDispatch();
  // const getRecommendedProducts = async () => {
  //   const data = await ProductService.fetchmorePosterProduct(`${userid}`,`${productid}`);
  //   setsimilarProducts(data);
  // };

  const passSimilarRecommendedData = (product) => {
    window.scroll(0, 0);
    dispatch(singlePductSelec(product));
    dispatch(
      fetchProductRecommended(
        JSON.stringify({ cat: product.category, pid: product.id })
      )
    );
    dispatch(
      fetchProductSimilar(
        JSON.stringify({ uid: product.owner.id, pid: product.id })
      )
    );
    history.push(
      `/products/${product.owner.id}/${product.id + generateRandomCode()}/`,
      {
        params: product,
      }
    );
  };

  useEffect(() => {
    window.scroll(0, 0);
    setTimeout(() => {
      setIsReady(true);
    }, 1000);
    // getRecommendedProducts();
  }, []);

  return (
    <>
      {!isReady ? (
        <div>
          <span
            className="spinner-border text-secondary"
            style={{ width: "50px", height: "50px", marginTop: "30px" }}
          ></span>
        </div>
      ) : (
        <>
          {similarR?.length === 0 ? (
            <div>
              <div class="fs-6">No Products from this business yet</div>
            </div>
          ) : (
            similarR?.map((product) => (
              <div index={product.id}>
                <div
                  onClick={() => {
                    passSimilarRecommendedData(product);
                  }}
                >
                  <div className="mt-2 mb-2">
                    <img
                      className="d-flex flex-row flex-wrap img-detail-list imgBox"
                      src={product.image_1}
                      alt={product.id}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </>
  );
};

export default RecommendUser;
