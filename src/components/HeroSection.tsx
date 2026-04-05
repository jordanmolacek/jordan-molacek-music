import React from 'react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageUrl, title, subtitle, ctaText, ctaLink }) => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <Link to={ctaLink} className="btn">
          {ctaText}
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
