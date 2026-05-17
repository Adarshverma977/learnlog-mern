import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getDashboardStatsAPI,
} from "./dashboardAPI";


export const getDashboardStats =
  createAsyncThunk(
    "dashboard/getDashboardStats",

    async (_, thunkAPI) => {

      try {

        const data =
          await getDashboardStatsAPI();

        return data.stats;

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data?.message
        );

      }

    }
  );


const initialState = {
  stats: null,
  loading: false,
};


const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        getDashboardStats.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        getDashboardStats.fulfilled,
        (state, action) => {

          state.loading = false;

          state.stats = action.payload;

        }
      )

      .addCase(
        getDashboardStats.rejected,
        (state) => {

          state.loading = false;

        }
      );

  },
});

export default dashboardSlice.reducer;