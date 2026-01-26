import { Link } from 'react-router-dom';
import { appPaths } from '../../../../core/routing/routing.model';

export const ParentView = ({ childrenList }) => (
  <div className="mt-6 w-full">
    <h3 className="text-xl font-bold mb-3 text-blue-700">Панель батьків</h3>
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
      <p className="font-semibold mb-2">Ваші діти:</p>
      {childrenList?.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {childrenList.map((email) => (
            <li key={email} className="text-gray-700">
              {email}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">Ви ще не додали дітей.</p>
      )}
      <Link
        to={appPaths.addChild}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        + Додати дитину
      </Link>
    </div>
  </div>
);
