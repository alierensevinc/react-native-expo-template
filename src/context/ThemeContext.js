import { createContext, useContext, useState } from "react";
import defaultTheme from "../theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children, initialTheme = defaultTheme }) => {
  const [theme, setTheme] = useState(initialTheme);

  // İleride tema değiştirme fonksiyonları (toggleTheme, setDarkMode vb.) buraya eklenebilir
  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context.theme;
};
