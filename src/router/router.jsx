import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Authentication from '../Layouts/Authentication'
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import Dashboard from "../Layouts/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      }
    ]
  },
  {
    path: '/',
    Component: Authentication,
    children: [
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/login',
        Component: Login
      }
    ]
  },
  {
    path: '/dashboard',
    Component: Dashboard
  }
]);