import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import ContNav from '../Components/ContNav';
import AuthLayout from '../Components/AuthLayout';

export default function SchoolPage() {
  return (
    <div>
      <ContNav />
      <AuthLayout
        title="Welcome to your Inzozi account!"
        subtitle="Inzozi helps you manage applications and showcase your school. Start simplifying your work and improving your school's visibility by registering it in a few simple steps."
      >
        <Link
          to="/schoolRegister"
          className="block w-full text-center bg-gradient-to-r from-[#F09C00] via-[#FFB833] to-[#F09C00] text-white font-bold rounded-lg py-3 text-[14.5px]"
        >
          Register new school
        </Link>
      </AuthLayout>
      <Footer />
    </div>
  );
}
