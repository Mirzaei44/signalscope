import { useEffect } from "react";

function SmoothScroll({ children }) {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return children;
}

export default SmoothScroll;