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
import AddAdvertisement from "../Pages/Dashboard/Vendor/AddAdvertisement";
import MyAdvertisements from "../Pages/Dashboard/Vendor/MyAdvertisements";
import ProductDetails from "../Pages/Home/All Products/ProductDetails";
import Payment from "../Pages/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/product-details/:id',
        Component: ProductDetails
      },
      {
        path: '/payment/:id',
        Component: Payment
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
      },
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
      },
      {
        path: 'add-advertisements',
        Component: AddAdvertisement
      },
      {
        path: 'my-advertisements',
        Component: MyAdvertisements
      }
    ]
  }
]);