import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type ThemeProviderProps = {
  defaultTheme: string;
  storageKey: string;
  children: ReactNode;
};

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ defaultTheme, storageKey, children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem(storageKey);
    return storedTheme || defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, theme);
    document.documentElement.className = theme;
  }, [theme, storageKey]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}