import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import myProductsReducer from "./slices/myProductsSlice";
import cartReducer from "./slices/CartSlice";
import productReducer from "./slices/ProductSlice";
import receivedOrders from "./slices/BusinessSlice";

const reducers = combineReducers({
  userReducer,
  mpr: myProductsReducer,
  cr: cartReducer,
  allP: productReducer,
  ro: receivedOrders,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
