import { appPaths } from '../../../../core/routing/routing.model';

export const addChildRoute = {
  path: appPaths.addChild,
  lazy: async () => {
    const { AddChildPage } = await import('./add-child.page');
    return { Component: AddChildPage };
  },
};
