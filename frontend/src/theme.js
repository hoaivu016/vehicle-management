import { createTheme } from '@mui/material/styles';

// Định nghĩa theme theo DesignSystem.md
const theme = createTheme({
  palette: {
    primary: {
      main: '#0F4C81', // primary color
      light: 'rgba(15, 76, 129, 0.1)', // primary-light
      dark: '#0A2F51', // primary-active
      hover: '#0D3D68', // primary-hover
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4CA', // secondary color
      light: 'rgba(76, 204, 170, 0.1)', // secondary-light
      dark: '#2E8876', // secondary-active
      hover: '#3A9988', // secondary-hover
      contrastText: '#ffffff',
    },
    background: {
      default: '#FFFFFF', // background
      paper: '#FFFFFF', // background-card
      alt: '#F8F9FA', // background-alt
    },
    text: {
      primary: '#212529', // text
      secondary: '#6C757D', // text-muted
      disabled: '#ADB5BD', // text-light
    },
    success: {
      main: '#28A745', // success-color
      light: 'rgba(40, 167, 69, 0.1)', // success-light
    },
    warning: {
      main: '#FFA500', // warning-color
      light: 'rgba(255, 165, 0, 0.1)', // warning-light
    },
    error: {
      main: '#DC3545', // danger-color
      light: 'rgba(220, 53, 69, 0.1)', // danger-light
    },
    info: {
      main: '#17A2B8', // info-color
      light: 'rgba(23, 162, 184, 0.1)', // info-light
    },
    divider: '#DEE2E6', // border-color
    // Màu trạng thái xe
    vehicleStatus: {
      inStock: {
        background: 'rgba(76, 175, 80, 0.1)',
        text: '#2E7D32',
        border: 'rgba(76, 175, 80, 0.2)'
      },
      deposit: {
        background: 'rgba(255, 152, 0, 0.1)',
        text: '#E67E22',
        border: 'rgba(255, 152, 0, 0.2)'
      },
      bankDeposit: {
        background: 'rgba(33, 150, 243, 0.1)',
        text: '#1976D2',
        border: 'rgba(33, 150, 243, 0.2)'
      },
      offset: {
        background: 'rgba(156, 39, 176, 0.1)',
        text: '#8E44AD',
        border: 'rgba(156, 39, 176, 0.2)'
      },
      sold: {
        background: 'rgba(0, 150, 136, 0.1)',
        text: '#00796B',
        border: 'rgba(0, 150, 136, 0.2)'
      }
    }
  },
  typography: {
    fontFamily: "'Mulish', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontSize: 16, // base font size (1rem)
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: '2rem', // 32px
      fontWeight: 700,
      lineHeight: 1.25, // --line-height-tight
      letterSpacing: '-0.5px',
    },
    h2: {
      fontSize: '1.75rem', // 28px
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.4px',
    },
    h3: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '-0.3px',
    },
    h4: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '-0.2px',
    },
    h5: {
      fontSize: '1rem', // 16px
      fontWeight: 600,
      lineHeight: 1.5, // --line-height-normal
    },
    body1: {
      fontSize: '1rem', // 16px
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem', // 12px
      lineHeight: 1.5,
      color: '#6C757D', // text-muted
    },
    button: {
      fontSize: '0.875rem', // 14px
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8, // --radius
  },
  spacing: (factor) => `${8 * factor}px`, // Base spacing unit 8px
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.1)', // --shadow-sm
    '0 2px 6px rgba(0,0,0,0.08)', // --shadow
    '0 4px 12px rgba(0,0,0,0.12)', // --shadow-lg
    '0 8px 24px rgba(0,0,0,0.18)',
    // ... rest of shadows
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Global CSS
        ':root': {
          '--primary-color': '#0F4C81',
          '--primary-hover': '#0D3D68',
          '--primary-active': '#0A2F51',
          '--primary-light': 'rgba(15, 76, 129, 0.1)',
          
          '--secondary-color': '#4CA',
          '--secondary-hover': '#3A9988',
          '--secondary-active': '#2E8876',
          '--secondary-light': 'rgba(76, 204, 170, 0.1)',
          
          '--background': '#FFFFFF',
          '--background-alt': '#F8F9FA',
          
          '--text-color': '#212529',
          '--text-muted': '#6C757D',
          '--text-light': '#ADB5BD',
          
          '--success-color': '#28A745',
          '--success-light': 'rgba(40, 167, 69, 0.1)',
          '--warning-color': '#FFA500',
          '--warning-light': 'rgba(255, 165, 0, 0.1)',
          '--danger-color': '#DC3545',
          '--danger-light': 'rgba(220, 53, 69, 0.1)',
          '--info-color': '#17A2B8',
          '--info-light': 'rgba(23, 162, 184, 0.1)',
          
          '--border-color': '#DEE2E6',
          '--border-color-dark': '#CED4DA',
          '--border-focus': '#80BDFF',
          
          '--spacing-xs': '4px',
          '--spacing-sm': '8px',
          '--spacing-md': '16px',
          '--spacing-lg': '24px',
          '--spacing-xl': '32px',
          
          '--radius-sm': '4px',
          '--radius': '8px',
          '--radius-lg': '12px',
          '--radius-pill': '9999px',
          
          '--shadow-sm': '0 1px 3px rgba(0,0,0,0.1)',
          '--shadow': '0 2px 6px rgba(0,0,0,0.08)',
          '--shadow-lg': '0 4px 12px rgba(0,0,0,0.12)',
          '--shadow-inner': 'inset 0 2px 4px rgba(0,0,0,0.05)',
          '--shadow-focus': '0 0 0 3px rgba(15, 76, 129, 0.15)',
          
          '--transition': 'all 0.2s ease',
          '--transition-bounce': 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          
          '--icon-size-sm': '16px',
          '--icon-size-md': '20px',
          '--icon-size-lg': '24px',
        },
        body: {
          backgroundColor: '#F8F9FA', // background-alt
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px', // --radius-sm
          padding: '10px 18px',
          height: '40px',
          fontSize: '0.875rem',
          fontWeight: 600, // --font-weight-semibold
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s ease', // --transition
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // --shadow-sm
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&:focus': {
            boxShadow: '0 0 0 3px rgba(15, 76, 129, 0.15)', // --shadow-focus
          },
          '&.Mui-disabled': {
            opacity: 0.6,
          },
        },
        contained: {
          backgroundColor: '#0F4C81', // --primary-color
          color: '#FFFFFF', // --text-white
          '&:hover': {
            backgroundColor: '#0D3D68', // --primary-hover
          },
          '&:active': {
            backgroundColor: '#0A2F51', // --primary-active
          },
        },
        outlined: {
          backgroundColor: 'transparent',
          color: '#0F4C81', // --primary-color
          border: '1px solid #0F4C81', // --primary-color
          '&:hover': {
            backgroundColor: 'rgba(15, 76, 129, 0.1)', // --primary-light
          },
        },
        text: {
          backgroundColor: 'transparent',
          color: '#0F4C81', // --primary-color
          '&:hover': {
            backgroundColor: 'rgba(15, 76, 129, 0.1)', // --primary-light
          },
        },
        sizeSmall: {
          height: '32px',
          padding: '6px 12px',
          fontSize: '0.75rem', // --font-size-xs
        },
        sizeLarge: {
          height: '48px',
          padding: '12px 24px',
          fontSize: '1rem', // --font-size-md
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          color: '#6C757D', // --text-muted
          borderRadius: '4px', // --radius-sm
          width: '36px',
          height: '36px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease', // --transition
          '&:hover': {
            backgroundColor: '#F8F9FA', // --background-alt
            color: '#212529', // --text-color
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
          '&:focus': {
            boxShadow: '0 0 0 3px rgba(15, 76, 129, 0.15)', // --shadow-focus
          },
          '&.Mui-disabled': {
            opacity: 0.6,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // --background
          height: '40px',
          fontSize: '0.875rem', // --font-size-sm
          transition: 'all 0.2s ease', // --transition
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#CED4DA', // --border-color-dark
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#80BDFF', // --border-focus
            boxShadow: '0 0 0 3px rgba(15, 76, 129, 0.15)', // --shadow-focus
          },
          '&.Mui-disabled': {
            backgroundColor: '#F8F9FA', // --background-alt
            color: '#6C757D', // --text-muted
          },
        },
        input: {
          padding: '10px 12px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '4px', // --radius-sm
        },
        notchedOutline: {
          borderColor: '#CED4DA', // --border-color-dark
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: '1px solid #DEE2E6', // --border-color
          borderRadius: '8px', // --radius
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // --shadow-sm
          backgroundColor: '#FFFFFF', // --background
          overflow: 'hidden',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#F8F9FA', // --background-alt
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#0F4C81', // --primary-color
          fontWeight: 600, // --font-weight-semibold
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontSize: '0.875rem', // --font-size-sm
          padding: '14px 16px',
          borderBottom: '1px solid #DEE2E6', // --border-color
          position: 'sticky',
          top: 0,
          zIndex: 10,
        },
        body: {
          padding: '12px 16px',
          verticalAlign: 'middle',
          color: '#212529', // --text-color
          fontSize: '1rem', // --font-size-md
          lineHeight: 1.5, // --line-height-normal
          borderBottom: '1px solid #DEE2E6', // --border-color
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #DEE2E6', // --border-color
          '&:hover': {
            backgroundColor: '#F8F9FA', // --background-alt
          },
          transition: 'all 0.2s ease', // --transition
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontWeight: 500,
          minWidth: '70px',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          transition: 'all 0.2s ease', // --transition
          border: '1px solid',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // --background
          border: '1px solid #DEE2E6', // --border-color
          borderRadius: '8px', // --radius
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // --shadow-sm
          padding: '24px',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #DEE2E6', // --border-color
          paddingBottom: '16px',
          marginBottom: '16px',
          padding: '0 0 16px 0',
        },
        title: {
          fontSize: '1.25rem', // --font-size-lg
          fontWeight: 700, // --font-weight-bold
          color: '#212529', // --text-color
          letterSpacing: '-0.3px',
          lineHeight: 1.3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 500,
          padding: '12px 16px',
          borderRadius: '8px 8px 0 0',
          minHeight: '48px',
          '&.Mui-selected': {
            fontWeight: 700,
            borderBottom: '3px solid',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '4px', // --radius-sm
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        },
        standardSuccess: {
          backgroundColor: 'rgba(40, 167, 69, 0.1)', // --success-light
          borderLeft: '4px solid #28A745', // --success-color
          color: '#28A745', // --success-color
        },
        standardWarning: {
          backgroundColor: 'rgba(255, 165, 0, 0.1)', // --warning-light
          borderLeft: '4px solid #FFA500', // --warning-color
          color: '#FFA500', // --warning-color
        },
        standardError: {
          backgroundColor: 'rgba(220, 53, 69, 0.1)', // --danger-light
          borderLeft: '4px solid #DC3545', // --danger-color
          color: '#DC3545', // --danger-color
        },
        standardInfo: {
          backgroundColor: 'rgba(23, 162, 184, 0.1)', // --info-light
          borderLeft: '4px solid #17A2B8', // --info-color
          color: '#17A2B8', // --info-color
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF', // --background
          borderRadius: '12px', // --radius-lg
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          maxWidth: '800px',
          margin: '16px auto',
          overflow: 'hidden',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // --background
          color: '#212529', // --text-color
          padding: '20px 24px',
          fontSize: '1.25rem', // --font-size-lg
          fontWeight: 700, // --font-weight-bold
          borderBottom: '1px solid #DEE2E6', // --border-color
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          letterSpacing: '-0.3px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          maxHeight: '70vh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF', // --background
          fontSize: '1rem', // --font-size-md
          color: '#212529', // --text-color
          lineHeight: 1.5, // --line-height-normal
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // --background
          padding: '20px 24px',
          borderTop: '1px solid #DEE2E6', // --border-color
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)', // --shadow
          backgroundColor: '#0F4C81', // --primary-color
        },
      },
    },
    // Breadcrumb 
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem', // --font-size-sm
          lineHeight: 1.5, // --line-height-normal
          color: '#6C757D', // --text-muted
        },
        li: {
          '& a': {
            color: '#6C757D', // --text-muted
            '&:hover': {
              textDecoration: 'underline',
            },
          },
          '&:last-child': {
            fontWeight: 600, // --font-weight-semibold
            color: '#212529', // --text-color
          },
        },
      },
    },
  },
});

export default theme; 