import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.blue[500]
    },
    secondary: {
      main: colors.indigo[500]
    },
    error: {
      main: colors.red[500]
    },
    text: {
      primary: 'rgba(0,0,0,1)',
      secondary: 'rgba(0,0,0,1)'
    }
  },
  shadows,
  typography
});

export default theme;
