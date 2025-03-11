import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store';

// Import font Mulish
import '@fontsource/mulish/300.css'; // Light
import '@fontsource/mulish/400.css'; // Regular
import '@fontsource/mulish/500.css'; // Medium
import '@fontsource/mulish/600.css'; // SemiBold
import '@fontsource/mulish/700.css'; // Bold

// Tạo root element
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

// Render ứng dụng
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
); 