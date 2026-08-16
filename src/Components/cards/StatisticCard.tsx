import React from 'react';

interface StatisticCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  subtitle?: string;
  variant?: 'default' | 'light' | 'dark' | 'transparent';
  cardBgColor?: string;
  textColor?: string;
  iconColor?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  icon,
  value,
  label,
  subtitle,
  variant = 'default',
  cardBgColor,
  textColor,
  iconColor,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'light':
        return {
          cardBg: 'bg-white',
          text: 'text-gray-800',
          iconColor: 'text-blue-600',
        };
      case 'dark':
        return {
          cardBg: 'bg-gray-800',
          text: 'text-white',
          iconColor: 'text-blue-400',
        };
      case 'transparent':
        return {
          cardBg: 'bg-white/20 backdrop-blur-sm',
          text: 'text-white',
          iconColor: 'text-white',
        };
      default:
        return {
          cardBg: 'bg-white/10 backdrop-blur-sm',
          text: 'text-white',
          iconColor: 'text-white',
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <div className={`${cardBgColor || variantClasses.cardBg} p-8 rounded-2xl text-center hover:transform hover:scale-105 transition-all duration-200 shadow-lg`}>
      <div className="flex justify-center mb-4">
        <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center border border-white/30">
          <div className={`${iconColor || variantClasses.iconColor} text-2xl`}>
            {icon}
          </div>
        </div>
      </div>

      <div className={`${textColor || variantClasses.text} text-4xl font-bold mb-2`}>
        {value}
      </div>

      <div className={`${textColor || variantClasses.text} text-lg font-semibold mb-1`}>
        {label}
      </div>

      {subtitle && (
        <div className={`${textColor || variantClasses.text} text-sm opacity-80`}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default StatisticCard;