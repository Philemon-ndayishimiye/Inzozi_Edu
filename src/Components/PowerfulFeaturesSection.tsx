import React from 'react';
import { 
  FaShieldAlt, 
  FaBolt, 
  FaGlobe, 
  FaComments, 
  FaChartBar, 
  FaLock,
} from 'react-icons/fa';
import FeatureBenefitCard from './cards/FeatureBenefitCard';

const PowerfulFeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <FaShieldAlt className="w-7 h-7" />,
      title: 'Secure Platform',
      description: 'Enterprise-grade security protecting sensitive student and school data with end-to-end encryption.',
      iconGradient: 'bg-gradient-to-br from-[#05416B] to-[#60A5FA]',
    },
    {
      icon: <FaBolt className="w-7 h-7" />,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures quick application processing and seamless user experience.',
      iconGradient: 'bg-gradient-to-br from-[#05416B] to-[#60A5FA]',
    },
    {
      icon: <FaGlobe className="w-7 h-7" />,
      title: 'Multi-Language Support',
      description: 'Available in Kinyarwanda and English to serve all Rwandan communities.',
      iconGradient: 'bg-gradient-to-br from-[#05416B] to-[#60A5FA]',
    },
    {
      icon: <FaComments className="w-7 h-7" />,
      title: 'Real-time Communication',
      description: 'Instant messaging between schools and parents for quick updates and clarifications.',
      iconGradient: 'bg-gradient-to-br from-[#05416B] to-[#60A5FA]',
    },
    {
      icon: <FaChartBar className="w-7 h-7" />,
      title: 'Comprehensive Analytics',
      description: 'Detailed insights and reports to help schools.',
      iconGradient: 'bg-gradient-to-br from-[#05416B] to-[#60A5FA]',
    },
    {
      icon: <FaLock className="w-7 h-7" />,
      title: 'Privacy First',
      description: 'GDPR-compliant privacy controls ensuring your personal information remains protected.',
      iconGradient: 'bg-gradient-to-br from-[#05416B] to-[#60A5FA]',
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="md:px-[80px]">
        <div className="text-center mb-16">
          <h2 className="text-[30px] font-bold mb-6 text-gray-800 font-family-playfair">
            Powerful Features
          </h2>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Everything you need to modernize education management in Rwanda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureBenefitCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconGradient={feature.iconGradient}
              variant="default"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerfulFeaturesSection;