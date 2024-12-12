import React, { useEffect, useState } from 'react';

interface WelcomeOverlayProps {
  apiResponseText: string;
  isVisible: boolean;
}

const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ apiResponseText, isVisible }) => {
  const [, setDisplayText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [currentColor, setCurrentColor] = useState<string>('#3B82F6'); // Initial color (blue-500)

  // Handle typing animation
  useEffect(() => {
    if (apiResponseText) {
      const interval = setInterval(() => {
        setDisplayText((prevText) => prevText + apiResponseText[index]);
        setIndex((prevIndex) => prevIndex + 1);
        if (index >= apiResponseText.length - 1) {
          clearInterval(interval);
        }
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [apiResponseText, index]);

  // Reset text when apiResponseText changes
  useEffect(() => {
    setDisplayText('');
    setIndex(0);
  }, [apiResponseText]);

  // Random color change effect
  useEffect(() => {
    const colors = [
      '#3B82F6', // blue-500
      '#EF4444', // red-500
      '#10B981', // green-500
      '#F59E0B', // yellow-500
      '#8B5CF6', // purple-500
      '#EC4899', // pink-500
    ];

    const intervalId = setInterval(() => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setCurrentColor(randomColor);
    }, 3000); // Change color every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen overflow-hidden font-sans transition-all duration-1000 ease-in-out
        ${!isVisible ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes slideInDown {
          0% {
            opacity: 0;
            transform: translateY(-2rem);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideOutUp {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-2rem);
          }
        }

        .animate-slideInDown {
          animation: slideInDown 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        .animate-slideOutUp {
          animation: slideOutUp 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        .glow-text {
          transition: color 2s ease, text-shadow 2s ease;
          text-shadow: 0 0 5px currentColor,
                     0 0 10px currentColor;
        }
      `}</style>

      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className={`text-8xl md:text-[11rem] font-inter font-extrabold tracking-wider text-white text-center z-10 ${isVisible ? 'animate-slideInDown' : 'animate-slideOutUp'}`}>
          WELCOME
        </div>

        <div 
          className={`text-2xl md:text-[4rem] font-inter font-extrabold tracking-wider text-white text-center z-10 ${isVisible ? 'animate-slideInDown' : 'animate-slideOutUp'}`}
          style={{ animationDelay: '0.2s' }}
        >
          MON NOM EST <span 
            className="glow-text"
            style={{ 
              color: currentColor,
            }}
          >
            SLAVE
          </span>
        </div>

        <div
          className={`z-10 flex flex-col items-center font-inter font-black ${isVisible ? 'animate-slideInDown' : 'animate-slideOutUp'}`}
          style={{ animationDelay: '0.4s' }}
        >
          <canvas id="canvas" className="w-96 h-48" />
        </div>
      </div>

      <div className="absolute inset-0 backdrop-blur-sm bg-black/50 pointer-events-none" />
    </div>
  );
};

export default WelcomeOverlay;