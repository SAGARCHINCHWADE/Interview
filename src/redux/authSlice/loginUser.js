import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 
 const loginUser = createAsyncThunk(
  "userAuth",
  async (userCredential) => {
    const request = await axios.post(
      "http://codetentacles-006-site36.htempurl.com/api/api/login",
      userCredential
    );
    const response = await request.data.data;
    localStorage.setItem("user", JSON.stringify(response));
    console.log(response);
    return response;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access Denied! Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
      });
  },
});
export default userSlice.reducer;
