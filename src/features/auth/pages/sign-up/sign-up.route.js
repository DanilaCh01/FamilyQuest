import { appPaths } from '../../../../core/routing/routing.model';

export const signUpRoute = {
  path: appPaths.signUp,
  lazy: async () => {
    const { SignUpPage } = await import('./sign-up.page');
    return { Component: SignUpPage };
  },
};
