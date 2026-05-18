import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import toast from "react-hot-toast";

import {
  registerAPI,
  loginAPI,
  getCurrentUserAPI,
  logoutAPI,
} from "./authAPI";


// REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (formData, thunkAPI) => {

    try {

      const data = await registerAPI(formData);

      toast.success(data.message);

      return null;

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


// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (formData, thunkAPI) => {

    try {

      const data = await loginAPI(formData);

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


// GET CURRENT USER
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",

  async (_, thunkAPI) => {

    try {

      const data = await getCurrentUserAPI();

      return data.user;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );

    }

  }
);


// LOGOUT
export const logout = createAsyncThunk(
  "auth/logout",

  async (_, thunkAPI) => {

    try {

      const data = await logoutAPI();

      toast.success(data.message);

      return true;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );

    }

  }
);


const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};


const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      })


      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        localStorage.setItem(
          "token",
          action.payload.token
        );
      })

      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      })


      // CURRENT USER
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })


      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });

  },
});

export default authSlice.reducer;