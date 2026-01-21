import { Navigate, Outlet } from 'react-router-dom';
import { appPaths } from '../routing.model';

export const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to={`/auth/${appPaths.signIn}`} replace />;
};
