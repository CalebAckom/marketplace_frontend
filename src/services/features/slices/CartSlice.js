import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../api";
import CartService from "../../CartService";

const is = {
    items: [],
    cartKey: { key: '' }
}

export const createCartKey = createAsyncThunk("cart/createkey", async (api, thunk) => {
    const ck = await instance({
        method: 'post',
        url: "/marketplace/shopping-cart/create"
    })
    return ck.data;
});

export const addToRemoteCart = createAsyncThunk("cart/addItem", async (api, thunk) => {
    return CartService.addProductToCart(api);
});

export const updateRemoteItemQty = createAsyncThunk("cart/updateItem", async (api, thunk) => {
    return CartService.udpateProductQty(api);
    
})

export const getAllCart = createAsyncThunk("cart/getAllItems", async (api, thunk) => {
    return CartService.getCart(api);
})

const cartSlice = createSlice({
    name: 'mycart',
    initialState: is,
    reducers: {
        clearCart(state, { payload }) {
            state.items = [];
            state.cartKey = { key: '' }
        },
        addToList({ items }, { payload }) {
            console.log('pap pay ', payload)
            if (typeof payload == 'object') {
                const findix = items.findIndex((item, idx) => item.pid === payload.pid)
                if (findix < 0) {
                    items.push(payload)
                } else {
                    items[findix]['qty'] = items[findix]['qty'] + 1
                }
            }
        },
        updateItemQty({ items, total }, { payload }) {
            console.dir(payload);
            const findix = items.findIndex((item, idx) => idx === payload.idx)
            if (!(findix < 0)) {
                const updatedSegmnt = { ...items[findix], qty: payload.data }
                items[findix] = updatedSegmnt;
            }
        },
        checkCartItem({ items }, { payload }) {
            const findix = items.findIndex((item) => item.product === payload)
            let updatedSegmnt = 0;
            if (!(findix < 0)) {
                if (items[findix]['check']) {
                    updatedSegmnt = { ...items[findix], check: false }
                } else {
                    updatedSegmnt = { ...items[findix], check: true }
                }
                items[findix] = updatedSegmnt;
            }
        },
        deleteCartItem(state, { payload }) {
            state.items = state.items.filter((e) => e.product !== payload);
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(createCartKey.fulfilled, (state, action) => {
                state.cartKey = action.payload.key
            }).addCase(addToRemoteCart.fulfilled, (state, action) => {
                state.items.push({ ...action.payload, check: true })
            }).addCase(updateRemoteItemQty.fulfilled, ({ items }, { payload }) => {
                const findix = items.findIndex((item, idx) => item.product === payload.product)
                if (!(findix < 0)) {
                    const updatedSegmnt = { ...items[findix], quantity: payload.quantity }
                    items[findix] = updatedSegmnt;
                }
            }).addCase(getAllCart.fulfilled, (state, { payload }) => {
                let arr = payload.shopping_cart_items;
                if (typeof arr !== "undefined") {
                    arr = arr.map((item) => {
                        return { ...item, check: true }
                    })
                    state.items = arr;
                }
            })
    }
})

export const { addToList, updateItemQty, checkCartItem, deleteCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;