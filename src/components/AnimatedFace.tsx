// src/components/AnimatedFace.tsx
import React, { useEffect, useState } from 'react';
import BackgroundSVG from './SVGPackage';

interface AnimatedFaceProps {
  color?: string; // Make color optional
  intensity: number;
}
const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const AnimatedFace: React.FC<AnimatedFaceProps> = ({ color: initialColor, intensity }) => {
  const [color, setColor] = useState<string>(initialColor || getRandomColor());

  useEffect(() => {
    if (initialColor) {
      setColor(initialColor);
    }
  }, [initialColor]);



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
