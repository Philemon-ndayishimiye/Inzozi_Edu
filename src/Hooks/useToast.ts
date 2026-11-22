import { useCallback, useState } from 'react';

export type ToastKind = 'success' | 'error';
export type ToastState = { message: string; kind: ToastKind } | null;

export const useToast = (durationMs = 3500) => {
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = useCallback(
    (message: string, kind: ToastKind) => {
      setToast({ message, kind });
      setTimeout(() => setToast(null), durationMs);
    },
    [durationMs],
  );

  return { toast, showToast };
};
