import './index.css'
import App from './App.jsx'
// import { store , persistor } from './app/store.js'
import { Provider } from 'react-redux'

import React, { Children } from "react";
import ReactDOM from "react-dom/client";


import { PersistGate } from "redux-persist/integration/react";
// import { useLoadUserQuery } from './feachers/api/authApi';
import Loader from './components/Loader';
import { store } from './app/store';
import { Toaster } from 'sonner';

// const Custom = ({ children }) => {
//   const { isLoading } = useLoadUserQuery();
//   return <>{ isLoading ? <Loader /> : <>{children}</> }</>;
// };

// const { isLoading, data } = useLoadUserQuery();

//  if (isLoading){
//  return <Loader />;
//  }  

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      {/* <Custom> */}
      <App/>

      {/* </Custom> */}
    {/* </PersistGate> */}
  </Provider>
  </React.StrictMode>
);
