import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = pathname === "/" ? "manual" : "auto";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
