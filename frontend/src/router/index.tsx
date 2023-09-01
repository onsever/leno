import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import { ErrorPage, HomePage, LoginPage, RegisterPage } from "../pages";
import { Layout } from "../components";

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
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
