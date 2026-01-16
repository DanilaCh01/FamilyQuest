import { Navigate, Outlet } from 'react-router-dom';
import { appPaths } from './routing.model';

export const AuthMiddleware = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to={`/auth/${appPaths.signIn}`} replace />;
  }

  return <Outlet />;
};
