import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import BackgroundSVG from "../components/SVGPackage.tsx";
import Timeline from '../components/Timeline.tsx';


const PackageRoadmap :React.FC=() => {
  return (
    <div className='flex flex-col'>
    {/* Fond SVG */}
    <div className="absolute inset-0 z-0">
      <BackgroundSVG />
    </div>

    {/* Header */}
    <div>
      <Header />
    </div>

    {/* Timeline au centre */}
    <div>
      <Timeline />
    </div>
  </div>

 
  );
};

export default PackageRoadmap;