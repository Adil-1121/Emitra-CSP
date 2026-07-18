import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/avatars/logo.png';
import './LandingNavbar.scss';

const NAV_LINKS = [
  { label: 'Home', icon: '🏠' },
  { label: 'About', icon: 'ℹ️' },
  { label: 'Services', icon: '⚙️' },
  { label: 'Gallery', icon: '🖼️' },
  { label: 'Updates', icon: '📢' },
  { label: 'Testimonials', icon: '⭐' },
  { label: 'Contact Us', icon: '✉️' },
];

const LandingNavbar = ({ activeSection, onNavClick }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (label) => {
    onNavClick && onNavClick(label);
    setMenuOpen(false);
  };

  return (
    <nav className="l-navbar">
      <div className="l-navbar__inner">
        <div className="l-navbar__logo">
          <div className="l-navbar__logo-ring">
            <img src={logo} alt="GN E-Mitra Logo" />
          </div>
          <span className="l-navbar__brand">G.N E-MITRA</span>
        </div>

        <ul className="l-navbar__links">
          {NAV_LINKS.map(({ label, icon }) => (
            <li
              key={label}
              className={`l-navbar__item ${activeSection === label ? 'l-navbar__item--active' : ''}`}
              onClick={() => handleNav(label)}
            >
              <span className="l-navbar__item-icon">{icon}</span>
              {label}
            </li>
          ))}
        </ul>

        <button
          className="l-navbar__login"
          onClick={() => navigate('/login')}
          aria-label="Login"
        >
          <span>👤</span> Login
        </button>

        <button
          className={`l-navbar__burger ${menuOpen ? 'l-navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="l-navbar__drawer">
          {NAV_LINKS.map(({ label, icon }) => (
            <div
              key={label}
              className="l-navbar__drawer-item"
              onClick={() => handleNav(label)}
            >
              {icon} {label}
            </div>
          ))}
          <button
            className="l-navbar__login l-navbar__login--mobile"
            onClick={() => navigate('/login')}
          >
            👤 Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
