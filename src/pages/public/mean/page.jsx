import React, { useEffect, useState } from "react";
import MenuMobilePage from "./OurMenuMobile";
import RestaurantLandingPage from "./OurMenuDesktop";

export default function ResponsiveHomePage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 740);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 740);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <MenuMobilePage /> : <RestaurantLandingPage />;
}