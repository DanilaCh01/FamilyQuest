import { Navigate, Outlet } from 'react-router-dom';
import { appPaths } from '../routing.model';

export const ParentRoute = () => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to={`/auth/${appPaths.signIn}`} replace />;
  return role === 'parent' ? <Outlet /> : <Navigate to={appPaths.user} replace />;
};
