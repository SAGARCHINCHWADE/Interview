import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an initial state
const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const userlist = createAsyncThunk("auth/userlist", async (token) => {
  console.log(token, "token at slice");

  const response = await fetch(
    "http://codetentacles-006-site36.htempurl.com/api/api/seller-list",
    {
      headers: {
        token: `${token.token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const data = await response.json();
  await console.log(data,'this is data')
  
  
  return data;
});

// Create a slice of the Redux store
const UserListSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(userlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the async thunk and reducer
// export { userlist };
export default UserListSlice.reducer;