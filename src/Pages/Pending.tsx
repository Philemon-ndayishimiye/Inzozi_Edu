import ContNav from '../Components/ContNav';
import Footer from '../Components/Footer';
import AuthLayout from '../Components/AuthLayout';
import { IoCheckmarkCircle, IoHourglassOutline, IoMailOutline } from 'react-icons/io5';

export default function Pending() {
  return (
    <div>
      <ContNav />
      <AuthLayout
        title="Your school is under review"
        subtitle="We've received your registration and documents. Inzozi Admin will verify everything before your school goes live to parents."
      >
        <div className="space-y-5">
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-[#E7F5EA] text-[#1E7A34] flex items-center justify-center flex-shrink-0">
              <IoCheckmarkCircle />
            </div>
            <div>
              <b className="block text-[13.5px] text-[#282C34]">Registration submitted</b>
              <span className="text-[12px] text-gray-500">Your school details and documents were received</span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-[#FFBE2E] flex items-center justify-center flex-shrink-0">
              <IoHourglassOutline />
            </div>
            <div>
              <b className="block text-[13.5px] text-[#282C34]">Under review by Admin</b>
              <span className="text-[12px] text-gray-500">Usually takes 2–3 business days</span>
            </div>
          </div>
          <div className="flex gap-3 opacity-50">
            <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
              <IoMailOutline />
            </div>
            <div>
              <b className="block text-[13.5px] text-[#282C34]">Decision sent by email</b>
              <span className="text-[12px] text-gray-500">You&apos;ll be notified either way</span>
            </div>
          </div>
        </div>
      </AuthLayout>
      <Footer />
    </div>
  );
}
