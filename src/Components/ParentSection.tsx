import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaChartBar, FaSearch, FaClock } from 'react-icons/fa';
import FeatureCard from './cards/FeatureCard';

const ParentSection: React.FC = () => {
  const { t } = useTranslation();
  const features = [
    {
      icon: <FaSearch className="w-5 h-5" />,
      title: t('parentSection.f1Title'),
      description: t('parentSection.f1Desc'),
    },
    {
      icon: <FaClock className="w-5 h-5" />,
      title: t('parentSection.f2Title'),
      description: t('parentSection.f2Desc'),
    },
    {
      icon: <FaChartBar className="w-5 h-5" />,
      title: t('parentSection.f3Title'),
      description: t('parentSection.f3Desc'),
    },
  ];

  return (
    <section className="bg-gradient-to-r from-[#FFFFFF] to-[#CFDCEA] py-16 px-4">
      <div className="md:px-[80px]">
        <div className="text-center mb-12">
          <h2 className="text-[30px] font-bold  mb-4">
            <span className="text-[#223D60] font-family-playfair">{t('parentSection.titleLine1')} </span>
            <span className="text-[#E69500] font-family-playfair">{t('parentSection.titleLine2')}</span>
          </h2>
          <p className="text-[#223D60] text-lg max-w-2xl mx-auto font-family-poppins">
            {t('parentSection.subtitle')}
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
                cardBgColor="bg-primary-color"
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
              {t('parentSection.ctaTitle')}
            </h3>
            <p className="text-[#223D60] mb-6 font-family-poppins">
              {t('parentSection.ctaBody')}
            </p>
            <button
              onClick={() => document.getElementById('schools')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-[#053f69] to-[#cad9e9] hover:from-[#E69500] hover:to-[#E69500] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              {t('parentSection.ctaButton')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentSection;