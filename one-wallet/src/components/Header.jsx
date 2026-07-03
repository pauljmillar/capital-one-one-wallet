import { useTheme } from "../context/ThemeContext";
import AnimatedNumber from "./AnimatedNumber";

export default function Header() {
  const { brand } = useTheme();

  return (
    <header className="wallet-header">
      <div className="wallet-header-top">
        <span className="wallet-brand-name">{brand.name}</span>
        <span className="c1-micro-badge">Powered by Capital One</span>
      </div>
      <div className="points-hero">
        <AnimatedNumber value={brand.pointsBalance} /> pts
      </div>
      <p className="wallet-tagline">{brand.tagline}</p>
    </header>
  );
}
