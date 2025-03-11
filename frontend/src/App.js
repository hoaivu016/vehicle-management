// App.js - File này chỉ để chuyển hướng sang App.tsx
import React from 'react';
import AppComponent from './App.tsx';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

// Wrapper component với theme
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppComponent />
    </ThemeProvider>
  );
};

export default App; 