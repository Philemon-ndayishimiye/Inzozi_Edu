import React from 'react';
import { FaChartBar, FaSearch, FaClock } from 'react-icons/fa';
import FeatureCard from './cards/FeatureCard';

const ParentSection: React.FC = () => {
  const features = [
    {
      icon: <FaSearch className="w-5 h-5" />,
      title: 'Find Schools Easily',
      description: 'Browse comprehensive school profiles with detailed information about facilities, programs, and admission requirements.',
    },
    {
      icon: <FaClock className="w-5 h-5" />,
      title: 'Apply in Minutes',
      description: 'Complete your school applications online with our streamlined process. Upload documents once and apply everywhere.',
    },
    {
      icon: <FaChartBar className="w-5 h-5" />,
      title: 'Track Your Child\'s Admission',
      description: 'Monitor application status in real-time with updates, and communicate directly with school administrators.',
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#FFFFFF] to-[#CFDCEA] py-16 px-4">
      <div className="md:px-[80px]">
        <div className="text-center mb-12">
          <h2 className="text-[30px] font-bold  mb-4">
            <span className="text-[#223D60] font-family-playfair">You Are </span>
            <span className="text-[#E69500] font-family-playfair">a  Parent?</span>
          </h2>
          <p className="text-[#223D60] text-lg max-w-2xl mx-auto font-family-poppins">
            Simplify your child's educational journey with powerful tools designed for Rwandan families.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-4 flex flex-col justify-center">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                variant="default"
              />
            ))}
          </div>

          <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <video
                src="/videos/studentVideo.mp4"
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-opacity-10 rounded-xl p-8 w-full mx-auto backdrop-blur-sm">
            <h3 className="text-[#223D60] text-xl font-semibold mb-2 font-family-playfair">
              Join thousands of families already using Inzozi
            </h3>
            <p className="text-[#223D60] mb-6 font-family-poppins">
              Make informed decisions about your child's education with comprehensive school data and seamless application management.
            </p>
            <button className="bg-gradient-to-r from-[#053f69] to-[#cad9e9] hover:from-[#E69500] hover:to-[#E69500] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95">
              Continue As a Parent
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentSection;