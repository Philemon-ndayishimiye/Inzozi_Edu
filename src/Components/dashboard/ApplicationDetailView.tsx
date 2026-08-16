import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoDocumentTextOutline, IoOpenOutline } from 'react-icons/io5';
import { getApplication, saveApplication } from '../../Helper/applicationsStore';
import { useGetPendingApplicationsQuery, useApproveApplicationMutation, useRejectApplicationMutation } from '../../App/api/students/students';
import { mapStudentToApplicationRecord } from '../../Helper/studentMapper';
import Panel from './Panel';
import Badge from './Badge';
import DecisionBox from './DecisionBox';

type ApplicationDetailViewProps = {
  referenceCode: string;
  backTo: string;
  backLabel: string;
};

export default function ApplicationDetailView({ referenceCode, backTo, backLabel }: ApplicationDetailViewProps) {
  const navigate = useNavigate();
  const { data: pendingData, isFetching } = useGetPendingApplicationsQuery();
  const [approveApplication, { isLoading: approving }] = useApproveApplicationMutation();
  const [rejectApplication, { isLoading: rejecting }] = useRejectApplicationMutation();

  const application = useMemo(() => {
    const pendingStudent = pendingData?.data?.find((s) => s.id === referenceCode);
    if (pendingStudent) {return mapStudentToApplicationRecord(pendingStudent);}
    // Already decided (or the pending list moved on) — fall back to our
    // local echo of the last-known decision for this id, if we have one.
    return getApplication(referenceCode);
  }, [pendingData, referenceCode]);

  if (!application) {
    return (
      <div className="text-center py-16">
        {isFetching ? (
          <p className="text-[14px] text-gray-500">Loading…</p>
        ) : (
          <>
            <p className="text-[14px] text-gray-600 mb-4">We couldn&apos;t find that application.</p>
            <button onClick={() => navigate(backTo)} className="text-[#05416B] font-semibold text-[13.5px] cursor-pointer">
              ← {backLabel}
            </button>
          </>
        )}
      </div>
    );
  }

  const handleApprove = async (approvalDocument?: File) => {
    if (!approvalDocument) {return;}
    try {
      await approveApplication({ studentId: application.referenceCode, babyeyiDocument: approvalDocument }).unwrap();
      saveApplication({ ...application, status: 'approved', decidedAt: new Date().toISOString() });
    } catch {
      // RTK Query surfaces the error via mutation state; DecisionBox stays interactive to retry.
    }
  };

  const handleReject = async (reason: string) => {
    try {
      await rejectApplication({ studentId: application.referenceCode, rejectionReason: reason }).unwrap();
      saveApplication({ ...application, status: 'rejected', decisionReason: reason, decidedAt: new Date().toISOString() });
    } catch {
      // RTK Query surfaces the error via mutation state; DecisionBox stays interactive to retry.
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => navigate(backTo)} className="flex items-center gap-1.5 text-[13px] text-gray-600 cursor-pointer">
          <IoArrowBack /> {backLabel}
        </button>
        <Badge variant={application.status === 'submitted' ? 'pending' : application.status}>
          {application.status === 'submitted' ? 'Pending' : application.status}
        </Badge>
      </div>

      <div>
        <h2 className="text-[19px] font-bold text-[#282C34] font-family-playfair">{application.studentName}</h2>
        <p className="text-[12.5px] text-gray-500 font-mono">{application.referenceCode}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <Panel title="Student & parent details">
            <div className="divide-y divide-gray-100 -mx-5">
              {[
                ['Student name', application.studentName],
                ['Gender', application.gender],
                ['Date of birth', application.dateOfBirth],
                ['Student type', application.studentType],
                ['Class applying for', [application.level, application.yearofstudy].filter(Boolean).join(' · ')],
                ['Parent / guardian', [application.fatherName, application.motherName].filter(Boolean).join(' / ')],
                ['Phone', application.guardianPhone],
                ['Email', application.guardianEmail],
                ['Submitted', new Date(application.submittedAt).toLocaleString()],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-2.5 text-[13.5px]">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-semibold text-[#282C34] text-right">{v || '—'}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Uploaded documents">
            {application.documents.length === 0 ? (
              <p className="text-[13px] text-gray-500">No documents recorded.</p>
            ) : (
              <div className="space-y-2">
                {application.documents.map((doc) => {
                  const content = (
                    <>
                      <IoDocumentTextOutline className="text-[#05416B] text-lg flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-[12.5px] text-[#282C34] truncate">{doc.label}</div>
                        {!doc.url && <div className="text-[11px] text-gray-400 truncate">{doc.fileName}</div>}
                      </div>
                      {doc.url && <IoOpenOutline className="text-gray-400 flex-shrink-0" />}
                    </>
                  );
                  return doc.url ? (
                    <a
                      key={doc.label}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 border border-gray-200 rounded-lg px-3.5 py-2.5 bg-gray-50 hover:border-[#05416B] hover:bg-[#CFDCEA]/30 transition-colors"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={doc.label} className="flex items-center gap-3 border border-gray-200 rounded-lg px-3.5 py-2.5 bg-gray-50">
                      {content}
                    </div>
                  );
                })}
              </div>
            )}
          </Panel>
        </div>

        <div>
          {application.status === 'submitted' ? (
            <DecisionBox
              onApprove={handleApprove}
              onReject={handleReject}
              approveRequiresFile
              approving={approving}
              rejecting={rejecting}
            />
          ) : (
            <Panel title="Decision">
              <p className="text-[13px] text-gray-600">
                This application was <b>{application.status}</b>
                {application.decidedAt ? ` on ${new Date(application.decidedAt).toLocaleDateString()}` : ''}.
              </p>
              {application.decisionReason && (
                <p className="text-[12.5px] text-gray-500 mt-2">Reason: {application.decisionReason}</p>
              )}
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
