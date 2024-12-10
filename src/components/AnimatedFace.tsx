import React, { useState, useEffect } from 'react';
import BackgroundSVG from './SVGPackage';

const AnimatedFace = () => {
  // Génère une couleur hexadécimale aléatoire
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Génère une intensité aléatoire entre 0.3 et 2
  const getRandomIntensity = () => {
    return 0.3 + Math.random() * 1.7;
  };

  const [color, setColor] = useState(getRandomColor());
  const [intensity, setIntensity] = useState(getRandomIntensity());

  useEffect(() => {
    const changeState = () => {
      // Change la couleur
      setColor(getRandomColor());
      // Change l'intensité
      setIntensity(getRandomIntensity());
    };

    // Change d'état toutes les 2-4 secondes
    const intervalTime = 2000 + Math.random() * 2000;
    const interval = setInterval(changeState, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 transition-colors duration-700">
        <BackgroundSVG 
          color={color}
          baseIntensity={intensity}
        />
      </div>
    </div>
  );
};

export default AnimatedFace;