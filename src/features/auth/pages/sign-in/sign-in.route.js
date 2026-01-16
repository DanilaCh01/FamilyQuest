import { appPaths } from '../../../../core/routing/routing.model';

export const signInRoute = {
  path: appPaths.signIn,
  lazy: async () => {
    const { SignInPage } = await import('./sign-in.page');
    return { Component: SignInPage };
  },
};
