import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =
  process.env.REACT_APP_ENV_NAME === "local"
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_SERVER_URL;

const initialState = {
  subEvents: [],
  isLoading: false,
  updateLoading: false
};

export const getAllSubEvents = createAsyncThunk(
  "subEvents/getAllSubEvens",
  async (eventId, { getState }) => {
    const { userToken } = getState().user;
    const response = await axios.get(baseUrl + `/subEvents/${eventId}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return response?.data ?? [];
  }
);

export const updateSubEvent = createAsyncThunk(
  "subEvents.updateSubEvent",
  async (subEvent, { getState }) => {
    const { userToken } = getState().user;
    const response = await axios.put(
      baseUrl + `/subEvents/${subEvent._id}`,
      subEvent,
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    return response?.data ?? [];
  }
);

const subEventsSlice = createSlice({
  name: "subEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get All SubEvents
    builder.addCase(getAllSubEvents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSubEvents.fulfilled, (state, action) => {
      state.subEvents = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAllSubEvents.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
    });

    //Update SubEvent
    builder.addCase(updateSubEvent.pending, (state) => {
        state.updateLoading = true;
      });
      builder.addCase(updateSubEvent.fulfilled, (state, action) => {
        state.updateLoading = false;
      });
      builder.addCase(updateSubEvent.rejected, (state, action) => {
        state.updateLoading = false;
      });
  },
});

export default subEventsSlice.reducer;
