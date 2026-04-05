import React from 'react';

const About: React.FC = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">About</h1>
      <div className="about-content">
        <img 
          src="https://jordan-site-photos.s3.us-east-1.amazonaws.com/photo2.jpg" 
          alt="Jordan Molacek playing pedal steel" 
          className="about-image"
        />
        <div className="about-text">
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>Jordan Molacek</h2>
          <p>
            Traditional pedal steel. I have an immense respect for the legends who carved out this sound decades ago. 
          </p>
          <p>
            My work is simple: honor that history and bring real emotion to every stage I play on.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
