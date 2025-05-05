// import redux from 'redux';
import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    user: null,
    isAuthenticated: false,
    
}

    const authSlice = createSlice({
        name:"authSlice",
        initialState,
        reducers: {
            userLoggedIn:(state, action) =>{
                state.user = action.payload.user;
            },
            userLoggedOut:(state)=>{
                state.user = null;
                state.isAuthenticated = false;
            }
        }
    })