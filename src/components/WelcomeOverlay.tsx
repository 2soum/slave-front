// src/components/WelcomeOverlay.tsx
import React, { useEffect, useState } from 'react';

interface WelcomeOverlayProps {
  apiResponseText: string;
}

const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({ apiResponseText }) => {
  const textOverlayStyle = "opacity-0 transform -translate-y-12 animate-fadeInSlideDown";
  const [displayText, setDisplayText] = useState<string>('');
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (apiResponseText) {
      const interval = setInterval(() => {
        setDisplayText((prevText) => prevText + apiResponseText[index]);
        setIndex((prevIndex) => prevIndex + 1);
        if (index >= apiResponseText.length - 1) {
          clearInterval(interval);
        }
      }, 100); // Adjust the speed of the typing animation here
    }
  }, [apiResponseText, index]);

  useEffect(() => {
    setDisplayText('');
    setIndex(0);
  }, [apiResponseText]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden font-sans">
      {/* Chargement explicite de la police Inter depuis Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');

        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="w-full h-full flex flex-col items-center justify-center ">
        {/* Welcome Text */}
        <div
          className={`text-[11rem] font-inter font-extrabold tracking-wider text-white text-center z-10 ${textOverlayStyle}`}
        >
          WELCOME
        </div>

        {/* Name Text */}
        <div
          className={`text-[4rem] font-inter font-extrabold tracking-wider text-white text-center z-10 ${textOverlayStyle}`}
          style={{ animationDelay: '0.2s' }}
        >
          MON NOM EST <span className="text-blue-500">SLAVE</span>
        </div>

        {/* API Response Text */}
        <div
          className={`text-[2rem] font-inter font-extrabold tracking-wider text-white text-center z-10 ${textOverlayStyle}`}
          style={{ animationDelay: '0.4s' }}
        >
          La couleur sélectionnée est "{displayText}"
        </div>

        {/* Canvas Section */}
        <div
          className={`z-10 flex flex-col items-center font-inter font-black ${textOverlayStyle}`}
          style={{ animationDelay: '0.6s' }}
        >
          <canvas id="canvas" className="w-96 h-48" />
        </div>
      </div>

      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10 pointer-events-none" />
    </div>
  );
};

export default WelcomeOverlay;
