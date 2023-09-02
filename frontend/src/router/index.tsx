import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import {
  ErrorPage,
  FeedPage,
  HomePage,
  LoginPage,
  MyAccountPage,
  RegisterPage,
  SettingsPage,
} from "../pages";
import { Layout } from "../components";
import ProtectedRoute from "./ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/feed",
        element: <FeedPage />,
      },
      {
        path: "/my-account",
        element: (
          <ProtectedRoute>
            <MyAccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
