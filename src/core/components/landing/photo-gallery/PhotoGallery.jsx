import React, { useState } from 'react';
import './PhotoGallery.scss';

const TABS = [
  { id: 'all',      label: 'All' },
  { id: 'services', label: 'Services in Action' },
  { id: 'office',   label: 'Office Setup & Infrastructure' },
  { id: 'events',   label: 'Events & Awareness Drives' },
  { id: 'staff',    label: 'Staff & Customer Engagement' },
];

const PHOTOS = [
  {
    id: 1,
    src: '/images/gallery-images (1).jpg',
    caption: 'Customer updating Aadhar details.',
    category: 'services',
  },
  {
    id: 2,
    src: '/images/gallery-images (2).jpg',
    caption: 'PAN card correction at our desk',
    category: 'services',
  },
  {
    id: 3,
    src: '/images/gallery-images (3).jpg',
    caption: 'PAN card correction at our desk',
    category: 'services',
  },
  {
    id: 4,
    src: '/images/gallery-images (4).jpg',
    caption: 'Electricity bill payment assistance',
    category: 'services',
  },
  {
    id: 5,
    src: '/images/gallery-images (5).jpg',
    caption: 'Reception desk view',
    category: 'office',
  },
  {
    id: 6,
    src: '/images/gallery-images (6).jpg',
    caption: 'Waiting area for customers',
    category: 'office',
  },
  {
    id: 7,
    src: '/images/Online form filling assistance.png',
    caption: 'Driving area for customers',
    category: 'staff',
  },
  {
    id: 8,
    src: '/images/Staff helping customer.png',
    caption: 'Computer setup for digital work',
    category: 'staff',
  },
];

const PhotoGallery = () => {
  const [active, setActive] = useState('all');

  const filtered = active === 'all'
    ? PHOTOS
    : PHOTOS.filter((p) => p.category === active);

  return (
    <section className="photo-gallery" id="gallery">
      <div className="photo-gallery__inner">

        {/* ── Header ── */}
        <div className="photo-gallery__header">
          <span className="photo-gallery__label">Our Gallery</span>
          <h2 className="photo-gallery__title">
            Our Work in Action – G.N-Mitra Photo Gallery
          </h2>
          <p className="photo-gallery__subtitle">
            Welcome to our gallery! Here explore real moments from G.N E-Mitra's
            community support, offices, and community engagement.
          </p>
        </div>

        {/* ── Filter Tabs ── */}
        <div className="photo-gallery__tabs" role="tablist" aria-label="Gallery filter">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === tab.id}
              className={`photo-gallery__tab${active === tab.id ? ' photo-gallery__tab--active' : ''}`}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div className="photo-gallery__grid">
          {filtered.map((photo) => (
            <div className="photo-gallery__card" key={photo.id}>
              <div className="photo-gallery__img-wrap">
                <img src={photo.src} alt={photo.caption} loading="lazy" />
              </div>
              <p className="photo-gallery__caption">{photo.caption}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PhotoGallery;
