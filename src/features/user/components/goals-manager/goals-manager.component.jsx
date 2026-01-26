import { useState } from 'react';
import { request } from '../../../../core/api/api.utils.js';

export const GoalsManager = ({ goals, onRefresh }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', points: '' });

  const handleSave = async () => {
    if (!newGoal.title || !newGoal.points) return alert('Заповніть всі поля');

    try {
      await request('/family/goals', 'POST', {
        title: newGoal.title,
        points: Number(newGoal.points),
      });
      setIsAdding(false);
      setNewGoal({ title: '', points: '' });
      onRefresh();
    } catch (error) {
      console.error('Помилка при створенні цілі:', error);
      alert('Помилка при створенні цілі');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Цілі сім'ї</h3>
        <button
          onClick={() => (isAdding ? handleSave() : setIsAdding(true))}
          className="text-blue-600 font-bold hover:underline"
        >
          {isAdding ? 'Зберегти' : '+ Додати'}
        </button>
      </div>

      {isAdding && (
        <div className="bg-blue-50 p-4 rounded-xl space-y-2 border border-blue-100">
          <input
            placeholder="Назва цілі"
            className="w-full p-2 rounded border"
            value={newGoal.title}
            onChange={(event) => setNewGoal({ ...newGoal, title: event.target.value })}
          />
          <input
            type="number"
            placeholder="Вартість (бали)"
            className="w-full p-2 rounded border"
            value={newGoal.points}
            onChange={(event) => setNewGoal({ ...newGoal, points: event.target.value })}
          />
        </div>
      )}

      <ul className="space-y-2">
        {goals.map((goal) => (
          <li
            key={goal.id}
            className="flex justify-between p-3 bg-white border rounded-lg shadow-sm"
          >
            <span>{goal.title}</span>
            <span className="font-bold text-blue-600">{goal.points} ★</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
