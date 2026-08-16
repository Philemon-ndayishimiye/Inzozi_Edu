
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../../assets/profile.png'; // make sure this exists
import { useUser } from '../../Hooks/useUser';
import { useLogoutMutation } from '../../App/api/Auth/auth';
import ConfirmDialog from '../ConfirmDialog';

export default function LogoutComp() {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const { clearUser, user } = useUser();
  const [confirming, setConfirming] = useState(false);

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
    } catch {
      // still clear local session even if the server call fails
    }
    clearUser();
    navigate('/login');
  };

  return (
    <div className="w-[250px] bg-primary-color">
      <div className="flex py-[10px] px-5 rounded-[50%] w-full h-[20%]">
        <img src={profile} className="w-[40px] h-[40px] rounded-[50%]" />
        <span className="text-white text-[10px] cursor-pointer pt-3 pl-1 transition-transform">
          {user?.firstName} {user?.lastName}
        </span>
      </div>

      <div className="flex flex-col gap-2 py-[30px] font-semibold text-white">
        <Link className="hover:bg-blue-400 px-5 py-2" to="/setting">
          Settings and privacy
        </Link>
        <a className="hover:bg-blue-400 px-5 py-2 cursor-pointer" href="">
          Help
        </a>
        <a className="hover:bg-blue-400 px-5 py-2 cursor-pointer" href="">
          Profiles
        </a>
        <a className="hover:bg-blue-400 px-5 py-2 cursor-pointer" href="">
          Trendings
        </a>
        <a className="hover:bg-blue-400 px-5 py-2 cursor-pointer" onClick={() => setConfirming(true)}>
          Sign Out
        </a>
      </div>

      <ConfirmDialog
        isOpen={confirming}
        title="Log out?"
        message="You'll need to log in again afterwards."
        confirmLabel="Log out"
        tone="danger"
        loading={isLoading}
        onConfirm={handleLogout}
        onCancel={() => setConfirming(false)}
      />
    </div>
  );
}
