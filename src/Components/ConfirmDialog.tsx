import { useTranslation } from 'react-i18next';

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'danger' | 'primary';
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  tone = 'danger',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const { t } = useTranslation();
  if (!isOpen) {return null;}

  const confirmClasses =
    tone === 'danger'
      ? 'bg-[#B10E1E] hover:bg-[#8f0b18]'
      : 'bg-gradient-to-r from-[#F09C00] to-[#FFB833] hover:brightness-95';

  return (
    <div
      className="inzozi-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={() => !loading && onCancel()}
    >
      <div
        className="inzozi-dialog bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[17px] font-bold text-[#282C34] font-family-playfair">{title}</h2>
        <p className="text-[13.5px] text-gray-500 mt-2 leading-relaxed">{message}</p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#282C34] font-semibold text-[13px] rounded-lg cursor-pointer disabled:opacity-60 transition-colors"
          >
            {cancelLabel ?? t('confirmDialog.cancel')}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-white font-semibold text-[13px] rounded-lg cursor-pointer disabled:opacity-70 transition-colors ${confirmClasses}`}
          >
            {loading && <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {loading ? t('confirmDialog.pleaseWait') : (confirmLabel ?? t('confirmDialog.confirm'))}
          </button>
        </div>
      </div>
    </div>
  );
}
