import { Link } from 'react-router-dom';
import { appPaths } from '../../../../core/routing/routing.model';
import { Button } from '../../../../shared/components/button'

export const ParentView = ({ childrenList }) => (
  <div className="mt-6 w-full">
    <h3 className="text-xl font-bold mb-3 text-main-text">Панель батьків</h3>
    <div className="bg-ivory-bg p-4 rounded-lg border border-border-base">
      <p className="font-semibold mb-2">Ваші діти:</p>
      {childrenList?.length > 0 ? (
        <ul className="list-disc pl-5 text-accent">
          {childrenList?.map((child) => (
            <li key={child.email}>{child.name || child.email}</li>
          ))}
        </ul>
      ) : (
        <p className="text-muted italic">Ви ще не додали дітей.</p>
      )}
      <Button Tag={Link}
        to={appPaths.addChild}
        variant='secondary'
        className="mt-3 shadow-sm border border-border-base"
      >
        + Додати дитину
      </Button>
    </div>
    <div className="mt-6 pt-6">
      <Button
        Tag={Link}
        to={appPaths.familyControl}
        className="px-6 py-3 rounded-xl hover:bg-blue-500! transition shadow-md"
      >
        Керування сім'єю
      </Button>
    </div>
  </div>
);
