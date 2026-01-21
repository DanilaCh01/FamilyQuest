import { Navigate, Outlet } from 'react-router-dom';
import { appPaths } from '../routing.model';

export const PublicRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to={appPaths.user} replace /> : <Outlet />;
};
