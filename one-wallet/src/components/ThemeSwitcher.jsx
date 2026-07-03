import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const LABELS = {
  key: "Key",
  kohls: "Kohl's",
  tmobile: "T-Mobile",
};

export default function ThemeSwitcher() {
  const { theme, setTheme, brands } = useTheme();
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
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
        <button className="about-link" onClick={() => setShowAbout(true)}>
          About
        </button>
      </div>

      {showAbout && (
        <div className="modal-overlay" onClick={() => setShowAbout(false)}>
          <div className="modal-box about-modal" onClick={(e) => e.stopPropagation()}>
            <h3>About this page</h3>
            <p>This is a prototype, not a live Capital One product. All data shown is mock.</p>
            <p>
              It's one wallet UI — one set of components — that reskins for different card
              partners (Williams-Sonoma family, Kohl's, T-Mobile) by swapping a config file, not
              by rebuilding the front end per brand.
            </p>
            <p>Built to demonstrate that approach for a Capital One Card Partnerships application.</p>
            <div className="modal-actions">
              <button className="modal-btn primary" onClick={() => setShowAbout(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
