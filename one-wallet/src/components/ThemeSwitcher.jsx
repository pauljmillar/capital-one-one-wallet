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
              Capital One shipped three co-brand card launches in under a year: T-Mobile, Kohl's,
              and the Williams-Sonoma family. Each needed a cardholder-facing wallet. Built
              separately, that's N codebases to maintain per partner.
            </p>
            <p>
              This shell is the alternative: one component tree, one CSS token system. Partner
              identity — name, colors, fonts, copy, data — lives in a config file and a{" "}
              <code>data-theme</code> attribute. Adding a partner means adding a config file, not a
              new build.
            </p>
            <p>Built for a Capital One Card Partnerships application.</p>
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
