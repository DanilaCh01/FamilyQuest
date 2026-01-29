import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../../shared/components/input';
import { Label } from '../../../../shared/components/label';
import { Button } from '../../../../shared/components/button';
import { appPaths } from '../../../../core/routing/routing.model';
import { request } from '../../../../core/api/api.utils.js';
import { clearAuthData } from '../../../../core/utils/token.utils.js';

export const AddChildPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Паролі не співпадають!');
      return;
    }

    try {
      await request('/users/children', 'POST', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log('Дитину успішно додано!');
      navigate(appPaths.user);
    } catch (err) {
      if (err.status === 409) {
        setError('Користувач з такою поштою вже існує.');
      } else if (err.status === 400) {
        setError("Некоректні дані. Перевірте ім'я, формат пошти та пароль"); // Хоча поки що вимог до паролю немає. Залишив на майбутнє.
      } else if (err.status === 401 || err.status === 403) {
        clearAuthData();
        navigate(`/auth/${appPaths.signIn}`);
      } else {
        setError('Помилка мережі або сервера. Спробуйте пізніше.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Додати дитину</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Створіть аккаунт для вашої дитини, щоб вона могла отримувати завдання.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label text="Ім'я дитини" />
            <Input
              name="name"
              type="text"
              required
              placeholder="Введіть ім'я"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label text="Email дитини" />
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

          {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

          <Button text="Зареєструвати дитину" />
        </form>

        <button
          onClick={() => navigate(appPaths.user)}
          className="w-full mt-4 text-sm text-gray-500 hover:text-gray-800 transition"
        >
          Скасувати та повернутися
        </button>
      </div>
    </div>
  );
};
