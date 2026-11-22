import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../Hooks/useUser';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token, bootstrapping } = useUser();

  // Still trying the silent refresh (httpOnly cookie -> new access token)
  // on app load - don't redirect yet, or a plain reload would always bounce
  // an otherwise still-logged-in user to /login.
  if (bootstrapping) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
