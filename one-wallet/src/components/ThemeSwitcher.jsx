import { useTheme } from "../context/ThemeContext";

const LABELS = {
  key: "Key",
  kohls: "Kohl's",
  tmobile: "T-Mobile",
};

export default function ThemeSwitcher() {
  const { theme, setTheme, brands } = useTheme();

  return (
    <div className="theme-switcher">
      <label htmlFor="preview-partner">Preview partner</label>
      <select
        id="preview-partner"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        {Object.keys(brands).map((key) => (
          <option key={key} value={key}>
            {LABELS[key] ?? key}
          </option>
        ))}
      </select>
    </div>
  );
}
