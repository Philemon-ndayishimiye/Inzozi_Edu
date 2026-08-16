import React from 'react';

interface FeatureBenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  label?: string;
  variant?: 'default' | 'light' | 'dark' | 'resource';
  iconGradient?: string;
  titleColor?: string;
  descriptionColor?: string;
  cardBgColor?: string;
}

const FeatureBenefitCard: React.FC<FeatureBenefitCardProps> = ({
  icon,
  title,
  description,
  label,
  variant = 'default',
  iconGradient,
  titleColor,
  descriptionColor,
  cardBgColor,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'light':
        return {
          title: 'text-gray-900 font-family-playfair',
          description: 'text-gray-600',
          iconBg: 'bg-gradient-to-br from-blue-500 to-purple-600',
          cardBg: 'bg-white',
        };
      case 'dark':
        return {
          title: 'text-white font-family-playfair',
          description: 'text-gray-300',
          iconBg: 'bg-gradient-to-br from-indigo-600 to-purple-700',
          cardBg: 'bg-[#0B111E]',
        };
      case 'resource':
        return {
          title: 'text-white font-family-playfair',
          description: 'text-gray-400',
          iconBg: 'bg-[#054069]',
          cardBg: 'bg-[#0B111E]',
          iconSize: 'w-12 h-12',
          iconRounding: 'rounded-lg',
        };
      default:
        return {
          title: 'text-gray-900 font-family-playfair text-sm',
          description: 'text-gray-600 font-family-poppins text-sm',
          iconBg: 'bg-gradient-to-br from-orange-400 to-yellow-500',
          cardBg: 'bg-white',
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <div
      className={`relative p-8 hover:transform hover:scale-105 transition-all duration-300 rounded-2xl shadow-lg ${
        cardBgColor || variantClasses.cardBg
      }`}
    >
     

      <div className=" mb-6 mt-4">
        <div
          className={`${
            iconGradient || variantClasses.iconBg
          } w-[48px] h-[48px] rounded-lg flex items-center justify-center text-white shadow-lg`}
        >
          {icon}
        </div>
      {label && (
        <div>
          <span className="inline-block text-xs font-semibold uppercase text-white">
            {label}
          </span>
        </div>
      )}
      </div>

      

      <div className="space-y-3">
        <h3
          className={`${titleColor || variantClasses.title} font-semibold text-xl leading-tight`}
        >
          {title}
        </h3>
        <p
          className={`${descriptionColor || variantClasses.description} text-base leading-relaxed`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureBenefitCard;
