import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import { HomePage } from "../pages";
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
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
