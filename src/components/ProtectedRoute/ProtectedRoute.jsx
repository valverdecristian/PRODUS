import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProtectedRoute = ({ children, rolesPermitidos, soloAnonimos = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner mensaje="Verificando autenticación..." />;
  }

  if (soloAnonimos) {
    if (user) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && rolesPermitidos.length > 0 && !rolesPermitidos.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
