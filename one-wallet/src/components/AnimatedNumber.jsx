import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

export default function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const controls = animate(prevRef.current, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate(v) {
        setDisplay(Math.round(v));
      },
      onComplete() {
        prevRef.current = value;
      },
    });
    return () => controls.stop();
  }, [value]);

  return <>{display.toLocaleString()}</>;
}
