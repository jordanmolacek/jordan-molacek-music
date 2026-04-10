import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Contact</h1>
      <div className="contact-info">
      
        <div className="contact-method">
          <h3>Booking & Inquiries</h3>
          <p style={{ marginBottom: 0 }}>
            <a href="mailto:jordanmolacek@gmail.com" style={{ color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: 'bold' }}>
              Email
            </a>
          </p>
        </div>

        <div className="contact-method">
          <h3>Follow Online</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
            <a href="https://www.instagram.com/jordanmolacek/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.25rem' }}>
              Instagram
            </a>
            <a href="https://www.tiktok.com/@jordanmolacek" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.25rem' }}>
              TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
