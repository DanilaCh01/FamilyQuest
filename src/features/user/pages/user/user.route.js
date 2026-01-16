import { appPaths } from '../../../../core/routing/routing.model';

export const userRoute = {
  path: appPaths.user,
  lazy: async () => {
    const { UserPage } = await import('./user.page');
    return { Component: UserPage };
  },
};
