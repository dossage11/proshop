
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import  "./bootstrap.min.css"
import './index.css'
import { BrowserRouter } from 'react-router-dom'


import QueryProvider from './utils/queryClient.jsx'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById('root')).render(

 
  <BrowserRouter>
    <QueryProvider >
      <App />
            
    </QueryProvider>
  </BrowserRouter>,
)
