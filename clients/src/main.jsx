import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { Toaster } from './components/ui/sonner'
// import {Navbar} from './components/ui/Navbar'


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <App />
      {/* <Navbar /> */}
      <Toaster />
    </Provider>
  </StrictMode>
)
