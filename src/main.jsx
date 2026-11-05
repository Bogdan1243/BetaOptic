import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { getViewFromLocation } from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');
const initialView = getViewFromLocation(window.location.pathname, window.location.hash);

const app = (
  <React.StrictMode>
    <App initialView={initialView} />
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
