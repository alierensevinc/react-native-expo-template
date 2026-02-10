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

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
