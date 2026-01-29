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

  const fetchFamilyData = async () => {
    let childrenNames = {};

    try {
      const userData = await request('/users');
      userData.children?.forEach((child) => {
        childrenNames[child.email] = child.name;
      });
    } catch (err) {
      console.error('Помилка завантаження імен дітей:', err);
    }

    try {
      const profile = await request('/family/profile');
      setFamilyData((prev) => ({ ...prev, profile }));
      setNameInput(profile.name || '');
    } catch (err) {
      console.error('Помилка завантаження профілю:', err);
    }

    try {
      const balances = await request('/family/points/balances');
      const balancesWithNames = balances.map((child) => ({
        ...child,
        name: childrenNames[child.childEmail] || child.name || '',
      }));

      setFamilyData((prev) => ({ ...prev, children: balancesWithNames }));
    } catch (err) {
      console.error('Помилка завантаження балансів:', err);
    }

    try {
      const goals = await request('/family/goals');
      setFamilyData((prev) => ({ ...prev, goals }));
    } catch (err) {
      console.error('Помилка завантаження цілей:', err);
    }

    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchFamilyData();
    })();
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
          <ChildrenManager children={familyData.children} onRefresh={fetchFamilyData} />
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <GoalsManager
            goals={familyData.goals}
            childrenList={familyData.children}
            onRefresh={fetchFamilyData}
          />
        </section>
      </div>
    </div>
  );
};
