import { useEffect, useState } from "react";

const THEMES = ["sky", "mint", "dark"];
const KEY = "todo_theme";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(KEY) || 
           (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "sky");
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="bg-surface text-text border rounded-2xl px-3 py-2"
      aria-label="Theme"
    >
      {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
    </select>
  );
}
