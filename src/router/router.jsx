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
import ManageWatchlist from "../Pages/Dashboard/User/ManageWatchlist";
import AllProducts from "../Pages/Dashboard/Admin/AllProducts";
import MyOrders from "../Pages/Dashboard/User/MyOrders";
import ViewPriceTrends from "../Pages/Dashboard/User/ViewPriceTrends";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AllAdvertisements from "../Pages/Dashboard/Admin/AllAdvertisements";

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
        path: '/all-products',
        Component: AllProducts
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
      },
      {
        path: 'view-price-trends',
        Component: ViewPriceTrends
      },
      {
        path: 'manage-watchlist',
        Component: ManageWatchlist
      },
      {
        path: 'my-orders',
        Component: MyOrders
      },
      {
        path: 'all-users',
        Component: AllUsers
      },
      {
        path: 'all-products',
        Component: AllProducts 
      },
      {
        path: 'all-ads',
        Component: AllAdvertisements 
      },
    ]
  }
]);