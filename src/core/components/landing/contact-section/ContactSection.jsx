import React, { useState } from 'react';
import './ContactSection.scss';

const SOCIAL = [
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-section__inner">

        {/* ── Header ── */}
        <div className="contact-section__header">
          <h2 className="contact-section__title">Let's Connect</h2>
          <p className="contact-section__subtitle">
            We are here to help with all your digital service needs. Reach out to us!
          </p>
        </div>

        {/* ── Two-panel layout ── */}
        <div className="contact-section__panels">

          {/* Left: Contact Form */}
          <div className="contact-panel contact-panel--form">
            <form onSubmit={handleSubmit} noValidate>
              <input
                className="contact-panel__input"
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                aria-label="Full Name"
              />
              <input
                className="contact-panel__input"
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                aria-label="Email Address"
              />
              <input
                className="contact-panel__input"
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
                aria-label="Subject"
              />
              <textarea
                className="contact-panel__textarea"
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                required
                aria-label="Message"
              />
              <button
                type="submit"
                className="contact-panel__submit"
                aria-label="Send Message"
              >
                {sent ? 'Message Sent!' : 'Send Message'}
                {!sent && (
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2.2"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="contact-panel contact-panel--info">
            <h3 className="contact-panel__info-title">Contact Information</h3>

            <ul className="contact-panel__info-list">
              <li className="contact-panel__info-item">
                <span className="contact-panel__info-icon contact-panel__info-icon--phone" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                <div>
                  <strong>Phone</strong>
                  <span>+91 12345 67890</span>
                </div>
              </li>

              <li className="contact-panel__info-item">
                <span className="contact-panel__info-icon contact-panel__info-icon--email" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" fill="none" stroke="#fff" strokeWidth="2" />
                  </svg>
                </span>
                <div>
                  <strong>Email</strong>
                  <span>support@gnemitra.com</span>
                </div>
              </li>

              <li className="contact-panel__info-item">
                <span className="contact-panel__info-icon contact-panel__info-icon--address" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </span>
                <div>
                  <strong>Address</strong>
                  <span>G.N E-Mitra Center, 123 GovTech Park,<br />City, State, India 456789</span>
                </div>
              </li>

              <li className="contact-panel__info-item">
                <span className="contact-panel__info-icon contact-panel__info-icon--hours" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <strong>Opening Hours</strong>
                  <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                </div>
              </li>
            </ul>

            {/* Google Map embed */}
            <div className="contact-panel__map">
              <iframe
                title="G.N E-Mitra Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.123456789!2d74.6!3d26.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDI3JzAwLjAiTiA3NMKwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Social icons */}
            <div className="contact-panel__socials">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-panel__social-btn"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
