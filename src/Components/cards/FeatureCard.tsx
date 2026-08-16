import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: 'default' | 'light' | 'dark';
  iconBgColor?: string;
  iconTextColor?: string;
  cardBgColor?: string;
  textColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description,
  variant = 'default',
  iconBgColor,
  iconTextColor,
  cardBgColor,
  textColor,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'light':
        return {
          card: 'bg-white hover:bg-gray-50',
          description: 'text-gray-300',
          text: 'text-gray-800',
          iconBg: 'bg-blue-100',
          iconText: 'text-blue-600',
        };
      case 'dark':
        return {
          card: 'bg-gray-800 hover:bg-gray-700',
          description: 'text-gray-300',
          text: 'text-white',
          iconBg: 'bg-white',
          iconText: 'text-gray-800',
        };
      default:
        return {
          card: 'bg-[#0A303F] hover:bg-[#0A303F]/90',
          description: 'font-family-poppins',
          text: 'text-[#F6FCFF] font-family-playfair',
          iconBg: 'bg-white',
          iconText: 'text-[#223D60]',
        };
    }
  };

  const variantClasses = getVariantClasses();
  
  return (
    <div className={`${cardBgColor || variantClasses.card} p-6 rounded-lg flex items-start space-x-4 max-w-2xl transition-colors duration-200`}>
      <div className={`flex-shrink-0 w-12 h-12 ${iconBgColor || variantClasses.iconBg} rounded-lg flex items-center justify-center`}>
        <div className={`${iconTextColor || variantClasses.iconText}`}>
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h3 className={`${textColor || variantClasses.text} font-semibold mb-2 text-lg leading-tight`}>
          {title}
        </h3>
        <p className={`${textColor || variantClasses.text} text-sm opacity-90 leading-relaxed`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;