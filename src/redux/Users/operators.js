import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
    // utility to add JWT
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    // Utility to remove JWT
    unset() {
        axios.defaults.headers.common.Authorization = ``;
    },
};


export const signUpUser = createAsyncThunk('user/signup', async (data) => {
    try {
        const response = await axios.post('/users/signup', data);
        token.set(response.data.token)
        return response.data;
    } catch (err) {
        // console.log(err)
        return err;
    }
});

export const logOutUser = createAsyncThunk('user/logout', async () => {
    try {
        await axios.post('/users/logout');
        token.unset();
    } catch (err) {
        // console.log(err)
        return err;
    }
})