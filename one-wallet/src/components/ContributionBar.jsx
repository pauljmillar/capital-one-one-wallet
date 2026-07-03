import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "../context/ThemeContext";

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function tint(hex, amount) {
  const { r, g, b } = hexToRgb(hex);
  const nr = Math.round(r + (255 - r) * (1 - amount));
  const ng = Math.round(g + (255 - g) * (1 - amount));
  const nb = Math.round(b + (255 - b) * (1 - amount));
  return `rgb(${nr}, ${ng}, ${nb})`;
}

export default function ContributionBar({ contribution }) {
  const { theme } = useTheme();
  const [primaryHex, setPrimaryHex] = useState("#34472f");

  useEffect(() => {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--theme-primary")
      .trim();
    if (raw.startsWith("#")) setPrimaryHex(raw);
  }, [theme]);

  const amounts = [1, 0.8, 0.6, 0.45, 0.3];
  const row = { name: "contribution" };
  contribution.forEach((c, i) => {
    row[c.brand] = Math.round(c.pct * 100);
  });

  return (
    <div>
      <ResponsiveContainer width="100%" height={36}>
        <BarChart layout="vertical" data={[row]} stackOffset="expand" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip formatter={(v) => `${v}%`} />
          {contribution.map((c, i) => (
            <Bar
              key={c.brand}
              dataKey={c.brand}
              stackId="a"
              fill={tint(primaryHex, amounts[i % amounts.length])}
              radius={0}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <div className="contribution-legend">
        {contribution.map((c, i) => (
          <div className="contribution-legend-item" key={c.brand}>
            <span
              className="contribution-swatch"
              style={{ background: tint(primaryHex, amounts[i % amounts.length]) }}
            />
            {c.brand} · {Math.round(c.pct * 100)}%
          </div>
        ))}
      </div>
    </div>
  );
}
