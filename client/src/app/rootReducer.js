import { combineReducers } from "@reduxjs/toolkit"
import { authApi } from "../feachers/api/authApi";
import authReducer from "../feachers/authSlice";

const rootReducer = combineReducers({
[authApi.reducerPath]: authApi.reducer,
auth: authReducer,
})

export default rootReducer;