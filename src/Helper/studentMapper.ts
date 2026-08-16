import type { StudentRecord } from '../App/api/students/students';
import type { ApplicationRecord, StoredDocument } from './applicationsStore';

// The pending-applications endpoint returns raw student records; the rest of
// the app (ApplicationsTable, ApplicationDetailView) already speaks in terms
// of ApplicationRecord, so this normalizes one into the other rather than
// forking the display components per data source.
export function mapStudentToApplicationRecord(student: StudentRecord, schoolName = ''): ApplicationRecord {
  const documents: StoredDocument[] = [];
  const pushDoc = (url: string | null | undefined, label: string) => {
    if (url) {documents.push({ label, fileName: label, size: 0, url });}
  };
  pushDoc(student.passportPhoto, 'Passport-style photo');
  pushDoc(student.previousReport, 'Previous report card');
  pushDoc(student.resultSlip, 'Result slip');
  pushDoc(student.mitationLetter, 'Mutation letter');

  return {
    referenceCode: student.id,
    schoolId: student.schoolId,
    schoolName,
    studentName: [student.firstName, student.middleName, student.lastName].filter(Boolean).join(' '),
    gender: student.gender,
    dateOfBirth: student.DOB,
    studentType: student.studentType,
    fatherName: student.fathersNames,
    motherName: student.mothersNames,
    guardianEmail: student.representerEmail ?? '',
    guardianPhone: student.representerPhone ?? '',
    level: student.level,
    documents,
    // The backend calls the not-yet-decided state "pending"; the rest of
    // this app calls it "submitted" (chosen before this endpoint existed).
    status: student.status === 'pending' ? 'submitted' : student.status,
    decisionReason: student.rejectionReason ?? undefined,
    submittedAt: student.createdAt ?? new Date().toISOString(),
  };
}
