import {appPaths} from "../../routing/routing.model";

export const mainRoute = {
  path: appPaths.main,
  lazy: async () => {
    const { MainPage } = await import("./main.page");
    return { Component: MainPage };
  },
};