import { createBrowserRouter } from 'react-router-dom';
import { App } from '../app/app.component';
import { AuthLayout } from '../app/layouts/auth/auth.layout';
import { PublicRoute } from './middleware/public.route';
import { ProtectedRoute } from './middleware/protected.route';
import { ParentRoute } from './middleware/parent.route';
import { mainRoute } from '../../features/main/pages/main';
import { signInRoute } from '../../features/auth/pages/sign-in';
import { signUpRoute } from '../../features/auth/pages/sign-up';
import { forgotPasswordRoute } from '../../features/auth/pages/forgot-password';
import { userRoute } from '../../features/user/pages/user';
import { addChildRoute } from '../../features/user/pages/add-child';
import { familyControlRoute } from '../../features/user/pages/family-control';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      mainRoute,

      {
        element: <ProtectedRoute />,
        children: [
          userRoute,

          {
            element: <ParentRoute />,
            children: [addChildRoute],
          },
          {
            element: <ParentRoute />,
            children: [familyControlRoute],
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [signInRoute, signUpRoute, forgotPasswordRoute],
      },
    ],
  },
],
{ 
    basename: "/FamilyQuest" 
  });
