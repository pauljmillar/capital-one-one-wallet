import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/activity", label: "Activity" },
  { to: "/redeem", label: "Redeem" },
  { to: "/offers", label: "Offers" },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {LINKS.map(({ to, label, end }) => (
        <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? "active" : "")}>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
