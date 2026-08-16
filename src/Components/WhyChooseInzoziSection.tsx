import React from 'react';
import {HiOutlineUser,HiSearch } from 'react-icons/hi';
import {
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaMapMarkerAlt,
  FaStar,
  
} from 'react-icons/fa';
import FeatureBenefitCard from './cards/FeatureBenefitCard';

const WhyChooseInzoziSection: React.FC = () => {
  const features = [
    {
      icon: <HiSearch className="w-7 h-7" />,
      title: 'Smart Discovery',
      description:
        'AI-powered search that learns your preferences and finds schools that truly match your needs.',
      iconGradient: 'bg-gradient-to-br from-[#F09C00] to-[#FFB833]',
    },
    {
      icon: <FaShieldAlt className="w-7 h-7" />,
      title: 'Verified Excellence',
      description:
        'Every school is personally verified by our team to ensure quality and authenticity.',
      iconGradient: 'bg-gradient-to-br from-[#05416B] to-[#60A5FA]',
    },
    {
      icon: <FaClock className="w-7 h-7" />,
      title: 'Real-time Updates',
      description:
        'Live admission tracking with instant notifications for new openings and deadlines.',
      iconGradient: 'bg-gradient-to-br from-green-500 to-green-600',
    },
    {
      icon: <FaUsers className="w-7 h-7" />,
      title: 'Community Insights',
      description:
        'Connect with real families and get authentic reviews from parents just like you.',
      iconGradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
    },
    {
      icon: <FaMapMarkerAlt className="w-7 h-7" />,
      title: 'Location Intelligence',
      description:
        'Advanced mapping with transport routes, safety ratings, and neighborhood insights.',
      iconGradient: 'bg-gradient-to-br from-red-500 to-orange-500',
    },
    {
      icon: <FaStar className="w-7 h-7" />,
      title: 'Quality Guarantee',
      description:
        'Our rating system combines parent reviews, academic performance, and facility standards.',
      iconGradient: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 md:px-[80px]">
        <div className="text-center mb-16">
          <h2 className="text-[30px] font-bold font-family-playfair mb-6 text-gray-800">
            Why Choose <span className="text-[#E69500]">Inzozi</span>?
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed font-family-poppins">
            We're not just a directory – we're your trusted partner in finding
            the perfect educational journey for your child.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
        <div className="text-center">
          <div className="text-[#E69500] flex justify-center items-center gap-1">
            <div className="w-6 h-6 rounded-full flex items-center justify-center">
              <HiOutlineUser className="w-5 h-5 text-[#E69500]" />
            </div>
            <span className="font-semibold text-sm">
              Trusted by 5,000+ Families
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseInzoziSection;