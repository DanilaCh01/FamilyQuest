import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Input } from '../../../../shared/components/input';
import { Label } from '../../../../shared/components/label';
import { Button } from '../../../../shared/components/button';
import { appPaths } from '../../../../core/routing/routing.model';

export const SignInPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(
        'https://study-api-volkov-lab-566b7077.koyeb.app/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate(appPaths.user);
      } else if (response.status === 400) {
        setError('Невірний запит. Перевірте введені дані.'); // Перевірити значення помилок які повертає API, коли API запрацює
      } else if (response.status === 401) {
        setError('Невірний email або пароль.'); // Перевірити значення помилок які повертає API, коли API запрацює
      } else {
        setError('Щось пішло не так...');
      }
    } catch (err) {
      console.error(err);
      setError('Помилка мережі.');
    }
  };

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Увійти у FamilyQuest</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label text="Email" />
          <Input
            name="email"
            type="email"
            required
            value={credentials.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label text="Пароль" />
          <Input
            name="password"
            type="password"
            required
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button text="Увійти" />
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {'Нема аккаунту? '}
        <Link to={`/auth/${appPaths.signUp}`} className="text-blue-600 hover:underline font-medium">
          Зареєструватися
        </Link>
      </div>
    </div>
  );
};
