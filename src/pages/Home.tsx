import React from 'react';
import HeroSection from '../components/HeroSection';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection 
        imageUrl="https://jordan-site-photos.s3.us-east-1.amazonaws.com/photo1.jpg"
        title="Jordan Molacek"
        subtitle="Live Music • Performance • Entertainment"
        ctaText="View Upcoming Shows"
        ctaLink="/shows"
      />
      <div className="page-container">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Welcome</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            Experience the energy and passion of live music. Whether it's an intimate acoustic set or a full band performance, 
            I bring high-quality entertainment to every stage. Explore past shows, check out the media gallery, and catch me at my next gig.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
