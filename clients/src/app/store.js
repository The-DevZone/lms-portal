// import { authApi } from "../feachers/api/authApi"; // RTK Query
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../feachers/api/authApi';
import rootReducer from './rootReducer';


export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultmiddleware) => getDefaultmiddleware().concat(authApi.middleware),
});


const initializeApp = async () => {
    await store.dispatch(authApi.endpoints.loadUser.initiate({}, { forceRefetch: true }));
};

initializeApp()

// const initializeApp = async () => {
//     await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
// }
// initializeApp();


// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // localStorage use hota hai
// import { combineReducers } from "redux";

// import authReducer from "../feachers/authSlice.js"; // auth slice

// 👇 Persist Config
// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth"], // sirf 'auth' slice persist hoga
// };

// // 👇 Combine all reducers (agar aur bhi hain future mein)
// const rootReducer = combineReducers({
//   auth: authReducer,
//   [authApi.reducerPath]: authApi.reducer, // RTK Query ke liye
// });

// // 👇 Wrap root reducer in persistReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // 👇 Configure store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false, // redux-persist ke liye zaroori
//     }).concat(authApi.middleware),
// });

// // 👇 Persistor export karo
// export const persistor = persistStore(store);

// other way redux tool kit  other way

