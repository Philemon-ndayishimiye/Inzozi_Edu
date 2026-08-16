import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import { IoSearchOutline } from 'react-icons/io5';
import { getApplication, type ApplicationRecord } from '../Helper/applicationsStore';

export default function TrackApplication() {
  const [searchParams] = useSearchParams();
  const initialRef = searchParams.get('ref') ?? '';
  const [code, setCode] = useState(initialRef);
  const [record, setRecord] = useState<ApplicationRecord | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialRef) {
      setRecord(getApplication(initialRef));
      setSearched(true);
    }
  }, [initialRef]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {return;}
    setRecord(getApplication(code));
    setSearched(true);
  };

  const isDecided = record?.status === 'approved' || record?.status === 'rejected';

  return (
    <div>
      <Navigation />
      <div className="pt-[110px] pb-16 px-5 sm:px-8 bg-gradient-to-b from-white to-[#CFDCEA] min-h-[75vh]">
        <div className="max-w-lg mx-auto">
          <h1 className="text-[22px] sm:text-[26px] font-bold text-[#282C34] font-family-playfair mb-1">
            Application status
          </h1>
          <p className="text-[#6B7280] text-[13.5px] font-family-poppins mb-6">
            Enter the reference code you received when you applied.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 mb-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your reference code"
              className="flex-1 min-w-0 border border-gray-300 rounded-lg px-4 py-2.5 text-[13.5px] font-mono outline-none focus:border-[#F09C00] focus:ring-2 focus:ring-[#FFB833]/30 bg-white"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-gradient-to-r from-[#F09C00] to-[#FFB833] text-white font-bold px-4 rounded-lg text-[13.5px] cursor-pointer"
            >
              <IoSearchOutline /> Check
            </button>
          </form>
          <p className="text-[11.5px] text-[#9CA3AF] font-family-poppins mb-6">
            Tracking works on the device and browser you applied from.
          </p>

          {searched && !record && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <p className="font-semibold text-[#282C34] font-family-poppins mb-1">
                We couldn&apos;t find that application
              </p>
              <p className="text-[#6B7280] text-[13px] font-family-poppins">
                Double check the reference code, or note that tracking only works on the device
                and browser you applied from.
              </p>
            </div>
          )}

          {record && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-[13px] text-[#6B7280] font-family-poppins mb-1">
                Reference <span className="font-mono text-[#282C34]">{record.referenceCode}</span>
              </p>
              <h2 className="text-[17px] font-bold text-[#282C34] font-family-playfair mb-1">
                {record.schoolName}
              </h2>
              <p className="text-[13px] text-[#6B7280] font-family-poppins mb-6">
                {record.studentName}
                {record.level ? ` · Applying for ${record.level}` : ''}
              </p>

              {record.status === 'submitted' && (
                <div className="bg-[#FFF3E0] border border-[#F09C00]/40 rounded-lg px-4 py-3 mb-6 flex gap-2.5">
                  <span className="text-lg">📱</span>
                  <div>
                    <b className="block text-[13.5px] text-[#5c4a10]">Under review</b>
                    <span className="text-[12.5px] text-[#6B4A0A] font-family-poppins">
                      The admission team is reviewing this application now.
                    </span>
                  </div>
                </div>
              )}
              {record.status === 'approved' && (
                <div className="bg-[#E7F5EA] border border-[#1E7A34]/40 rounded-lg px-4 py-3 mb-6 flex gap-2.5">
                  <span className="text-lg">🎉</span>
                  <div>
                    <b className="block text-[13.5px] text-[#1E7A34]">Congratulations — approved!</b>
                    <span className="text-[12.5px] text-[#1E7A34]/80 font-family-poppins">
                      {record.schoolName} has admitted {record.studentName}. Check your email for next steps.
                    </span>
                  </div>
                </div>
              )}
              {record.status === 'rejected' && (
                <div className="bg-[#FBEAE8] border border-[#B10E1E]/40 rounded-lg px-4 py-3 mb-6 flex gap-2.5">
                  <span className="text-lg">✉️</span>
                  <div>
                    <b className="block text-[13.5px] text-[#B10E1E]">Not admitted this time</b>
                    <span className="text-[12.5px] text-[#B10E1E]/85 font-family-poppins">
                      {record.decisionReason || 'The school did not share a specific reason.'}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-6 pl-1">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#CFDCEA] border-2 border-[#05416B] flex items-center justify-center text-sm flex-shrink-0">
                    📥
                  </div>
                  <div>
                    <b className="block text-[13.5px] text-[#282C34]">Application submitted</b>
                    <span className="text-[12px] text-[#6B7280]">Received by {record.schoolName}</span>
                    <span className="block font-mono text-[11px] text-gray-400 mt-0.5">
                      {new Date(record.submittedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm flex-shrink-0 ${
                      record.status === 'submitted' ? 'bg-[#F09C00] border-[#F09C00]' : 'bg-[#CFDCEA] border-[#05416B]'
                    }`}
                  >
                    📱
                  </div>
                  <div>
                    <b className="block text-[13.5px] text-[#282C34]">Under review</b>
                    <span className="text-[12px] text-[#6B7280]">Admission team checked documents</span>
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
                    {record.status === 'approved' ? '✅' : record.status === 'rejected' ? '✖️' : '✅'}
                  </div>
                  <div>
                    <b className="block text-[13.5px] text-[#282C34]">Decision sent</b>
                    <span className="text-[12px] text-[#6B7280]">
                      {isDecided
                        ? new Date(record.decidedAt ?? '').toLocaleString()
                        : 'You\'ll be notified by email'}
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
