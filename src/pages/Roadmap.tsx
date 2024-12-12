import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Header from '../components/Header';
import Timeline from '../components/Timeline.tsx';
import AnimatedFace from '../components/AnimatedFace.tsx';

const PackageRoadmap: React.FC = () => {
    const color = "#ff0000"; // Define the color variable
    const intensity = 0.5; // Define the intensity variable

    return (
        <div className="relative flex flex-col min-h-screen">
            <div className="absolute inset-0 z-0">
            <AnimatedFace color={color} intensity={intensity} />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <Header />

                {/* Timeline */}
                <div className="mt-20">
                    <Timeline />
                </div>
            </div>
        </div>
    );
};

export default PackageRoadmap;
