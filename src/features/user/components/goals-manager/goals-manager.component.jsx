import { useState } from 'react';
import { request } from '../../../../core/api/api.utils.js';

export const GoalsManager = ({ goals, childrenList, onRefresh }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [goalForm, setGoalForm] = useState({ title: '', points: '', childEmail: '' });

  const createGoal = async () => {
    await request('/family/goals', 'POST', {
      title: goalForm.title,
      points: Number(goalForm.points),
      childEmail: goalForm.childEmail,
    });
  };

  const updateGoal = async (id) => {
    await request(`/family/goals/${id}`, 'PUT', {
      title: goalForm.title,
      points: Number(goalForm.points),
      childEmail: goalForm.childEmail,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Видалити цю ціль?')) return;
    try {
      await request(`/family/goals/${id}`, 'DELETE');
      onRefresh();
    } catch (error) {
      console.error('Помилка при видаленні цілі:', error);
      alert('Помилка при видаленні цілі');
    }
  };

  const handleSave = async () => {
    if (!goalForm.title || !goalForm.points || !goalForm.childEmail) {
      return alert('Заповніть всі поля та оберіть дитину');
    }

    try {
      if (editingGoalId) {
        await updateGoal(editingGoalId);
      } else {
        await createGoal();
      }
      cancelAction();
      onRefresh();
    } catch (error) {
      console.error('Помилка при збереженні цілі:', error);
      alert('Помилка при збереженні');
    }
  };

  const startEdit = (goal) => {
    setEditingGoalId(goal.id);
    setGoalForm({
      title: goal.title,
      points: goal.points,
      childEmail: goal.childEmail || '',
    });
    setIsAdding(false);
  };

  const cancelAction = () => {
    setIsAdding(false);
    setEditingGoalId(null);
    setGoalForm({ title: '', points: '', childEmail: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Цілі сім'ї</h3>
        {!isAdding && !editingGoalId && (
          <button
            onClick={() => setIsAdding(true)}
            className="text-blue-600 font-bold hover:underline"
          >
            + Додати
          </button>
        )}
      </div>

      {(isAdding || editingGoalId) && (
        <div className="bg-blue-50 p-4 rounded-xl space-y-3 border border-blue-100 shadow-inner">
          <p className="text-xs font-bold text-blue-400 uppercase">
            {editingGoalId ? 'Редагування цілі' : 'Нова ціль'}
          </p>
          <input
            placeholder="Назва"
            className="w-full p-2 rounded border"
            value={goalForm.title}
            onChange={(e) => setGoalForm({ ...goalForm, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Бали"
            className="w-full p-2 rounded border"
            value={goalForm.points}
            onChange={(e) => setGoalForm({ ...goalForm, points: e.target.value })}
          />
          <select
            className="w-full p-2 rounded border bg-white"
            value={goalForm.childEmail}
            onChange={(e) => setGoalForm({ ...goalForm, childEmail: e.target.value })}
          >
            <option value="">Оберіть дитину</option>
            {childrenList?.map((child) => (
              <option key={child.email || child.childEmail} value={child.email || child.childEmail}>
                {child.name || child.email || child.childEmail}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold"
            >
              Зберегти
            </button>
            <button onClick={cancelAction} className="text-gray-500 text-sm">
              Скасувати
            </button>
          </div>
        </div>
      )}

      <ul className="space-y-2">
        {goals.map((goal) => (
          <li
            key={goal.id}
            className="flex justify-between p-3 bg-white border rounded-lg shadow-sm group"
          >
            <div className="flex flex-col">
              <span className="font-medium">{goal.title}</span>
              <span className="text-[10px] text-gray-400 italic">Для: {goal.childEmail}</span>{' '}
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-blue-600">{goal.points} ★</span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => startEdit(goal)}
                  className="text-gray-400 hover:text-blue-500 mr-2"
                >
                  edit
                </button>
                <button
                  onClick={() => handleDelete(goal.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
