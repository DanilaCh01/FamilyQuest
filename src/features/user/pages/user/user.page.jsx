import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { clearAuthData } from '../../../../core/utils/token.utils.js';
import { request } from '../../../../core/api/api.utils.js';
import { ParentView } from '../../components/parent-view/parent-view.component.jsx';
import { ChildView } from '../../components/child-view/child-view.component.jsx';
import { appPaths } from '../../../../core/routing/routing.model';

export const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await request('/users');

        if (user.role === 'child') {
          const [pointsData, goalsData] = await Promise.all([
            request('/family/points/me'),
            request('/family/goals'),
          ]);

          setUserData({
            ...user,
            balance: pointsData.balance,
            goals: goalsData,
          });
        } else {
          setUserData(user);
        }
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
  }, [navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button
          onClick={() => navigate(`/auth/${appPaths.signIn}`)}
          className="text-blue-600 underline"
        >
          Повернутися до входу
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-page-bg text-main-text p-4">
      <div className="w-full max-w-md bg-surface p-8 rounded-2xl shadow-xl border border-border-subtle">
        <h1 className="text-3xl font-bold mb-6 text-center text-accent">Мій Профіль</h1>

        {userData ? (
          <div className="space-y-2">
            <div className="pb-4 border-b border-border-base">
              <p className="text-lg text-main-text font-medium">
                Email: <span className="text-royal-blue">{userData.email}</span>
              </p>
              <p className="text-sm text-main-text font-bold">
                Роль: <span className="text-royal-blue">{userData.role}</span>
              </p>
            </div>

            {userData.role === 'parent' ? (
              <ParentView childrenList={userData.children} />
            ) : (
              <ChildView balance={userData.balance} goals={userData.goals} />
            )}
          </div>
        ) : (
          <p className="text-center animate-pulse text-gray-400">Завантаження профілю...</p>
        )}
      </div>
    </div>
  );
};
