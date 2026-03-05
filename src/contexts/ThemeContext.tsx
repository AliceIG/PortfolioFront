import React, { createContext, useContext, useState, useEffect } from "react";
import type { Lang } from "@/constants/content";

type ColorTheme = "default" | "slate" | "forest";

interface ThemeContextType {
  dark: boolean;
  toggleDark: () => void;
  colorTheme: ColorTheme;
  setColorTheme: (t: ColorTheme) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  dark: true,
  toggleDark: () => {},
  colorTheme: "default",
  setColorTheme: () => {},
  lang: "fr",
  setLang: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dark, setDark] = useState(true);
  const [colorTheme, setColorTheme] = useState<ColorTheme>("default");
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.classList.remove("theme-slate", "theme-forest");
    if (colorTheme !== "default") {
      root.classList.add(`theme-${colorTheme}`);
    }
  }, [dark, colorTheme]);

  return (
    <ThemeContext.Provider
      value={{ dark, toggleDark: () => setDark((d) => !d), colorTheme, setColorTheme, lang, setLang }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
