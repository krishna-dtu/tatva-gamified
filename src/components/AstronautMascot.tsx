import React, { useState, useEffect } from 'react';
import astronautImage from '@/assets/astronaut-mascot.png';

interface AstronautMascotProps {
  message?: string;
  variant?: 'floating' | 'talking' | 'cheering' | 'thinking';
  size?: 'sm' | 'md' | 'lg';
}

const AstronautMascot: React.FC<AstronautMascotProps> = ({ 
  message, 
  variant = 'floating',
  size = 'md' 
}) => {
  const [currentMessage, setCurrentMessage] = useState(message);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (message) {
      setCurrentMessage(message);
    }
  }, [message]);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32'
  };

  const animationClasses = {
    floating: 'astronaut-float',
    talking: 'animate-bounce',
    cheering: 'animate-pulse',
    thinking: 'animate-pulse'
  };

  return (
    <div className={`relative ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
      {/* Astronaut Image */}
      <div className={`${sizeClasses[size]} ${animationClasses[variant]} relative z-10`}>
        <img 
          src={astronautImage} 
          alt="Master Astronaut"
          className="w-full h-full object-contain space-glow"
        />
        {variant === 'cheering' && (
          <div className="absolute -top-2 -right-2 text-accent text-xl animate-bounce">⭐</div>
        )}
      </div>

      {/* Speech Bubble */}
      {currentMessage && (
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border border-border/50 min-w-48 max-w-64 animate-fade-in">
          <p className="text-sm font-medium text-center text-card-foreground">
            {currentMessage}
          </p>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-card/90" />
          </div>
        </div>
      )}

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl scale-110 -z-10 animate-pulse" />
    </div>
  );
};

export default AstronautMascot;