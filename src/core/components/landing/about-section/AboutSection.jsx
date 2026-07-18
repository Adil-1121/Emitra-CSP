import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutSection.scss';

const INFO_ROWS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <rect x="2" y="3" width="20" height="16" rx="2" stroke="#3B82F6" strokeWidth="2" />
        <path d="M8 7h8M8 11h5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    content: (
      <>
        <strong>Founded:</strong> 03 March 2017 <strong>|</strong> <strong>Entity:</strong> Proprietorship
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <circle cx="12" cy="8" r="4" stroke="#3B82F6" strokeWidth="2" />
        <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    content: (
      <>
        <strong>Owner:</strong> Sameer Khan
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#3B82F6" strokeWidth="2" />
        <circle cx="12" cy="9" r="2.5" stroke="#3B82F6" strokeWidth="2" />
      </svg>
    ),
    content: (
      <>
        <strong>Office Address:</strong> Sardar Bazaar, Barli, Bhinay, Ajmer, Rajasthan - 305624
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="#3B82F6" strokeWidth="2" />
        <path d="M7 9h4M7 13h6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="9" r="2" fill="#3B82F6" />
      </svg>
    ),
    content: (
      <>
        <strong>Registration:</strong> UDYAM-RJ-06-0002234 (MSME)
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <circle cx="8" cy="12" r="3" stroke="#3B82F6" strokeWidth="2" />
        <circle cx="16" cy="12" r="3" stroke="#3B82F6" strokeWidth="2" />
        <path d="M11 12h2" stroke="#3B82F6" strokeWidth="2" />
        <path d="M5 8c-1.5 1-2 2.5-2 4s.5 3 2 4M19 8c1.5 1 2 2.5 2 4s-.5 3-2 4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    content: (
      <>
        <strong>Category:</strong> Social work activities without accommodation
      </>
    ),
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
        <circle cx="12" cy="12" r="9" stroke="#3B82F6" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" stroke="#3B82F6" strokeWidth="2" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    content: (
      <>
        <strong>Mission:</strong> To make all digital and government services simple, accessible, and affordable for everyone.
      </>
    ),
  },
];

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section className="about-section" id="about">
      <div className="about-section__inner">
        {/* Left: shop illustration */}
        <div className="about-section__left">
          <img
            src="/images/about_shop.png"
            alt="G.N E-Mitra Shop"
            className="about-section__img"
          />
        </div>

        {/* Right: info */}
        <div className="about-section__right">
          <h2 className="about-section__title">About G.N E-MITRA</h2>

          <p className="about-section__intro">
            <span className="about-section__intro-icon">⚡</span>
            <span>
              <strong>G.N E-Mitra is your trusted digital service center</strong>,{' '}
              providing quick and secure access to essential online services.
            </span>
          </p>

          <ul className="about-section__list">
            {INFO_ROWS.map((row, i) => (
              <li key={i} className="about-section__row">
                <span className="about-section__row-icon">{row.icon}</span>
                <span className="about-section__row-text">{row.content}</span>
              </li>
            ))}
          </ul>

          <button
            className="about-section__cta"
            onClick={() => navigate('/services')}
            aria-label="View Our Services"
          >
            View Our Services &nbsp;›
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
