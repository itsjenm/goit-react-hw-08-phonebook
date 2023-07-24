import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUser, logOutUser, loginUser, signUpUser } from './operators';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  loading: false,
};



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(signUpUser.pending, (state, action) => {
            // You can update the state here, for example, set a loading state if needed
            state.loading = true;
          }).addCase(signUpUser.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
            console.log(action.payload);
            // console.log(state.isLoggedIn);
            
        }).addCase(signUpUser.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.error = action.payload;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        }).addCase(loginUser.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoggedIn = false;
            
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
   
        })
        .addCase(logOutUser.fulfilled, (state, action) => {
            state.user = { name: null, email: null };
            state.isLoggedIn = false;
            state.token = null;
        })
    }
});

export default authSlice.reducer;
