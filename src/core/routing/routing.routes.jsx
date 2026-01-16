import { createBrowserRouter } from 'react-router-dom';
import { App } from '../app/app.component';
import { AuthLayout } from '../app/layouts/auth/auth.layout';
import { AuthMiddleware } from './auth.middleware';
import { mainRoute } from '../../features/main/pages/main';
import { signInRoute } from '../../features/auth/pages/sign-in';
import { signUpRoute } from '../../features/auth/pages/sign-up';
import { forgotPasswordRoute } from '../../features/auth/pages/forgot-password';
import { userRoute } from '../../features/user/pages/user';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [mainRoute],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [signInRoute, signUpRoute, forgotPasswordRoute],
  },
  {
    element: <AuthMiddleware />,
    children: [userRoute],
  },
]);
