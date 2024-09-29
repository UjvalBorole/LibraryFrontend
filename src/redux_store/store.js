import { configureStore } from "@reduxjs/toolkit";
import  counterReducer  from "./paginationslice";

 const store = configureStore({
    reducer:counterReducer
})
export default  store;