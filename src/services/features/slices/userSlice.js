import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api";

const initialState = {
  business: {},
  personal:{},
  userDoc:{
    img:"",
    userType:false,
    statusLog: false,
    isStaff:false
  }
};

export const fetchBusinessDetails = createAsyncThunk(
 "/accounts/self_bus_details/",
  async (path, thunkAPI) => {
    const response = await instance({
      method: "GET",
      url: "/accounts/self_bus_details/",
    });
    return response.data;
  }
);

export const fetchPersonalDetails = createAsyncThunk(
  `/accounts/signed_in_user/`,
  async (path, thunkAPI) => {
    const response = await instance({
      method: "GET",
      url:`/accounts/signed_in_user/`
    });
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.business = {};
      state.personal = {};
      state.userDoc = {
        img:"",
        userType:'',   
        statusLog:  false, 
        isStaff:''
      };
     
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessDetails.fulfilled, (state, action) => {
        state.business = action.payload;        
        state.userDoc.img = state.business.image;
        state.userDoc.userType = state.business.user["is_organization"];
        state.userDoc.isStaff = state.business.user["is_staff"];
        state.userDoc.statusLog = true;
      })
      .addCase(fetchPersonalDetails.fulfilled,(state,action) => {
        state.personal = action.payload;
        state.userDoc.img = state.personal.image;
        state.userDoc.userType = state.personal.user["is_organization"];
        state.userDoc.isStaff = state.personal.user["is_staff"];
        state.userDoc.statusLog = true;
      })
      
  },
});

export const {logout} = userSlice.actions;

export default userSlice.reducer;
