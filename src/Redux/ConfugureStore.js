import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './Slices/EventsSlice';
import userReducer from './Slices/UserSlice';
import eventDetailsReducer from './Slices/EventDetailsSlice';

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        user: userReducer,
        eventDetails: eventDetailsReducer
    }
}); 