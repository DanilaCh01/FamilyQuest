import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { appPaths } from '../../../../core/routing/routing.model';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
      console.log('SignInPage mounted');
  
      const token = localStorage.getItem('token');
      if (token) {
        navigate(appPaths.user);
      }
  
      return () => {
        console.log('SignInPage unmounted');
      };
    }, [navigate]);

  return (
    <div>
      <h1 style={{ fontSize: '2rem' }}>Forgot Password Page</h1>
      <Link to="/" style={{ color: 'blue' }}>
        Return to Main page
      </Link>
    </div>
  );
};
