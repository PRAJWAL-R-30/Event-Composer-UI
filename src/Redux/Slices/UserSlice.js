import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
//import '../../env.development';

//const baseUrl = process.env.process.env.isLocal ? process.env.localUrl : process.env.serverUrl;
const baseUrl = process.env.REACT_APP_LOCAL_URL;
console.log(process.env);

const initialState = {
    user: null,
    userToken: sessionStorage.getItem('jwt'),
    isLoading: false,
    errorMsg: null
}

export const userRegister = createAsyncThunk(
    'user/register',
    async(user) => {
        try {
            const response = await axios.post(baseUrl + '/users/register', user);
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
            const response = await axios.post(baseUrl + '/users/login', credentials);
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

export const getUserDetails = createAsyncThunk(
    'user/details',
    async(_, {getState}) => {
        try {
            const {userToken} = getState().user;
            const response = await axios.get(baseUrl + '/users/user', {
                headers: {
                    Authorization: `Bearer ${userToken}` // Attach the userToken as the Authorization header
                }
            });
            return response.data;
        }
        catch(error) {
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
            state.userToken = action.payload.token;
            state.isLoading = false;
            state.errorMsg = null;
            sessionStorage.setItem('jwt', action.payload.token)
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMsg = action.error.message;
            console.log(action.error);
        });

        //Get User Details
        builder.addCase(getUserDetails.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.errorMsg = null;
        });
        builder.addCase(getUserDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMsg = action.error.message;
            console.log(action.error);
        });
    }
});

export default userSlice.reducer;