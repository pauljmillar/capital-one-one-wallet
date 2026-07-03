import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import WalletShell from "./components/WalletShell";
import Home from "./pages/Home";
import Activity from "./pages/Activity";
import Redeem from "./pages/Redeem";
import Offers from "./pages/Offers";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <WalletShell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/redeem" element={<Redeem />} />
            <Route path="/offers" element={<Offers />} />
          </Routes>
        </WalletShell>
      </BrowserRouter>
    </ThemeProvider>
  );
}
