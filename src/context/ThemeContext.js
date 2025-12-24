import { createContext, useContext, useState, useMemo } from 'react';

import { lightTheme, darkTheme } from '../theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const theme = isDark ? darkTheme : lightTheme;

  const value = useMemo(
    () => ({
      theme,
      isDark,
      toggleTheme,
      colors: theme.colors,
      spacing: theme.spacing,
      typography: theme.typography,
      setTheme: () => {},
    }),
    [theme, isDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
// Correction: I should import lightTheme and darkTheme named exports or just use the logic I defined in index.js
// Let's re-verify the export from index.js.
// I exported lightTheme and darkTheme as named exports, and defaultTheme as lightTheme.
// I will fix imports in next line.

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
