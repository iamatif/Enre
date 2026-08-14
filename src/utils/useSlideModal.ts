import { useEffect, useRef, useState } from "react";

export const MODAL_EXIT_MS = 700;

export function useSlideModal(open: boolean) {
  const [render, setRender] = useState(open);
  const [phase, setPhase] = useState<"hidden-top" | "open" | "hidden-bottom">(
    open ? "open" : "hidden-top"
  );
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (open) {
      setRender(true);
      setPhase("hidden-top");
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("open"));
      });
      return () => cancelAnimationFrame(raf);
    }
    setPhase("hidden-bottom");
    timerRef.current = window.setTimeout(() => setRender(false), MODAL_EXIT_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [open]);

  const translate =
    phase === "hidden-top"
      ? "-translate-y-full"
      : phase === "hidden-bottom"
      ? "translate-y-full"
      : "translate-y-0";

  const transition =
    phase === "hidden-bottom"
      ? "duration-[450ms] ease-in"
      : "duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

  const overlayVisible = phase === "open";

  return { render, translate, transition, overlayVisible };
}
