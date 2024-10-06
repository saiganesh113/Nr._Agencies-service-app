import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/examples/LoginPage.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import UserDashboard from "components/Navbars/UserDashboard";
import SignUp from "views/index-sections/SignUp";
import TechnicianDashboard from "components/Navbars/TechnicianDashboard";
import ServicePage from "views/index-sections/servicespage";

// Importing UserDashboard CSS properly
import "components/Navbars/UserDashboard.css";  // Import CSS without assigning it to a variable

const root = ReactDOM.createRoot(document.getElementById("root"));
const whatsappLink = `https://wa.me/9494412464?text=Hello!`;
const phoneLink = `tel:${9494412464}`;

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/index" element={<Index />} />
      <Route path="/nucleo-icons" element={<NucleoIcons />} />
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/profile-page" element={<ProfilePage />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/techdashboard" element={<TechnicianDashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/homeservices" element={<ServicePage />} />

      {/* Redirect all other paths to /index */}
      <Route path="*" element={<Navigate to="/index" replace />} />
    </Routes>

    {/* WhatsApp */}
    <div>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-icon btn btn-success rounded-circle"
        >
          <i className="fab fa-whatsapp fa-4x"></i>
        </a>
    </div>

    {/* Phone */}
    <div>
        <a
          href={phoneLink}
          target="_blank"
          className="phone-icon btn btn-success rounded-circle"
        >
          <i className="fas fa-phone fa-4x"></i>
        </a>
    </div>
  </BrowserRouter>
);
