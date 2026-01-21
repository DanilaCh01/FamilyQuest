import { Outlet, Link } from 'react-router-dom'; // add UseNavigate
import { appPaths } from '../routing/routing.model';

export const App = () => {
  // const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('role');
  //   navigate(`/auth/${appPaths.signIn}`);
  // };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <header
        style={{
          padding: '1rem 2rem',
          backgroundColor: 'var(--color-blue-700)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <strong>
          <Link to={`${appPaths.main}`}>FamilyQuest</Link>
        </strong>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          {!token ? (
            <Link to={`/auth/${appPaths.signIn}`} style={{ color: 'white' }}>
              Увійти
            </Link>
          ) : (
            <Link
              to={appPaths.user}
              style={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span>Профіль</span>
              <img
                src="https://ui-avatars.com/api/?name=User&background=random&color=fff&rounded=true"
                alt="Avatar"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  border: '1.5px solid rgba(0, 0, 0, 0.1)',
                }}
              />
            </Link>
          )}
        </nav>
      </header>

      <main style={{ padding: '2rem' }}>
        {' '}
        {/* style={{ padding: '2rem' }} накладається один на одного */}
        <Outlet />
      </main>
    </div>
  );
};
