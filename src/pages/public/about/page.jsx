import React, { useEffect, useState } from "react";
import AboutHeader from "./components/Aboutheader";
import AboutUsPage from "./components/AboutDesktopview";

export default function ResponsiveHomePage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 740);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 740);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <AboutHeader /> : <AboutUsPage />;
}