import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<div className="app-loading">Loading…</div>}>
        <App />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
);
