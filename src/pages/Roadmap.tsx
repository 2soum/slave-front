import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Header from '../components/Header';
import BackgroundSVG from "../components/SVGPackage.tsx";
import Timeline from '../components/Timeline.tsx';

const PackageRoadmap: React.FC = () => {
    return (
        <div className="relative flex flex-col min-h-screen">
            <div className="absolute inset-0 z-0">
                <BackgroundSVG />
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
