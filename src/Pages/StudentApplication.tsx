import { useMemo, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import { TextInput } from '../Components/seats/InputSeats';
import { SelectInput } from '../Components/seats/SelectInput';
import { StudentType } from '../Types/Seats';
import LocationCascade, { type LocationValue } from '../Components/LocationCascade';
import { useGetSchoolDetailsQuery } from '../App/api/school/school';
import { useGetAllSpotsQuery } from '../App/api/spots/spot';
import { useApplyStudentMutation } from '../App/api/students/students';
import { IoArrowBack, IoCheckmarkCircle, IoWarningOutline } from 'react-icons/io5';
import { saveApplication, type StoredDocument } from '../Helper/applicationsStore';

type StepId = 1 | 2 | 3;

const STEPS: { id: StepId; label: string; icon: string }[] = [
  { id: 1, label: 'Student & guardian', icon: '👤' },
  { id: 2, label: 'Documents', icon: '📎' },
  { id: 3, label: 'Review', icon: '✅' },
];

const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
];

type FormState = {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  nationality: string;
  studentType: string;
  dateOfBirth: string;
  fatherName: string;
  motherName: string;
  guardianPhone: string;
  guardianEmail: string;
};

const INITIAL_FORM: FormState = {
  firstName: '',
  middleName: '',
  lastName: '',
  gender: '',
  nationality: 'Rwandan',
  studentType: '',
  dateOfBirth: '',
  fatherName: '',
  motherName: '',
  guardianPhone: '',
  guardianEmail: '',
};

// Local key -> exact multipart field name the backend expects.
type DocKey = 'passportPhoto' | 'previousReport' | 'resultSlip' | 'mitationLetter';

const DOC_FIELDS: { key: DocKey; label: string; hint: string; required: boolean }[] = [
  { key: 'passportPhoto', label: 'Passport-style photo', hint: 'Recent photo of the student', required: true },
  { key: 'previousReport', label: 'Previous report card', hint: 'Most recent academic report', required: true },
  { key: 'resultSlip', label: 'Result slip', hint: 'Latest exam or promotion result', required: true },
  { key: 'mitationLetter', label: 'Mutation letter', hint: 'Only if transferring schools', required: false },
];

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type ErrorResponse = { message?: string };

function StepTracker({ current }: { current: StepId }) {
  return (
    <div className="flex items-center px-1 pb-8">
      {STEPS.map((step, i) => {
        const done = step.id < current;
        const active = step.id === current;
        return (
          <div key={step.id} className="flex-1 flex flex-col items-center gap-1.5 relative">
            {i > 0 && (
              <div
                className={`absolute top-[17px] right-1/2 w-full h-[2px] -z-0 ${
                  done || active ? 'bg-[#F09C00]' : 'bg-gray-200'
                }`}
              />
            )}
            <div
              className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-[15px] border-2 ${
                active
                  ? 'bg-[#F09C00] border-[#F09C00] shadow-[0_0_0_4px_rgba(240,156,0,0.2)]'
                  : done
                    ? 'bg-[#CFDCEA] border-[#05416B]'
                    : 'bg-gray-100 border-gray-300'
              }`}
            >
              {done ? <IoCheckmarkCircle className="text-[#05416B] text-lg" /> : step.icon}
            </div>
            <span
              className={`text-[10.5px] font-family-poppins text-center ${
                active ? 'text-[#282C34] font-bold' : 'text-[#6B7280] font-medium'
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function StudentApplication() {
  const { schoolId } = useParams();
  const [searchParams] = useSearchParams();
  const spotIdParam = searchParams.get('spot') ?? undefined;
  const navigate = useNavigate();

  const { data: schoolDetails, isLoading: schoolLoading } = useGetSchoolDetailsQuery(schoolId ?? skipToken);
  const { data: spotsData } = useGetAllSpotsQuery(schoolId ?? skipToken);
  const selectedSpot = useMemo(
    () => spotsData?.data.spots.find((s) => s.id === spotIdParam),
    [spotsData, spotIdParam],
  );

  const schoolName = schoolDetails?.data.schoolName;

  const [applyStudent, { isLoading: submitting }] = useApplyStudentMutation();

  const [step, setStep] = useState<StepId>(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [location, setLocation] = useState<LocationValue>({});
  const [docs, setDocs] = useState<Record<DocKey, File | null>>({
    passportPhoto: null,
    previousReport: null,
    resultSlip: null,
    mitationLetter: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (key: DocKey) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setDocs((prev) => ({ ...prev, [key]: file }));
  };

  const validateStep1 = () => {
    const required: (keyof FormState)[] = [
      'firstName', 'lastName', 'gender', 'nationality', 'studentType',
      'dateOfBirth', 'fatherName', 'motherName', 'guardianPhone', 'guardianEmail',
    ];
    const next: Record<string, string> = {};
    required.forEach((key) => {
      if (!form[key]) {next[key] = 'Required';}
    });
    if (!location.province) {next.province = 'Required';}
    if (!location.district) {next.district = 'Required';}
    if (!location.sector) {next.sector = 'Required';}
    if (!location.cell) {next.cell = 'Required';}
    if (!location.village) {next.village = 'Required';}
    if (form.guardianEmail && !/^\S+@\S+\.\S+$/.test(form.guardianEmail)) {
      next.guardianEmail = 'Enter a valid email';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep2 = () => {
    const next: Record<string, string> = {};
    DOC_FIELDS.filter((f) => f.required).forEach(({ key }) => {
      if (!docs[key]) {next[key] = 'Required';}
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (step === 1 && !validateStep1()) {return;}
    if (step === 2 && !validateStep2()) {return;}
    setStep((s) => (s < 3 ? ((s + 1) as StepId) : s));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (step === 1) {
      navigate(-1);
      return;
    }
    setStep((s) => (s - 1) as StepId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitApplication = async () => {
    setSubmitError('');
    if (!selectedSpot) {
      setSubmitError('Please go back and choose a specific class to apply for.');
      return;
    }

    const body = new FormData();
    body.append('schoolSpotId', selectedSpot.id);
    if (schoolId) {body.append('schoolId', schoolId);}
    body.append('firstName', form.firstName);
    if (form.middleName) {body.append('middleName', form.middleName);}
    body.append('lastName', form.lastName);
    body.append('gender', form.gender);
    body.append('DOB', form.dateOfBirth);
    body.append('studentType', form.studentType);
    body.append('fathersNames', form.fatherName);
    body.append('mothersNames', form.motherName);
    body.append('representerEmail', form.guardianEmail);
    body.append('representerPhone', form.guardianPhone);
    body.append('nationality', form.nationality);
    body.append('province', location.province ?? '');
    body.append('district', location.district ?? '');
    body.append('sector', location.sector ?? '');
    body.append('cell', location.cell ?? '');
    body.append('village', location.village ?? '');
    DOC_FIELDS.forEach(({ key }) => {
      const file = docs[key];
      if (file) {body.append(key, file);}
    });

    try {
      const response = await applyStudent(body).unwrap();
      const student = response.data;

      const documents: StoredDocument[] = DOC_FIELDS
        .filter(({ key }) => docs[key])
        .map(({ key, label }) => ({ label, fileName: docs[key]!.name, size: docs[key]!.size }));

      const record = {
        referenceCode: student.id,
        schoolId: schoolId ?? '',
        schoolName: schoolName ?? '',
        studentName: `${form.firstName} ${form.lastName}`.trim(),
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        studentType: form.studentType,
        fatherName: form.fatherName,
        motherName: form.motherName,
        guardianEmail: form.guardianEmail,
        guardianPhone: form.guardianPhone,
        level: selectedSpot.level,
        yearofstudy: selectedSpot.yearofstudy,
        spotId: selectedSpot.id,
        documents,
        status: 'submitted' as const,
        submittedAt: new Date().toISOString(),
      };
      // No track-by-reference endpoint exists on the backend, so this local
      // cache is what lets the parent revisit /track on this same device.
      // The real submission above is what the school now sees.
      saveApplication(record);

      navigate('/application/confirmation', { state: record });
    } catch (err) {
      const fetchErr = err as FetchBaseQueryError;
      const message =
        fetchErr && 'data' in fetchErr ? (fetchErr.data as ErrorResponse)?.message : undefined;
      setSubmitError(message || 'Something went wrong submitting your application. Please try again.');
    }
  };

  return (
    <div>
      <Navigation />
      <div className="bg-gradient-to-b from-[#FFFFFF] to-[#CFDCEA] pt-[110px] pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center gap-3 px-5 sm:px-8 pt-6">
            <button
              onClick={goBack}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 cursor-pointer"
              aria-label="Back"
            >
              <IoArrowBack />
            </button>
            <div className="min-w-0">
              <div className="font-bold text-[15px] text-[#282C34] font-family-poppins truncate">
                {schoolLoading ? (
                  <span className="inline-block h-4 w-32 bg-gray-200 rounded animate-pulse" />
                ) : (
                  schoolName ?? 'School'
                )}
              </div>
              <div className="text-[11.5px] text-[#6B7280] font-family-poppins">
                Application form
                {selectedSpot ? ` · ${selectedSpot.level} · ${selectedSpot.yearofstudy}` : ''}
              </div>
            </div>
          </div>

          {!selectedSpot && !schoolLoading && (
            <div className="mx-5 sm:mx-8 mt-5 flex gap-2.5 items-start bg-[#FBEAE8] border border-[#B10E1E]/30 rounded-lg px-4 py-3">
              <IoWarningOutline className="text-[#B10E1E] text-lg flex-shrink-0 mt-0.5" />
              <p className="text-[12.5px] text-[#B10E1E] font-family-poppins leading-relaxed">
                No class was selected. Please go back to the school page and tap &quot;Apply&quot; on a specific
                open class before continuing.
              </p>
            </div>
          )}

          <div className="px-5 sm:px-8 pt-6">
            <StepTracker current={step} />
          </div>

          <div className="px-5 sm:px-8 pb-8">
            {step === 1 && (
              <div>
                <h2 className="text-[19px] font-bold text-[#282C34] font-family-playfair mb-1">
                  Tell us about the student
                </h2>
                <p className="text-[#6B7280] text-[13px] font-family-poppins mb-6">
                  This information goes straight to {schoolName ?? 'the'} admission team.
                </p>

                <h3 className="font-bold text-[15px] text-[#282C34] mb-3 font-family-poppins">
                  Student information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  <TextInput label="First name *" name="firstName" placeholder="Student first name" value={form.firstName} onChange={handleInput} />
                  <TextInput label="Last name *" name="lastName" placeholder="Student last name" value={form.lastName} onChange={handleInput} />
                  <TextInput label="Middle name" name="middleName" placeholder="Optional" value={form.middleName} onChange={handleInput} />
                  <SelectInput label="Gender *" name="gender" placeholder="Select gender" options={GENDER_OPTIONS} value={form.gender} onChange={handleInput} />
                  <TextInput label="Nationality *" name="nationality" placeholder="e.g. Rwandan" value={form.nationality} onChange={handleInput} />
                  <SelectInput label="Student type *" name="studentType" placeholder="Select type" options={StudentType} value={form.studentType} onChange={handleInput} />
                  <TextInput label="Date of birth *" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleInput} />
                </div>

                <h3 className="font-bold text-[15px] text-[#282C34] mt-5 mb-3 font-family-poppins">
                  Home address
                </h3>
                <LocationCascade value={location} onChange={setLocation} required />

                {Object.keys(errors).length > 0 && (
                  <p className="text-[#B10E1E] text-[12.5px] font-family-poppins mt-1 mb-2">
                    Please fill in every required field above.
                  </p>
                )}

                <h3 className="font-bold text-[15px] text-[#282C34] mt-4 mb-3 font-family-poppins">
                  Parent / guardian information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  <TextInput label="Father's name *" name="fatherName" placeholder="Father's full name" value={form.fatherName} onChange={handleInput} />
                  <TextInput label="Mother's name *" name="motherName" placeholder="Mother's full name" value={form.motherName} onChange={handleInput} />
                  <TextInput label="Guardian phone *" name="guardianPhone" placeholder="078 000 0000" value={form.guardianPhone} onChange={handleInput} />
                  <TextInput label="Guardian email *" name="guardianEmail" type="email" placeholder="you@email.com" value={form.guardianEmail} onChange={handleInput} />
                </div>
                <p className="text-[11.5px] text-[#6B7280] font-family-poppins -mt-2">
                  We&apos;ll send your decision and any updates to this email.
                </p>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-[19px] font-bold text-[#282C34] font-family-playfair mb-1">
                  Upload required documents
                </h2>
                <p className="text-[#6B7280] text-[13px] font-family-poppins mb-6">
                  Photos or scans both work. Max 5MB per file.
                </p>

                <div className="space-y-3">
                  {DOC_FIELDS.map(({ key, label, hint, required }) => {
                    const file = docs[key];
                    return (
                      <label
                        key={key}
                        className={`block rounded-lg border-2 border-dashed px-4 py-4 cursor-pointer transition-colors ${
                          file
                            ? 'border-[#05416B] bg-[#CFDCEA]/40'
                            : errors[key]
                              ? 'border-[#B10E1E]/60 bg-[#FBEAE8]/40'
                              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleFile(key)} />
                        {file ? (
                          <div className="flex items-center gap-3">
                            <span className="text-xl">📄</span>
                            <div className="min-w-0">
                              <div className="font-semibold text-[13.5px] text-[#05416B] truncate font-family-poppins">
                                {file.name}
                              </div>
                              <div className="text-[11px] text-[#6B7280]">{formatSize(file.size)} · Uploaded</div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="font-semibold text-[13.5px] text-[#282C34] font-family-poppins">
                              {label} {required && '*'}
                            </div>
                            <div className="text-[11.5px] text-[#6B7280]">{hint}</div>
                          </div>
                        )}
                      </label>
                    );
                  })}
                </div>

                {selectedSpot?.admissionConditions?.documents && selectedSpot.admissionConditions.documents.length > 0 && (
                  <p className="text-[12px] text-[#6B7280] font-family-poppins mt-4">
                    This spot also asks for: {selectedSpot.admissionConditions.documents.join(', ')}. You can
                    hand these to the school after your application is reviewed if you don&apos;t have them yet.
                  </p>
                )}
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-[19px] font-bold text-[#282C34] font-family-playfair mb-1">
                  Review before you send it
                </h2>
                <p className="text-[#6B7280] text-[13px] font-family-poppins mb-6">
                  Double check the details — you can still go back and edit.
                </p>

                <div className="bg-gray-50 rounded-lg border border-gray-200 divide-y divide-gray-200 mb-4">
                  {[
                    ['Student', `${form.firstName} ${form.lastName}`],
                    ['Gender', form.gender],
                    ['Date of birth', form.dateOfBirth],
                    ['Address', [location.village, location.cell, location.sector, location.district, location.province].filter(Boolean).join(', ')],
                    ['Parent / guardian', `${form.fatherName} / ${form.motherName}`],
                    ['Phone', form.guardianPhone],
                    ['Email', form.guardianEmail],
                    ...(selectedSpot ? [['Applying for', `${selectedSpot.level} · ${selectedSpot.yearofstudy}`]] : []),
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 px-4 py-2.5 text-[13.5px] font-family-poppins">
                      <span className="text-[#6B7280]">{k}</span>
                      <span className="font-semibold text-[#282C34] text-right">{v || '—'}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg border border-gray-200 px-4 py-2.5 flex justify-between text-[13.5px] font-family-poppins">
                  <span className="text-[#6B7280]">Documents attached</span>
                  <span className="font-semibold text-[#282C34]">
                    {Object.values(docs).filter(Boolean).length} files
                  </span>
                </div>

                {submitError && (
                  <p className="text-[#B10E1E] text-[12.5px] font-family-poppins mt-4">{submitError}</p>
                )}
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <button
                onClick={goBack}
                className="w-12 flex-shrink-0 flex items-center justify-center border border-gray-300 rounded-lg cursor-pointer"
              >
                <IoArrowBack />
              </button>
              {step < 3 ? (
                <button
                  onClick={goNext}
                  className="flex-1 bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px] cursor-pointer transition-transform active:scale-[0.98]"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={submitApplication}
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px] cursor-pointer disabled:opacity-60 transition-transform active:scale-[0.98]"
                >
                  {submitting && (
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  )}
                  {submitting ? 'Submitting…' : 'Submit application'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
