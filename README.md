# Daily Price Tracker for Local Markets (BIKROY HAAT) - Client Side
Project Purpose
The Daily Price Tracker for Local Markets (কাঁচাবাজার) is a web application designed to empower users with real-time price information for essential items across various local markets. This platform aims to enhance transparency in local produce pricing, allowing users to make informed purchasing decisions by viewing, tracking, and comparing current and historical price data. Vendors can easily update prices, contributing to a dynamic and up-to-date marketplace. The project also incorporates monetization strategies through product purchases and sponsored advertisement placements.

Live URL
[[Live Client Site URL](https://bikroy-haat.web.app/)]

## Key Features
User Interface & Experience
Fully Responsive Design: Ensures a seamless user experience across mobile, tablet, and desktop devices.

Intuitive Navigation: Features a clear Header, dynamic content based on routes, and a comprehensive Footer.

Engaging Home Page:

Dynamic Navbar: Displays relevant links (All Products), Login/Sign-up buttons (when logged out), and User Profile/Logout/Dashboard buttons (when logged in).

Professional Banner Section: Visually appealing with relevant imagery.

Product Section: Showcases 6 approved product cards with image, market name, date, item list with prices, and a "View Details" button.

Advertisement Highlights: An interactive carousel showcasing dynamic advertisements.

Extra Sections: Two relevant and meaningful additional sections to enhance user engagement.

Smooth Animations: Utilizes Framer Motion for appealing animations in key sections like the Banner and Product section.

React-Toastify Notifications: Provides clear success and error messages for user actions.

## Core Functionality
Authentication & Authorization:

User Registration: Allows new users to sign up with name, email, photo, and password.

User Login: Secure JWT-based authentication with token generation for session management.

Social Login: Integrates Google login, automatically assigning the "user" role.

Role-Based Access Control: Middleware ensures only authorized users (User, Vendor, Admin) can access specific routes and functionalities.

Product Details Page (Private Route):

Comprehensive breakdown of selected products, including market name, image, date, full item list with prices, and vendor information.

User Reviews/Comments: Logged-in users can submit star ratings and comments on market prices, displayed with user details and submission date.

Price Comparison: Users can select previous dates to compare price trends using Recharts (bar or line charts) for visual insights into price fluctuations.

"Add to Watchlist" Feature: Users can save products to their watchlist (disabled for Admin/Vendor).

"Buy Product" Integration: Redirects to a Stripe payment page for secure purchases, with purchase data saved to the database upon successful transaction.

All Products Page (Public Route):

Displays a comprehensive list of all products with image, name, current price, date, market name, and vendor name.

Filtering Options: Filter products by date or date range (backend implementation for performance).

Sorting Options: Sort products by price (low to high, high to low).

## User-Specific Dashboards (Private Routes)

## User Dashboard
View Price Trends: Visualizes price changes over days/weeks for tracked items using Recharts.

Manage Watchlist: Displays all watchlisted items in a table, with options to "Add More" (redirects to All Products) and "Remove" (with confirmation modal).

My Order List: Shows all ordered items in a table, with a "View Details" option.

## Vendor Dashboard
Add Product: Form for vendors to submit daily price updates for local market items, including market name, date, item name, status (default pending), product image, price per unit, and price history.

My Products: Displays all products submitted by the vendor in a table, with status (pending/approved/rejected), "Update" (pre-fills form), and "Delete" (with confirmation modal) options.

Add Advertisement: Form for vendors to submit advertisements with title, short description, image upload, and status (default pending).

My Advertisements: Shows all submitted advertisements in a table, with status, "Update" (modal with pre-filled form), and "Delete" (with confirmation modal) options.

## Admin Dashboard
All Users: Displays all users in a tabular format, with the ability to update user roles and a search bar to find users by name or email (backend search implementation).

All Products: Views all vendor-created products, with options to approve/reject (with rejection reason feedback visible to vendors), update, and remove products.

All Advertisements: Displays all vendor advertisements, with options to change status and delete.

All Orders: Shows all customer orders in a tabular format.

## Security & Deployment Highlights
Secure Credentials: Firebase configuration keys and MongoDB credentials are secured using environment variables.

Robust Deployment: Ensures perfect server functionality on production, preventing CORS, 404, or 504 errors.

Reliable Live Link: Guarantees a working live link without landing errors.

Seamless Route Reloading: Prevents errors upon reloading from any route.

Firebase Authorization: Domain added for Firebase authorization if using Netlify/Surge/Vercel.

Persistent Login: Logged-in users are not redirected to the login page on reloading private routes.

## NPM Packages Used
react
react-dom
react-router-dom
axios
firebase
react-toastify
framer-motion
recharts
react-datepicker
@stripe/react-stripe-js
@stripe/stripe-js
tailwindcss
daisyui
react-helmet-async
react-hook-form

## ✉️ Contact
For any inquiries or feedback regarding this project, please feel free to reach out:

Developer Name: [MD. Robiul Alam]

Email: [robiulbusiness02@gmail.com]

GitHub Profile: [[GitHub Profile](https://github.com/robiulalam02)]

LinkedIn Profile: [[LinkedIn Profile](https://www.linkedin.com/in/shopneel10/)]

