import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaBook,
  FaVideo,
  FaQuestionCircle,
  FaDownload,
  FaEnvelope,
  FaComments,
} from 'react-icons/fa';
import FeatureBenefitCard from './cards/FeatureBenefitCard';

const ResourcesSupportSection: React.FC = () => {
  const { t } = useTranslation();
  const resources = [
    {
      icon: <FaBook className="w-7 h-7" />,
      title: t('resourcesSupport.r1Title'),
      description: t('resourcesSupport.r1Desc'),
      label: t('resourcesSupport.r1Label'),
      iconGradient: 'bg-[#054069]',
    },
    {
      icon: <FaVideo className="w-7 h-7" />,
      title: t('resourcesSupport.r2Title'),
      description: t('resourcesSupport.r2Desc'),
      label: t('resourcesSupport.r2Label'),
      iconGradient: 'bg-[#054069]',
    },
    {
      icon: <FaQuestionCircle className="w-7 h-7" />,
      title: t('resourcesSupport.r3Title'),
      description: t('resourcesSupport.r3Desc'),
      label: t('resourcesSupport.r3Label'),
      iconGradient: 'bg-[#054069]',
    },
    {
      icon: <FaDownload className="w-7 h-7" />,
      title: t('resourcesSupport.r4Title'),
      description: t('resourcesSupport.r4Desc'),
      label: t('resourcesSupport.r4Label'),
      iconGradient: 'bg-[#054069]',
    },
  ];

  const helpTopics = [
    t('resourcesSupport.topic1'),
    t('resourcesSupport.topic2'),
    t('resourcesSupport.topic3'),
    t('resourcesSupport.topic4'),
    t('resourcesSupport.topic5'),
    t('resourcesSupport.topic6'),
  ];

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="md:px-[80px]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            {t('resourcesSupport.title')}
          </h2>

          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            {t('resourcesSupport.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resources.map((resource, index) => (
            <FeatureBenefitCard
              key={index}
              icon={resource.icon}
              title={resource.title}
              description={resource.description}
              label={resource.label}
              variant="resource"
              iconGradient={resource.iconGradient}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-6">
              {t('resourcesSupport.popularTopics')}
            </h3>
            <div className="space-y-4">
              {helpTopics.map((topic, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <a 
                    href="#" 
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {topic}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-6">
              {t('resourcesSupport.needHelp')}
            </h3>

            <div className="bg-[#0B111E] p-6 rounded-lg">
              <div className="mb-4">
                <h4 className="text-white font-semibold text-lg mb-2">
                  {t('resourcesSupport.contactTitle')}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t('resourcesSupport.contactBody')}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{t('resourcesSupport.emailSupport')}</div>
                    <div className="text-gray-400 text-xs">info@inzoziedu.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-600 w-8 h-8 rounded-lg flex items-center justify-center">
                    <FaComments className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{t('resourcesSupport.liveChat')}</div>
                    <div className="text-gray-400 text-xs">{t('resourcesSupport.liveChatHours')}</div>
                  </div>
                </div>
              </div>

              <a
                href="mailto:info@inzoziedu.com"
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-sm transition-colors duration-200"
              >
                {t('resourcesSupport.contactButton')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSupportSection;