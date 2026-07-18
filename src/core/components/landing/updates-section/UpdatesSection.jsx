import React from 'react';
import './UpdatesSection.scss';

const NOTICES = [
  {
    id: 1,
    title: 'New Digital Seva Kendra Guidelines',
    subtitle: 'Desriptions and (Notice)',
    icon: '⚡',
  },
  {
    id: 2,
    title: 'Scholarship Application Deadline Extended',
    subtitle: 'Meretmidiales (Notice)',
    icon: '🎓',
  },
  {
    id: 3,
    title: 'Scheduled System Maintenance',
    subtitle: 'Eath ssenne (Notice)',
    icon: '🖥️',
  },
  {
    id: 4,
    title: 'Biotet Bund Pecghionee',
    subtitle: 'Pesltasoly oite dine in ceerssid or I FiN Sourity)',
    icon: '📋',
  },
];

const QUICK_LINKS = [
  { id: 1, label: 'Aadhar Services',  badge: 'i', icon: '🔗' },
  { id: 2, label: 'PAN Card Updates', badge: '?', icon: '💳' },
  { id: 3, label: 'Ration Card Info', badge: 'i', icon: '📄' },
  { id: 4, label: 'Contact Support',  badge: '?', icon: '🎧' },
  { id: 5, label: 'FAQS',             badge: 'i', icon: '❓' },
];

const UpdatesSection = () => (
  <section className="updates-section" id="updates">
    <div className="updates-section__inner">

      {/* ── Header ── */}
      <div className="updates-section__header">
        <span className="updates-section__label">Our Gallery</span>
        <h2 className="updates-section__title">
          Important announcements, circulars &amp; downloadable documents
        </h2>
        <p className="updates-section__subtitle">
          Explore all the latest news, government circular, events, and downloadables from G.N E-Mitra
        </p>
      </div>

      {/* ── Two-panel card ── */}
      <div className="updates-section__panels">

        {/* Left: Latest Updates & Notices */}
        <div className="updates-panel updates-panel--left">
          <div className="updates-panel__head">
            <div className="updates-panel__megaphone" aria-hidden="true">
              <svg viewBox="0 0 40 40" fill="none" width="22" height="22">
                <path d="M32 8L14 16H8a2 2 0 00-2 2v4a2 2 0 002 2h2l3 8h4l-1-8h1l18 8V8z" fill="#fff" />
              </svg>
            </div>
            <h3 className="updates-panel__title">Latest Updates &amp; Notices</h3>
          </div>

          <ul className="updates-panel__list">
            {NOTICES.map((n) => (
              <li className="updates-panel__item" key={n.id}>
                <div className="updates-panel__item-icon" aria-hidden="true">
                  {n.icon}
                </div>
                <div className="updates-panel__item-text">
                  <strong>{n.title}</strong>
                  <span>{n.subtitle}</span>
                </div>
                <div className="updates-panel__item-actions">
                  <button className="updates-panel__btn updates-panel__btn--view">
                    View
                  </button>
                  <button className="updates-panel__btn updates-panel__btn--download">
                    Download
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Quick Links */}
        <div className="updates-panel updates-panel--right">
          <h3 className="updates-panel__ql-title">Quick Links</h3>

          <ul className="updates-panel__ql-list">
            {QUICK_LINKS.map((link) => (
              <li className="updates-panel__ql-item" key={link.id}>
                <div className="updates-panel__ql-icon" aria-hidden="true">
                  {link.icon}
                </div>
                <span className="updates-panel__ql-label">{link.label}</span>
                <span className="updates-panel__ql-badge">{link.badge}</span>
              </li>
            ))}
          </ul>

          {/* Pagination dots */}
          <div className="updates-panel__dots" aria-hidden="true">
            <span className="updates-panel__dot updates-panel__dot--active" />
            <span className="updates-panel__dot" />
            <span className="updates-panel__dot" />
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default UpdatesSection;
