import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const features = [
    {
      icon: <FaShieldAlt className="w-7 h-7" />,
      title: t('powerfulFeatures.f1Title'),
      description: t('powerfulFeatures.f1Desc'),
      iconGradient: 'bg-gradient-to-br from-[#05416B] to-[#60A5FA]',
    },
    {
      icon: <FaBolt className="w-7 h-7" />,
      title: t('powerfulFeatures.f2Title'),
      description: t('powerfulFeatures.f2Desc'),
      iconGradient: 'bg-gradient-to-br from-[#05416B] to-[#60A5FA]',
    },
    {
      icon: <FaGlobe className="w-7 h-7" />,
      title: t('powerfulFeatures.f3Title'),
      description: t('powerfulFeatures.f3Desc'),
      iconGradient: 'bg-gradient-to-br from-[#05416B] to-[#60A5FA]',
    },
    {
      icon: <FaComments className="w-7 h-7" />,
      title: t('powerfulFeatures.f4Title'),
      description: t('powerfulFeatures.f4Desc'),
      iconGradient: 'bg-gradient-to-br from-[#05416B] to-[#60A5FA]',
    },
    {
      icon: <FaChartBar className="w-7 h-7" />,
      title: t('powerfulFeatures.f5Title'),
      description: t('powerfulFeatures.f5Desc'),
      iconGradient: 'bg-gradient-to-br from-[#05416B] to-[#60A5FA]',
    },
    {
      icon: <FaLock className="w-7 h-7" />,
      title: t('powerfulFeatures.f6Title'),
      description: t('powerfulFeatures.f6Desc'),
      iconGradient: 'bg-gradient-to-br from-[#05416B] to-[#60A5FA]',
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="md:px-[80px]">
        <div className="text-center mb-16">
          <h2 className="text-[30px] font-bold mb-6 text-gray-800 font-family-playfair">
            {t('powerfulFeatures.title')}
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            {t('powerfulFeatures.subtitle')}
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