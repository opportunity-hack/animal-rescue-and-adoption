import { useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Improves user experience by reducing scrolling time to certain sections of the page
const ScrollToHashElement: React.FC = () => {
  const location = useLocation();

  const hashElement = useMemo(() => {
    const hash = location.hash;
    const removeHashCharacter = (str: string) => str.slice(1);
    // hash refers to "#" in the URL given by <Link/> to = #about </Link> from React Router
    if (hash) {
      return document.getElementById(removeHashCharacter(hash));
    }
    return null;
  }, [location]);

  useEffect(() => {
    if (hashElement) {
      hashElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hashElement, location]);

  return null;
};

export default ScrollToHashElement;
