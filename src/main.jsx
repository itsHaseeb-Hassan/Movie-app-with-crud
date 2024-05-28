import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ActiveGenreContextProvider } from './context/ActiveGenreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ActiveGenreContextProvider>
    <App />
    </ActiveGenreContextProvider>
  </React.StrictMode>,
)
