import React from 'react';

// Définir l'interface Window globale
declare global {
  interface Window {
    start?: () => void;
  }
}

const WelcomeOverlay: React.FC = () => {
  const textOverlayStyle = "opacity-0 transform -translate-y-12 animate-fadeInSlideDown";

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