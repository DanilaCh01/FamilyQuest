import { useState, useEffect } from 'react';
import { request } from '../../../../core/api/api.utils.js';
import { ChildrenManager } from '../../components/children-manager/children-manager.component.jsx';
import { GoalsManager } from '../../components/goals-manager/goals-manager.component.jsx';

export const FamilyControlPage = () => {
  const [loading, setLoading] = useState(true);
  const [familyData, setFamilyData] = useState({
    profile: null,
    children: [],
    goals: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const [profile, balances, goals] = await Promise.all([
          request('/family/profile'),
          request('/family/points/balances'),
          request('/family/goals'),
        ]);
        setFamilyData({
          profile,
          children: balances,
          goals,
        });
        setNameInput(profile.name || '');
      } catch (error) {
        console.error("Помилка завантаження даних сім'ї:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        const responseData = await request('/family/profile', 'PUT', { name: nameInput });
        setFamilyData((prev) => ({
          ...prev,
          profile: { ...prev.profile, name: responseData.name },
        }));
      } catch (error) {
        console.error("Помилка збереження назви сім'ї:", error);
        setNameInput(familyData.profile?.name || '');
      }
    }
    setIsEditing(!isEditing);
  };

  const refreshData = async () => {
    const [profile, balances, goals] = await Promise.all([
      request('/family/profile'),
      request('/family/points/balances'),
      request('/family/goals'),
    ]);
    setFamilyData({ profile, children: balances, goals });
  };

  if (loading)
    return <p className="text-center mt-10 animate-pulse">Завантаження панелі керування...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">
          Сім'я:{' '}
          {isEditing ? (
            <input
              type="text"
              className="border-b-2 border-blue-500 outline-none px-2 py-1 font-medium"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              autoFocus
            />
          ) : (
            <span className="text-blue-600">
              {familyData.profile?.name || 'Назва не встановлена'}
            </span>
          )}
        </h2>
        <button
          onClick={handleEditClick}
          className={`px-4 py-2 mt-2 rounded-lg font-semibold transition ${
            isEditing
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {isEditing ? 'Зберегти' : 'Редагувати'}
        </button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <ChildrenManager children={familyData.children} onRefresh={refreshData} />
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <GoalsManager goals={familyData.goals} onRefresh={refreshData} />
        </section>
      </div>
    </div>
  );
};
