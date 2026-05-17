import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import toast from "react-hot-toast";

import {
  getProfileAPI,
  updateProfileAPI,
  changePasswordAPI,
  uploadPhotoAPI,
} from "./profileAPI";


// GET PROFILE
export const getProfile =
  createAsyncThunk(
    "profile/getProfile",

    async (_, thunkAPI) => {

      try {

        const data =
          await getProfileAPI();

        return data.user;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );

      }

    }
  );


// UPDATE PROFILE
export const updateProfile =
  createAsyncThunk(
    "profile/updateProfile",

    async (formData, thunkAPI) => {

      try {

        const data =
          await updateProfileAPI(
            formData
          );

        toast.success(data.message);

        return data.user;

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );

        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );

      }

    }
  );


// CHANGE PASSWORD
export const changePassword =
  createAsyncThunk(
    "profile/changePassword",

    async (formData, thunkAPI) => {

      try {

        const data =
          await changePasswordAPI(
            formData
          );

        toast.success(data.message);

        return data;

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );

        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );

      }

    }
  );


// UPLOAD PHOTO
export const uploadPhoto =
  createAsyncThunk(
    "profile/uploadPhoto",

    async (formData, thunkAPI) => {

      try {

        const data =
          await uploadPhotoAPI(
            formData
          );

        toast.success(data.message);

        return data.profilePhoto;

      } catch (error) {

        toast.error(
          error.response?.data?.message
        );

        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );

      }

    }
  );


const initialState = {
  profile: null,
  loading: false,
};


const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        getProfile.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        getProfile.fulfilled,
        (state, action) => {

          state.loading = false;

          state.profile = action.payload;

        }
      )

      .addCase(
        getProfile.rejected,
        (state) => {

          state.loading = false;

        }
      )


      .addCase(
        updateProfile.fulfilled,
        (state, action) => {

          state.profile = action.payload;

        }
      )


      .addCase(
        uploadPhoto.fulfilled,
        (state, action) => {

          state.profile.profilePhoto =
            action.payload;

        }
      );

  },
});

export default profileSlice.reducer;