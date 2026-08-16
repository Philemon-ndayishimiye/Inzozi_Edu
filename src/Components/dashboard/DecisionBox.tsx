import { useState } from 'react';
import { IoCheckmarkCircle, IoDocumentAttachOutline } from 'react-icons/io5';

type DecisionBoxProps = {
  title?: string;
  description?: string;
  onApprove: (approvalDocument?: File) => void;
  onReject: (reason: string) => void;
  approveRequiresFile?: boolean;
  approving?: boolean;
  rejecting?: boolean;
};

export default function DecisionBox({
  title = 'Decision',
  description = 'This decision is emailed to the parent immediately — include a reason if you\'re rejecting.',
  onApprove,
  onReject,
  approveRequiresFile = false,
  approving = false,
  rejecting = false,
}: DecisionBoxProps) {
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState('');
  const [approvalFile, setApprovalFile] = useState<File | null>(null);

  const disabled = approving || rejecting;
  const canApprove = !approveRequiresFile || !!approvalFile;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      <h3 className="text-[14.5px] font-bold text-[#282C34] font-family-playfair mb-1">{title}</h3>
      <p className="text-[12px] text-gray-500 mb-4">{description}</p>

      {approveRequiresFile && (
        <label
          className={`flex items-center gap-2.5 border-2 border-dashed rounded-lg px-3.5 py-3 mb-3 cursor-pointer transition-colors ${
            approvalFile ? 'border-[#1E7A34] bg-[#E7F5EA]/50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <input
            type="file"
            className="hidden"
            accept="application/pdf,image/*"
            onChange={(e) => setApprovalFile(e.target.files?.[0] ?? null)}
          />
          <IoDocumentAttachOutline className="text-lg text-[#1E7A34] flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-[12.5px] font-semibold text-[#282C34] truncate">
              {approvalFile ? approvalFile.name : 'Attach admission letter (required)'}
            </div>
            <div className="text-[10.5px] text-gray-400">Sent to the parent once approved</div>
          </div>
        </label>
      )}

      <button
        onClick={() => onApprove(approvalFile ?? undefined)}
        disabled={disabled || !canApprove}
        className="w-full flex items-center justify-center gap-2 bg-[#1E7A34] hover:bg-[#186229] text-white font-bold text-[13px] rounded-lg py-2.5 mb-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {approving ? (
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        ) : (
          <IoCheckmarkCircle />
        )}
        {approving ? 'Approving…' : 'Approve application'}
      </button>
      <button
        onClick={() => setShowReason(true)}
        disabled={disabled}
        className="w-full bg-white border-[1.5px] border-[#B10E1E] text-[#B10E1E] font-bold text-[13px] rounded-lg py-2.5 cursor-pointer disabled:opacity-50"
      >
        Reject application
      </button>

      {showReason && (
        <div className="mt-3">
          <label className="block text-[12px] font-semibold text-[#B10E1E] mb-1.5">
            Reason for rejection (required)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Class has reached capacity for this term."
            className="w-full border-[1.5px] border-[#B10E1E] rounded-lg px-3 py-2 text-[12.5px] min-h-[70px] outline-none"
          />
          <button
            onClick={() => reason.trim() && onReject(reason.trim())}
            disabled={!reason.trim() || disabled}
            className="w-full flex items-center justify-center gap-2 bg-[#B10E1E] hover:bg-[#8f0b18] text-white font-bold text-[13px] rounded-lg py-2.5 mt-2 cursor-pointer disabled:opacity-50 transition-colors"
          >
            {rejecting && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {rejecting ? 'Rejecting…' : 'Confirm rejection'}
          </button>
        </div>
      )}
    </div>
  );
}
