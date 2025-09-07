import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const SpaceBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="floating-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        >
          <div className="w-full h-full bg-accent rounded-full opacity-70" />
        </div>
      ))}
      
      {/* Floating Planets */}
      <div className="absolute top-20 right-10 w-16 h-16 bg-secondary rounded-full opacity-30 animate-pulse" />
      <div className="absolute bottom-32 left-8 w-12 h-12 bg-primary rounded-full opacity-20 animate-bounce" />
      <div className="absolute top-1/2 left-4 w-8 h-8 bg-accent rounded-full opacity-40" 
           style={{ animation: 'float 6s ease-in-out infinite' }} />
    </div>
  );
};

export default SpaceBackground;