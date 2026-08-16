import React, { useState } from 'react';

type AdmissionConditions = {
  minGrade?: string;
  requiredSubjects?: string[];
  examScore?: string;
  interviewRequired?: boolean;
  documents?: string[];
  notes?: string;
};

type SeatCardProps = {
  level: string;
  totalSeats: number;
  occupiedSeats: number;
  admissionConditions?: AdmissionConditions;
};

const SeatCard: React.FC<SeatCardProps> = ({
  level,
  totalSeats,
  occupiedSeats,
  admissionConditions,
}) => {
  const [showModal, setShowModal] = useState(false);

  const availableSeats = totalSeats - occupiedSeats;

  return (
    <div className="w-[220px] rounded-xl border border-gray-200 shadow-sm bg-white p-4 flex flex-col items-center">
      {/* Level */}
      <div className="px-4 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700 mb-4">
        {level}
      </div>

      {/* Seats info */}
      <div className="flex justify-between w-full text-center mb-4">
        <div className="flex-1">
          <p className="text-gray-500 text-sm">Total seats</p>
          <p className="text-xl font-semibold text-gray-900">{totalSeats}</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-500 text-sm">Available seats</p>
          <p className="text-xl font-semibold text-green-600">{availableSeats}</p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => setShowModal(true)}
        className="mt-auto bg-[#0A2B47] hover:bg-[#0c3658] text-white text-sm font-medium px-4 py-2 rounded-md"
      >
        View admission condition
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] max-w-full">
            <h2 className="text-lg font-bold mb-4">Admission Conditions</h2>

            {admissionConditions ? (
              <div className="space-y-3 text-sm text-gray-700">
                {admissionConditions.minGrade && (
                  <p><span className="font-semibold">Minimum Grade:</span> {admissionConditions.minGrade}</p>
                )}
                {admissionConditions.examScore && (
                  <p><span className="font-semibold">Exam Score:</span> {admissionConditions.examScore}</p>
                )}
                {admissionConditions.interviewRequired !== undefined && (
                  <p>
                    <span className="font-semibold">Interview Required:</span>{' '}
                    {admissionConditions.interviewRequired ? 'Yes' : 'No'}
                  </p>
                )}
                {admissionConditions.documents && admissionConditions.documents.length > 0 && (
                  <p>
                    <span className="font-semibold">Documents:</span>{' '}
                    {admissionConditions.documents.join(', ')}
                  </p>
                )}
                {admissionConditions.notes && (
                  <p><span className="font-semibold">Notes:</span> {admissionConditions.notes}</p>
                )}
              </div>
            ) : (
              <p>No admission conditions available</p>
            )}

            {/* Close Button */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatCard;
