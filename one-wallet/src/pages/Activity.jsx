import { useMemo, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import BrandChip from "../components/BrandChip";
import transactions from "../data/transactions.json";

export default function Activity() {
  const { theme, brand } = useTheme();
  const [filter, setFilter] = useState("All");

  const themeTransactions = useMemo(
    () => transactions.filter((t) => t.theme === theme),
    [theme]
  );

  const filtered = useMemo(
    () =>
      filter === "All"
        ? themeTransactions
        : themeTransactions.filter((t) => t.brand === filter),
    [themeTransactions, filter]
  );

  const pills = ["All", ...brand.family];

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

      <div className="wallet-card">
        {filtered.length === 0 && <p>No activity for this brand yet.</p>}
        {filtered.map((t) => (
          <div className="activity-row" key={t.id}>
            <div className="activity-row-left">
              <BrandChip brand={t.brand} />
              <div className="activity-desc">{t.desc}</div>
              <div className="activity-date">{t.date}</div>
            </div>
            <div className="activity-row-right">
              <div className="activity-points">+{t.points} pts</div>
              <div className="activity-amount">${t.amount.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
