import { useMemo, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { skipToken } from '@reduxjs/toolkit/query';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import { TextInput } from '../Components/seats/InputSeats';
import { SelectInput } from '../Components/seats/SelectInput';
import LocationCascade, { type LocationValue } from '../Components/LocationCascade';
import { useGetSchoolDetailsQuery } from '../App/api/school/school';
import { useGetAllSpotsQuery } from '../App/api/spots/spot';
import { useApplyStudentMutation } from '../App/api/students/students';
import { IoArrowBack, IoCheckmarkCircle, IoWarningOutline, IoPersonOutline, IoAttachOutline } from 'react-icons/io5';
import { saveApplication, type StoredDocument } from '../Helper/applicationsStore';
import type { ReactNode } from 'react';

type StepId = 1 | 2 | 3;

function getSteps(t: TFunction): { id: StepId; label: string; icon: ReactNode }[] {
  return [
    { id: 1, label: t('studentApplication.step1'), icon: <IoPersonOutline /> },
    { id: 2, label: t('studentApplication.step2'), icon: <IoAttachOutline /> },
    { id: 3, label: t('studentApplication.step3'), icon: <IoCheckmarkCircle /> },
  ];
}

function getGenderOptions(t: TFunction) {
  return [
    { value: 'MALE', label: t('studentApplication.male') },
    { value: 'FEMALE', label: t('studentApplication.female') },
    { value: 'OTHER', label: t('studentApplication.other') },
  ];
}

type FormState = {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  nationality: string;
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
  dateOfBirth: '',
  fatherName: '',
  motherName: '',
  guardianPhone: '',
  guardianEmail: '',
};

// Local key -> exact multipart field name the backend expects.
type DocKey = 'passportPhoto' | 'previousReport' | 'resultSlip' | 'mitationLetter';

// previousReport/resultSlip/mitationLetter requirements depend on whether the
// child is a newcomer (no prior school to report from - the promotion result
// slip is what proves readiness) or a transfer (the previous school's report
// card and mutation letter matter more than a fresh result slip).
function getDocFields(t: TFunction, studentType: string): { key: DocKey; label: string; hint: string; required: boolean }[] {
  const isTransfer = studentType === 'transfer';
  return [
    { key: 'passportPhoto', label: t('studentApplication.passportPhoto'), hint: t('studentApplication.passportPhotoHint'), required: true },
    {
      key: 'previousReport',
      label: t('studentApplication.previousReport'),
      hint: t('studentApplication.previousReportHint'),
      required: isTransfer,
    },
    {
      key: 'resultSlip',
      label: t('studentApplication.resultSlip'),
      hint: isTransfer ? t('studentApplication.resultSlipHintTransfer') : t('studentApplication.resultSlipHint'),
      required: !isTransfer,
    },
    { key: 'mitationLetter', label: t('studentApplication.mitationLetter'), hint: t('studentApplication.mitationLetterHint'), required: isTransfer },
  ];
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type ErrorResponse = { message?: string };

function StepTracker({ current, t }: { current: StepId; t: TFunction }) {
  const STEPS = getSteps(t);
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
  const { t } = useTranslation();
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
      'firstName', 'lastName', 'gender', 'nationality',
      'dateOfBirth', 'fatherName', 'motherName', 'guardianPhone', 'guardianEmail',
    ];
    const next: Record<string, string> = {};
    required.forEach((key) => {
      if (!form[key]) {next[key] = t('common.required');}
    });
    if (!location.province) {next.province = t('common.required');}
    if (!location.district) {next.district = t('common.required');}
    if (!location.sector) {next.sector = t('common.required');}
    if (!location.cell) {next.cell = t('common.required');}
    if (!location.village) {next.village = t('common.required');}
    if (form.guardianEmail && !/^\S+@\S+\.\S+$/.test(form.guardianEmail)) {
      next.guardianEmail = t('auth.login.emailInvalid');
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep2 = () => {
    const next: Record<string, string> = {};
    getDocFields(t, selectedSpot?.studentType ?? '').filter((f) => f.required).forEach(({ key }) => {
      if (!docs[key]) {next[key] = t('common.required');}
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
      setSubmitError(t('studentApplication.noSpotSelectedTitle'));
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
    body.append('studentType', selectedSpot.studentType);
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
    const docFields = getDocFields(t, selectedSpot.studentType);
    docFields.forEach(({ key }) => {
      const file = docs[key];
      if (file) {body.append(key, file);}
    });

    try {
      const response = await applyStudent(body).unwrap();
      const student = response.data;

      const documents: StoredDocument[] = docFields
        .filter(({ key }) => docs[key])
        .map(({ key, label }) => ({ label, fileName: docs[key]!.name, size: docs[key]!.size }));

      const record = {
        referenceCode: student.trackingCode ?? student.id,
        schoolId: schoolId ?? '',
        schoolName: schoolName ?? '',
        studentName: `${form.firstName} ${form.lastName}`.trim(),
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        studentType: selectedSpot.studentType,
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
      // Local cache lets the parent revisit /track instantly on this same
      // device; the real lookup by trackingCode against the backend is what
      // makes /track work from any device.
      saveApplication(record);

      navigate('/application/confirmation', { state: record });
    } catch (err) {
      const fetchErr = err as FetchBaseQueryError;
      const message =
        fetchErr && 'data' in fetchErr ? (fetchErr.data as ErrorResponse)?.message : undefined;
      setSubmitError(message || t('studentApplication.submitError'));
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
              aria-label={t('studentApplication.back')}
            >
              <IoArrowBack />
            </button>
            <div className="min-w-0">
              <div className="font-bold text-[15px] text-[#282C34] font-family-poppins truncate">
                {schoolLoading ? (
                  <span className="inline-block h-4 w-32 bg-gray-200 rounded animate-pulse" />
                ) : (
                  schoolName ?? t('studentApplication.schoolFallback')
                )}
              </div>
              <div className="text-[11.5px] text-[#6B7280] font-family-poppins">
                {t('studentApplication.applicationForm')}
                {selectedSpot ? ` · ${selectedSpot.level} · ${selectedSpot.yearofstudy}` : ''}
              </div>
            </div>
          </div>

          {!selectedSpot && !schoolLoading && (
            <div className="mx-5 sm:mx-8 mt-5 flex gap-2.5 items-start bg-[#FBEAE8] border border-[#B10E1E]/30 rounded-lg px-4 py-3">
              <IoWarningOutline className="text-[#B10E1E] text-lg flex-shrink-0 mt-0.5" />
              <p className="text-[12.5px] text-[#B10E1E] font-family-poppins leading-relaxed">
                {t('studentApplication.noSpotSelectedTitle')}
              </p>
            </div>
          )}

          <div className="px-5 sm:px-8 pt-6">
            <StepTracker current={step} t={t} />
          </div>

          <div className="px-5 sm:px-8 pb-8">
            {step === 1 && (
              <div>
                <h2 className="text-[19px] font-bold text-[#282C34] font-family-playfair mb-1">
                  {t('studentApplication.tellUsAboutStudent')}
                </h2>
                <p className="text-[#6B7280] text-[13px] font-family-poppins mb-6">
                  {t('studentApplication.goesStraightTo', { school: schoolName ?? t('studentApplication.theSchool') })}
                </p>

                {selectedSpot && (
                  <div className="mb-4 bg-[#CFDCEA]/40 border border-[#05416B]/20 rounded-lg px-4 py-2.5 text-[12.5px] text-[#05416B] font-family-poppins">
                    {t('studentApplication.reviewApplyingFor')} <b>{selectedSpot.level}</b> · <b>{selectedSpot.studentType}</b> · {selectedSpot.yearofstudy}
                    <span className="block text-[11px] text-[#6B7280] mt-0.5">
                      {t('studentApplication.appliedForClass')}
                    </span>
                  </div>
                )}

                <h3 className="font-bold text-[15px] text-[#282C34] mb-3 font-family-poppins">
                  {t('studentApplication.studentInformation')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  <TextInput label={t('studentApplication.firstName')} name="firstName" placeholder={t('studentApplication.firstName')} value={form.firstName} onChange={handleInput} />
                  <TextInput label={t('studentApplication.lastName')} name="lastName" placeholder={t('studentApplication.lastName')} value={form.lastName} onChange={handleInput} />
                  <TextInput label={t('studentApplication.middleName')} name="middleName" placeholder={t('common.optional')} value={form.middleName} onChange={handleInput} />
                  <SelectInput label={t('studentApplication.gender')} name="gender" placeholder={t('studentApplication.selectGender')} options={getGenderOptions(t)} value={form.gender} onChange={handleInput} />
                  <TextInput label={t('studentApplication.nationality')} name="nationality" placeholder="e.g. Rwandan" value={form.nationality} onChange={handleInput} />
                  <TextInput label={t('studentApplication.dateOfBirth')} name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleInput} />
                </div>

                <h3 className="font-bold text-[15px] text-[#282C34] mt-5 mb-3 font-family-poppins">
                  {t('studentApplication.homeAddress')}
                </h3>
                <LocationCascade value={location} onChange={setLocation} required />

                {Object.keys(errors).length > 0 && (
                  <p className="text-[#B10E1E] text-[12.5px] font-family-poppins mt-1 mb-2">
                    {t('studentApplication.fillAllFields')}
                  </p>
                )}

                <h3 className="font-bold text-[15px] text-[#282C34] mt-4 mb-3 font-family-poppins">
                  {t('studentApplication.guardianInformation')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  <TextInput label={t('studentApplication.fatherName')} name="fatherName" placeholder={t('studentApplication.fatherName')} value={form.fatherName} onChange={handleInput} />
                  <TextInput label={t('studentApplication.motherName')} name="motherName" placeholder={t('studentApplication.motherName')} value={form.motherName} onChange={handleInput} />
                  <TextInput label={t('studentApplication.guardianPhone')} name="guardianPhone" placeholder="078 000 0000" value={form.guardianPhone} onChange={handleInput} />
                  <TextInput label={t('studentApplication.guardianEmail')} name="guardianEmail" type="email" placeholder="you@email.com" value={form.guardianEmail} onChange={handleInput} />
                </div>
                <p className="text-[11.5px] text-[#6B7280] font-family-poppins -mt-2">
                  {t('studentApplication.guardianEmailHint')}
                </p>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-[19px] font-bold text-[#282C34] font-family-playfair mb-1">
                  {t('studentApplication.uploadRequiredDocuments')}
                </h2>
                <p className="text-[#6B7280] text-[13px] font-family-poppins mb-6">
                  {t('studentApplication.uploadHint')}
                </p>

                <div className="space-y-3">
                  {getDocFields(t, selectedSpot?.studentType ?? '').map(({ key, label, hint, required }) => {
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
                            <IoAttachOutline className="text-xl text-[#05416B] flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="font-semibold text-[13.5px] text-[#05416B] truncate font-family-poppins">
                                {file.name}
                              </div>
                              <div className="text-[11px] text-[#6B7280]">{formatSize(file.size)} · {t('studentApplication.uploaded')}</div>
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
                    {t('studentApplication.additionalDocsNote', { docs: selectedSpot.admissionConditions.documents.join(', ') })}
                  </p>
                )}
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-[19px] font-bold text-[#282C34] font-family-playfair mb-1">
                  {t('studentApplication.reviewTitle')}
                </h2>
                <p className="text-[#6B7280] text-[13px] font-family-poppins mb-6">
                  {t('studentApplication.reviewSubtitle')}
                </p>

                <div className="bg-gray-50 rounded-lg border border-gray-200 divide-y divide-gray-200 mb-4">
                  {[
                    [t('studentApplication.reviewStudent'), `${form.firstName} ${form.lastName}`],
                    [t('studentApplication.reviewGender'), form.gender],
                    [t('studentApplication.reviewDob'), form.dateOfBirth],
                    [t('studentApplication.reviewAddress'), [location.village, location.cell, location.sector, location.district, location.province].filter(Boolean).join(', ')],
                    [t('studentApplication.reviewGuardian'), `${form.fatherName} / ${form.motherName}`],
                    [t('studentApplication.reviewPhone'), form.guardianPhone],
                    [t('studentApplication.reviewEmail'), form.guardianEmail],
                    ...(selectedSpot ? [[t('studentApplication.reviewApplyingFor'), `${selectedSpot.level} · ${selectedSpot.yearofstudy}`]] : []),
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 px-4 py-2.5 text-[13.5px] font-family-poppins">
                      <span className="text-[#6B7280]">{k}</span>
                      <span className="font-semibold text-[#282C34] text-right">{v || t('studentApplication.noneValue')}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg border border-gray-200 px-4 py-2.5 flex justify-between text-[13.5px] font-family-poppins">
                  <span className="text-[#6B7280]">{t('studentApplication.documentsAttached')}</span>
                  <span className="font-semibold text-[#282C34]">
                    {t('studentApplication.filesCount', { count: Object.values(docs).filter(Boolean).length })}
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
                  {t('studentApplication.continue')}
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
                  {submitting ? t('studentApplication.submitting') : t('studentApplication.submit')}
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
