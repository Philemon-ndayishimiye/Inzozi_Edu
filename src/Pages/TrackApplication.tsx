import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import {
  IoSearchOutline,
  IoTimeOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoDownloadOutline,
} from 'react-icons/io5';
import { useLazyTrackApplicationQuery, type TrackApplicationResult } from '../App/api/students/students';

export default function TrackApplication() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const initialRef = searchParams.get('ref') ?? '';
  const [code, setCode] = useState(initialRef);
  const [trigger, { data, isFetching }] = useLazyTrackApplicationQuery();
  const [searched, setSearched] = useState(false);
  const lang = i18n.language !== 'en' ? i18n.language : undefined;

  useEffect(() => {
    if (initialRef) {
      trigger({ code: initialRef, lang });
      setSearched(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRef]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {return;}
    trigger({ code: code.trim(), lang });
    setSearched(true);
  };

  const record: TrackApplicationResult | null = data?.data ?? null;
  const isDecided = record?.status === 'approved' || record?.status === 'rejected';

  return (
    <div>
      <Navigation />
      <div className="pt-[110px] pb-16 px-5 sm:px-8 bg-gradient-to-b from-white to-[#CFDCEA] min-h-[75vh]">
        <div className="max-w-lg mx-auto">
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#282C34] font-family-playfair mb-1">
            {t('trackApplication.title')}
          </h1>
          <p className="text-[#6B7280] text-[13.5px] font-family-poppins mb-6">
            {t('trackApplication.subtitle')}
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 mb-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t('trackApplication.placeholder')}
              className="flex-1 min-w-0 border border-gray-300 rounded-lg px-4 py-2.5 text-[13.5px] font-mono uppercase outline-none focus:border-[#F09C00] focus:ring-2 focus:ring-[#FFB833]/30 bg-white"
            />
            <button
              type="submit"
              disabled={isFetching}
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#F09C00] to-[#FFB833] text-white font-bold px-4 rounded-lg text-[13.5px] cursor-pointer disabled:opacity-60"
            >
              <IoSearchOutline /> {isFetching ? t('trackApplication.checking') : t('trackApplication.check')}
            </button>
          </form>
          <p className="text-[11.5px] text-[#9CA3AF] font-family-poppins mb-6">
            {t('trackApplication.hint')}
          </p>

          {searched && !isFetching && !record && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <p className="font-semibold text-[#282C34] font-family-poppins mb-1">
                {t('trackApplication.notFoundTitle')}
              </p>
              <p className="text-[#6B7280] text-[13px] font-family-poppins">
                {t('trackApplication.notFoundBody')}
              </p>
            </div>
          )}

          {record && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-[13px] text-[#6B7280] font-family-poppins mb-1">
                {t('trackApplication.trackingCode')} <span className="font-mono text-[#282C34]">{record.trackingCode}</span>
              </p>
              <h2 className="text-[17px] font-bold text-[#282C34] font-family-playfair mb-1">
                {record.schoolName}
              </h2>
              <p className="text-[13px] text-[#6B7280] font-family-poppins mb-6">
                {record.firstName} {record.lastName}
                {record.level ? ` · ${t('trackApplication.applyingFor', { level: record.level })}` : ''}
              </p>

              {record.status === 'pending' && (
                <div className="bg-[#FFF3E0] border border-[#F09C00]/40 rounded-lg px-4 py-3 mb-6 flex gap-2.5">
                  <IoTimeOutline className="text-lg text-[#F09C00] flex-shrink-0 mt-0.5" />
                  <div>
                    <b className="block text-[13.5px] text-[#5c4a10]">{t('trackApplication.underReview')}</b>
                    <span className="text-[12.5px] text-[#6B4A0A] font-family-poppins">
                      {t('trackApplication.underReviewBody')}
                    </span>
                  </div>
                </div>
              )}
              {record.status === 'approved' && (
                <div className="bg-[#E7F5EA] border border-[#1E7A34]/40 rounded-lg px-4 py-3 mb-6 flex gap-2.5">
                  <IoCheckmarkCircleOutline className="text-lg text-[#1E7A34] flex-shrink-0 mt-0.5" />
                  <div>
                    <b className="block text-[13.5px] text-[#1E7A34]">{t('trackApplication.approved')}</b>
                    <span className="text-[12.5px] text-[#1E7A34]/80 font-family-poppins">
                      {t('trackApplication.approvedBody', { school: record.schoolName, name: record.firstName })}
                    </span>
                  </div>
                </div>
              )}
              {record.status === 'rejected' && (
                <div className="bg-[#FBEAE8] border border-[#B10E1E]/40 rounded-lg px-4 py-3 mb-6 flex gap-2.5">
                  <IoCloseCircleOutline className="text-lg text-[#B10E1E] flex-shrink-0 mt-0.5" />
                  <div>
                    <b className="block text-[13.5px] text-[#B10E1E]">{t('trackApplication.rejected')}</b>
                    <span className="text-[12.5px] text-[#B10E1E]/85 font-family-poppins">
                      {record.rejectedReason || t('trackApplication.rejectedBodyFallback')}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-6 pl-1">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#CFDCEA] border-2 border-[#05416B] flex items-center justify-center text-sm flex-shrink-0">
                    <IoDownloadOutline className="text-[#05416B]" />
                  </div>
                  <div>
                    <b className="block text-[13.5px] text-[#282C34]">{t('trackApplication.applicationSubmitted')}</b>
                    <span className="text-[12px] text-[#6B7280]">{t('trackApplication.receivedBy', { school: record.schoolName })}</span>
                    <span className="block font-mono text-[11px] text-gray-400 mt-0.5">
                      {new Date(record.submittedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm flex-shrink-0 ${
                      record.status === 'pending' ? 'bg-[#F09C00] border-[#F09C00]' : 'bg-[#CFDCEA] border-[#05416B]'
                    }`}
                  >
                    <IoTimeOutline className={record.status === 'pending' ? 'text-white' : 'text-[#05416B]'} />
                  </div>
                  <div>
                    <b className="block text-[13.5px] text-[#282C34]">{t('trackApplication.underReview')}</b>
                    <span className="text-[12px] text-[#6B7280]">{t('trackApplication.documentsChecked')}</span>
                  </div>
                </div>
                <div className={`flex gap-3 ${isDecided ? '' : 'opacity-50'}`}>
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm flex-shrink-0 ${
                      record.status === 'approved'
                        ? 'bg-[#E7F5EA] border-[#1E7A34]'
                        : record.status === 'rejected'
                          ? 'bg-[#FBEAE8] border-[#B10E1E]'
                          : 'bg-gray-100 border-gray-300'
                    }`}
                  >
                    {record.status === 'approved' ? (
                      <IoCheckmarkCircleOutline className="text-[#1E7A34]" />
                    ) : record.status === 'rejected' ? (
                      <IoCloseCircleOutline className="text-[#B10E1E]" />
                    ) : (
                      <IoCheckmarkCircleOutline className="text-gray-400" />
                    )}
                  </div>
                  <div>
                    <b className="block text-[13.5px] text-[#282C34]">{t('trackApplication.decisionSent')}</b>
                    <span className="text-[12px] text-[#6B7280]">
                      {isDecided && record.decidedAt
                        ? new Date(record.decidedAt).toLocaleString()
                        : t('trackApplication.notifiedByEmail')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
