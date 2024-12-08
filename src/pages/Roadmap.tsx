import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import BackgroundSVG from "../components/SVGPackage.tsx";


interface DeliveryStatusProps {
  status: string;
  title: string;
  date?: string;
  description?: string;
  isLast: boolean;
}

const DeliveryStatus: React.FC<DeliveryStatusProps> = ({ status, title, date, description }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          bgColor: 'bg-green-600',
          textColor: 'text-green-600',
          borderColor: 'border-green-600'
        };
      case 'cancelled':
        return {
          icon: <XCircle className="w-5 h-5" />,
          bgColor: 'bg-red-600',
          textColor: 'text-red-600',
          borderColor: 'border-red-600'
        };
      default:
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          bgColor: 'bg-gray-600',
          textColor: 'text-gray-600',
          borderColor: 'border-gray-600'
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className="flex md:contents">
      <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">
        <div className="h-full w-6 flex items-center justify-center">
          <div className={`h-full w-1 ${styles.borderColor} pointer-events-none`}></div>
        </div>
        <div className={`w-6 h-6 absolute top-1/2 -mt-3 rounded-full ${styles.bgColor} shadow text-center`}>
          {styles.icon}
        </div>
      </div>
      <div className={`${styles.bgColor} col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full`}>
        <h3 className="font-semibold text-lg mb-1 text-white">{title}</h3>
        {date && <p className="leading-tight text-gray-100">{date}</p>}
        {description && <p className="leading-tight text-gray-100 mt-1">{description}</p>}
      </div>
    </div>
  );
};

const PackageRoadmap = () => {
  const steps = [
    {
      status: 'completed',
      title: 'Package Booked',
      date: '21 July 2021, 04:30 PM',
    },
    {
      status: 'completed',
      title: 'Out for Delivery',
      date: '22 July 2021, 01:00 PM',
    },
    {
      status: 'cancelled',
      title: 'Cancelled',
      date: '',
      description: 'Customer cancelled the order',
    },
    {
      status: 'pending',
      title: 'Delivered',
      date: '',
    },
  ];

  return (
    <div className="min-h-screen ">
      <Header />
      <BackgroundSVG />
      <div className="container mx-auto p-8">
        <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
          {steps.map((step, index) => (
            <DeliveryStatus
              key={index}
              status={step.status}
              title={step.title}
              date={step.date}
              description={step.description}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageRoadmap;