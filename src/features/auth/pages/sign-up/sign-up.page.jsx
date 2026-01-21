import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Input } from '../../../../shared/components/input';
import { Label } from '../../../../shared/components/label';
import { Button } from '../../../../shared/components/button';
import { appPaths } from '../../../../core/routing/routing.model';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Дані SignUp (Controlled):', formData);

    if (formData.password !== formData.confirmPassword) {
      setError('Паролі не співпадають!');
      return;
    }

    console.log('Дані SignUp (Controlled):', formData);

    try {
      const response = await fetch(
        'https://study-api-volkov-lab-566b7077.koyeb.app/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        console.log('Користувач успішно зареєстрований!');

        navigate(appPaths.user);
        return;
      }

      if (response.status === 400) {
        setError('Некоректні дані. Спробуйте ще раз.');
        return;
      }

      if (response.status === 409) {
        setError('Користувач з таким email вже існує.');
        return;
      }
    } catch (error) {
      setError('Помилка мережі. Спробуйте ще раз.', error);
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Створити акаунт</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label text="Email" />
          <Input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label text="Пароль" />
          <Input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label text="Підтвердження паролю" />
          <Input
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}{' '}
        {/* might be deleted */}
        <Button text="Зареєструватися" />
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Вже є акаунт?{' '}
        <Link to="/auth/sign-in" className="text-blue-600 hover:underline font-medium">
          Увійти
        </Link>
      </div>
    </div>
  );
};
