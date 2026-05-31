import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a4b7a',
      light: '#2563a8',
      dark: '#0f2d4a',
    },
    secondary: {
      main: '#c8953a',
      light: '#e8b85a',
    },
    success: {
      main: '#1a7a4b',
      light: '#d1fae5',
    },
    error: {
      main: '#b91c1c',
      light: '#fee2e2',
    },
    warning: {
      main: '#92400e',
      light: '#fef3c7',
    },
    background: {
      default: '#f4f7fb',
      paper: '#ffffff',
    },
  },

  typography: {
    fontFamily: [
      "'Source Sans 3'",
      "'Tajawal'",
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),

    h4: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "'Playfair Display', Georgia, serif",
      fontWeight: 700,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #d0dae8',
          boxShadow: '0 4px 16px rgba(15,45,74,0.12)',
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 16px rgba(15,45,74,0.12)',
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        InputLabelProps: { shrink: true },
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
          },
          '& .MuiOutlinedInput-notchedOutline legend': {
            maxWidth: '100% !important',
          },
        },
      },
    },

    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #ffffff inset',
            WebkitTextFillColor: '#0f172a',
            caretColor: '#0f172a',
            transition: 'background-color 600000s ease 0s, color 600000s ease 0s',
          },
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #0f2d4a 0%, #1a4b7a 100%)',
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: '99px',
          height: '6px',
        },
      },
    },
  },
});

export default theme;
