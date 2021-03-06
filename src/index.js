import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {CityContextProvider} from './store/CityContext';
import {ErrorAndLoadingContextProvider} from './store/ErrorAndLoadingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CityContextProvider>
    <ErrorAndLoadingContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorAndLoadingContextProvider>
  </CityContextProvider>,
);
