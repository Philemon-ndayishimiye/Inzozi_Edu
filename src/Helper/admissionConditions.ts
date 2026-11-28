export type AdmissionConditions = {
  minGrade?: string;
  requiredSubjects?: string[];
  examScore?: string;
  interviewRequired?: boolean;
  documents?: string[];
  notes?: string;
};

export const hasAdmissionConditions = (ac?: AdmissionConditions): boolean =>
  Boolean(
    ac &&
      (ac.minGrade ||
        ac.examScore ||
        ac.interviewRequired !== undefined ||
        (ac.documents && ac.documents.length > 0) ||
        ac.notes),
  );
