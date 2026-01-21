import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
    role: 'parent',
  });

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
            role: credentials.role,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        navigate(appPaths.user);
      } else if (response.status === 400) {
        setError('Невірний запит. Перевірте введені дані.');
      } else if (response.status === 401) {
        setError('Невірний email або пароль.');
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

        <div>
          <Label text="Хто ви?" />
          <select
            name="role"
            value={credentials.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="parent">Батько/Мати</option>
            <option value="child">Дитина</option>
          </select>
        </div>

        <Button text="Увійти" />
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <Link
          to={`/auth/${appPaths.forgotPassword}`}
          className="block text-blue-800 mb-3 hover:underline font-medium"
        >
          Забули пароль?
        </Link>
        {'Нема аккаунту? '}
        <Link to={`/auth/${appPaths.signUp}`} className="text-blue-600 hover:underline font-medium">
          Зареєструватися
        </Link>
      </div>
    </div>
  );
};
