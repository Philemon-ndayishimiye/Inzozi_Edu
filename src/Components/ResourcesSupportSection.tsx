import React from 'react';
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
  const resources = [
    {
      icon: <FaBook className="w-7 h-7" />,
      title: 'Getting Started Guide',
      description: 'Comprehensive guide to help parents and schools get started with Inzozi.',
      label: 'GUIDE',
      iconGradient: 'bg-[#054069]',
    },
    {
      icon: <FaVideo className="w-7 h-7" />,
      title: 'Video Tutorials',
      description: 'Step-by-step video walkthroughs for all platform features.',
      label: 'VIDEOS',
      iconGradient: 'bg-[#054069]',
    },
    {
      icon: <FaQuestionCircle className="w-7 h-7" />,
      title: 'Frequently Asked Questions',
      description: 'Find quick answers to common questions about admissions and applications.',
      label: 'FAQ',
      iconGradient: 'bg-[#054069]',
    },
    {
      icon: <FaDownload className="w-7 h-7" />,
      title: 'Application Templates',
      description: 'Download simple application forms and required document checklists.',
      label: 'TEMPLATES',
      iconGradient: 'bg-[#054069]',
    },
  ];

  const helpTopics = [
    'How to create a school profile',
    'Understanding admission requirements',
    'Managing multiple applications',
    'Setting up communication preferences',
    'Tracking application status',
    'Payment and fee structures',
  ];

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="md:px-[80px]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Resources & Support
          </h2>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Everything you need to make the most of Inzozi's platform
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
              Popular Help Topics
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
              Need More Help?
            </h3>
            
            <div className="bg-[#0B111E] p-6 rounded-lg">
              <div className="mb-4">
                <h4 className="text-white font-semibold text-lg mb-2">
                  Contact Our Support Team
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our dedicated support team is here to help you succeed. Get personalized assistance for your specific needs.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Email Support</div>
                    <div className="text-gray-400 text-xs">support@inzozi.rw</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-green-600 w-8 h-8 rounded-lg flex items-center justify-center">
                    <FaComments className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">Live Chat</div>
                    <div className="text-gray-400 text-xs">Available 8 AM - 6 PM WAT</div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold text-sm transition-colors duration-200">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSupportSection;