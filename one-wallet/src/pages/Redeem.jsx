import { useMemo, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import rewards from "../data/rewards.json";

export default function Redeem() {
  const { theme, brand } = useTheme();
  const [filter, setFilter] = useState("All brands");
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);

  const themeRewards = useMemo(
    () => rewards.filter((r) => r.theme === theme),
    [theme]
  );

  const filtered = useMemo(
    () =>
      filter === "All brands"
        ? themeRewards
        : themeRewards.filter((r) => r.brand === filter),
    [themeRewards, filter]
  );

  const pills = ["All brands", ...brand.family];

  function confirmRedeem() {
    setToast(`Redeemed ${selected.cost.toLocaleString()} pts for ${selected.title} at ${selected.brand}`);
    setSelected(null);
    setTimeout(() => setToast(null), 2600);
  }

  return (
    <>
      <div className="filter-pills">
        {pills.map((p) => (
          <button
            key={p}
            className={`filter-pill ${filter === p ? "active" : ""}`}
            onClick={() => setFilter(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="redeem-grid">
        {filtered.map((r) => (
          <button className="redeem-card" key={r.id} onClick={() => setSelected(r)}>
            <div className="redeem-card-title">{r.title}</div>
            <div>{r.brand}</div>
            <div className="redeem-card-cost">{r.cost.toLocaleString()} pts</div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <p>
              Redeem {selected.cost.toLocaleString()} pts for {selected.title} at{" "}
              {selected.brand}?
            </p>
            <div className="modal-actions">
              <button className="modal-btn" onClick={() => setSelected(null)}>
                Cancel
              </button>
              <button className="modal-btn primary" onClick={confirmRedeem}>
                Redeem
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
