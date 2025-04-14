import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import React from 'react';
import 'core-js/stable'; // Polyfills modern JS features for older browsers
import 'regenerator-runtime/runtime'; // Polyfills async/await functionality


createRoot(document.getElementById('root')).render(
 <BrowserRouter> <App />
 </BrowserRouter>
   

)
