import React from 'react';
import { renderToString } from 'react-dom/server';
import App, { PAGE_TITLES } from './App.jsx';

export { PAGE_TITLES };

export function render(initialView = 'home') {
  return renderToString(
    <React.StrictMode>
      <App initialView={initialView} />
    </React.StrictMode>
  );
}
