import React from 'react';
import './GallerySection.scss';

const GALLERY = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&q=80',
    caption: 'Community Support: Bridging Digital Divide',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80',
    caption: 'Passport Services: New & Renewal Applications',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80',
    caption: 'Aadhaar Services: Easy Enrollment & Updates',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80',
    caption: 'Bill Payment Services',
  },
];

const GallerySection = () => (
  <div className="gallery-section">
    {GALLERY.map((item) => (
      <div className="gallery-section__item" key={item.id}>
        <img src={item.img} alt={item.caption} loading="lazy" />
        <div className="gallery-section__caption">{item.caption}</div>
      </div>
    ))}
  </div>
);

export default GallerySection;
