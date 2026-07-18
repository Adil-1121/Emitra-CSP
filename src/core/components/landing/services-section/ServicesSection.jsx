import React from 'react';
import './ServicesSection.scss';

const SERVICES = [
  {
    id: 1,
    title: 'Electricity Bill Payment',
    desc: 'Pay your electricity bills easily and securely through our quick digital platform.',
    img: '/images/Electricity Bill Payment.png',
  },
  {
    id: 2,
    title: 'Money Transfer',
    desc: 'Instant and secure domestic money transfer services for all banks across India.',
    img: '/images/Money Transfer.png',
  },
  {
    id: 3,
    title: 'Aadhaar & PAN Services',
    desc: 'Apply for, update, or link your Aadhaar and PAN cards with assistance.',
    img: '/images/Aadhar & PAN Services.png',
  },
  {
    id: 4,
    title: 'Government Schemes',
    desc: 'Discover and apply for various welfare schemes offered by the government.',
    img: '/images/Government Schemes.png',
  },
  {
    id: 5,
    title: 'Ration & Labour Registration',
    desc: 'Register for ration cards and labour identification for accessing benefits.',
    img: '/images/Ration & Labour Registration.png',
  },
  {
    id: 6,
    title: 'Driving License Renewal',
    desc: "Renew your driving license or apply for a learner's license online.",
    img: '/images/Driving License.png',
  },
  {
    id: 7,
    title: 'Birth & Death Certificates',
    desc: 'Hassle-free application and issuance of birth and death certificates.',
    img: '/images/Birth & Death Certificates.png',
  },
  {
    id: 8,
    title: 'Mobile & DTH Recharge',
    desc: 'Recharge your mobile plans and DTH connections instantly from anywhere.',
    img: '/images/Mobile & DTH Recharge.png',
  },
];

const ServicesSection = () => (
  <section className="services-section" id="services">
    <div className="services-section__inner">
      <div className="services-section__header">
        <h2 className="services-section__title">"Our Services"</h2>
        <p className="services-section__subtitle">
          Explore our wide range of digital &amp; government services designed to make life easier.
        </p>
      </div>

      <div className="services-section__grid">
        {SERVICES.map((s) => (
          <div className="services-card" key={s.id}>
            <div className="services-card__icon-wrap">
              <img src={s.img} alt={s.title} loading="lazy" />
            </div>
            <h3 className="services-card__title">{s.title}</h3>
            <p className="services-card__desc">{s.desc}</p>
            <button className="services-card__link" aria-label={`Read more about ${s.title}`}>
              Read More <span aria-hidden="true">›</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
