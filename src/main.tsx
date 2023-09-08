import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';


import { ThemeProvider } from "@material-tailwind/react";
import {BrowserRouter} from "react-router-dom";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>

    <ThemeProvider>
      <App />
    </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>,
);
