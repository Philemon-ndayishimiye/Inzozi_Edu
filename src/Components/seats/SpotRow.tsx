import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdmissionRequirementsModal from '../AdmissionRequirementsModal';
import { hasAdmissionConditions, type AdmissionConditions } from '../../Helper/admissionConditions';

type SpotRowProps = {
  level: string;
  yearofstudy: string;
  totalSeats: number;
  occupiedSeats: number;
  combination?: string[];
  admissionConditions?: AdmissionConditions;
  onApply: () => void;
};

export default function SpotRow({
  level,
  yearofstudy,
  totalSeats,
  occupiedSeats,
  combination,
  admissionConditions,
  onApply,
}: SpotRowProps) {
  const { t } = useTranslation();
  // 'view' = opened via the optional "Admission requirements" link (just
  // informational, Close only). 'apply' = opened by clicking Apply itself -
  // the parent must see requirements before the modal lets them continue.
  const [modalIntent, setModalIntent] = useState<'view' | 'apply' | null>(null);
  const available = Math.max(totalSeats - occupiedSeats, 0);
  const isOpen = available > 0;
  const hasConditions = hasAdmissionConditions(admissionConditions);

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3.5 ${
        isOpen ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 opacity-80'
      }`}
    >
      <div className="min-w-0">
        <div className="font-bold text-[14px] text-[#282C34] font-family-poppins">
          {level} <span className="text-[#6B7280] font-normal">· {yearofstudy}</span>
          {combination && combination.length > 0 && (
            <span className="text-[#05416B] font-normal"> · {combination.join(', ')}</span>
          )}
        </div>
        <div className="text-[12px] text-[#6B7280] font-family-poppins mt-0.5">
          {t('spotRow.seatsAvailable', { available, total: totalSeats, count: totalSeats })}
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
          {isOpen ? t('spotRow.spotsOpen') : t('spotRow.spotsFull')}
        </span>
        {isOpen && hasConditions && (
          <button
            type="button"
            onClick={() => setModalIntent('view')}
            className="border border-[#05416B] text-[#05416B] text-[12px] font-bold px-3.5 py-1.5 rounded-full cursor-pointer whitespace-nowrap hover:bg-[#05416B]/5"
          >
            {t('spotRow.viewRequirements')}
          </button>
        )}
        {isOpen && (
          <button
            onClick={() => (hasConditions ? setModalIntent('apply') : onApply())}
            className="bg-gradient-to-r from-[#F09C00] to-[#FFB833] text-white text-[12px] font-bold px-3.5 py-1.5 rounded-full cursor-pointer whitespace-nowrap"
          >
            {t('spotRow.apply')}
          </button>
        )}
      </div>

      {modalIntent && (
        <AdmissionRequirementsModal
          admissionConditions={admissionConditions}
          intro={modalIntent === 'apply' ? t('spotRow.reviewBeforeApplying') : undefined}
          onClose={() => setModalIntent(null)}
          footer={
            modalIntent === 'apply' ? (
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => setModalIntent(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-md py-2 text-[13.5px] font-semibold cursor-pointer"
                >
                  {t('spotRow.cancel')}
                </button>
                <button
                  onClick={() => {
                    setModalIntent(null);
                    onApply();
                  }}
                  className="flex-1 bg-gradient-to-r from-[#F09C00] to-[#FFB833] text-white rounded-md py-2 text-[13.5px] font-bold cursor-pointer"
                >
                  {t('spotRow.continueToApply')}
                </button>
              </div>
            ) : undefined
          }
        />
      )}
    </div>
  );
}
