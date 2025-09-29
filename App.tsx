import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { DataExplorer } from "./components/DataExplorer";
import { VisualizationStudio } from "./components/VisualizationStudio";
import { TaxonomyModule } from "./components/TaxonomyModule";
import { EDNAModule } from "./components/EDNAModule";
import { FishingSpotsModuleEnhanced } from "./components/FishingSpotsModuleEnhanced";
import { ReportsModule } from "./components/ReportsModule";
import { UserManagement } from "./components/UserManagement";
import { AboutSupport } from "./components/AboutSupport";
import { LoginPortal } from "./components/LoginPortal";
import { BSBotChat } from "./components/BSBotChat";
// BLUESPHERE authentic logo
import blueSphereLogoImg from "figma:asset/a8586a467674fa5556f8b8908ea79aaa013549b7.png";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  // Set BLUESPHERE logo as favicon
  useEffect(() => {
    // Set document title
    document.title = "BLUESPHERE - Marine Data Platform";

    // Create or update favicon
    let link = document.querySelector(
      "link[rel*='icon']",
    ) as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = blueSphereLogoImg;

    // Add apple-touch-icon for mobile devices
    let appleTouchIcon = document.querySelector(
      "link[rel='apple-touch-icon']",
    ) as HTMLLinkElement;
    if (!appleTouchIcon) {
      appleTouchIcon = document.createElement("link");
      appleTouchIcon.rel = "apple-touch-icon";
      document.head.appendChild(appleTouchIcon);
    }
    appleTouchIcon.href = blueSphereLogoImg;

    // Add meta description
    let metaDescription = document.querySelector(
      "meta[name='description']",
    ) as HTMLMetaElement;
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content =
      "BLUESPHERE - Comprehensive marine data platform for CMLRE handling oceanographic datasets, taxonomy analysis, eDNA research, and biodiversity studies.";
  }, []);

  const renderPage = () => {
    if (!isLoggedIn && currentPage !== "login") {
      return (
        <HomePage
          isLoggedIn={isLoggedIn}
          userType={userType}
          setCurrentPage={setCurrentPage}
        />
      );
    }

    if (currentPage === "login") {
      return (
        <LoginPortal
          setIsLoggedIn={setIsLoggedIn}
          setUserType={setUserType}
          setCurrentPage={setCurrentPage}
        />
      );
    }

    switch (currentPage) {
      case "home":
        return (
          <HomePage
            isLoggedIn={isLoggedIn}
            userType={userType}
            setCurrentPage={setCurrentPage}
          />
        );
      case "data-explorer":
        return <DataExplorer />;
      case "visualization":
        return <VisualizationStudio />;
      case "taxonomy":
        return <TaxonomyModule />;
      case "edna":
        // Show eDNA for researchers and policy makers; Fishing Spots for public
        if (
          userType === "researcher" ||
          userType === "policymaker"
        ) {
          return <EDNAModule userType={userType} />;
        } else {
          return (
            <FishingSpotsModuleEnhanced userType={userType} />
          );
        }
      case "fishing-spots":
        return (
          <FishingSpotsModuleEnhanced userType={userType} />
        );
      case "reports":
        return <ReportsModule />;
      case "user-management":
        return <UserManagement />;
      case "about":
        return <AboutSupport />;
      default:
        return (
          <HomePage
            isLoggedIn={isLoggedIn}
            userType={userType}
            setCurrentPage={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900">
      {currentPage !== "login" && (
        <Navbar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userType={userType}
        />
      )}

      <motion.main
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={
          currentPage !== "login"
            ? "pt-32 lg:pt-40 min-h-screen"
            : "min-h-screen"
        }
      >
        {renderPage()}
      </motion.main>

      {/* BSBot Chat - only show when logged in and not on login page */}
      {isLoggedIn && currentPage !== "login" && <BSBotChat />}
    </div>
  );
}