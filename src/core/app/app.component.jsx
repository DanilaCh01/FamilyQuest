import { Outlet, Link, useNavigate } from 'react-router-dom';
import { appPaths } from '../routing/routing.model';
import { clearAuthData, getToken } from '../utils/token.utils';
import { request } from '../api/api.utils.js'; // Тимчасовий функціонал
import { setToken, setRole } from '../utils/token.utils'; // Тимчасовий функціонал

export const App = () => {
  const navigate = useNavigate();
  const token = getToken();

  const handleQuickLogin = async (email, password, role) => {
    // Тимчасовий функціонал (для швидкого тестування)
    try {
      const data = await request('/auth/login', 'POST', { email, password, role });
      setToken(data.token);
      setRole(data.role);
      window.location.href = `/user`;
    } catch (err) {
      console.error('Quick login failed:', err);
      alert('Швидкий вхід не вдався');
    }
  };

  const handleLogout = () => {
    clearAuthData();
    navigate(`/auth/${appPaths.signIn}`);
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <header
        style={{
          padding: '1rem 2rem',
          backgroundColor: 'var(--color-blue-700)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <strong>
          <Link to={`${appPaths.main}`}>FamilyQuest</Link>
        </strong>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          {/* Тимчасово + */}
          {!token && (
            <div className="flex gap-2 border-r border-blue-400 pr-4 mr-2">
              <button
                onClick={() => handleQuickLogin('1user@example.com', '1', 'parent')}
                className="text-[10px] bg-blue-800 px-2 py-1 rounded hover:bg-blue-900"
              >
                Dev: Parent
              </button>
              <button
                onClick={() => handleQuickLogin('1max@example.com', '1', 'child')}
                className="text-[10px] bg-green-800 px-2 py-1 rounded hover:bg-green-900"
              >
                Dev: Child
              </button>
            </div>
          )}
          {/* Тимчасово - */}

          {!token ? (
            <Link to={`/auth/${appPaths.signIn}`} style={{ color: 'white' }}>
              Увійти
            </Link>
          ) : (
            <>
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

              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                Вийти
              </button>
            </>
          )}
        </nav>
      </header>

      <main>
        {/* style={{ padding: '2rem' }} накладається один на одного */}
        <Outlet />
      </main>
    </div>
  );
};
