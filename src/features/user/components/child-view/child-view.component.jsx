export const ChildView = ({ balance, goals }) => (
  <div className="mt-6 w-full space-y-6">
    <div className="p-6 bg-green-50 rounded-2xl border border-green-100 text-center">
      <p className="text-sm text-green-700 font-medium uppercase tracking-wider">Мій баланс</p>
      <h3 className="text-4xl font-black text-green-600 mt-2">{balance || 0} ★</h3>
    </div>

    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Цілі сім'ї</h3>
      <ul className="space-y-3">
        {goals?.map((goal) => (
          <li key={goal.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">{goal.title}</span>
            <span className="text-blue-600 font-bold">{goal.points} ★</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
