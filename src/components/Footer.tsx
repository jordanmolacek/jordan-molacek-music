import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://www.instagram.com/jordanmolacek/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a href="https://www.tiktok.com/@jordanmolacek" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
          </svg>
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Jordan Molacek. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
