import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";



axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
    // utility to add JWT
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    // Utility to remove JWT
    unset() {
        axios.defaults.headers.common.Authorization = '';
    },
};

// const setAuthHeader = token => {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//     axios.defaults.headers.common['Authorization'] = '';
// }



export const signUpUser = createAsyncThunk('auth/signup', async (data) => {
    try {
        const response = await axios.post('/users/signup', data);
        console.log('signup', response.data.token);
        token.set(response.data.token)
        return response.data;
    } catch (err) {
        // console.log(err)
       return err.message;
    }
});

export const loginUser = createAsyncThunk('auth/login', async (data) => {
    try {
        const response = await axios.post('/users/login', data);
        console.log('login', response.data.token);
        return response.data;
    } catch (err) {
        return err.message;
    }
});

export const logOutUser = createAsyncThunk('auth/logout', async () => {
    try {
        await axios.post('/users/logout');
        token.unset();
    } catch (err) {
        // console.log(err)
        return err;
    }
});

export const fetchCurrentUser = createAsyncThunk('auth/current', async (_, thunkAPI) => {
    const state = thunkAPI.getState(); 
    const persistedToken = state.auth.token; 

    if(persistedToken === null) {
        console.log("No token from fetchCurrentUser");
        return thunkAPI.rejectWithValue("Unable to fech user");
    }
    token.set(persistedToken)
    try {
        const response = await axios.get('/users/current');
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});

