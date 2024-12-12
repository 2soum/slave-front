// src/pages/Sprint.tsx
import Sprints from '../components/Sprints';
import Header from '../components/Header';
import AnimatedFace from '../components/AnimatedFace';

const Sprint = () => {
  return (
      <div className="min-h-screen">
        <Header />
        <AnimatedFace intensity={0} />
        <Sprints />
      </div>
  );
};

export default Sprint;