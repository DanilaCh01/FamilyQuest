import { useState } from 'react';
import { request } from '../../../../core/api/api.utils.js';

export const ChildrenManager = ({ children, onRefresh }) => {
  const [inputs, setInputs] = useState({});
  const [editingEmail, setEditingEmail] = useState(null);
  const [newName, setNewName] = useState('');

  const handleDelete = async (email) => {
    if (!window.confirm(`Видалити дитину ${email}? Це видалить усі її дані!`)) return;
    try {
      await request(`/users/children/${email}`, 'DELETE');
      onRefresh();
    } catch (error) {
      console.error('Помилка при видаленні дитини:', error);
      alert('Помилка при видаленні дитини');
    }
  };

  const handleRename = async (email) => {
    try {
      await request(`/users/children/${email}`, 'PUT', { name: newName });
      setEditingEmail(null);
      onRefresh();
    } catch (error) {
      console.error('Помилка при зміні імені:', error);
      alert('Помилка при зміні імені');
    }
  };

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
            <div>
              {editingEmail === child.childEmail ? (
                <div className="flex gap-2">
                  <input
                    className="border rounded px-2 py-1 text-sm"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    autoFocus
                  />
                  <button
                    onClick={() => handleRename(child.childEmail)}
                    className="text-green-600 text-xs font-bold"
                  >
                    ОК
                  </button>
                  <button onClick={() => setEditingEmail(null)} className="text-gray-400 text-xs">
                    Скасувати
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-bold">{child.name || child.childEmail}</span>
                  <button
                    onClick={() => {
                      setEditingEmail(child.childEmail);
                      setNewName(child.name || '');
                    }}
                    className="text-gray-400 hover:text-blue-500 text-xs"
                  >
                    edit
                  </button>
                </div>
              )}
              <p className="text-xs text-gray-400">{child.childEmail}</p>
            </div>
            <button
              onClick={() => handleDelete(child.childEmail)}
              className="text-red-300 hover:text-red-500 text-xs"
            >
              Видалити
            </button>
          </div>

          <span className="font-bold text-blue-600 text-sm mb-3">{child.balance} ★</span>

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
