    // src/pages/Home.tsx
import VoiceSig from '../components/VoiceSig';
import WelcomeOverlay from '../components/WelcomeOverlay';
import Header from '../components/Header';
import AnimatedFace from '../components/AnimatedFace';
const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <AnimatedFace />
      
      <VoiceSig />
      <WelcomeOverlay />
    </div>
  );
};

export default Home;