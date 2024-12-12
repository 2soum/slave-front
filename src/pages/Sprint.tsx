// src/pages/Sprint.tsx
import Sprints from '../components/Sprints';
import Header from '../components/Header';
import AnimatedFace from '../components/AnimatedFace';

const Sprint = () => {
  const color = "#00BFFF"; // Define the color variable in a blue cyan hexa
  const intensity = 0.5; // Define the intensity variable
  return (
      <div className="min-h-screen">
        <Header />
        <AnimatedFace color={color} intensity={intensity} />
        <Sprints />
      </div>
  );
};

export default Sprint;