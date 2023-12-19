import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCountry = createAsyncThunk("auth/userlist", async (token) => {
  const response = await fetch(
    "http://codetentacles-006-site36.htempurl.com/api/api/country-list",
    {
      headers: {
        token: `${token.token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  const countryList = await response.json();
  console.log(countryList, "list of country");
  return countryList;
});

// Create a slice of the Redux store
const countryListSlice = createSlice({
  name: "countryList",
  initialState: {
    user: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountry.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCountry.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.user = action.payload;
      })
      .addCase(getCountry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default countryListSlice.reducer;
