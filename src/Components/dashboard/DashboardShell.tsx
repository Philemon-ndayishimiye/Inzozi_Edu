import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMenu, IoClose, IoLogOutOutline } from 'react-icons/io5';
import { useUser } from '../../Hooks/useUser';
import { useLogoutMutation } from '../../App/api/Auth/auth';
import ConfirmDialog from '../ConfirmDialog';

export type DashboardNavItem = {
  to: string;
  label: string;
  icon: ReactNode;
};

type DashboardShellProps = {
  roleLabel: string;
  roleContext?: string;
  brandExtra?: ReactNode;
  navItems: DashboardNavItem[];
  pageTitle: string;
  pageCrumb?: string;
  headerAction?: ReactNode;
  children: ReactNode;
};

export default function DashboardShell({
  roleLabel,
  roleContext,
  brandExtra,
  navItems,
  pageTitle,
  pageCrumb,
  headerAction,
  children,
}: DashboardShellProps) {
  const [open, setOpen] = useState(false);
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const { user, clearUser } = useUser();
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
    } catch {
      // still clear local session even if the server call fails
    }
    clearUser();
    navigate('/login');
  };

  const sidebar = (
    <div className="flex flex-col h-full bg-[#05416B] text-white w-64 flex-shrink-0">
      <div className="flex items-center gap-2 px-5 pt-6 pb-5">
        <img src="/images/school.png" alt="" className="w-7 h-7 rounded-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
        <span className="font-family-playfair font-bold text-[17px]">Inzozi</span>
      </div>

      <div className="mx-4 mb-5 bg-white/10 rounded-xl px-3 py-3">
        <div className="font-mono text-[9.5px] uppercase tracking-wide text-white/55">Signed in as</div>
        <div className="text-[13px] font-bold mt-0.5 truncate">
          {user?.firstName ? `${user.firstName} ${user.lastName}` : (user?.email ?? '—')}
        </div>
        <div className="text-[11px] text-white/65 mt-0.5">{roleLabel}{roleContext ? ` · ${roleContext}` : ''}</div>
      </div>

      {brandExtra}

      <nav className="flex-1 px-3 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium mb-1 transition-colors ${
                isActive ? 'bg-white/15 text-white font-bold' : 'text-white/80 hover:bg-white/10'
              }`
            }
          >
            <span className="flex-shrink-0 text-[17px] flex items-center">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-white/15">
        <button
          onClick={() => setConfirmingLogout(true)}
          className="flex items-center gap-2 text-[12px] text-white/70 hover:text-white cursor-pointer"
        >
          <IoLogOutOutline className="text-base" />
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#F3F4F6]">
      <div className="hidden lg:block sticky top-0 h-screen">{sidebar}</div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-64 h-full">{sidebar}</div>
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="bg-white border-b border-gray-200 px-4 sm:px-7 py-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <IoMenu />
            </button>
            <div>
              {pageCrumb && (
                <div className="font-mono text-[10.5px] uppercase tracking-wide text-gray-400 mb-0.5">
                  {pageCrumb}
                </div>
              )}
              <h1 className="text-[18px] sm:text-[20px] font-bold text-[#282C34] font-family-playfair">
                {pageTitle}
              </h1>
            </div>
          </div>
          {headerAction}
        </div>

        <div className="p-4 sm:p-7 max-w-[1200px]">{children}</div>
      </div>

      {open && (
        <button
          className="lg:hidden fixed top-4 right-4 z-50 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <IoClose />
        </button>
      )}

      <ConfirmDialog
        isOpen={confirmingLogout}
        title="Log out?"
        message="You'll need to log in again to get back to your dashboard."
        confirmLabel="Log out"
        tone="danger"
        loading={loggingOut}
        onConfirm={handleLogout}
        onCancel={() => setConfirmingLogout(false)}
      />

      {loggingOut && (
        <div className="fixed inset-0 z-[60] bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#05416B]/25 border-t-[#05416B] rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
