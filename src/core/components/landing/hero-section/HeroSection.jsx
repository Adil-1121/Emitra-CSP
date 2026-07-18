import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroBg from '../../../../assets/backgrounds/Home.png';
import './HeroSection.scss';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div
        className="hero__bg"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      />

      <div className="hero__content">
        <div className="hero__left">
          <h1 className="hero__title">
            Your Trusted Digital<br />Service Partner
          </h1>
          <h2 className="hero__brand">G.N E-MITRA</h2>
          <p className="hero__desc">
            Access a wide range of official Indian government digital services,
            community support, and essential document processing from the comfort
            of your home. Reliable, secure, and citizen-centric.
          </p>

          <div className="hero__cta">
            <button
              className="hero__btn hero__btn--primary"
              onClick={() => navigate('/login')}
            >
              Get a Service
            </button>
            <button className="hero__btn hero__btn--outline">
              Book Appointment
            </button>
            <button className="hero__btn hero__btn--outline">
              📞 Call Now
            </button>
          </div>

          <div className="hero__badges">
            <div className="hero__badge">
              <span className="hero__badge-icon">🏛️</span>
              Government approved
            </div>
            <div className="hero__badge">
              <span className="hero__badge-icon">🤝</span>
              Reliable community service
            </div>
          </div>
        </div>

        <div className="hero__right" aria-hidden="true" />
      </div>
    </section>
  );
};

export default HeroSection;
