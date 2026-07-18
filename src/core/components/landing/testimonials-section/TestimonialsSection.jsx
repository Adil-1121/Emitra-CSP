import React, { useState, useEffect, useRef } from 'react';
import { getAllTestimonials, addTestimonial } from '../../../../services/testimonialService';
import './TestimonialsSection.scss';

const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';

const StarRating = ({ value, onChange }) => (
  <div className="ts-stars" role="group" aria-label="Star rating">
    {[1, 2, 3, 4, 5].map((s) => (
      <button
        key={s}
        type="button"
        className={`ts-stars__star${s <= value ? ' ts-stars__star--filled' : ''}`}
        onClick={() => onChange && onChange(s)}
        aria-label={`${s} star${s > 1 ? 's' : ''}`}
      >
        ★
      </button>
    ))}
  </div>
);

const TestimonialsSection = () => {
  const [reviews, setReviews]       = useState([]);
  const [current, setCurrent]       = useState(0);
  const [modalOpen, setModalOpen]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', image: null, rating: 0, comment: '',
  });
  const fileRef = useRef(null);

  useEffect(() => {
    getAllTestimonials()
      .then((res) => Array.isArray(res) ? setReviews(res) : setReviews([]))
      .catch(() => setReviews([]));
  }, []);

  const total = reviews.length;
  const prev  = () => setCurrent((c) => (c - 1 + total) % total);
  const next  = () => setCurrent((c) => (c + 1) % total);

  const avgRating = total
    ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / total).toFixed(1)
    : '4.8';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rating || !form.comment) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('name',    form.name);
      fd.append('email',   form.email);
      fd.append('rating',  form.rating);
      fd.append('comment', form.comment);
      if (form.image) fd.append('image', form.image);
      await addTestimonial(fd);
      const res = await getAllTestimonials();
      if (Array.isArray(res)) { setReviews(res); setCurrent(res.length - 1); }
      setModalOpen(false);
      setForm({ name: '', email: '', image: null, rating: 0, comment: '' });
    } catch (_) {
      // silent fail — keep modal open
    } finally {
      setSubmitting(false);
    }
  };

  const review = reviews[current];

  return (
    <section className="ts-section" id="testimonials">
      <div className="ts-section__inner">

        {/* ── Header ── */}
        <div className="ts-section__header">
          <h2 className="ts-section__title">What customers say about us</h2>
          <p className="ts-section__subtitle">
            We do our best to provide you the best experience ever
          </p>

          <div className="ts-section__rating-pill">
            <span className="ts-section__rating-star">★</span>
            <strong>{avgRating}</strong>
            <span>Average Rating (120+ Happy Customers)</span>
          </div>

          <button
            className="ts-section__write-btn"
            onClick={() => setModalOpen(true)}
            aria-label="Write a review"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Write a Review
          </button>
        </div>

        {/* ── Review Card ── */}
        {review && (
          <div className="ts-card">
            <div className="ts-card__avatar-wrap">
              <img
                src={review.image_url ? `${API_BASE}${review.image_url}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=ede9fe&color=7C3AED&size=80`}
                alt={review.name}
                className="ts-card__avatar"
              />
            </div>
            <div className="ts-card__body">
              <div className="ts-card__meta">
                <div>
                  <p className="ts-card__city">{review.city || 'Rajasthan'}</p>
                  <h3 className="ts-card__name">{review.name}</h3>
                </div>
                <div className="ts-card__rating-wrap">
                  <StarRating value={review.rating || 0} />
                  <span className="ts-card__rating-label">Rating</span>
                </div>
              </div>
              <p className="ts-card__comment">"{review.comment}"</p>
            </div>
          </div>
        )}

        {!review && (
          <div className="ts-card ts-card--empty">
            <p>No reviews yet. Be the first to write one!</p>
          </div>
        )}

        {/* ── Pagination ── */}
        <div className="ts-section__nav">
          <button className="ts-section__nav-btn" onClick={prev} aria-label="Previous review">‹</button>
          <div className="ts-section__dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`ts-section__dot${i === current ? ' ts-section__dot--active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
          <button className="ts-section__nav-btn" onClick={next} aria-label="Next review">›</button>
        </div>
      </div>

      {/* ── Add Review Modal ── */}
      {modalOpen && (
        <div className="ts-modal-overlay" role="dialog" aria-modal="true" aria-label="Add Review">
          <div className="ts-modal">
            <div className="ts-modal__header">
              <h3 className="ts-modal__title">Add Review</h3>
              <button
                className="ts-modal__close"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >✕</button>
            </div>

            <form className="ts-modal__form" onSubmit={handleSubmit}>
              <label className="ts-modal__label">
                Name
                <input
                  className="ts-modal__input"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>

              <label className="ts-modal__label">
                Email
                <input
                  className="ts-modal__input"
                  type="email"
                  placeholder="yourname@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>

              <label className="ts-modal__label">
                Upload Image
                <div className="ts-modal__file-wrap">
                  <button
                    type="button"
                    className="ts-modal__file-btn"
                    onClick={() => fileRef.current?.click()}
                  >
                    Choose File
                  </button>
                  <span className="ts-modal__file-name">
                    {form.image ? form.image.name : 'No file chosen'}
                  </span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => setForm({ ...form, image: e.target.files[0] || null })}
                  />
                </div>
              </label>

              <label className="ts-modal__label">
                Star Rating
                <StarRating
                  value={form.rating}
                  onChange={(v) => setForm({ ...form, rating: v })}
                />
              </label>

              <label className="ts-modal__label">
                Review
                <textarea
                  className="ts-modal__textarea"
                  placeholder="Share your experience..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  rows={4}
                  required
                />
              </label>

              <div className="ts-modal__actions">
                <button
                  type="button"
                  className="ts-modal__btn ts-modal__btn--cancel"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ts-modal__btn ts-modal__btn--save"
                  disabled={submitting}
                >
                  {submitting ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
