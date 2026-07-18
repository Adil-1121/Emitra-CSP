import React, { useState } from 'react';
import './landing.scss';

import LandingNavbar from '../../components/landing/landing-navbar/LandingNavbar';
import HeroSection from '../../components/landing/hero-section/HeroSection';
import FeatureCards from '../../components/landing/feature-cards/FeatureCards';
import GallerySection from '../../components/landing/gallery-section/GallerySection';
import NotificationsPanel from '../../components/landing/notifications-panel/NotificationsPanel';
import FloatingSocial from '../../components/landing/floating-social/FloatingSocial';
import AiChatBtn from '../../components/landing/ai-chat-btn/AiChatBtn';
import AboutSection from '../../components/landing/about-section/AboutSection';
import ServicesSection from '../../components/landing/services-section/ServicesSection';
import PhotoGallery from '../../components/landing/photo-gallery/PhotoGallery';
import UpdatesSection from '../../components/landing/updates-section/UpdatesSection';
import TestimonialsSection from '../../components/landing/testimonials-section/TestimonialsSection';
import FaqSection from '../../components/landing/faq-section/FaqSection';
import ContactSection from '../../components/landing/contact-section/ContactSection';
import LandingFooter from '../../components/landing/landing-footer/LandingFooter';

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState('Home');

  return (
    <div className="landing-page">
      {/* ── Sticky Navbar ── */}
      <LandingNavbar
        activeSection={activeSection}
        onNavClick={setActiveSection}
      />

      {/* ── Hero Section (with background image) ── */}
      <div className="landing-page__hero-wrap">
        <HeroSection />
        <FloatingSocial />
      </div>

      {/* ── Features + Gallery + Notifications ── */}
      <section className="landing-page__second-section">
        <div className="landing-page__second-inner">
          {/* Left: feature cards + gallery */}
          <div className="landing-page__second-left">
            <FeatureCards />
            <GallerySection />
          </div>

          {/* Right: notifications panel */}
          <NotificationsPanel />
        </div>
      </section>

      {/* ── About Section ── */}
      <AboutSection />

      {/* ── Services Section ── */}
      <ServicesSection />

      {/* ── Photo Gallery Section ── */}
      <PhotoGallery />

      {/* ── Updates Section ── */}
      <UpdatesSection />

      {/* ── Testimonials Section ── */}
      <TestimonialsSection />

      {/* ── FAQ Section ── */}
      <FaqSection />

      {/* ── Contact Section ── */}
      <ContactSection />

      {/* ── Footer ── */}
      <LandingFooter />

      {/* ── Fixed AI Chat Button ── */}
      <AiChatBtn />
    </div>
  );
};

export default LandingPage;
