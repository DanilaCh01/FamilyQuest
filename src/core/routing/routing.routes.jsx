import { createBrowserRouter } from "react-router-dom";
import { mainRoute } from "../pages/main";
import { signInRoute } from "../pages/auth/sign-in";
import { signUpRoute } from "../pages/auth/sign-up";
import { forgotPasswordRoute } from "../pages/auth/forgot-password";

export const router = createBrowserRouter([
  mainRoute,
  signInRoute,
  signUpRoute,
  forgotPasswordRoute,
]);