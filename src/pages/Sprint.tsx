// src/pages/Sprint.tsx
import Sprints from '../components/Sprints';
import BackgroundSVG from '../components/SVGPackage';
import Header from '../components/Header';

const Sprint = () => {
  return (
      <div className="min-h-screen">
        <Header />
        <BackgroundSVG />
        <Sprints />
      </div>
  );
};

export default Sprint;