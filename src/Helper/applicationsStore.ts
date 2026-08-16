// No application/admission API exists on the backend yet, so submitted
// applications are recorded in localStorage. This lets the full parent ->
// school-manager (approve/reject) -> parent-tracking loop work end-to-end
// for demos on a single device/browser. Swap this for real endpoints once
// an applications API ships.

export type ApplicationStatus = 'submitted' | 'approved' | 'rejected';

export type StoredDocument = {
  label: string;
  fileName: string;
  size: number;
  url?: string;
};

export type ApplicationRecord = {
  referenceCode: string;
  schoolId: string;
  schoolName: string;
  studentName: string;
  gender?: string;
  dateOfBirth?: string;
  studentType?: string;
  fatherName?: string;
  motherName?: string;
  guardianEmail: string;
  guardianPhone: string;
  level?: string;
  yearofstudy?: string;
  spotId?: string;
  documents: StoredDocument[];
  status: ApplicationStatus;
  decisionReason?: string;
  submittedAt: string;
  decidedAt?: string;
};

const PREFIX = 'inzozi-application-';

export function saveApplication(record: ApplicationRecord) {
  try {
    localStorage.setItem(`${PREFIX}${record.referenceCode}`, JSON.stringify(record));
  } catch {
    // localStorage unavailable — the application still proceeds for this session.
  }
}

export function getApplication(referenceCode: string): ApplicationRecord | null {
  try {
    const raw = localStorage.getItem(`${PREFIX}${referenceCode.trim().toUpperCase()}`);
    return raw ? (JSON.parse(raw) as ApplicationRecord) : null;
  } catch {
    return null;
  }
}

export function listAllApplications(): ApplicationRecord[] {
  const records: ApplicationRecord[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith(PREFIX)) {continue;}
      const raw = localStorage.getItem(key);
      if (!raw) {continue;}
      try {
        records.push(JSON.parse(raw) as ApplicationRecord);
      } catch {
        // skip malformed entry
      }
    }
  } catch {
    return records;
  }
  return records.sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));
}

export function listApplicationsForSchool(schoolId: string): ApplicationRecord[] {
  return listAllApplications().filter((r) => r.schoolId === schoolId);
}

export function updateApplicationStatus(
  referenceCode: string,
  status: ApplicationStatus,
  reason?: string,
): ApplicationRecord | null {
  const record = getApplication(referenceCode);
  if (!record) {return null;}
  const updated: ApplicationRecord = {
    ...record,
    status,
    decisionReason: status === 'rejected' ? reason : undefined,
    decidedAt: new Date().toISOString(),
  };
  saveApplication(updated);
  return updated;
}
