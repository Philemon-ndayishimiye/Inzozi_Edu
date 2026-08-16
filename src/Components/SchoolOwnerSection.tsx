import React from 'react';
import { FaUser, FaClipboardList, FaChartLine } from 'react-icons/fa';
import FeatureCard from './cards/FeatureCard';

const SchoolOwnerSection: React.FC = () => {
  const features = [
    {
      icon: <FaUser className="w-5 h-5" />,
      title: 'Create your School Profile',
      description: 'Easily register your school online, add details like location, programs, and contact information to increase visibility.',
    },
    {
      icon: <FaClipboardList className="w-5 h-5" />,
      title: 'Receive & Track Applications',
      description: 'Submit applications to multiple schools with our streamlined process. Upload documents once and apply everywhere.',
    },
    {
      icon: <FaChartLine className="w-5 h-5" />,
      title: 'Connect with Parents',
      description: 'Send updates, respond to inquiries, and keep parents informed. Build trust through direct communication.',
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#FFFFFF] to-[#CFDCEA] py-16 px-4">
      <div className="md:px-[80px]">
        <div className="text-center mb-12">
          <h2 className="text-[30px] font-bold mb-4 font-family-playfair">
            <span className="text-[#223D60]">You own </span>
            <span className="text-[#E69500]">a School?</span>
          </h2>
          <p className="text-[#223D60] text-lg max-w-2xl mx-auto">
            Grow your school faster with Inzozi—reach more parents, manage applications effortlessly, and build your reputation online.
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
                src="/videos/pinterest-video.mp4"
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
            <h3 className="text-[#223D60] text-xl font-semibold mb-2">
              Join thousands of families already using Inzozi
            </h3>
            <p className="text-[#223D60] mb-6">
              Make informed decisions about your child's education with comprehensive school data and seamless application management.
            </p>
            <button className="bg-gradient-to-r from-[#053f69] to-[#cad9e9] hover:from-[#E69500] hover:to-[#E69500] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95">
              Continue As  Owner
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolOwnerSection;