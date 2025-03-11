import { createTheme } from '@mui/material/styles';

// Khai báo các CSS variables theo DesignSystem
const designTokens = {
  // Colors
  primaryColor: '#0F4C81',
  primaryHover: '#0D3D68',
  primaryActive: '#0A2F51',
  primaryLight: 'rgba(15, 76, 129, 0.1)',
  
  secondaryColor: '#4CA',
  secondaryHover: '#3A9988',
  secondaryActive: '#2E8876',
  secondaryLight: 'rgba(76, 204, 170, 0.1)',
  
  background: '#FFFFFF',
  backgroundAlt: '#F8F9FA',
  
  textColor: '#212529',
  textMuted: '#6C757D',
  textLight: '#ADB5BD',
  textWhite: '#FFFFFF',
  
  successColor: '#28A745',
  successLight: 'rgba(40, 167, 69, 0.1)',
  warningColor: '#FFA500',
  warningLight: 'rgba(255, 165, 0, 0.1)',
  dangerColor: '#DC3545',
  dangerLight: 'rgba(220, 53, 69, 0.1)',
  infoColor: '#17A2B8',
  infoLight: 'rgba(23, 162, 184, 0.1)',
  
  borderColor: '#DEE2E6',
  borderColorDark: '#CED4DA',
  borderFocus: '#80BDFF',
  
  // Spacing
  spacingXs: '4px',
  spacingSm: '8px',
  spacingMd: '16px',
  spacingLg: '24px',
  spacingXl: '32px',
  
  // Border radius
  radiusSm: '4px',
  radius: '8px',
  radiusLg: '12px',
  radiusPill: '9999px',
  
  // Shadows
  shadowSm: '0 1px 3px rgba(0,0,0,0.1)',
  shadow: '0 2px 6px rgba(0,0,0,0.08)',
  shadowLg: '0 4px 12px rgba(0,0,0,0.12)',
  shadowInner: 'inset 0 2px 4px rgba(0,0,0,0.05)',
  shadowFocus: '0 0 0 3px rgba(15, 76, 129, 0.15)',
  
  // Typography
  fontFamily: "'Mulish', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  fontMono: "'Mulish', SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  
  fontSizeXs: '0.75rem',
  fontSizeSm: '0.875rem',
  fontSizeMd: '1rem',
  fontSizeLg: '1.25rem',
  fontSizeXl: '1.5rem',
  fontSize2xl: '1.75rem',
  fontSize3xl: '2rem',
  
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700,
  
  lineHeightTight: 1.25,
  lineHeightNormal: 1.5,
  lineHeightLoose: 1.75,
};

// Tạo theme dựa trên design tokens
const theme = createTheme({
  palette: {
    primary: {
      main: designTokens.primaryColor,
      light: designTokens.primaryLight,
      dark: designTokens.primaryActive,
      contrastText: designTokens.textWhite,
    },
    secondary: {
      main: designTokens.secondaryColor,
      light: designTokens.secondaryLight,
      dark: designTokens.secondaryActive,
      contrastText: designTokens.textWhite,
    },
    background: {
      default: designTokens.backgroundAlt,
      paper: designTokens.background,
    },
    text: {
      primary: designTokens.textColor,
      secondary: designTokens.textMuted,
      disabled: designTokens.textLight,
    },
    success: {
      main: designTokens.successColor,
      light: designTokens.successLight,
    },
    warning: {
      main: designTokens.warningColor,
      light: designTokens.warningLight,
    },
    error: {
      main: designTokens.dangerColor,
      light: designTokens.dangerLight,
    },
    info: {
      main: designTokens.infoColor,
      light: designTokens.infoLight,
    },
  },
  typography: {
    fontFamily: designTokens.fontFamily,
    fontSize: 16,
    fontWeightLight: designTokens.fontWeightRegular,
    fontWeightRegular: designTokens.fontWeightRegular,
    fontWeightMedium: designTokens.fontWeightMedium,
    fontWeightBold: designTokens.fontWeightBold,
    h1: {
      fontSize: designTokens.fontSize3xl,
      fontWeight: designTokens.fontWeightBold,
      lineHeight: designTokens.lineHeightTight,
      letterSpacing: '-0.3px',
    },
    h2: {
      fontSize: designTokens.fontSize2xl,
      fontWeight: designTokens.fontWeightBold,
      lineHeight: designTokens.lineHeightTight,
      letterSpacing: '-0.3px',
    },
    h3: {
      fontSize: designTokens.fontSizeXl,
      fontWeight: designTokens.fontWeightSemibold,
      lineHeight: designTokens.lineHeightTight,
      letterSpacing: '-0.3px',
    },
    h4: {
      fontSize: designTokens.fontSizeLg,
      fontWeight: designTokens.fontWeightSemibold,
      lineHeight: designTokens.lineHeightNormal,
    },
    h5: {
      fontSize: designTokens.fontSizeMd,
      fontWeight: designTokens.fontWeightSemibold,
      lineHeight: designTokens.lineHeightNormal,
    },
    body1: {
      fontSize: designTokens.fontSizeMd,
      lineHeight: designTokens.lineHeightNormal,
    },
    body2: {
      fontSize: designTokens.fontSizeSm,
      lineHeight: designTokens.lineHeightNormal,
    },
    button: {
      fontSize: designTokens.fontSizeSm,
      fontWeight: designTokens.fontWeightSemibold,
      lineHeight: designTokens.lineHeightNormal,
      textTransform: 'none',
    },
    caption: {
      fontSize: designTokens.fontSizeXs,
      lineHeight: designTokens.lineHeightNormal,
      color: designTokens.textMuted,
    },
  },
  shape: {
    borderRadius: parseInt(designTokens.radius),
  },
  spacing: (factor) => `${8 * factor}px`,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontFamily: designTokens.fontFamily,
        },
        body: {
          backgroundColor: designTokens.backgroundAlt,
          color: designTokens.textColor,
          lineHeight: designTokens.lineHeightNormal,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: designTokens.radiusSm,
          padding: '10px 18px',
          height: '40px',
          fontSize: designTokens.fontSizeSm,
          fontWeight: designTokens.fontWeightSemibold,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: designTokens.shadowSm,
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&.Mui-disabled': {
            opacity: 0.6,
          },
        },
        contained: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: designTokens.primaryColor,
          '&:hover': {
            backgroundColor: designTokens.primaryHover,
          },
          '&:active': {
            backgroundColor: designTokens.primaryActive,
          },
        },
        containedSecondary: {
          backgroundColor: designTokens.secondaryColor,
          '&:hover': {
            backgroundColor: designTokens.secondaryHover,
          },
          '&:active': {
            backgroundColor: designTokens.secondaryActive,
          },
        },
        outlinedPrimary: {
          borderColor: designTokens.primaryColor,
          color: designTokens.primaryColor,
          '&:hover': {
            backgroundColor: designTokens.primaryLight,
            borderColor: designTokens.primaryColor,
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'none',
          },
        },
        textPrimary: {
          color: designTokens.primaryColor,
          '&:hover': {
            backgroundColor: designTokens.primaryLight,
          },
        },
        sizeSmall: {
          height: '32px',
          padding: '6px 12px',
          fontSize: designTokens.fontSizeXs,
        },
        sizeLarge: {
          height: '48px',
          padding: '12px 24px',
          fontSize: designTokens.fontSizeMd,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: designTokens.primaryColor,
          boxShadow: designTokens.shadowSm,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${designTokens.borderColor}`,
        },
        indicator: {
          height: '3px',
          backgroundColor: designTokens.primaryColor,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: designTokens.fontSizeMd,
          fontWeight: designTokens.fontWeightMedium,
          padding: '12px 16px',
          '&.Mui-selected': {
            fontWeight: designTokens.fontWeightSemibold,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: designTokens.background,
          borderRadius: designTokens.radius,
          boxShadow: designTokens.shadowSm,
          border: `1px solid ${designTokens.borderColor}`,
        },
        elevation1: {
          boxShadow: designTokens.shadowSm,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${designTokens.borderColor}`,
          borderRadius: designTokens.radius,
          boxShadow: designTokens.shadowSm,
          padding: '24px',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${designTokens.borderColor}`,
          paddingBottom: '16px',
          marginBottom: '16px',
        },
        title: {
          fontSize: designTokens.fontSizeLg,
          fontWeight: designTokens.fontWeightBold,
          color: designTokens.textColor,
          letterSpacing: '-0.3px',
          lineHeight: 1.3,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          border: `1px solid ${designTokens.borderColor}`,
          borderRadius: designTokens.radius,
          boxShadow: designTokens.shadowSm,
          backgroundColor: designTokens.background,
          overflowX: 'auto',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: designTokens.backgroundAlt,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: designTokens.primaryColor,
          fontWeight: designTokens.fontWeightSemibold,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontSize: designTokens.fontSizeSm,
          padding: '14px 16px',
          borderBottom: `1px solid ${designTokens.borderColor}`,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        },
        body: {
          padding: '12px 16px',
          fontSize: designTokens.fontSizeMd,
          lineHeight: designTokens.lineHeightNormal,
          color: designTokens.textColor,
          borderBottom: `1px solid ${designTokens.borderColor}`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: designTokens.backgroundAlt,
          },
          '&:last-child td, &:last-child th': {
            borderBottom: 0,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontSize: '0.8rem',
          fontWeight: 500,
          padding: '0 4px',
          height: 'auto',
          minHeight: '24px',
        },
        label: {
          padding: '4px 8px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.radiusSm,
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        },
        standardSuccess: {
          backgroundColor: designTokens.successLight,
          borderLeft: `4px solid ${designTokens.successColor}`,
          color: designTokens.successColor,
        },
        standardWarning: {
          backgroundColor: designTokens.warningLight,
          borderLeft: `4px solid ${designTokens.warningColor}`,
          color: designTokens.warningColor,
        },
        standardError: {
          backgroundColor: designTokens.dangerLight,
          borderLeft: `4px solid ${designTokens.dangerColor}`,
          color: designTokens.dangerColor,
        },
        standardInfo: {
          backgroundColor: designTokens.infoLight,
          borderLeft: `4px solid ${designTokens.infoColor}`,
          color: designTokens.infoColor,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: designTokens.radiusLg,
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          overflow: 'hidden',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
          fontSize: designTokens.fontSizeLg,
          fontWeight: designTokens.fontWeightBold,
          borderBottom: `1px solid ${designTokens.borderColor}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          maxHeight: '70vh',
          overflowY: 'auto',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
          borderTop: `1px solid ${designTokens.borderColor}`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: designTokens.radiusSm,
            '& fieldset': {
              borderColor: designTokens.borderColorDark,
            },
            '&:hover fieldset': {
              borderColor: designTokens.borderColorDark,
            },
            '&.Mui-focused fieldset': {
              borderColor: designTokens.borderFocus,
              boxShadow: designTokens.shadowFocus,
            },
          },
          '& .MuiInputBase-input': {
            padding: '10px 12px',
            height: '20px',
            fontSize: designTokens.fontSizeSm,
          },
          '& .MuiInputLabel-root': {
            fontSize: designTokens.fontSizeSm,
            fontWeight: designTokens.fontWeightMedium,
          },
        },
      },
    },
  },
});

export default theme; 