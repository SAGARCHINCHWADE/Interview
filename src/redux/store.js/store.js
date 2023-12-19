import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice/loginUser";
import userlistReducer from "../UserListSlice/UserListSlice";
import  countryListReducer  from "../CountryListSlice/CountryListSlice";

export const store = configureStore({
  reducer: {auth: authReducer ,list:userlistReducer,countryList:countryListReducer}
});