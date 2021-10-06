import {configureStore} from "@reduxjs/toolkit";
import  userReducer  from "./pages/admin-auth-slice/userSlice";
import  categoryReducer   from "./pages/category/categoryslice";
import productReducer  from "./pages/product/productSlice";

const store = configureStore({
    reducer:{
        user: userReducer,
        category: categoryReducer,
        product: productReducer,

        
    },
});

export default store;