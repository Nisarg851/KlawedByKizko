import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

export default PrivateRoute;