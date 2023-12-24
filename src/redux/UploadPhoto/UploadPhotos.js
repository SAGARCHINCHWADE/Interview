import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const UploadPhotos = createAsyncThunk("UploadPhoto", async (image) => {
  console.log(image,'this is image at upload photo slice')
  try {
    const formData = new FormData();
    formData.append("image", image);
    console.log(formData, "formData at uploadPhotl slice");
    const response = await fetch(
      "http://codetentacles-006-site36.htempurl.com/api/api/upload-image",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("image not upload");
    }
    const imageUrls = await response.json();
    console.log("image url is obtain ", imageUrls.imagePath
    );
    return  imageUrls.imagePath;
  } catch (error) {
    throw new Error("something isworng");
  }
});

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
// export default authSlice.reducer;
