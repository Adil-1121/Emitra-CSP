import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/avatars/logo.png';
import './LandingNavbar.scss';

const NAV_LINKS = [
  { label: 'Home',         icon: '🏠' },
  { label: 'About',        icon: 'ℹ️' },
  { label: 'Services',     icon: '⚙️' },
  { label: 'Gallery',      icon: '🖼️' },
  { label: 'Updates',      icon: '📢' },
  { label: 'Testimonials', icon: '⭐' },
  { label: 'Contact Us',   icon: '✉️' },
];

const LandingNavbar = ({ activeSection, onNavClick }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (label) => {
    onNavClick?.(label);
    setMenuOpen(false);
  };

  return (
    <nav className={`l-navbar${scrolled ? ' l-navbar--scrolled' : ''}`}>
      <div className="l-navbar__inner">

        {/* Logo */}
        <div className="l-navbar__logo">
          <div className="l-navbar__logo-ring">
            <img src={logo} alt="GN E-Mitra Logo" />
          </div>
          <span className="l-navbar__brand">G.N E-MITRA</span>
        </div>

        {/* Nav links */}
        <ul className="l-navbar__links">
          {NAV_LINKS.map(({ label, icon }) => (
            <li
              key={label}
              className={`l-navbar__item${activeSection === label ? ' l-navbar__item--active' : ''}`}
              onClick={() => handleNav(label)}
            >
              <span className="l-navbar__item-icon">{icon}</span>
              {label}
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="l-navbar__actions">
          {/* Login */}
          <button className="l-navbar__login" onClick={() => navigate('/login')} aria-label="Login">
            <span>👤</span> Login
          </button>
        </div>

        {/* Burger */}
        <button
          className={`l-navbar__burger${menuOpen ? ' l-navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="l-navbar__drawer">
          {NAV_LINKS.map(({ label, icon }) => (
            <div key={label} className="l-navbar__drawer-item" onClick={() => handleNav(label)}>
              {icon} {label}
            </div>
          ))}
          <div className="l-navbar__drawer-bottom">
            <button className="l-navbar__login l-navbar__login--mobile" onClick={() => navigate('/login')}>
              👤 Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
