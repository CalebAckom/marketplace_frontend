import axios from "axios";
import { BASE_URL } from "../utils/config";
import instance from "./api";
import * as endpoints from './endpoints'

class CartService {
  CartService() {}
  createKey() {}

  async getCart(key) {
    console.dir(key);
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL}/marketplace/shopping-cart/get/${key}`,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.dir(error);
      return [];
    }
  }

  async addProductToCart(pdata) {
    try {
      const response = await instance({
        method: "POST",
        url: endpoints.addProductToCart,
        data: pdata,
      });
      return response.data;
    } catch (error) {
      console.dir(error);
      return 400;
    }
  }

  async removeProductToCart(pdata) {
    try {
      const response = await instance({
        method: "DELETE",
        url: `/marketplace/shopping-cart/remove-item/${pdata.cartkey}/${pdata.item}`,
      });
      return response.status;
    } catch (error) {
      console.dir(error);
      return 400;
    }
  }

  async udpateProductQty(pdata) {
    console.log(pdata);
    let fd = new FormData();
    fd.append("quantity", pdata.qty);
    try {
      const response = await instance({
        method: "PUT",
        url: `/marketplace/shopping-cart/update/${pdata.cartKey}/${pdata.item}`,
        data: fd,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.dir(error);
      return 400;
    }
  }

  async placeOrder(data) {
    try {
      const response = await instance({
        method: "POST",
        url: "/marketplace/order-item",
        data,
      });
      return response.status;
    } catch (error) {
      console.dir(error);
      return 400;
    }
  }

  async getPlacedOrders(url="") {
    try {
      return await instance({
        method: "GET",
        url,
      });       
    } catch (error) {
      console.dir(error);
      return 400;
    }
  }
}

export default new CartService();
