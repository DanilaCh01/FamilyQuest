export const ChildView = ({ balance, goals }) => (
  <div className="mt-6 w-full space-y-6">
    <div className="p-6 bg-success/10 rounded-2xl border border-success/15 text-center">
      <p className="text-sm text-success brightness-70 font-medium uppercase tracking-wider">Мій баланс</p>
      <h3 className="text-4xl font-black text-success brightness-85 mt-2">{balance || 0} ★</h3>
    </div>

    <div className="bg-surface p-6 rounded-2xl border border-border-base shadow-sm">
      <h3 className="text-xl font-bold mb-4 text-main-text">Мої цілі</h3>
      <ul className="space-y-3">
        {goals?.map((goal) => (
          <li key={goal.id} className="flex justify-between items-center p-3 bg-bg-soft rounded-lg border border-border-base">
            <span className="font-medium">{goal.title}</span>
            <span className="text-royal-blue font-bold">{goal.points} ★</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
