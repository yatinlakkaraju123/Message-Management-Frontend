
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

// 1. Import MUI's ThemeProvider and createTheme
import { ThemeProvider, createTheme } from '@mui/material/styles';

// 2. Create a custom theme that uses Poppins
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* 3. Wrap your entire app in ThemeProvider */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
