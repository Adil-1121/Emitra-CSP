import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { DarkModeContext } from "./core/shared/context/DarkModeContext";

// Common Components
import Sidebar from "./core/components/common-components/sidebar/sidebar";
import Navbar from "./core/components/common-components/navbar/navbar";

// Pages / Modules
import Home from "./core/modules/home/Home";
import Login from "./core/authentication/login/Login";
import Register from "./core/authentication/register/register";
import ForgotPassword from "./core/authentication/forgot-password/forgot";
import ChangePassword from "./core/authentication/change-password/ChangePassword";
import Lockscreen from "./core/authentication/lock-screen/Lockscreen";
import AiChatbot from "./core/modules/ai-chatbot/AiChatbot";
import Error404 from "./core/error/error404/Error404";
import Error500 from "./core/error/error500/Error500";
import { userInputs } from "./formSource";
import UserList from "./core/modules/users/users-list/Users-List";
import New from "./core/modules/users/add-user/Add-New-User";
import EditUser from "./core/modules/users/edit-user/Edit-New-User";
import ViewUser from "./core/modules/users/view-user/View-User";
import ServicesList from "./core/modules/services/services-list/ServicesList";
import AddService from "./core/modules/services/add-service/AddService";
import EditService from "./core/modules/services/edit-service/EditService";
import ViewService from "./core/modules/services/view-service/ViewService";
import FaqsList from "./core/modules/faqs/faqs-list/FaqsList";
import AddFaq from "./core/modules/faqs/add-faq/AddFaq";
import EditFaq from "./core/modules/faqs/edit-faq/EditFaq";
import ViewFaq from "./core/modules/faqs/view-faq/ViewFaq";
import ContactUs from "./core/modules/contact-Us/ContactUs";
import TestimonialsList from "./core/modules/testimonials/testimonials-list/TestimonialsList";
import AddTestimonial from "./core/modules/testimonials/add-testimonial/AddNewTestimonial";
import EditTestimonial from "./core/modules/testimonials/edit-testimonial/EditTestimonial";
import ViewTestimonial from "./core/modules/testimonials/view-testimonial/ViewTestimonial";
import ProfilePage from "./core/modules/profile/profile-page/ProfilePage";
import EditProfile from "./core/modules/profile/edit-profile/EditProfile";
import SettingPage from "./core/modules/setting/SettingPage";

// Styles
import "./core/shared/style/dark.scss";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const effectiveSidebarWidth = sidebarHovered || sidebarOpen ? 250 : 70;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <MainLayout
          sidebarOpen={sidebarOpen}
          sidebarHovered={sidebarHovered}
          toggleSidebar={toggleSidebar}
          setSidebarHovered={setSidebarHovered}
          effectiveSidebarWidth={effectiveSidebarWidth}
        />
      </BrowserRouter>
    </div>
  );
}

function MainLayout({
  sidebarOpen,
  sidebarHovered,
  toggleSidebar,
  setSidebarHovered,
  effectiveSidebarWidth,
}) {
  const location = useLocation();

  // Hide sidebar and navbar on auth pages
  const hideLayout = ["/login", "/register", "/forgot-password", "/lock-screen", "/change-password"].includes(
    location.pathname
  );

  return (
    <>
      {!hideLayout && (
        <>
          <Sidebar
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            setSidebarHovered={setSidebarHovered}
          />
          <Navbar sidebarWidth={effectiveSidebarWidth} />
        </>
      )}

      <div
        className="main-content"
        style={{
          marginLeft: hideLayout ? "0" : `${effectiveSidebarWidth}px`,
          transition: "all 0.3s ease",
        }}
      >
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/lock-screen" element={<Lockscreen />} />

          {/* Dashboard */}
          <Route path="/dashboard/admin-dashboard" element={<Home />} />
          <Route path="/gn-emitra-ai" element={<AiChatbot />} />

          {/* Profile */}
          <Route path="/profile">
            <Route index element={<ProfilePage />} />
            <Route path="edit-profile" element={<EditProfile inputs={userInputs} />} />
          </Route>

          {/* Settings */}
          <Route path="/settings" element={<SettingPage />} />

          {/* Users */}
          <Route path="/users">
            <Route index element={<UserList />} />
            <Route path="add-user" element={<New inputs={userInputs} />} />
            <Route path="edit-user/:userId" element={<EditUser inputs={userInputs} />} />
            <Route path="view-user/:userId" element={<ViewUser />} />
          </Route>

          {/* Services */}
          <Route path="/services">
            <Route index element={<ServicesList />} />
            <Route path="add-service" element={<AddService inputs={userInputs} />} />
            <Route path="edit-service/:serviceId" element={<EditService inputs={userInputs} />} />
            <Route path="view-service/:ServiceId" element={<ViewService />} />
          </Route>

          {/* Testimonials */}
          <Route path="/testimonials">
            <Route index element={<TestimonialsList />} />
            <Route path="add-testimonial" element={<AddTestimonial inputs={userInputs} />} />
            <Route path="/testimonials/edit-testimonial/:id" element={<EditTestimonial />} />
            <Route path="view-testimonial/:id" element={<ViewTestimonial />} />

          </Route>

          {/* FAQs */}
          <Route path="/faqs">
            <Route index element={<FaqsList />} />
            <Route path="add-faq" element={<AddFaq inputs={userInputs} />} />
            <Route path="edit-faq/:faqId" element={<EditFaq inputs={userInputs} />} />
            <Route path="view-faq/:faqId" element={<ViewFaq />} />
          </Route>

          {/* Contact */}
          <Route path="/contact-us" element={<ContactUs />} />

          {/* Errors */}
          <Route path="*" element={<Error404 />} />
          <Route path="/server-error" element={<Error500 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
