import React, { useState } from 'react';
import './FaqSection.scss';

const FAQS = [
  {
    id: 1,
    question: 'How can I apply for an Aadhaar card update?',
    answer:
      'To apply for an Aadhaar card update, you can visit our G.N E-Mitra center with your existing Aadhaar card and valid supporting documents for the requested change (e.g., proof of address, proof of identity). Our operators will assist you with the online process, biometric verification, and document submission. A nominal fee may apply as per government norms.',
  },
  {
    id: 2,
    question: 'What documents are required for a new PAN card application?',
    answer:
      'For a new PAN card application you need a valid Aadhaar card, passport-size photograph, proof of identity, and proof of address. Our staff will guide you through the complete online application process.',
  },
  {
    id: 3,
    question: 'Can I pay my electricity bill online through G.N E-Mitra?',
    answer:
      'Yes, you can pay your electricity bill instantly at our center using secure government-approved payment gateways. We support all major DISCOMs across Rajasthan.',
  },
  {
    id: 4,
    question: 'How do I register for government welfare schemes?',
    answer:
      'You can register for central and state government welfare schemes at our center. Bring your Aadhaar card, bank passbook, and relevant documents. Our operators will assist you with the online registration on official portals.',
  },
  {
    id: 5,
    question: 'What are the charges for different services?',
    answer:
      'Service charges vary depending on the type of service. A nominal fee is applicable for most government services as per official guidelines. Please visit our center or contact us for a detailed fee structure.',
  },
  {
    id: 6,
    question: 'Is my personal information secure with G.N E-Mitra?',
    answer:
      'Yes, your personal information is completely secure. We follow all government-mandated data protection guidelines and use encrypted, official government portals for all transactions.',
  },
];

const FaqSection = () => {
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="faq-section" id="faqs">
      {/* Decorative 3D question mark — top right */}
      <div className="faq-section__deco faq-section__deco--tr" aria-hidden="true">
        <div className="faq-section__deco-card">
          <span>?</span>
        </div>
      </div>

      {/* Decorative 3D question mark — left */}
      <div className="faq-section__deco faq-section__deco--ml" aria-hidden="true">
        <div className="faq-section__deco-card faq-section__deco-card--sm">
          <span>?</span>
        </div>
      </div>

      <div className="faq-section__inner">
        {/* Header */}
        <div className="faq-section__header">
          <h2 className="faq-section__title">Frequently Asked Questions</h2>
          <p className="faq-section__subtitle">
            Find quick answers to common queries about our services.
          </p>
        </div>

        {/* Accordion */}
        <div className="faq-section__list">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-item${isOpen ? ' faq-item--open' : ''}`}
              >
                <button
                  className="faq-item__trigger"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="faq-item__question">{faq.question}</span>
                  <span className="faq-item__icon" aria-hidden="true">
                    {isOpen ? (
                      // Chevron up
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M18 15l-6-6-6 6" stroke="#7C3AED" strokeWidth="2.2"
                          strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      // Plus
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="#7C3AED" strokeWidth="2.2"
                          strokeLinecap="round" />
                      </svg>
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="faq-item__answer"
                    role="region"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
