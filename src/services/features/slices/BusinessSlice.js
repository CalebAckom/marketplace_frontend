import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BusinessService from "../../BusinessService";
import {
  getLikedDates,
  getLikedOfLook,
} from "../../../Views/Business/Notification/smpWork";

const initialState = {
  count: 0,
  current: "",
  items: [],
  raw: "",
  mastif: [],
  hasPending: false,
  download : []
};
export const getPlacedOrders = createAsyncThunk(
	"bplacedorders",
	async (api, thunk) => {
		const po = await BusinessService.getPlacedOrders(api);
		return po.data;
	}
);

export const checkStatus = createAsyncThunk(
  "bplacedorders/check",
  async (api, thunk) => {
    const po = await BusinessService.checkOrderStats();
    return po.data;
  }
);

const receivedOrders = createSlice({
  initialState,
  name: "receivedorders",
  reducers: {
    clearPlacedOrders(state) {
      state.prev = "";
      state.next = "";
      state.items = [];
    },
    orderByDate(state) {
      state.configd = getLikedDates(state.items);
    },
    changeViewLook(state, action) {
      state.mastif = getLikedOfLook(state.raw, action.payload);
    },
    saveDownload(state,action){
      state.download = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlacedOrders.fulfilled, (state, { payload }) => {
        if (payload) {
          state.count = payload.count;
          state.items =  state.mastif = getLikedDates(payload.results);
          state.raw = payload.results;
        }
      })
      .addCase(checkStatus.fulfilled, (state, { payload }) => {
        state.hasPending = Boolean(payload?.has_pending);
      });
  },
});

export const { clearPlacedOrders, orderByDate, changeViewLook,saveDownload } =
  receivedOrders.actions;

export default receivedOrders.reducer;
