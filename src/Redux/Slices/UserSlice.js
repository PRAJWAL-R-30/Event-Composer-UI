import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    user: null,
    isLoading: false,
    errorMsg: null
}

export const userRegister = createAsyncThunk(
    'user/register',
    async(user) => {
        try {
            const response = await axios.post('https://event-composer-be.onrender.com/users/register', user);
            return response.data; 
        } catch (error) {
            console.log(error);
            if (error.response) {
                if(error.response.data) {
                    error.message = error.response.data.error;
                }
              }
            throw error;
        }
                  
    }
)

export const userLogin = createAsyncThunk(
    'user/login',
    async(credentials) => {
        try {
            const response = await axios.post('https://event-composer-be.onrender.com/users/login', credentials);
            return response.data;
        } catch(error) {
            if (error.response) {
                if(error.response.data) {
                    error.message = error.response.data.error;
                }
            }
            throw error;
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        // Register User Reducer
        builder.addCase(userRegister.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false;
            state.errorMsg = null;
        });
        builder.addCase(userRegister.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMsg = action.error.message;
            console.log(action.error);
        });
        //Login User Reducer
        builder.addCase(userLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.user = action.payload
            state.isLoading = false;
            state.errorMsg = null;
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMsg = action.error.message;
            console.log(action.error);
        });
    }
});

export default userSlice.reducer;