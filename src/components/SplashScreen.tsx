import React, { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';
import tatvaLogo from '@/assets/tatva-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1500);
    const timer3 = setTimeout(() => setStage(3), 2500);
    const timer4 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-cosmic flex items-center justify-center z-50">
      {/* Stars Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="floating-star bg-accent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Logo */}
        <div className={`mb-8 transition-all duration-1000 ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <img 
            src={tatvaLogo} 
            alt="Tatva" 
            className="w-32 h-32 mx-auto space-glow"
          />
        </div>

        {/* App Name */}
        <div className={`mb-6 transition-all duration-1000 delay-300 ${stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl font-orbitron font-bold bg-aurora bg-clip-text text-transparent">
            TATVA
          </h1>
          <p className="text-lg font-poppins text-muted-foreground mt-2">
            Space Learning Adventure
          </p>
        </div>

        {/* Rocket Animation */}
        <div className={`transition-all duration-1000 delay-500 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`inline-block transition-transform duration-2000 ${stage >= 3 ? 'transform -translate-y-96 scale-150' : ''}`}>
            <Rocket className="w-12 h-12 text-primary mx-auto animate-bounce" />
          </div>
        </div>

        {/* Loading Text */}
        <div className={`mt-8 transition-all duration-1000 delay-700 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-pulse">🚀</div>
            <span className="text-lg font-poppins text-foreground">
              Launching into space...
            </span>
            <div className="animate-pulse">⭐</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;