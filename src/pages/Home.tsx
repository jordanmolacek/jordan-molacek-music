import React from 'react';
import HeroSection from '../components/HeroSection';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection 
        imageUrl="https://jordan-site-photos.s3.us-east-1.amazonaws.com/photo1.jpg"
        title="Jordan Molacek"
        subtitle="Pedal Steel Guitar"
        ctaText="View Gigs"
        ctaLink="/shows"
      />
      <div className="page-container">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            I play pedal steel because I love the way it feels. I have a deep respect for the 
            legends who built this sound. I’m here to find the emotion in the music and 
            keep the tradition alive.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
