import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../api";
import CartService from "../../CartService";
import { getLikedDates, getLikedOfLook } from "../../../Views/Business/Notification/smpWork2";

const initialState = {
  items: [],
  status: "pending",
  myOrders: [],
  mastif: [],
  count: 0,
};

export const fetchMyProducts = createAsyncThunk("", async (api, thunk) => {
  const response = await instance({
    url: "/marketplace/own_products/",
    method: "GET",
  });
  return response.data;
});

export const fetchMyOrders = createAsyncThunk(
  "myorders",
  async (api, thunk) => {
    const response = await CartService.getPlacedOrders(api);
    return response?.data;
  }
);

const myProducstSlice = createSlice({
  name: "myProducts",
  initialState: initialState,
  reducers: {
    getProductById: ({ items }, { payload }) =>
      items.filter((e) => e.id === payload),
    changeViewLook1(state, {payload}) {
      let aData = [...getLikedOfLook(payload.raw, payload.value)];
      state.mastif = aData;
      console.log('likeArr',aData)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.status = "fulfiled";
        state.items = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchMyProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchMyProducts.rejected, (state) => {
        state.status = "rejected";
        console.log("fetch failed");
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.myOrders = action?.payload?.results;
        state.mastif = getLikedDates(action?.payload?.results);
        state.count = action?.payload?.count;
      });
  },
});

export const { getProductById,changeViewLook1 } = myProducstSlice.actions;

export default myProducstSlice.reducer;
