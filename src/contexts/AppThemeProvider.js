import React, { ReactElement } from 'react';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import { useThemeContext } from '../contexts/drawer/ThemeContextProvider'



/**
 *  AppThemeProvider is a wrapper component that provides the theme to the entire application.
 */
const AppThemeProvider = (props) => {
  const { theme } = useThemeContext();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(theme)}>{props.children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AppThemeProvider;
