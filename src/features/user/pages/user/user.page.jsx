import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appPaths } from '../../../../core/routing/routing.model';

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
            Authorization: `Bearer ${token}`, // "Authorization: Bearer ... is the standard HTTP header field used for sending the token."
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
        console.error(err); // Додав просто щоб ESlint не виводив помилку ;D
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Твій Профіль</h1>
      {userData ? (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <p className="text-lg">ID: {userData.id}</p>
          <p className="text-lg">Email: {userData.email}</p>
        </div>
      ) : (
        <p className="animate-pulse">Завантаження...</p>
      )}
    </div>
  );
};
