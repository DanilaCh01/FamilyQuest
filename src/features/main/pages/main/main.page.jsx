import { Link } from 'react-router-dom';
import { appPaths } from '../../../../core/routing/routing.model';

export const MainPage = () => {
  const token = localStorage.getItem('token');

  return (
    <div>
      <h1 style={{ fontSize: '2rem' }}>Main Page</h1>
      <ul style={{ padding: '10px 0' }}>
        {!token ? (
          <>
            <li style={{ margin: '10px 0', color: 'blue' }}>
              <Link to={`/auth/${appPaths.signIn}`}>Go to Sign-in</Link>
            </li>
            <li style={{ margin: '10px 0', color: 'blue' }}>
              <Link to={`/auth/${appPaths.signUp}`}>Go to Sign-up</Link>
            </li>
          </>
        ) : (
          <li style={{ margin: '10px 0', color: 'blue' }}>
            <Link to={`${appPaths.user}`}>Go to User Profile</Link>
          </li>
        )}
      </ul>
    </div>
  );
};
