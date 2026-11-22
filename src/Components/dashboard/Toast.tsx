import type { ToastState } from '../../Hooks/useToast';

export default function Toast({ toast }: { toast: ToastState }) {
  if (!toast) {return null;}

  return (
    <div
      className={`fixed top-5 right-5 px-5 py-3 rounded-lg shadow-lg text-white text-[13.5px] font-semibold z-50 ${
        toast.kind === 'success' ? 'bg-[#1E7A34]' : 'bg-[#B10E1E]'
      }`}
    >
      {toast.message}
    </div>
  );
}
