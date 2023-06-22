import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './context/ThemeContext';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={5000}
          />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
