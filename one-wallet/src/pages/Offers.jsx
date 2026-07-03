import { useMemo, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import offers from "../data/offers.json";

export default function Offers() {
  const { theme } = useTheme();
  const [toast, setToast] = useState(null);

  const themeOffers = useMemo(
    () => offers.filter((o) => o.theme === theme),
    [theme]
  );

  function viewOffer(offer) {
    setToast(`Offer applied: ${offer.title}`);
    setTimeout(() => setToast(null), 2200);
  }

  return (
    <>
      {themeOffers.map((o) => (
        <div className="offer-card" key={o.id}>
          <div className="offer-rationale">{o.rationale}</div>
          <div className="offer-title">{o.title}</div>
          <button className="offer-cta" onClick={() => viewOffer(o)}>
            View offer
          </button>
        </div>
      ))}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
