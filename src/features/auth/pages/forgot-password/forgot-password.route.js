import {appPaths} from "../../../routing/routing.model";

export const forgotPasswordRoute = {
  path: appPaths.forgotPassword,
  lazy: async () => {
    const { ForgotPasswordPage } = await import("./forgot-password.page");
    return { Component: ForgotPasswordPage };
  },
};