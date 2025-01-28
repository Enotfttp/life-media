import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {ErrorBoundary} from 'src/modules';
import {Router} from './copmonents/Router/Router';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
