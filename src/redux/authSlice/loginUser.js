import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

 const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    try {
      const response = await fetch('http://codetentacles-006-site36.htempurl.com/api/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const user = await response.json();
      console.log(user,'check the role of user')
      return user;
    } catch (error) {
      throw new Error('Login failed');
    }
  }
);

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });
export default loginUser
// export default authSlice.reducer;


