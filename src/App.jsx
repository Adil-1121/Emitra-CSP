import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DarkModeContext } from "./core/shared/context/DarkModeContext";

// Pages / Components
import Home from "./core/modules/home/Home";
import Login from "./core/authentication/login/Login";
import New from "./core/modules/users/add-user/Add-New-User";
import ViewUser from "./core/modules/users/view-user/View-User";
import EditUser from "./core/modules/users/edit-user/Edit-New-User";
import UserList from "./core/modules/users/users-list/Users-List";
import Register from "./core/authentication/register/register";
import ForgotPassword from "./core/authentication/forgot-password/forgot";
import ChangePassword from "./core/authentication/change-password/ChangePassword";
import Lockscreen from "./core/authentication/lock-screen/Lockscreen";
import AiChatbot from "./core/modules/ai-chatbot/AiChatbot";
import Error404 from "./core/error/error404/Error404";
import Error500 from "./core/error/error500/Error500";
import ServicesList from "./core/modules/services/services-list/ServicesList";
import { userInputs } from "./formSource";
// Styles
import "./core/shared/style/dark.scss";
import AddService from "./core/modules/services/add-service/AddService";
import EditService from "./core/modules/services/edit-service/EditService";
import ViewService from "./core/modules/services/view-service/ViewService";
import FaqsList from "./core/modules/faqs/faqs-list/FaqsList";
import EditFaq from "./core/modules/faqs/edit-faq/EditFaq";
import AddFaq from "./core/modules/faqs/add-faq/AddFaq";
import ViewFaq from "./core/modules/faqs/view-faq/ViewFaq";
import ContactUs from "./core/modules/contact-Us/ContactUs";
import TestimonialsList from "./core/modules/testimonials/testimonials-list/TestimonialsList";
import AddTestimonial from "./core/modules/testimonials/add-testimonial/AddNewTestimonial";
import EditTestimonial from "./core/modules/testimonials/edit-testimonial/EditTestimonial";
import ViewTestimonial from "./core/modules/testimonials/view-testimonial/ViewTestimonial";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard/admin-dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/lock-screen" element={<Lockscreen />} />
          <Route path="/gn-emitra-ai" element={<AiChatbot />} />

          <Route path="users">
            <Route index element={<UserList />} />
            <Route path="add-user" element={<New inputs={userInputs} />} />
            <Route path="edit-user/:userId" element={<EditUser inputs={userInputs} />} />
            <Route path="view-user/:userId" element={<ViewUser />} />
          </Route>

          <Route path="services">
            <Route index element={<ServicesList />} />
            <Route path="add-service" element={<AddService inputs={userInputs} />} />
            <Route path="edit-service/:serviceId" element={<EditService inputs={userInputs} />} />
            <Route path="view-service/:ServiceId" element={<ViewService />} />
          </Route>

          <Route path="/testimonials">
            <Route index element={<TestimonialsList />} />
            <Route path="add-testimonial" element={<AddTestimonial inputs={userInputs} />} />
            <Route path="edit-testimonial/:testimonialId" element={<EditTestimonial inputs={userInputs} />} />
            <Route path="view-testimonial/:testimonialId" element={<ViewTestimonial />} />
          </Route>

          <Route path="faqs">
            <Route index element={<FaqsList />} />
            <Route path="add-faq" element={<AddFaq inputs={userInputs} />} />
            <Route path="edit-faq/:faqId" element={<EditFaq inputs={userInputs} />} />
            <Route path="view-faq/:faqId" element={<ViewFaq />} />
          </Route>

          <Route path="contact-us">
            <Route index element={<ContactUs />} />

          </Route>
          <Route path="*" element={<Error404 />} />
          <Route path="/server-error" element={<Error500 />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
