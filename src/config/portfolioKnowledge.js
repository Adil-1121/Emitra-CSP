// ── Centralized G.N E-Mitra Knowledge Base ────────────────────────────────────
// All chatbot responses are driven from this single source of truth.
// To update info, edit only this file.

export const EMITRA_INFO = {
  name: 'G.N E-Mitra',
  fullName: 'G.N E-Mitra CSP (Customer Service Point)',
  tagline: 'Your Trusted Digital Service Partner',
  founded: '2018',
  owner: 'Sameer Khan',
  address: 'Sardarr Bazaar, Barli, Bhinay, Ajmer, Rajasthan – 305624',
  phone: 'Not Available',
  email: 'Not Available',
  hours: 'Mon–Sat: 9:00 AM – 7:00 PM',
  registration: 'Not Available',
  category: 'Government Authorized E-Mitra CSP',
  mission: 'Bringing government services to every citizen\'s doorstep through technology.',
  social: {
    facebook: 'https://facebook.com/gnemitra',
    instagram: 'https://instagram.com/gnemitra',
    whatsapp: 'https://wa.me/Not-Available',
  },
};

export const SERVICES = [
  {
    name: 'Aadhaar & PAN Services',
    desc: 'New Aadhaar enrollment, Aadhaar update (name, address, mobile, DOB), PAN card application and correction.',
    docs: ['Existing Aadhaar (for update)', 'Passport photo', 'Address proof', 'DOB proof'],
  },
  {
    name: 'Bill Payments',
    desc: 'Electricity, water, gas, and other utility bill payments via government-approved gateways. Instant receipt provided.',
    docs: ['Consumer number / account number'],
  },
  {
    name: 'Money Transfer',
    desc: 'AEPS (Aadhaar Enabled Payment System) and IMPS-based money transfers. Safe, fast, and government-authorized.',
    docs: ['Aadhaar card', 'Biometric verification'],
  },
  {
    name: 'Government Schemes',
    desc: 'Registration and application for PM Kisan, Jan Dhan, Ujjwala Yojana, Ayushman Bharat, and other central/state schemes.',
    docs: ['Aadhaar', 'Bank passbook', 'Ration card (if applicable)'],
  },
  {
    name: 'Birth & Death Certificates',
    desc: 'Application and download of birth and death certificates from the Rajasthan government portal.',
    docs: ['Hospital discharge summary', 'Parent\'s Aadhaar', 'Address proof'],
  },
  {
    name: 'Driving License',
    desc: 'New DL application, renewal, and address change via Parivahan portal.',
    docs: ['Aadhaar', 'Passport photo', 'Age proof', 'Address proof'],
  },
  {
    name: 'Passport Services',
    desc: 'Assistance with fresh passport application and renewal through the Passport Seva portal.',
    docs: ['Aadhaar', 'Birth certificate', 'Address proof', 'Passport photo'],
  },
  {
    name: 'Mobile & DTH Recharge',
    desc: 'Instant recharge for all mobile operators and DTH services.',
    docs: ['Mobile/DTH number'],
  },
  {
    name: 'Ration & Labour Registration',
    desc: 'New ration card application, modification, and labour department registrations.',
    docs: ['Aadhaar', 'Family details', 'Income certificate'],
  },
  {
    name: 'Document Scanning & Printing',
    desc: 'High-quality scanning, printing, lamination, and photocopying services.',
    docs: [],
  },
];

export const FAQS = [
  {
    q: 'What documents do I need for Aadhaar update?',
    a: 'For Aadhaar update you need your existing Aadhaar card, a supporting document for the field you want to update (address proof, DOB proof, etc.), and a passport-size photo. Visit our center for biometric verification.',
  },
  {
    q: 'How long does a PAN card application take?',
    a: 'After submitting the application at our center, the PAN card is typically delivered within 15–20 working days to your registered address.',
  },
  {
    q: 'Can I pay my electricity bill here?',
    a: 'Yes! We support instant electricity bill payments for JVVNL, AVVNL, and JDVVNL. Just bring your consumer number and we\'ll process it immediately.',
  },
  {
    q: 'What are your working hours?',
    a: `We are open Monday to Saturday, 9:00 AM to 7:00 PM. We are closed on Sundays and public holidays.`,
  },
  {
    q: 'Is money transfer safe here?',
    a: 'Absolutely. We use AEPS (Aadhaar Enabled Payment System) which is a government-authorized, RBI-regulated system. Your biometric data is used for authentication — completely secure.',
  },
];

export const QUICK_ACTIONS = [
  { id: 'services',      label: '🛠️ Our Services',      query: 'What services do you offer?' },
  { id: 'aadhaar',       label: '🪪 Aadhaar Services',   query: 'Tell me about Aadhaar services' },
  { id: 'bills',         label: '💡 Bill Payment',        query: 'How can I pay my electricity bill?' },
  { id: 'certificates',  label: '📄 Certificates',        query: 'How to apply for birth certificate?' },
  { id: 'hours',         label: '🕐 Working Hours',       query: 'What are your working hours?' },
  { id: 'contact',       label: '📞 Contact Us',          query: 'How can I contact you?' },
  { id: 'location',      label: '📍 Location',            query: 'Where are you located?' },
  { id: 'money',         label: '💸 Money Transfer',      query: 'Tell me about money transfer' },
];
