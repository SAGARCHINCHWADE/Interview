import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const AddProduct = createAsyncThunk("AddProductList", async ({token}) => {
  console.log(token.token, "token at slice");

  const response = await fetch(
    "http://codetentacles-006-site36.htempurl.com/api/api/product-list",
    {
      headers: {
        token:token
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  const ProdductList = await response.json();
  console.log(ProdductList, "this is product list");
  return ProdductList;
});

// Create a slice of the Redux store
const UserListSlice = createSlice({
  name: "productList",
  initialState: {
    user: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(AddProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default UserListSlice.reducer;
