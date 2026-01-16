import { appPaths } from '../../../../core/routing/routing.model';

export const mainRoute = {
  path: appPaths.main,
  lazy: async () => {
    const { MainPage } = await import('./main.page');
    return { Component: MainPage };
  },
};
