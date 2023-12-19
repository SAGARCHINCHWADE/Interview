import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const StateList = createAsyncThunk("auth/userlist", async ({token,value}) => {
  console.log(token.token,'token',value,'id')
          const response = await fetch(
    `http://codetentacles-006-site36.htempurl.com/api/api/state-list-by-country?countryId=${value}`,
    {
      headers: {
        token: `${token.token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  const stateList = await response.json();
  console.log(stateList, "list of state");
  return stateList;
});

// Create a slice of the Redux store
const StateListSlice = createSlice({
  name: "stateList",
  initialState: {
    user: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(StateList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(StateList.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.user = action.payload;
      })
      .addCase(StateList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default StateListSlice.reducer;