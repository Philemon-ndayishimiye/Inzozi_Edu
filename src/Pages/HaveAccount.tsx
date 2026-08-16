import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import AuthLayout from '../Components/AuthLayout';

export default function HaveAccountPage() {
  return (
    <div>
      <Navigation />
      <AuthLayout title="You now have an account!">
        <div className="flex flex-col items-center text-center py-4">
          <FaCheckCircle className="text-6xl text-[#F09C00] mb-3" />
          <h2 className="text-[#F09C00] text-[20px] font-bold mb-2">Success!</h2>
          <p className="text-gray-500 text-[13.5px] font-family-poppins mb-6">
            Your account was successfully created. Now you can log into your account.
          </p>
          <Link
            to="/login"
            className="w-full bg-[#05416B] text-white font-bold rounded-lg py-3 text-center text-[14.5px]"
          >
            Return to log in
          </Link>
        </div>
      </AuthLayout>
      <Footer />
    </div>
  );
}
