import React from 'react';

const About: React.FC = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">About</h1>
      <div className="about-content">
        <img 
          src="https://jordan-site-photos.s3.us-east-1.amazonaws.com/photo2.jpg" 
          alt="Jordan Molacek performing" 
          className="about-image"
        />
        <div className="about-text">
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-color)' }}>Jordan Molacek</h2>
          <p>
            Jordan is a dynamic and versatile musician known for bringing high energy and professional quality to every performance. 
            With years of experience playing across various venues and cities, Jordan has developed a sound and stage presence that resonates with audiences of all sizes.
          </p>
          <p>
            From intimate acoustic settings to large-scale events with a full band, Jordan's commitment to musical excellence is evident in every note. 
            Specializing in multiple instruments and styles, the music speaks for itself—creating memorable experiences for fans and event-goers alike.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
