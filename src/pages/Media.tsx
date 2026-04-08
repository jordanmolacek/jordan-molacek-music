import React from 'react';

const Media: React.FC = () => {
  // Creating an array of image URLs from photo3 to photo21
  const images = Array.from({ length: 19 }, (_, i) => `https://jordan-site-photos.s3.us-east-1.amazonaws.com/photo${i + 3}.jpg`);

  return (
    <div className="page-container">
      <h1 className="page-title">Media</h1>
      <div className="media-grid">
        {images.map((src, index) => (
          <img 
            key={index} 
            src={src} 
            alt={`Performance shot ${index + 1}`} 
            className="media-item" 
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default Media;
