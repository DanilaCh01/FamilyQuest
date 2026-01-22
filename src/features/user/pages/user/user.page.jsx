import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { clearAuthData } from '../../../../core/utils/token.utils.js';
import { request } from '../../../../core/api/api.utils.js';
import { ParentView } from '../../components/parent-view/parent-view.component.jsx'
import { ChildView } from '../../components/child-view/child-view.component.jsx';
import { appPaths } from '../../../../core/routing/routing.model';

export const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await request('/users'); 
        setUserData(data);
      } catch (err) {
        if (err.status === 401) {
          setError('Помилка авторизації.');
          clearAuthData();
          navigate(`/auth/${appPaths.signIn}`);
        } else if (err.status === 403) {
          clearAuthData();
          navigate(`/auth/${appPaths.signIn}`);
        } else if (err.status === 404) {
          setError('Користувач не знайдений.');
        } else {
          setError('Щось пішло не так...');
        }
      }
    };

    fetchUserData();

    return () => {
    };
  }, [navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button onClick={() => navigate(`/auth/${appPaths.signIn}`)} className="text-blue-600 underline">
          Повернутися до входу
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Мій Профіль</h1>

        {userData ? (
          <div className="space-y-2">
            <div className="pb-4 border-b border-gray-100">
              <p className="text-lg text-black font-medium">
                Email: <span className="text-blue-600">{userData.email}</span>
              </p>
              <p className="text-sm text-black font-bold">
                Роль: <span className="text-blue-600">{userData.role}</span>
              </p>
            </div>

            {userData.role === 'parent' ? (
              <ParentView childrenList={userData.children} />
            ) : (
              <ChildView />
            )}
          </div>
        ) : (
          <p className="text-center animate-pulse text-gray-400">Завантаження профілю...</p>
        )}
      </div>
    </div>
  );
};
