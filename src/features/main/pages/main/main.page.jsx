import { Link } from 'react-router-dom';
import { Button } from '../../../../shared/components/button';
import { appPaths } from '../../../../core/routing/routing.model';
import { getToken } from '../../../../core/utils/token.utils';

export const MainPage = () => {
  const token = getToken();

  return (
    <div className="min-h-screen flex items-center justify-center bg-page-bg p-4">
      <div className="w-full max-w-md rounded-2xl bg-surface p-8 border border-border-subtle text-center shadow-2xl shadow-accent/20">
        <h1 className="mb-2 text-4xl font-bold text-accent">FamilyQuest</h1>
        <p className="mb-8 text-main-text opacity-60">Ready to start?</p>

        <div className="flex flex-col gap-4">
          {!token ? (
            <>
              <Button Tag={Link} to={`/auth/${appPaths.signIn}`}
                className="px-6 py-3 transition-all hover:-translate-y-1"
              >
                Sign In
              </Button>
              <Button Tag={Link} to={`/auth/${appPaths.signUp}`} variant="secondary"
                className="px-6 py-3 transition-all hover:-translate-y-1"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button Tag={Link} to={`${appPaths.user}`}
              className="px-6 py-3 transition-all hover:-translate-y-1"
            >
              Go to User Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
