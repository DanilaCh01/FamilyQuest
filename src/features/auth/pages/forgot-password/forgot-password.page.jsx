import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  return (
    <div>
      <h1 style={{ fontSize: '2rem' }}>Forgot Password Page</h1>
      <Link to="/" style={{ color: 'blue' }}>
        Return to Main page
      </Link>
    </div>
  );
};
