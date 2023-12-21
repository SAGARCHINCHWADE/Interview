import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice/loginUser";
import userlistReducer from "../UserListSlice/UserListSlice";
import countryListReducer from "../CountryListSlice/CountryListSlice";
// UserListSlice
import productListReducer from "../AddProductSlice/AddProductSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    list: userlistReducer,
    countryList: countryListReducer,
    productList: productListReducer,
  },
});
