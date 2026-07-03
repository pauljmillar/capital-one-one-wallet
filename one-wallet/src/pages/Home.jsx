import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import ContributionBar from "../components/ContributionBar";

export default function Home() {
  const { brand } = useTheme();

  return (
    <>
      <div className="wallet-card">
        <h2>Points by brand this year</h2>
        <ContributionBar contribution={brand.contribution} />
      </div>

      <div className="quick-actions">
        <Link className="quick-action-btn" to="/redeem">
          Redeem
        </Link>
        <Link className="quick-action-btn" to="/activity">
          View Activity
        </Link>
        <Link className="quick-action-btn" to="/offers">
          Explore Offers
        </Link>
      </div>
    </>
  );
}
