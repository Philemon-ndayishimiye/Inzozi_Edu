import React from 'react';

interface SeatCapacityCardProps {
  title: string;
  totalSeats: number;
  occupied: number;
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const SeatCapacityCard: React.FC<SeatCapacityCardProps> = ({
  title,
  totalSeats,
  occupied,
  //onAdd,
  onEdit,
  onDelete,
}) => {
  const available = totalSeats - occupied;
  const availablePercentage = ((available / totalSeats) * 100).toFixed(0);
  const isHighAvailability = parseInt(availablePercentage) >= 50;

  const cardClasses =
    'relative group bg-white shadow-lg rounded-lg overflow-hidden ' +
    'border-l-4 border-blue-500 p-6 w-full max-w-sm';

  const badgeClasses =
    'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ' +
    (isHighAvailability
      ? 'bg-green-100 text-green-700'
      : 'bg-yellow-100 text-yellow-700');

  const PersonIcon = (
    <svg
      className="w-4 h-4 mr-1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <path d="M20 8v6M23 11h-6"></path>
    </svg>
  );

  const SmallPersonIcon = (
    <svg
      className="w-4 h-4 mr-1 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
    </svg>
  );

  return (
    <div className={cardClasses}>
      {/* Action Buttons (hidden until hover) */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* <button
          onClick={onAdd}
          className="p-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
        >
          ➕
        </button> */}
        <button
          onClick={onEdit}
          className="p-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 cursor-pointer"
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 cursor-pointer"
        >
          🗑️
        </button>
      </div>

      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span className={badgeClasses}>
          {PersonIcon}
          {availablePercentage}% Available
        </span>
      </div>

      {/* Total & Occupied */}
      <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
        <div>
          <div className="flex items-center text-sm font-medium text-gray-500 mb-1">
            {SmallPersonIcon} Total Seats
          </div>
          <p className="text-2xl font-bold text-primary-color font-family-playfair">
            {totalSeats}
          </p>
        </div>
        <div>
          <div className="flex items-center text-sm font-medium text-gray-400 mb-1">
            {SmallPersonIcon} Occupied
          </div>
          <p className="text-2xl font-bold text-gray-800 font-family-playfair">
            {occupied}
          </p>
        </div>
      </div>

      {/* Available */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-base font-medium text-gray-500 mb-1">
            Available
          </div>
          <p className="text-2xl font-semibold text-blue-500">{available}</p>
        </div>
        <div />
      </div>
    </div>
  );
};
