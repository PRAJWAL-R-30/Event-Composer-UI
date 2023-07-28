import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    events: [],
    isLoading: false
}

export const fetchEvents = createAsyncThunk(
    'events/getEvents', 
    async () => {
        const response = await axios.get('https://event-composer-be.onrender.com/events');
        console.log(response.data);
        return response.data;
    }
);  

export const addNewEvent = createAsyncThunk(
    'events/addNewEvent',
    async (event) => {
        const response = await axios.post('https://event-composer-be.onrender.com/events/AddEvent', event);
        return response.data;
    }
)

export const deleteAll = createAsyncThunk(
    'events/deleteAll',
    async () => {
        const response = await axios.delete('http://localhost:3001/events');
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