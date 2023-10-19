import { Theme } from '@mui/material'

// export const bgMainLight = '#5f97b1ff'
export const bgMainLight: string = '#005eb7'
// export const bgMainLight = '#09f'

export const light: Theme = {
  palette: {
    type: 'light',
    primary: {
      //main: '#6375b3'
      main: bgMainLight,
      light: '#6573C3',
      dark: '#2C387E',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
      light: '#f73378',
      dark: '##AB003C',
      contrastText: '#fff',
    },
    background: {
      default: '#ebede4',
      paper: '#ffffff',
      tablehover: '#e0e0e0',
    },
    appbarcolor: {
      main: '#9dabda',
    },
    appbarcolor2: {
      main: '#ffffff',
    },
    appbartextcolor: {
      main: '#ffffff',
    },
    appbartextcolor2: {
      main: 'black',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: bgMainLight,
          color: 'white',
          borderRadius: '10px',
          margin: '10px',
          height: '90vh',
          borderRight: 0,
          borderLeft: `20px solid ${bgMainLight}}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          left: '10px',
          right: '20px',
          top: '10px',
          width: 'auto',
        },
        paper: {
          background: bgMainLight,
          color: 'white',
          borderRadius: '10px',
          margin: '10px',
          height: '90vh',
        },
      },
    },
  },
}

export const bgPaperDark = '#3d3f48ff'

export const dark: Theme = {
  palette: {
    mode: 'dark',
    primary: {
      // main: '#c9c9f0'
      main: bgPaperDark,
    },
    secondary: {
      main: '#5f97b1ff',
    },
    success: {
      main: '#4b6d4cff',
    },
    info: {
      main: '#5f5f8dff',
    },
    background: {
      default: '#24262bff',
      paper: bgPaperDark,
      tablehover: '#757575',
    },
    appbarcolor: {
      main: '#807a7a',
    },
    appbarcolor2: {
      main: '#464851',
    },
    appbartextcolor: {
      main: '#f0eeee',
    },
    appbartextcolor2: {
      main: '#ffffff',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        root: {
          border: 0,
        },
        paper: {
          background: bgPaperDark,
          color: 'white',
          borderRadius: '10px',
          margin: '10px',
          height: '90vh',
          borderRight: 0,
          borderLeft: `20px solid ${bgPaperDark}`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          left: '10px',
          right: '20px',
          top: '10px',
          width: 'auto',
        },
        paper: {
          background: bgPaperDark,
          color: 'white',
          borderRadius: '10px',
          margin: '10px',
          height: '90vh',
        },
      },
    },
  },
}
