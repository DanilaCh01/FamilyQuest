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
      <h3 className="text-xl font-bold mb-4 text-main-text">Керування балами</h3>
      {children.map((child) => (
        <div
          key={child.childEmail}
          className="flex flex-col p-4 bg-page-bg/70 rounded-xl border border-border-subtle/70"
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
                    className="text-success/85 saturate-85 text-xs font-bold hover:text-success hover:saturate-110 hover:brightness-85"
                  >
                    ОК
                  </button>
                  <button onClick={() => setEditingEmail(null)} className="text-btn-neutral-text text-xs hover:text-text-muted">
                    Скасувати
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-accent">{child.name || child.childEmail}</span>
                  <button
                    onClick={() => {
                      setEditingEmail(child.childEmail);
                      setNewName(child.name || '');
                    }}
                    className="text-btn-neutral-text hover:text-primary text-xs"
                  >
                    edit
                  </button>
                </div>
              )}
              <p className="text-xs text-text-muted">{child.childEmail}</p>
            </div>
            <button
              onClick={() => handleDelete(child.childEmail)}
              className="text-xs text-danger/70 hover:text-danger hover:saturate-120"
            >
              Видалити
            </button>
          </div>

          <span className="font-bold text-royal-blue text-sm mb-3">{child.balance} ★</span>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Сума"
              className="flex-1 p-2 rounded text-text-muted border outline-none focus:ring-3 focus:ring-border-subtle"
              value={inputs[child.childEmail] || ''}
              onChange={(event) => setInputs({ ...inputs, [child.childEmail]: event.target.value })}
            />
            <button
              onClick={() => handleUpdate(child.childEmail, 'award')}
              className="px-4 py-2 bg-success text-secondary-text rounded-lg font-bold hover:bg-success hover:brightness-90"
            >
              +
            </button>
            <button
              onClick={() => handleUpdate(child.childEmail, 'deduct')}
              className="px-4.5 py-2 bg-danger text-secondary-text rounded-lg font-bold hover:bg-danger hover:brightness-90"
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
