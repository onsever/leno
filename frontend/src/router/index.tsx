import { createBrowserRouter, RouteObject } from "react-router-dom";
import { HomePage } from "../pages";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
