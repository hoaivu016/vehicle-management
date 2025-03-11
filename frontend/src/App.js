// App.js - File này chỉ để chuyển hướng sang App.tsx
import React from 'react';
import AppComponent from './App.tsx';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { CssBaseline } from '@mui/material';

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