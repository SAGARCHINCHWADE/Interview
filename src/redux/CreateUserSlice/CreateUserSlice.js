import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

 const CreateUserSlice = createAsyncThunk(
  'Create-user-imformation',
  async ({UserData,token}) => {
    try {
          console.log(UserData,'this is userdata syntax')
      const response = await fetch('http://codetentacles-006-site36.htempurl.com/api/api/seller-create?name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: `${token.token}`,

        },
        body: JSON.stringify(UserData),
      });
      

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const user = await response.json();
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
export default CreateUserSlice
// export default authSlice.reducer;


