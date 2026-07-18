import React from 'react';
import './FloatingSocial.scss';

const ICONS = [
  { icon: '📞', label: 'Call',     href: 'tel:+91' },
  { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/' },
  { icon: '📍', label: 'Location', href: '#location' },
];

const FloatingSocial = () => (
  <div className="floating-social" aria-label="Quick contact">
    {ICONS.map(({ icon, label, href }) => (
      <a
        key={label}
        href={href}
        className="floating-social__btn"
        aria-label={label}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {icon}
      </a>
    ))}
  </div>
);

export default FloatingSocial;
