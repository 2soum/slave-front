    // src/pages/Home.tsx
import VoiceSig from '../components/VoiceSig';
import WelcomeOverlay from '../components/WelcomeOverlay';
import BackgroundSVG from '../components/SVGPackage';
import Header from '../components/Header';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <BackgroundSVG />
      <VoiceSig />
      <WelcomeOverlay />
    </div>
  );
};

export default Home;