import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorBoundary from 'src/copmonents/ErrorBoundary/ErrorBoundary';
import {Router} from './copmonents/Router/Router';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
