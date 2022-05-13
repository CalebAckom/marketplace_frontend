import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "../../ProductService";

const is = {
  homeproducts: [],
  similar: [],
  recommendsd: [],
  singlePduct:{},
  count:0
};

export const fetchProductR = createAsyncThunk(
  "hmpds/fetchall",
  async (api, thunk) => {
    const ck = await ProductService.fetchProduct(JSON.parse(api));
    return ck.data;
  }
);

export const fetchProductbyCategoryR = createAsyncThunk(
  "hmpds/fetchCat",
  async (api, thunk) => {
    const ck = await ProductService.fetchProductbyCategory(api);
    return ck.data;
  }
);

export const fetchProductSimilar = createAsyncThunk(
  "hmpds/fetch/similar",
  async (api, thunk) => {
      
       const query = JSON.parse(api)
       console.log(query)
    const ck = await ProductService.fetchmorePosterProduct(query.uid,query.pid);
    console.log("ck", ck)
    return ck;
  }
);

export const fetchProductRecommended = createAsyncThunk(
  "hmpds/fetch/recommended",
  async (api, thunk) => {
    const query = JSON.parse(api)
    const ck = await ProductService.fetchRecommendedProduct(query.cat,query.pid);
    return ck;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: is,
  reducers: {
      singlePductSelec(state,action){
          console.log(action.payload)
        state.singlePduct =  action.payload;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductR.fulfilled, (state, action) => {
        let arr = action.payload.results;
        console.log(action.payload)
        state.homeproducts = arr ? arr : [];
 
        state.count = action.payload.count ? action.payload.count : 0;
       
      })
      .addCase(fetchProductbyCategoryR.fulfilled, (state, action) => {
        state.homeproducts = [];
        let arr = action.payload.results;
        state.homeproducts = arr ? arr : [];
      })
      .addCase(fetchProductSimilar.fulfilled, (state, action) => {
        state.similar = [];
        let arr = action.payload;
        state.similar = arr ? arr : [];
      })
      .addCase(fetchProductRecommended.fulfilled, (state, action) => {
        state.recommendsd = [];
        let arr = action.payload;
        state.recommendsd = arr ? arr : [];
      });
  },
});

export const {singlePductSelec} = productsSlice.actions

export default productsSlice.reducer;
