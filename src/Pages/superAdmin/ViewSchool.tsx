import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApproveSchoolMutation, useGetSchoolByIdQuery, useRejectSchoolMutation } from '../../App/api/school/school';
import { IoArrowBack, IoDocumentTextOutline } from 'react-icons/io5';
import Panel from '../../Components/dashboard/Panel';
import Badge from '../../Components/dashboard/Badge';
import DecisionBox from '../../Components/dashboard/DecisionBox';

export default function ViewSchool() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, refetch } = useGetSchoolByIdQuery(id ?? '');
  const [approveSchool] = useApproveSchoolMutation();
  const [rejectSchool] = useRejectSchoolMutation();

  const [toast, setToast] = useState<{ message: string; kind: 'success' | 'error' } | null>(null);

  const showToast = (message: string, kind: 'success' | 'error') => {
    setToast({ message, kind });
    setTimeout(() => setToast(null), 3500);
  };

  const handleApprove = async () => {
    if (!id) {return;}
    try {
      await approveSchool(id).unwrap();
      showToast(t('viewSchoolPage.approvedToast'), 'success');
      refetch();
    } catch {
      showToast(t('viewSchoolPage.errorToast'), 'error');
    }
  };

  const handleReject = async (reason: string) => {
    if (!id) {return;}
    try {
      await rejectSchool({ id, message: reason }).unwrap();
      showToast(t('viewSchoolPage.rejectedToast'), 'success');
      refetch();
    } catch {
      showToast(t('viewSchoolPage.errorToast'), 'error');
    }
  };

  const school = data?.data;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => navigate('/superAdmin/schools')}
          className="flex items-center gap-1.5 text-[13px] text-gray-600 cursor-pointer"
        >
          <IoArrowBack /> {t('viewSchoolPage.backToSchools')}
        </button>
        {school && (
          <Badge variant={school.status === 'approved' ? 'approved' : school.status === 'pending' ? 'pending' : 'rejected'}>
            {school.status}
          </Badge>
        )}
      </div>

      <h2 className="text-[19px] font-bold text-[#282C34] font-family-playfair">{school?.schoolName ?? t('viewSchoolPage.loading')}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <Panel title={t('viewSchoolPage.schoolDetails')}>
            <div className="divide-y divide-gray-100 -mx-5">
              {[
                [t('viewSchoolPage.schoolName'), school?.schoolName],
                [t('viewSchoolPage.location'), school?.district],
                [t('viewSchoolPage.schoolEmail'), school?.email],
                [t('viewSchoolPage.schoolPhone'), school?.telephone],
                [t('viewSchoolPage.registeredBy'), school ? `${school.SchoolManager.firstName} ${school.SchoolManager.lastName}` : undefined],
                [t('viewSchoolPage.managerEmail'), school?.SchoolManager.email],
                [t('viewSchoolPage.submitted'), school ? new Date(school.createdAt).toLocaleString() : undefined],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-2.5 text-[13.5px]">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-semibold text-[#282C34] text-right">{v || t('viewSchoolPage.noneValue')}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title={t('viewSchoolPage.legalDocuments')}>
            {school?.licenseDocument ? (
              <a
                href={school.licenseDocument}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-gray-200 rounded-lg px-3.5 py-2.5 bg-gray-50 hover:border-[#05416B]"
              >
                <IoDocumentTextOutline className="text-[#05416B] text-lg flex-shrink-0" />
                <span className="text-[12.5px] font-semibold text-[#05416B]">{t('viewSchoolPage.viewCertificate')}</span>
              </a>
            ) : (
              <p className="text-[13px] text-gray-500">{t('viewSchoolPage.noDocumentUploaded')}</p>
            )}
          </Panel>
        </div>

        <div>
          {school?.status === 'pending' ? (
            <DecisionBox
              title={t('viewSchoolPage.decision')}
              description={t('viewSchoolPage.approveDescription')}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ) : (
            <Panel title={t('viewSchoolPage.decision')}>
              <p className="text-[13px] text-gray-600">{t('viewSchoolPage.alreadyDecided', { status: school?.status })}</p>
              {school?.rejectedReason && (
                <p className="text-[12.5px] text-gray-500 mt-2">{t('viewSchoolPage.reason', { reason: school.rejectedReason })}</p>
              )}
            </Panel>
          )}
        </div>
      </div>

      {toast && (
        <div
          className={`fixed top-5 right-5 px-5 py-3 rounded-lg shadow-lg text-white text-[13.5px] font-semibold z-50 ${
            toast.kind === 'success' ? 'bg-[#1E7A34]' : 'bg-[#B10E1E]'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
