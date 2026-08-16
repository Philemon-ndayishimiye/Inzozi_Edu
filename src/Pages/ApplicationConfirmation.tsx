import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import { FaRegCheckCircle } from 'react-icons/fa';

type ConfirmationState = {
  referenceCode: string;
  schoolName: string;
  studentName: string;
  guardianEmail: string;
  level?: string;
  yearofstudy?: string;
};

export default function ApplicationConfirmation() {
  const { state } = useLocation() as { state: ConfirmationState | null };
  const navigate = useNavigate();

  if (!state?.referenceCode) {
    return (
      <div>
        <Navigation />
        <div className="pt-[110px] pb-20 px-6 text-center bg-gradient-to-b from-white to-[#CFDCEA] min-h-[70vh]">
          <h1 className="text-[22px] font-bold text-[#282C34] font-family-playfair mb-2">
            No application found
          </h1>
          <p className="text-[#6B7280] text-[14px] font-family-poppins mb-6">
            Start by finding a school and applying for your child.
          </p>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg px-6 py-3 text-[14px]"
          >
            Search schools
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="pt-[110px] pb-16 px-5 sm:px-8 bg-gradient-to-b from-white to-[#CFDCEA] min-h-[70vh]">
        <div className="max-w-lg mx-auto text-center">
          <FaRegCheckCircle className="text-6xl text-[#F09C00] mx-auto mb-5" />
          <h1 className="text-[22px] sm:text-[24px] font-bold text-[#282C34] font-family-playfair mb-2">
            Your application is on its way
          </h1>
          <p className="text-[#6B7280] text-[14px] font-family-poppins mb-7 leading-relaxed">
            We&apos;ve sent it to <b className="text-[#282C34]">{state.schoolName}</b>&apos;s admission team.
            You&apos;ll get an email at <b className="text-[#282C34]">{state.guardianEmail}</b> the moment
            there&apos;s a decision.
          </p>

          <div className="bg-white border-[1.5px] border-dashed border-gray-300 rounded-xl p-5 mb-7 text-left sm:text-center">
            <div className="font-mono text-[10.5px] uppercase tracking-wide text-[#6B7280] mb-1">
              Your reference code
            </div>
            <div className="font-mono text-[15px] sm:text-[17px] font-bold text-[#05416B] break-all">
              {state.referenceCode}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8 text-left">
            <h3 className="font-mono text-[11px] uppercase tracking-wide text-[#6B7280] mb-3">
              What happens next
            </h3>
            <div className="flex gap-3 py-2 text-[13.5px] font-family-poppins">
              <span>📥</span>
              <div>
                <b className="block text-[#282C34]">Admission team reviews it</b>
                <span className="text-[#6B7280] text-[12.5px]">Usually within 5–7 days</span>
              </div>
            </div>
            <div className="flex gap-3 py-2 text-[13.5px] font-family-poppins">
              <span>✉️</span>
              <div>
                <b className="block text-[#282C34]">You get an email decision</b>
                <span className="text-[#6B7280] text-[12.5px]">Sent to {state.guardianEmail}</span>
              </div>
            </div>
            <div className="flex gap-3 py-2 text-[13.5px] font-family-poppins">
              <span>🔍</span>
              <div>
                <b className="block text-[#282C34]">Check status anytime</b>
                <span className="text-[#6B7280] text-[12.5px]">Use your reference code — no account needed</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate(`/track?ref=${encodeURIComponent(state.referenceCode)}`)}
            className="w-full bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px] mb-3 cursor-pointer"
          >
            Track this application
          </button>
          <Link
            to="/"
            className="block w-full border border-gray-300 rounded-lg py-3 text-[14.5px] font-semibold text-[#282C34] font-family-poppins"
          >
            Search more schools
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
