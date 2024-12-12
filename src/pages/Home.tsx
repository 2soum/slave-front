import React, { useState } from 'react';
import VoiceSig from '../components/VoiceSig';
import WelcomeOverlay from '../components/WelcomeOverlay';
import Header from '../components/Header';
import AnimatedFace from '../components/AnimatedFace';
import CopyButton from '../components/copy';

const Home: React.FC = () => {
  const [color, setColor] = useState<string>('#FFFFFF');
  const [intensity, setIntensity] = useState<number>(1);
  const [apiResponseText, setApiResponseText] = useState<string>('');
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(true);

  const updateColor = (newColor: string) => {
    setColor(newColor);
  };

  const updateIntensity = (newIntensity: number) => {
    setIntensity(newIntensity);
  };

  const updateApiResponseText = (newText: string) => {
    setApiResponseText(newText);
  };

  const hideOverlay = () => {
    setIsOverlayVisible(false);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <AnimatedFace color={color} intensity={intensity} />
      <div className="fixed top-4 right-4 z-50">
        <CopyButton color={color} />
      </div>
      <VoiceSig 
        updateColor={updateColor}
        updateIntensity={updateIntensity}
        updateApiResponseText={updateApiResponseText}
        toggleOverlay={hideOverlay}
        currentColor={color}
      />
      <WelcomeOverlay 
        apiResponseText={apiResponseText} 
        isVisible={isOverlayVisible} 
      />
    </div>
  );
};

export default Home;