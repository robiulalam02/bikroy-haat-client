import React, { useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loaders/Loading';
import { Link, useNavigate } from 'react-router';
import { Tooltip } from 'react-tooltip';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsArrowLeftRight } from "react-icons/bs";
import { PiEyeThin } from 'react-icons/pi';
import ErrorMessage from '../../../Components/Error Page/ErrorMessage';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// A simple page transition variant
const pageVariants = {
  initial: { opacity: 0, scale: 0.98 }, // Slight scale in from center
  in: { opacity: 1, scale: 1 },
  // out: { opacity: 0, scale: 0.95 }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3
};

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // State for Sorting
  const [sortBy, setSortBy] = useState(''); // 'price' or 'date'
  const [sortOrder, setSortOrder] = useState(''); // 'asc' or 'desc'

  // State for Date Filter
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  // Construct query parameters for React Query
  const queryParams = new URLSearchParams();
  if (sortBy) queryParams.append('sortBy', sortBy);
  if (sortOrder) queryParams.append('sortOrder', sortOrder);
  if (filterStartDate) queryParams.append('startDate', filterStartDate);
  if (filterEndDate) queryParams.append('endDate', filterEndDate);

  const {
    isPending,
    isLoading,
    isError,
    error,
    data: products = [],
    refetch
  } = useQuery({
    // Include filters/sort in queryKey for React Query to refetch when they change
    queryKey: ['allProducts', sortBy, sortOrder, filterStartDate, filterEndDate],
    queryFn: async () => {
      // Pass query parameters to the API call
      const res = await axiosPublic.get(`/products?${queryParams.toString()}`);
      return res.data;
    },
    staleTime: 1000 * 60, // Data considered fresh for 1 minute
  });

  // Event Handlers for UI
  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSortBy('');
      setSortOrder('');
    } else {
      const [newSortBy, newSortOrder] = value.split('-');
      setSortBy(newSortBy);
      setSortOrder(newSortOrder);
    }
  };

  const handleStartDateChange = (date) => {
    setFilterStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setFilterEndDate(date);
  };

  const handleApplyFilters = () => {
    refetch(); // Manually refetch data with current filter/sort parameters
  };

  const handleClearFilters = () => {
    setSortBy('');
    setSortOrder('');
    setFilterStartDate(null); // Reset to null for DatePicker
    setFilterEndDate(null);   // Reset to null for DatePicker
  };

  // --- Loading and Error States ---
  if (isLoading || isPending) {
    return <Loading />;
  }

  if (isError || error) {
    return <ErrorMessage />
  }

  return (
    <div className='min-h-screen pb-20'>
      <Helmet>
        <title>All Products</title>
      </Helmet>
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
        className='max-w-screen-2xl mx-auto px-4'>
        <h1 className="text-3xl font-bold text-center text-gray-800 my-8">All Products</h1>

        {/* Filter and Sorting Options Section */}
        <div className="flex flex-wrap items-end justify-center md:justify-between gap-4 mb-8 p-6 bg-white rounded-lg">
          {/* Sorting */}
          <div className="flex flex-col">
            <label htmlFor="sort-options" className="mb-1 text-gray-700">Sort Options:</label>
            <select
              id="sort-options"
              value={sortBy && sortOrder ? `${sortBy}-${sortOrder}` : ''}
              onChange={handleSortChange}
              className="p-2 border border-gray-300 rounded-md text-base min-w-[180px]"
            >
              <option className='' value="">No Sorting</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price ( High to Low)</option>
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
            </select>
          </div>

          {/* Date Range Filter with React Date Picker */}
          <div className="flex flex-col">
            <label htmlFor="start-date-filter" className="mb-1 text-gray-700">From Date:</label>
            <DatePicker
              selected={filterStartDate} // Currently selected date
              onChange={handleStartDateChange} // Callback when date is changed
              selectsStart // Indicates this is the start date in a range
              startDate={filterStartDate} // Start of the range
              endDate={filterEndDate}   // End of the range
              placeholderText="Select start date"
              className="p-2 border border-gray-300 rounded-md text-base min-w-[150px] datepicker-custom-input focus:border-primary" // Apply Tailwind styles
              // Ensure the date format matches what your backend expects (YYYY-MM-DD for the query param)
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="end-date-filter" className="mb-1 text-gray-700">To Date:</label>
            <DatePicker
              selected={filterEndDate} // Currently selected date
              onChange={handleEndDateChange} // Callback when date is changed
              selectsEnd // Indicates this is the end date in a range
              startDate={filterStartDate} // Start of the range
              endDate={filterEndDate}   // End of the range
              minDate={filterStartDate} // Cannot select a date before the start date
              placeholderText="Select end date"
              className="p-2 border border-gray-300 rounded-md text-base min-w-[150px] datepicker-custom-input" // Apply Tailwind styles
              dateFormat="yyyy-MM-dd"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 md:mt-0">
            <button
              onClick={handleApplyFilters}
              className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-md text-base transition-colors duration-300 flex items-center gap-1"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClearFilters}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-base transition-colors duration-300 flex items-center gap-1"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Product Grid Display */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500 italic text-lg mt-12">
            No products found matching your criteria.
          </p>
        ) : (
          <div className='max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {
              products?.map(product => (
                <div data-aos="zoom-in" data-aos-duration="500" key={product._id} className="rounded-lg bg-white p-6 shadow">
                  <div className="h-56 w-full flex justify-center overflow-hidden">
                    <img className="w-full h-full object-cover hover:scale-105 transition duration-500" src={product.image} alt="" />
                  </div>
                  <div className="pt-6">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                        {/* Using moment to format 'createdAt' date */}
                        {product.createdAt ? moment(product.createdAt).format('MMM D, YYYY') : 'N/A'}
                      </span>

                      <div className="flex items-center justify-end gap-1">
                        {/* Tooltips using react-tooltip */}
                        <button
                          onClick={() => navigate(`/product-details/${product._id}`)}
                          type="button"
                          data-tooltip-id={`quick-look-tooltip-${product._id}`}
                          data-tooltip-content="Quick look"
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                        >
                          <span className="sr-only"> Quick look </span>
                          <PiEyeThin />
                        </button>
                        <Tooltip id={`quick-look-tooltip-${product._id}`} place="top" effect="solid" />

                        <button
                          onClick={() => navigate(`/product-details/${product._id}`)}
                          type="button"
                          data-tooltip-id={`add-to-comparison-tooltip-${product._id}`}
                          data-tooltip-content="Add to comparison"
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 "
                        >
                          <span className="sr-only"> Add to Comparison </span>
                          <BsArrowLeftRight />
                        </button>
                        <Tooltip id={`add-to-comparison-tooltip-${product._id}`} place="top" effect="solid" />
                      </div>
                    </div>

                    {/* Using Link for navigation */}
                    <Link to={`/product-details/${product._id}`} className="text-lg font-semibold leading-tight text-gray-900 hover:underline">{product.itemName}</Link>

                    <div className="mt-2 flex items-center gap-2">
                      <h3 className='text-pink-400 font-medium'>{product.marketName}</h3>
                      <span className='text-xs text-gray-500'>({product.vendorName})</span>
                    </div>

                    <ul className="mt-2 flex items-center gap-4">
                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>
                      </li>

                      <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
                      </li>
                    </ul>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      {/* Ensure pricePerUnit is parsed to a number for display */}
                      <p className="text-xl font-extrabold leading-tight text-gray-900">৳{parseFloat(product.pricePerUnit).toFixed(2)}</p>

                      {/* Using Link for navigation */}
                      <button onClick={() => navigate(`/product-details/${product._id}`)} type="button" className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300">

                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">

                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />

                        </svg>

                        View Details

                      </button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </motion.div>
      <Tooltip /> {/* Global Tooltip component for react-tooltip */}
    </div>
  );
}

export default AllProducts;