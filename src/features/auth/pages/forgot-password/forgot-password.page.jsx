import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center',
        height: 'fit-content',
      }}
    >
      <h1 style={{ fontSize: '2rem', color: 'var(--color-accent)' }}>Forgot Password Page</h1>
      <p
        style={{
          paddingBottom: '0.2rem',
          fontSize: '1.2rem',
          fontWeight: '600',
          color: 'rgba(255, 0, 0, 0.75)',
          borderBottom: 'solid 1px',
          borderRadius: '5%',
        }}
      >
        Currently not available
      </p>
    </div>
  );
};
