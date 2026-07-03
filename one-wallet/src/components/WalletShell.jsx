import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";
import Header from "./Header";
import BottomNav from "./BottomNav";
import TrustFooter from "./TrustFooter";

export default function WalletShell({ children }) {
  const { theme } = useTheme();

  return (
    <>
      <ThemeSwitcher />
      <div className="wallet-shell">
        <Header />
        <AnimatePresence mode="wait">
          <motion.main
            key={theme}
            className="wallet-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <BottomNav />
        <TrustFooter />
      </div>
    </>
  );
}
