import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { appPaths } from '../../../../core/routing/routing.model';

const ParentView = ({ childrenList }) => (
  <div className="mt-6 w-full">
    <h3 className="text-xl font-bold mb-3 text-blue-700">Панель батьків</h3>
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
      <p className="font-semibold mb-2">Ваші діти:</p>
      {childrenList?.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {childrenList.map((email) => (
            <li key={email} className="text-gray-700">
              {email}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">Ви ще не додали дітей.</p>
      )}
      <Link
        to={appPaths.addChild}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        + Додати дитину
      </Link>
    </div>
  </div>
);

const ChildView = () => (
  <div className="mt-6 w-full p-4 bg-green-50 rounded-lg border border-green-100">
    <h3 className="text-xl font-bold text-green-800">Привіт, квестер!</h3>
    <p className="text-gray-700">Тут будуть твої завдання.</p>
  </div>
);

//

export const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('mounting');

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('https://study-api-volkov-lab-566b7077.koyeb.app/api/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else if (response.status === 401) {
          console.error('Помилка: missing header');
          setError('Помилка авторизації.');
          localStorage.removeItem('token');
          navigate(`/auth/${appPaths.signIn}`);
          return;
        } else if (response.status === 403) {
          console.warn('Token expired or invalid. Redirecting...');
          localStorage.removeItem('token');
          navigate(`/auth/${appPaths.signIn}`);
          return;
        } else if (response.status === 404) {
          setError('Користувач не знайдений.');
        } else {
          setError('Щось пішло не так...');
        }
      } catch (err) {
        console.error(err);
        setError('Помилка мережі.');
      }
    };

    fetchUserData();

    return () => {
      console.log('unmounting');
    };
  }, [navigate]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-lg mb-4">{error}</div>
        <button onClick={() => navigate('/auth/sign-in')} className="text-blue-600 underline">
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
              </p>{' '}
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
