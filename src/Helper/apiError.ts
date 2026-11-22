import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// The backend's ResponseService always replies { success, message, data },
// including on error (e.g. the 409 "already approved/rejected" idempotency
// guard) - this pulls that message out of an RTK Query error so it can be
// shown as-is instead of a generic fallback.
export const getApiErrorMessage = (err: unknown, fallback: string): string => {
  if (err && typeof err === 'object' && 'status' in err) {
    const fetchErr = err as FetchBaseQueryError & { data?: { message?: string } };
    return fetchErr.data?.message || fallback;
  }
  return fallback;
};
