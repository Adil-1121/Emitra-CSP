import React from 'react';
import './FeatureCards.scss';

const CARDS = [
  {
    id: 1,
    title: 'Digital Government\nServices',
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
        <rect width="56" height="56" rx="14" fill="#EDE9FF" />
        <path
          d="M28 12C19.16 12 12 19.16 12 28s7.16 16 16 16 16-7.16 16-16S36.84 12 28 12zm0 7a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 23c-4.5 0-8.48-2.3-10.8-5.8.06-3.58 7.2-5.54 10.8-5.54s10.74 1.96 10.8 5.54C36.48 39.7 32.5 42 28 42z"
          fill="#7C3AED"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Secure & Trusted\nPlatform',
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
        <rect width="56" height="56" rx="14" fill="#EDE9FF" />
        <path
          d="M28 10L12 18v11c0 10 6.88 19.3 16 21.6C37.12 48.3 44 39 44 29V18L28 10zm-2 25l-5.4-5.4 2.54-2.54L26 29.9l8.26-8.26L36.8 24 26 35z"
          fill="#7C3AED"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Expert Support\nAvailable',
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52">
        <rect width="56" height="56" rx="14" fill="#EDE9FF" />
        <path
          d="M28 12C19.16 12 12 19.16 12 28s7.16 16 16 16 16-7.16 16-16S36.84 12 28 12zm0 7a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 23c-4.5 0-8.48-2.3-10.8-5.8.06-3.58 7.2-5.54 10.8-5.54s10.74 1.96 10.8 5.54C36.48 39.7 32.5 42 28 42z"
          fill="#7C3AED"
        />
        <circle cx="40" cy="18" r="5" fill="#7C3AED" />
        <path d="M38.5 18h3M40 16.5v3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const FeatureCards = () => (
  <div className="feature-cards">
    {CARDS.map((card) => (
      <div className="feature-card" key={card.id}>
        <div className="feature-card__icon-wrap">{card.icon}</div>
        <p className="feature-card__title">
          {card.title.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i === 0 && <br />}
            </React.Fragment>
          ))}
        </p>
      </div>
    ))}
  </div>
);

export default FeatureCards;
