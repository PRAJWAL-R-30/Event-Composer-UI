import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
//import '../../env.development';

//const baseUrl = process.env.process.env.isLocal ? process.env.localUrl : process.env.serverUrl;
const baseUrl = process.env.REACT_APP_ENV_NAME === "local" ? process.env.REACT_APP_LOCAL_URL : process.env.REACT_APP_SERVER_URL;

const initialState = {
    events: [],
    isLoading: false
}

export const fetchEvents = createAsyncThunk(
    'events/getEvents', 
    async (_, { getState }) => {
        const {userToken} = getState().user; 
        const response = await axios.get(baseUrl + '/events', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        console.log(response.data);
        return response.data;
    }
);  

export const addNewEvent = createAsyncThunk(
    'events/addNewEvent',
    async (event,{ getState }) => {
        const {userToken} = getState().user;
        const response = await axios.post(baseUrl + '/events/AddEvent', event, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        return response.data;
    }
)   

export const deleteAll = createAsyncThunk(
    'events/deleteAll',
    async () => {
        const response = await axios.delete(baseUrl + '/events');
        return response.data;
    }

)

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        //Fetch Events
        builder.addCase(fetchEvents.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchEvents.fulfilled, (state, action) => {
            state.events = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchEvents.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.error);
        });

        //Add new event
        builder.addCase(addNewEvent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addNewEvent.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(addNewEvent.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.error);
        });

        // Delete All events 
        builder.addCase(deleteAll.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteAll.fulfilled, (state, action) => {
            state.isLoading = false;
            state.events = [];
        });
        builder.addCase(deleteAll.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.error);
        });
    }
})

export const getAllEvents = state => state.events;

export default eventsSlice.reducer;