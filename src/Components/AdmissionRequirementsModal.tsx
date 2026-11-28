import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { hasAdmissionConditions, type AdmissionConditions } from '../Helper/admissionConditions';

type AdmissionRequirementsModalProps = {
  admissionConditions?: AdmissionConditions;
  /** Optional line shown under the title, e.g. to explain why the modal popped up. */
  intro?: string;
  onClose: () => void;
  /** Custom footer (e.g. Cancel/Continue). Defaults to a single Close button. */
  footer?: ReactNode;
};

export default function AdmissionRequirementsModal({
  admissionConditions,
  intro,
  onClose,
  footer,
}: AdmissionRequirementsModalProps) {
  const { t } = useTranslation();
  const hasConditions = hasAdmissionConditions(admissionConditions);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-[#282C34] font-family-playfair mb-1">
          {t('spotRow.admissionRequirements')}
        </h2>
        {intro && <p className="text-[12.5px] text-[#6B7280] font-family-poppins mb-3">{intro}</p>}
        <div className="space-y-2.5 text-[13.5px] text-[#4E5155] font-family-poppins mt-3">
          {admissionConditions?.minGrade && (
            <p><span className="font-semibold">{t('spotRow.minimumGrade')}</span> {admissionConditions.minGrade}</p>
          )}
          {admissionConditions?.examScore && (
            <p><span className="font-semibold">{t('spotRow.examScore')}</span> {admissionConditions.examScore}</p>
          )}
          {admissionConditions?.interviewRequired !== undefined && (
            <p>
              <span className="font-semibold">{t('spotRow.interviewRequired')}</span>{' '}
              {admissionConditions.interviewRequired ? t('spotRow.yes') : t('spotRow.no')}
            </p>
          )}
          {admissionConditions?.documents && admissionConditions.documents.length > 0 && (
            <p>
              <span className="font-semibold">{t('spotRow.documents')}</span>{' '}
              {admissionConditions.documents.join(', ')}
            </p>
          )}
          {admissionConditions?.notes && (
            <p><span className="font-semibold">{t('spotRow.notes')}</span> {admissionConditions.notes}</p>
          )}
          {!hasConditions && <p>{t('spotRow.noSpecificRequirements')}</p>}
        </div>
        {footer ?? (
          <button
            onClick={onClose}
            className="mt-6 w-full bg-gray-100 hover:bg-gray-200 rounded-md py-2 text-[13.5px] font-semibold cursor-pointer"
          >
            {t('spotRow.close')}
          </button>
        )}
      </div>
    </div>
  );
}
