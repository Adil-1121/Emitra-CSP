import React, { useState } from 'react';
import logo from '../../../../assets/avatars/logo.png';
import './LandingFooter.scss';

const POPULAR_SERVICES = [
  { label: 'Aadhaar Enrollment & Updates', highlight: false },
  { label: 'PAN Card Services', highlight: true },
  { label: 'Electricity Bill Payment', highlight: false },
  { label: 'Money Transfer', highlight: true },
  { label: 'Ration Card Registration', highlight: false },
  { label: 'Birth & Death Certificates', highlight: true },
];

const CUSTOMER_SUPPORT = [
  { label: 'Help Center', highlight: false },
  { label: 'Contact Us', highlight: true },
  { label: 'FAQs', highlight: false },
  { label: 'Book Appointment', highlight: true },
  { label: 'Status Tracking', highlight: false },
  { label: 'Feedback & Complaints', highlight: false },
];

const SOCIAL = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919929151471',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.5l5.797-1.522A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.51-5.17-1.4l-.37-.22-3.44.9.92-3.36-.24-.38A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
  },
];

const LEGAL_LINKS = ['Privacy Policy', 'Terms of Service', 'Disclaimer', 'Sitemap'];

const LandingFooter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="l-footer">
      {/* Decorative glow blobs */}
      <div className="l-footer__blob l-footer__blob--tl" aria-hidden="true" />
      <div className="l-footer__blob l-footer__blob--br" aria-hidden="true" />

      <div className="l-footer__inner">
        <div className="l-footer__grid">

          {/* ── Col 1: About ── */}
          <div className="l-footer__col">
            <div className="l-footer__brand">
              <div className="l-footer__logo-ring">
                <img src={logo} alt="G.N E-Mitra Logo" width="32" height="32" />
              </div>
              <h3 className="l-footer__brand-name">About G.N E-Mitra</h3>
            </div>
            <p className="l-footer__about-text">
              Your trusted digital service center, providing quick and secure access to essential
              Indian government and community online services from the comfort of your home.
              Government approved and reliable.
            </p>
          </div>

          {/* ── Col 2: Popular Services ── */}
          <div className="l-footer__col">
            <h4 className="l-footer__col-title">Popular Services</h4>
            <ul className="l-footer__links">
              {POPULAR_SERVICES.map((s) => (
                <li key={s.label}>
                  <a
                    href="#services"
                    className={`l-footer__link${s.highlight ? ' l-footer__link--highlight' : ''}`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Customer Support ── */}
          <div className="l-footer__col">
            <h4 className="l-footer__col-title">Customer Support</h4>
            <ul className="l-footer__links">
              {CUSTOMER_SUPPORT.map((s) => (
                <li key={s.label}>
                  <a
                    href="#contact"
                    className={`l-footer__link${s.highlight ? ' l-footer__link--highlight' : ''}`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Connect ── */}
          <div className="l-footer__col">
            <h4 className="l-footer__col-title">Connect with Us</h4>

            <div className="l-footer__socials">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="l-footer__social-btn"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <p className="l-footer__newsletter-label">Newsletter Subscription</p>
            <form className="l-footer__newsletter" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="l-footer__newsletter-input"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Newsletter email"
                required
              />
              <button
                type="submit"
                className="l-footer__newsletter-btn"
                aria-label="Subscribe"
              >
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <a href="#updates" className="l-footer__link l-footer__govtech-link">
              GovTech News
            </a>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="l-footer__bottom">
        <div className="l-footer__bottom-inner">
          <p className="l-footer__copyright">
            © 2026 G.N E-Mitra. All Rights Reserved. An Official GovTech Partner.
          </p>
          <nav className="l-footer__legal" aria-label="Legal links">
            {LEGAL_LINKS.map((link, i) => (
              <a key={link} href="#" className="l-footer__legal-link">
                {link}
              </a>
            ))}
          </nav>
        </div>
        {/* Sparkle decoration */}
        <span className="l-footer__sparkle" aria-hidden="true">✦</span>
      </div>
    </footer>
  );
};

export default LandingFooter;
