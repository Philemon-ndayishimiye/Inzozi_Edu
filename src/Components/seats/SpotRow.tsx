import { useState } from 'react';

type AdmissionConditions = {
  minGrade?: string;
  requiredSubjects?: string[];
  examScore?: string;
  interviewRequired?: boolean;
  documents?: string[];
  notes?: string;
};

type SpotRowProps = {
  level: string;
  yearofstudy: string;
  totalSeats: number;
  occupiedSeats: number;
  admissionConditions?: AdmissionConditions;
  onApply: () => void;
};

export default function SpotRow({
  level,
  yearofstudy,
  totalSeats,
  occupiedSeats,
  admissionConditions,
  onApply,
}: SpotRowProps) {
  const [showConditions, setShowConditions] = useState(false);
  const available = Math.max(totalSeats - occupiedSeats, 0);
  const isOpen = available > 0;
  const hasConditions =
    admissionConditions &&
    (admissionConditions.minGrade ||
      admissionConditions.examScore ||
      admissionConditions.interviewRequired !== undefined ||
      (admissionConditions.documents && admissionConditions.documents.length > 0) ||
      admissionConditions.notes);

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3.5 ${
        isOpen ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 opacity-80'
      }`}
    >
      <div className="min-w-0">
        <div className="font-bold text-[14px] text-[#282C34] font-family-poppins">
          {level} <span className="text-[#6B7280] font-normal">· {yearofstudy}</span>
        </div>
        <div className="text-[12px] text-[#6B7280] font-family-poppins mt-0.5">
          {available} of {totalSeats} seat{totalSeats === 1 ? '' : 's'} available
          {hasConditions && (
            <>
              {' · '}
              <button
                type="button"
                onClick={() => setShowConditions(true)}
                className="text-[#05416B] font-semibold hover:underline cursor-pointer"
              >
                Admission requirements
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className={`font-mono text-[10.5px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap ${
            isOpen
              ? 'text-[#1E7A34] bg-[#E7F5EA]'
              : 'text-[#B10E1E] bg-[#FBEAE8]'
          }`}
        >
          {isOpen ? 'Spots open' : 'Spots full'}
        </span>
        {isOpen && (
          <button
            onClick={onApply}
            className="bg-gradient-to-r from-[#F09C00] to-[#FFB833] text-white text-[12px] font-bold px-3.5 py-1.5 rounded-full cursor-pointer whitespace-nowrap"
          >
            Apply
          </button>
        )}
      </div>

      {showConditions && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowConditions(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-[#282C34] font-family-playfair mb-4">
              Admission requirements
            </h2>
            <div className="space-y-2.5 text-[13.5px] text-[#4E5155] font-family-poppins">
              {admissionConditions?.minGrade && (
                <p><span className="font-semibold">Minimum grade:</span> {admissionConditions.minGrade}</p>
              )}
              {admissionConditions?.examScore && (
                <p><span className="font-semibold">Exam score:</span> {admissionConditions.examScore}</p>
              )}
              {admissionConditions?.interviewRequired !== undefined && (
                <p>
                  <span className="font-semibold">Interview required:</span>{' '}
                  {admissionConditions.interviewRequired ? 'Yes' : 'No'}
                </p>
              )}
              {admissionConditions?.documents && admissionConditions.documents.length > 0 && (
                <p>
                  <span className="font-semibold">Documents:</span>{' '}
                  {admissionConditions.documents.join(', ')}
                </p>
              )}
              {admissionConditions?.notes && (
                <p><span className="font-semibold">Notes:</span> {admissionConditions.notes}</p>
              )}
              {!hasConditions && <p>No specific requirements listed for this spot.</p>}
            </div>
            <button
              onClick={() => setShowConditions(false)}
              className="mt-6 w-full bg-gray-100 hover:bg-gray-200 rounded-md py-2 text-[13.5px] font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
