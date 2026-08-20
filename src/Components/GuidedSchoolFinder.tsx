import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoArrowForward, IoCheckmarkCircle } from 'react-icons/io5';
import LocationFilter from './LocationFilter';
import { Levels, StudentType } from '../Types/Seats';

export default function GuidedSchoolFinder() {
  const { t } = useTranslation();
  const STEPS = [
    { id: 1, label: t('guidedFinder.stepWhere') },
    { id: 2, label: t('guidedFinder.stepLevel') },
    { id: 3, label: t('guidedFinder.stepNewcomer') },
  ] as const;
  const [, setSearchParams] = useSearchParams();

  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [level, setLevel] = useState('');
  const [studentType, setStudentType] = useState('');

  const step1Done = Boolean(district);
  const step2Done = Boolean(level);
  const step3Done = Boolean(studentType);
  const canSearch = step1Done && step2Done && step3Done;

  const handleFind = () => {
    if (!canSearch) {return;}
    const params = new URLSearchParams();
    params.set('district', district);
    params.set('level', level);
    params.set('studentType', studentType);
    setSearchParams(params, { replace: true });
    document.getElementById('schools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white py-10 px-6 sm:px-[40px] lg:px-[80px]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-7">
          <h2 className="font-bold text-2xl sm:text-[28px] text-[#282C34] font-family-playfair">
            {t('guidedFinder.title')}
          </h2>
          <p className="text-[#6B7280] text-[14px] sm:text-[15px] pt-2 font-family-poppins max-w-xl mx-auto">
            {t('guidedFinder.subtitle')}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          {STEPS.map((s, i) => {
            const done = s.id === 1 ? step1Done : s.id === 2 ? step2Done : step3Done;
            return (
              <div key={s.id} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold border-2 flex-shrink-0 ${
                    done
                      ? 'bg-[#F09C00] border-[#F09C00] text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {done ? <IoCheckmarkCircle className="text-[15px]" /> : s.id}
                </div>
                <span className={`text-[12px] font-family-poppins font-semibold hidden sm:inline ${done ? 'text-[#282C34]' : 'text-gray-400'}`}>
                  {s.label}
                </span>
                {i < STEPS.length - 1 && <div className="w-6 sm:w-10 h-[1.5px] bg-gray-200 mx-1" />}
              </div>
            );
          })}
        </div>

        <div className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <div className="text-[12.5px] font-bold text-[#282C34] font-family-poppins mb-2">{t('guidedFinder.whereDoYouLive')}</div>
            <LocationFilter
              province={province}
              district={district}
              onProvinceChange={(p) => {
                setProvince(p);
                setDistrict('');
              }}
              onDistrictChange={setDistrict}
            />
          </div>

          <div>
            <div className="text-[12.5px] font-bold text-[#282C34] font-family-poppins mb-2">{t('guidedFinder.whatLevel')}</div>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-[13.5px] text-[#282C34] font-family-poppins outline-none focus:border-[#F09C00] focus:ring-2 focus:ring-[#FFB833]/30"
            >
              <option value="">{t('guidedFinder.selectLevel')}</option>
              {Levels.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="text-[12.5px] font-bold text-[#282C34] font-family-poppins mb-2">{t('guidedFinder.newOrTransfer')}</div>
            <select
              value={studentType}
              onChange={(e) => setStudentType(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-[13.5px] text-[#282C34] font-family-poppins outline-none focus:border-[#F09C00] focus:ring-2 focus:ring-[#FFB833]/30"
            >
              <option value="">{t('guidedFinder.selectOne')}</option>
              {StudentType.map((s) => (
                <option key={s.value} value={s.value}>{s.label === 'newcomer' ? t('guidedFinder.newcomer') : t('guidedFinder.transferring')}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleFind}
            disabled={!canSearch}
            className="flex items-center gap-2 bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold text-[14px] px-7 py-3 rounded-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-transform active:scale-[0.98]"
          >
            {t('guidedFinder.findMatchingSchools')} <IoArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}
