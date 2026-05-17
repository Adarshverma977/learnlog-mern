import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import toast from "react-hot-toast";

import {
  createEntryAPI,
  getAllEntriesAPI,
  deleteEntryAPI,
} from "./journalAPI";


// CREATE ENTRY
export const createEntry = createAsyncThunk(
  "journal/createEntry",

  async (formData, thunkAPI) => {

    try {

      const data = await createEntryAPI(formData);

      toast.success(data.message);

      return data.entry;

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


// GET ALL ENTRIES
export const getAllEntries = createAsyncThunk(
  "journal/getAllEntries",

  async (
    { search = "", difficulty = "" },
    thunkAPI
  ) => {

    try {

      const data = await getAllEntriesAPI(
        search,
        difficulty
      );

      return data.entries;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );

    }

  }
);


// DELETE ENTRY
export const deleteEntry = createAsyncThunk(
  "journal/deleteEntry",

  async (id, thunkAPI) => {

    try {

      await deleteEntryAPI(id);

      toast.success("Entry deleted");

      return id;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );

    }

  }
);


const initialState = {
  entries: [],
  loading: false,
};


const journalSlice = createSlice({
  name: "journal",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      // CREATE
      .addCase(createEntry.pending, (state) => {
        state.loading = true;
      })

      .addCase(createEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.entries.unshift(action.payload);
      })

      .addCase(createEntry.rejected, (state) => {
        state.loading = false;
      })


      // GET ALL
      .addCase(getAllEntries.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })

      .addCase(getAllEntries.rejected, (state) => {
        state.loading = false;
      })


      // DELETE
      .addCase(deleteEntry.fulfilled, (state, action) => {

        state.entries = state.entries.filter(
          (entry) => entry._id !== action.payload
        );

      });

  },
});

export default journalSlice.reducer;