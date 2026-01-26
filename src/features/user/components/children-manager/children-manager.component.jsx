import { useState } from 'react';
import { request } from '../../../../core/api/api.utils.js';

export const ChildrenManager = ({ children, onRefresh }) => {
  const [inputs, setInputs] = useState({});
  console.log(children); // Прибрати потім

  const handleUpdate = async (email, type) => {
    const amount = Number(inputs[email]);
    if (!amount || amount <= 0) return alert('Введіть суму');

    const url = type === 'award' ? '/family/points/award' : '/family/points/deduct';

    try {
      await request(url, 'POST', {
        childEmail: email,
        points: amount,
        reason: 'Оновлення через панель',
      });
      setInputs({ ...inputs, [email]: '' });
      onRefresh();
    } catch (error) {
      console.error('Помилка при зміні балів:', error);
      alert('Помилка при зміні балів');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Керування балами</h3>
      {children.map((child) => (
        <div
          key={child.childEmail}
          className="flex flex-col p-4 bg-gray-50 rounded-xl border border-gray-100"
        >
          <div className="flex justify-between mb-3">
            <span className="text-sm font-medium text-gray-500">{child.childEmail}</span>
            <span className="font-bold text-blue-600">{child.balance} ★</span>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Сума"
              className="flex-1 p-2 rounded border outline-none focus:ring-2 focus:ring-blue-400"
              value={inputs[child.childEmail] || ''}
              onChange={(event) => setInputs({ ...inputs, [child.childEmail]: event.target.value })}
            />
            <button
              onClick={() => handleUpdate(child.childEmail, 'award')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
            >
              +
            </button>
            <button
              onClick={() => handleUpdate(child.childEmail, 'deduct')}
              className="px-[18px] py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600"
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
