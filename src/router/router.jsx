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
import AdminAllProducts from "../Pages/Dashboard/Admin/AdminAllProducts";
import MyOrders from "../Pages/Dashboard/User/MyOrders";
import ViewPriceTrends from "../Pages/Dashboard/User/ViewPriceTrends";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AllAdvertisements from "../Pages/Dashboard/Admin/AllAdvertisements";
import AllOrders from "../Pages/Dashboard/Admin/AllOrders";
import PrivateRoute from "../routes/PrivateRoute";
import UnauthorizedPage from "../Components/unauthorized/UnauthorizedPage";
import AdminRoute from "../routes/AdminRoute";
import VendorRoute from "../routes/VendorRoute";
import AllProducts from "../Pages/Home/All Products/AllProducts";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import ErrorPage from "../Components/Error Page/ErrorPage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Profile from "../Pages/Dashboard/Profile/Profile";
import ContactUs from "../Pages/ContactUs/ContactUs";
import FAQs from "../Pages/FAQs/FAQs";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";

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
        element: <PrivateRoute>
          <ProductDetails />
        </PrivateRoute>
      },
      {
        path: '/payment/:id',
        Component: Payment
      },
      {
        path: '/unauthorized',
        Component: UnauthorizedPage
      },
      {
        path: '/about-us',
        Component: AboutUs
      },
      {
        path: '/contact-us',
        Component: ContactUs
      },
      {
        path: '/FAQs',
        Component: FAQs
      },
      {
        path: '/privacy-policy',
        Component: PrivacyPolicy
      },
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
    element: <PrivateRoute>
      <Dashboard />
    </PrivateRoute>,
    children: [
      {
        path: 'home',
        Component: DashboardHome
      },
      {
        path: 'profile',
        element: <PrivateRoute>
          <Profile />
        </PrivateRoute>
      },
      {
        path: 'add-product',
        element: <PrivateRoute>
          <VendorRoute>
            <AddProduct />
          </VendorRoute>
        </PrivateRoute>
      },
      {
        path: 'my-products',
        element: <PrivateRoute>
          <VendorRoute>
            <MyProducts />
          </VendorRoute>
        </PrivateRoute>
      },
      {
        path: 'update-product/:id',
        element: <PrivateRoute>
          <UpdateProduct />
        </PrivateRoute>
      },
      {
        path: 'add-advertisements',
        element: <PrivateRoute>
          <VendorRoute>
            <AddAdvertisement />
          </VendorRoute>
        </PrivateRoute>
      },
      {
        path: 'my-advertisements',
        element: <PrivateRoute>
          <VendorRoute>
            <MyAdvertisements />
          </VendorRoute>
        </PrivateRoute>
      },
      {
        path: 'view-price-trends',
        element: <PrivateRoute>
          <ViewPriceTrends />
        </PrivateRoute>
      },
      {
        path: 'manage-watchlist',
        element: <PrivateRoute>
          <ManageWatchlist />
        </PrivateRoute>
      },
      {
        path: 'my-orders',
        element: <PrivateRoute>
          <MyOrders />
        </PrivateRoute>
      },
      {
        path: 'all-users',
        element: <PrivateRoute>
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'all-products',
        Component: AdminAllProducts
      },
      {
        path: 'all-ads',
        element: <PrivateRoute>
          <AdminRoute>
            <AllAdvertisements />
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'all-orders',
        element: <PrivateRoute>
          <AdminRoute>
            <AllOrders />
          </AdminRoute>
        </PrivateRoute>
      },
    ]
  },
  {
    path: '*',
    Component: ErrorPage
  }
]);