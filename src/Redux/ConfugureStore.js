import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './Slices/EventsSlice';
import userReducer from './Slices/UserSlice';

export const store = configureStore({
    reducer: {
        events: eventsReducer,
        user: userReducer
    }
}); 