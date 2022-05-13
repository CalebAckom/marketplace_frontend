import { BASE_URL, LOCALHOST_AUTH_TOKENS } from "../utils/config";
import { PreselectedValues } from "../utils/PreselectedData";
import instance from "./api";
import axios from "axios";

class ProductService {
  getLocalStorageAsJson(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  async addNewProduct(data) {
    try {
      console.dir(data);
      const response = await instance({
        method: "POST",
        headers: {
          "content-type":
            "multipart/form-data; boundary=<calculated when request is sent>",
        },
        url: "marketplace/create_product/",
        data,
      });
      return response;
    } catch (error) {
      console.dir(error);
    }
  }

  async updateProduct(data) {
    console.log("update date", data);
    try {
      const action = await instance({
        method: "PUT",
        url: `/marketplace/update_product/${data.current}/`,
        data,
        headers: {
          Authorization:
            "Bearer " +
            this.getLocalStorageAsJson(LOCALHOST_AUTH_TOKENS)["access"],
        },
      });
      return action;
    } catch (error) {
      console.dir(error);
    }
  }

  async deleteProduct(data) {
    console.log("s d d => ", data);
    try {
      const action = await instance({
        method: "DELETE",
        url: `/marketplace/delete_product/${data.id}/`,
        headers: {
          Authorization:
            "Bearer " +
            this.getLocalStorageAsJson(LOCALHOST_AUTH_TOKENS)["access"],
        },
      });
      return action;
    } catch (error) {
      console.dir(error);
    }
  }


  async getOrdersAdmin(currentPage, searchorders="") {
    try {
      const data = await instance({
        method: "GET",
        url: `/marketplace/order_logs?page=${currentPage}&search=${searchorders}`,
        headers: {
          Authorization:
            "Bearer " +
            this.getLocalStorageAsJson(LOCALHOST_AUTH_TOKENS)["access"],
        },
      });
      return data;
    } catch (error) {
      console.dir(error);
    }
  }


  async getdownloadOrdersAdmin() {
    try {
      const data = await instance({
        method: "GET",
        url: `/marketplace/download_orders_admin`,
        headers: {
          Authorization:
            "Bearer " +
            this.getLocalStorageAsJson(LOCALHOST_AUTH_TOKENS)["access"],
        },
      });
      return data;
    } catch (error) {
      console.dir(error);
    }
  }


 
  async fetchRecommendedProduct(recommend, productid) {
    try {
      const response = await axios.get(
        `https://community.amalitech-dev.net/api/marketplace/recommended_products/${recommend}/${productid}/`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchmorePosterProduct(uid, pid) {
    try {
      const response = await axios.get(
        `https://community.amalitech-dev.net/api/marketplace/similar_products/${uid}/${pid}/`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchProduct(currentPage) {
    let pg = currentPage.pageNumber ? currentPage.pageNumber : 1;
    try {
      const data = await axios.get(
        `https://community.amalitech-dev.net/api/marketplace/products/?page=${pg}`
      );
      return data;
    } catch (error) {
      console.dir(error);
    }
  }

  async fetchProductbyCategory(
    filters = {
      owner__city: "",
      name: "",
      category: "",
      product_type: "",
      min_price: 0,
      max_price: 1000000,
      search: "",
    }
  ) {
    try {
      const datas = await axios.get(
        `https://community.amalitech-dev.net/api/marketplace/products/?owner__city=${filters.owner__city}&name=${filters.name}&product_type=${filters.product_type}&category=${filters.category}&min_price=${filters.min_price}&max_price=${filters.max_price}&search=${filters.search}`
      );
      return datas;
    } catch (error) {
      console.dir(error);
    }
  }

  // async fetchProductPaginate(data) {
  //   console.log("page data", data);
  //   try {
  //     const pages = await axios.get(
  //       `https://community.amalitech-dev.net/api/marketplace/products/?page=${data.count}`
  //     );
  //     return pages;
  //   } catch (error) {
  //     console.dir(error);
  //   }
  // }

  // localStorage.setItem(LOCALHOST_AUTH_TOKENS, JSON.stringify(data));
  // setAuthTokens(data);
  // setUser(jwtDecode(data?.access));
  // return data;
}

export default new ProductService();
