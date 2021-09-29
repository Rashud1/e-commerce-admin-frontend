import {configureStore} from "@reduxjs/toolkit";
import  userReducer  from "./pages/admin-auth-slice/userSlice";
import  categoryReducer   from "./pages/category/categoryslice";

const store = configureStore({
    reducer:{
        user: userReducer,
        category: categoryReducer,

        
    },
});

export default store;