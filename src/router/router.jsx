import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Authentication from '../Layouts/Authentication'
import Register from "../Pages/Authentication/Register";
import Login from "../Pages/Authentication/Login";
import Dashboard from "../Layouts/Dashboard";
import AddProduct from "../Pages/Dashboard/Vendor/AddProduct";
import MyProducts from "../Pages/Dashboard/Vendor/MyProducts";
import UpdateProduct from "../Pages/Dashboard/Vendor/UpdateProduct";

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
    Component: Dashboard,
    children: [
      {
        index: true,
        element: <p>This is Dashboard Home</p>
      },
      {
        path: 'add-product',
        Component: AddProduct
      },
      {
        path: 'my-products',
        Component: MyProducts
      },
      {
        path: 'update-product/:id',
        Component: UpdateProduct
      }
    ]
  }
]);