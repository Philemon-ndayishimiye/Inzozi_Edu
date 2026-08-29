import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

type CardProps = {
  image: string;
  title: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export const GallerCard: React.FC<CardProps> = ({ image, title, description, onEdit, onDelete }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full group relative">
      {/* Image */}
      <img src={image} alt={title} className="w-[95%] h-44 object-cover" />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>

      {/* Buttons - Hidden by default, shown on hover */}
      <div className="absolute top-4 right-15 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="flex items-center cursor-pointer px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          <FiEdit size={16} className="mr-1" />
          {t('galleryCard.edit')}
        </button>
        <button
          onClick={onDelete}
          className="flex cursor-pointer items-center px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
        >
          <FiTrash2 size={16} className="mr-1" />
          {t('galleryCard.delete')}
        </button>
      </div>
    </div>
  );
};

export default GallerCard;
