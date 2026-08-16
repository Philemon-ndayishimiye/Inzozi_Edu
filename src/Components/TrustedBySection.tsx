import React from 'react';
import { HiTrendingUp } from 'react-icons/hi';
import { FaSchool, FaUsers, FaMapMarkerAlt, FaAward } from 'react-icons/fa';
import StatisticCard from './cards/StatisticCard';

const TrustedBySection: React.FC = () => {
  const statistics = [
    {
      icon: <FaSchool />,
      value: '200+',
      label: 'Quality Schools',
      subtitle: 'Verified & trusted',
    },
    {
      icon: <FaUsers />,
      value: '8,500+',
      label: 'Happy Families',
      subtitle: 'Successfully placed',
    },
    {
      icon: <FaMapMarkerAlt />,
      value: '30',
      label: 'Districts',
      subtitle: 'Complete coverage',
    },
    {
      icon: <FaAward />,
      value: '99%',
      label: 'Success Rate',
      subtitle: 'Satisfaction guaranteed',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-[#D2A24A] to-[#B99043] py-16 px-4 relative overflow-hidden">
      <div className="absolute top-4 right-8">
        <div className="w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-8 left-8">
        <div className="w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      <div className="md:px-[80px]">
        <div className="text-center mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/30">
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                <HiTrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-semibold text-sm">
                Growing Every Day
              </span>
            </div>
          </div>

          <h2 className="text-[30px] font-bold text-white mb-4 font-family-playfair">
            Trusted by Families and Schools
          </h2>
          
          <h3 className="text-2xl md:text-3xl font-semibold text-white/90 mb-6 font-family-playfair">
            Across Rwanda font-family-playfair
          </h3>

          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Join thousands of families who have found their perfect school match through our platform. Your child's educational journey starts here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <StatisticCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              subtitle={stat.subtitle}
              variant="transparent"
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border border-white/30">
            <div className="flex">
              <div className="w-4 h-4 bg-gradient-to-br from-[#60A5FA] to-[#2563EB] rounded-full" style={{opacity: '0.8'}}></div>
              <div className="w-4 h-4 bg-gradient-to-br from-[#4ADE80] to-[#16A34A] rounded-full" style={{opacity: '0.8'}}></div>
              <div className="w-4 h-4 bg-gradient-to-br from-[#C084FC] to-[#9333EA] rounded-full" style={{opacity: '0.8'}}></div>
              <div className="w-4 h-4 bg-gradient-to-br from-[#F87171] to-[#DC2626] rounded-full" style={{opacity: '0.8'}}></div>
            </div>
            <span className="text-white font-semibold text-sm">
              Join our growing community today!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;