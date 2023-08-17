import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =
  process.env.REACT_APP_ENV_NAME === "local"
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_SERVER_URL;

const initialState = {
  eventDetails: null,
  isLoading: false,
  basicDetailsLoading: false,
  budgetLoading: false
};

export const fetchEventDetails = createAsyncThunk(
  "events/getEventDetails",
  async (id, { getState }) => {
    const { userToken } = getState().user;
    const response = await axios.get(baseUrl + `/events/${id}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    console.log(response.data);
    return response.data;
  }
);

export const updateBasicDetails = createAsyncThunk(
  "events/updateBasicDetails",
  async ({id, basicDetails}, { getState }) => {
    const { userToken } = getState().user;
    const response = await axios.put(baseUrl + `/events/basicDetail/${id}`, basicDetails, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return response.data;
  }
);

export const updateBudget = createAsyncThunk(
  "events/updateBudget",
  async ({id, budget}, { getState }) => {
    const { userToken } = getState().user;
    const response = await axios.put(baseUrl + `/events/totalBudget/${id}`, {totalBudget: budget}, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return response.data;
  }
)

const eventDetailsSlice = createSlice({
  name: "eventDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Fetch EventDetails
    builder.addCase(fetchEventDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEventDetails.fulfilled, (state, action) => {
      state.eventDetails = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchEventDetails.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
    });

    //update basic details
    builder.addCase(updateBasicDetails.pending, (state) => {
      state.basicDetailsLoading = true;
    });
    builder.addCase(updateBasicDetails.fulfilled, (state, action) => {
      state.basicDetailsLoading = false;
    });
    builder.addCase(updateBasicDetails.rejected, (state, action) => {
      state.basicDetailsLoading = false;
      console.log(action.error);
    });

    //Update Budget
    //update basic details
    builder.addCase(updateBudget.pending, (state) => {
      state.budgetLoading = true;
    });
    builder.addCase(updateBudget.fulfilled, (state, action) => {
      state.budgetLoading = false;
      state.eventDetails.totalBudget = action.payload.totalBudget;
    });
    builder.addCase(updateBudget.rejected, (state, action) => {
      state.budgetLoading = false;
      console.log(action.error);
    });
  },
});

export const getEventDetails = (state) => state.events;

export default eventDetailsSlice.reducer;
