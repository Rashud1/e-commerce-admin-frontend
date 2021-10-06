import { createSlice } from "@reduxjs/toolkit";

const initialState = {
isPending: false,
productResponse:{},
productList:[]
}
const productSlice = createSlice({
    name:"productSlice",
    initialState,
    reducers:{
        respondPending: (state) =>{
            state.isPending = true
        },
        getProductSuccess: (state,{payload=[]} ) =>{
            state.isPending = false;
            state.productList = payload.products;


        },
        addProdSuccess: (state, {payload}) =>{
            state.isPending = false;
            state.productResponse = false
        },
        respondFail: (state, {payload}) =>{
            state.isPending = false;
            state.productResponse = false
        },
    }

})


const {reducer, actions} = productSlice;
export const {respondPending,getProductSuccess, respondFail,addProdSuccess} = actions

export default reducer;
