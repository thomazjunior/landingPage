import React, { createContext, useContext, useEffect, useState } from 'react';
import defaultConfig, {
  backgroundDark,
  backgroundLight,
  defaultTheme,
  textDark,
  textLight,
} from '../../contexts/drawer/defaultConfig';
import PropTypes from 'prop-types';





export const ThemeContext = createContext<ThemeData>({
  theme: defaultTheme.theme,
  themeMode: defaultConfig.themeMode,
  themeStyle: defaultConfig.themeStyle,
  darkMode: true,
});

const ThemeActionsContext = createContext<ThemeActions>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateTheme: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateThemeMode: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateThemeStyle: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateDarkMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const useThemeActionsContext = () => useContext(ThemeActionsContext);

/**
 * ThemeContextProvider Component
 * Provides the ThemeContext and ThemeActionsContext
 */

const ThemeContextProvider = ({ children }) => {
  const [theme, updateTheme] = useState<any>(defaultTheme.theme);
  const [themeMode, updateThemeMode] = useState<string>(
    defaultConfig.themeMode
  );
  const [themeStyle, updateThemeStyle] = useState<string>(
    defaultConfig.themeStyle
  );

  const [darkMode, updateDarkMode] = useState(true);

  useEffect(() => {
    updateTheme({
      ...theme,
      palette: {
        ...theme.palette,
        mode: themeMode === ThemeMode.DARK ? ThemeMode.DARK : ThemeMode.LIGHT,
        background:
          themeMode === ThemeMode.DARK ? backgroundDark : backgroundLight,
        text: themeMode === ThemeMode.DARK ? textDark : textLight,
      },
    });
  }, [themeMode]);

  useEffect(() => {
    if (theme.direction === LayoutDirection.RTL) {
      document.body.setAttribute('dir', LayoutDirection.RTL);
    } else {
      document.body.setAttribute('dir', LayoutDirection.LTR);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeStyle,
        themeMode,
        darkMode,
      }}
    >
      <ThemeActionsContext.Provider
        value={{
          updateTheme,
          updateThemeStyle,
          updateThemeMode,
          updateDarkMode,
        }}
      >
        {children}
      </ThemeActionsContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
