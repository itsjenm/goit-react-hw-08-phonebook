import { createSlice } from '@reduxjs/toolkit';
import { logOutUser, signUpUser } from './operators';

const initialState = {
  auth: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signUpUser.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            // console.log(action.payload);
            // console.log(state.isLoggedIn);
            
        }).addCase(logOutUser.fulfilled, (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
        })
    }
});

export default authSlice.reducer;
