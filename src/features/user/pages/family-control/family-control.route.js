import { appPaths } from '../../../../core/routing/routing.model';

export const familyControlRoute = {
  path: appPaths.familyControl,
  lazy: async () => {
    const { FamilyControlPage } = await import('./family-control.page');
    return { Component: FamilyControlPage };
  },
};
