import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../../shared/components/input';
import { Label } from '../../../../shared/components/label';
import { Button } from '../../../../shared/components/button';
import { appPaths } from '../../../../core/routing/routing.model';

export const AddChildPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
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
      const token = localStorage.getItem('token');

      const response = await fetch(
        'https://study-api-volkov-lab-566b7077.koyeb.app/api/users/children',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      if (response.ok) {
        console.log('Дитину успішно додано!');
        navigate(appPaths.user);
        return;
      }

      const data = await response.json();

      if (response.status === 409) {
        setError('Користувач з такою поштою вже існує.');
      } else if (response.status === 400) {
        setError('Некоректні дані. Перевірте формат пошти та вимоги до паролю.'); // Хоча поки що вимог до паролю немає. Залишив на майбутнє.
      } else {
        setError(data.message || 'Щось пішло не так...');
      }
    } catch (err) {
      console.error(err);
      setError('Помилка мережі. Спробуйте пізніше.');
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
