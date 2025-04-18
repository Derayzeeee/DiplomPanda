import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A4A4A', // Main brand color
      light: '#7C7C7C',
      dark: '#2C2C2C',
    },
    secondary: {
      main: '#F5F5F5', // Light beige color
      light: '#FFFFFF',
      dark: '#E0E0E0',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Lato',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          padding: '8px 24px',
        },
      },
    },
  },
});

export default theme;