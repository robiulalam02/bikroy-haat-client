import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Loading from '../../../Components/Loaders/Loading';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TbCurrencyTaka } from "react-icons/tb";
import { FaArrowsLeftRight, FaArrowTrendUp } from "react-icons/fa6";



const ViewPriceTrends = () => {
  const { profile } = useAuth(); // Assumed to provide user email via profile?.email
  const axiosSecure = useAxiosSecure();

  const [selectedItem, setSelectedItem] = useState(null); // State to hold the currently selected watchlist item

  // Fetch user's watchlist items using TanStack Query
  const {
    isPending,
    isLoading,
    refetch, // Keep refetch if you need to manually trigger a re-fetch
    error,
    data: watchlistItems = [] // Renamed 'watchlists' to 'watchlistItems' for clarity
  } = useQuery({
    queryKey: ['userWatchlistItems', profile?.email], // Query key includes user email for specificity
    queryFn: async () => {
      // Ensure your backend endpoint is correctly set up to handle 'email' query param
      const res = await axiosSecure.get(`/watchlists?email=${profile?.email}`);

      // Crucial: Sort each item's 'prices' array by date once fetched for consistent charting
      // Also, ensure price is parsed to an integer if it's coming as {$numberInt: "172"} or string
      return res.data.map(item => ({
        ...item,
        prices: item.prices
          ? item.prices.sort((a, b) => new Date(a.date) - new Date(b.date))
          : [] // Handle cases where 'prices' array might be missing
      }));
    },
    enabled: !!profile?.email, // Only fetch if user email exists (user is logged in)
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });

  // Effect to automatically select the first item when watchlistItems load
  useEffect(() => {
    if (watchlistItems && watchlistItems.length > 0 && !selectedItem) {
      setSelectedItem(watchlistItems[0]);
    }
  }, [watchlistItems, selectedItem]);

  // Prepare chart data for the currently selected item
  const chartData = selectedItem && selectedItem.prices ? selectedItem.prices.map(p => ({
    name: p.date, // X-axis will show date
    // Safely parse price, checking for both {$numberInt: "value"} and direct string/number
    Price: parseInt(p.price?.$numberInt || p.price),
  })) : [];

  // Calculate price trend summary for the selected item
  const initialPrice = chartData.length > 0 ? chartData[0].Price : null;
  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].Price : null;

  const overallChange = (initialPrice !== null && currentPrice !== null)
    ? currentPrice - initialPrice
    : null;

  // --- Render UI ---
  if (isLoading || isPending) {
    return <Loading />;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">Error loading price trends: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <div className="font-sans p-8 max-w-6xl mx-auto bg-white rounded-lg shadow-xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">View Price Trends 📊</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Panel: Tracked Items List */}
          <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Tracked Items</h2>
            {watchlistItems.length === 0 ? (
              <p className="text-gray-500 italic">No items in your watchlist yet.</p>
            ) : (
              <ul className="space-y-3">
                {watchlistItems.map(item => (
                  <li
                    key={item.productId || item._id} // Use productId or _id as key
                    className={`flex items-center p-3 rounded-md cursor-pointer transition-colors duration-200
                              ${selectedItem && (selectedItem.productId === item.productId || selectedItem._id === item._id)
                        ? 'bg-blue-100 text-blue-800 font-semibold shadow-sm'
                        : 'hover:bg-gray-100 text-gray-700'}`
                    }
                    onClick={() => setSelectedItem(item)}
                  >
                    {item.image && (
                      <img src={item.image} alt={item.itemName || 'Product'} className="w-8 h-8 rounded-full mr-3 object-cover" />
                    )}
                    <span className="truncate">{item.itemName || 'Unknown Item'}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Panel: Price Trend Graph and Details */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            {selectedItem ? (
              <>
                <div className="flex items-center mb-4">
                  {selectedItem.image && (
                    <img src={selectedItem.image} alt={selectedItem.itemName || 'Product'} className="w-12 h-12 rounded-full mr-4 object-cover" />
                  )}
                  <h2 className="text-3xl font-bold text-gray-800">
                    {selectedItem.itemName || 'Unknown Item'}
                    <span className="text-lg font-normal text-gray-500 block">
                      {selectedItem.marketName ? `${selectedItem.marketName}` : ''}
                      {selectedItem.marketName && selectedItem.vendorName ? ' • ' : ''}
                      {selectedItem.vendorName ? `Vendor: ${selectedItem.vendorName}` : ''}
                    </span>
                  </h2>
                </div>

                {chartData.length > 1 ? ( // Needs at least 2 points for a line
                  <>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Price (৳)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => `৳${value}`} />`z`
                        <Legend />
                        <Line type="monotone" dataKey="Price" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>

                    {overallChange !== null && (
                      <div className="text-center text-base sm:text-lg font-semibold mt-4 sm:mt-6 p-3 sm:p-4 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                        {/* Initial Price Line */}
                        <span className="block mb-1">
                          <span className="font-bold">Initial Price ({chartData[0]?.name || 'N/A'}):</span>
                          <span className="inline-flex items-center ml-1 text-green-600">
                            <TbCurrencyTaka className="text-base sm:text-lg" />{initialPrice}
                          </span>
                        </span>

                        {/* Current Price Line */}
                        <span className="block mb-2">
                          <span className="font-bold">Current Price ({chartData[chartData.length - 1]?.name || 'N/A'}):</span>
                          <span className="inline-flex items-center ml-1 text-green-600">
                            <TbCurrencyTaka className="text-base sm:text-lg" />{currentPrice}
                          </span>
                        </span>

                        {/* Overall Change Message */}
                        <span className="flex items-center justify-center font-bold text-base sm:text-lg">
                          {overallChange > 0
                            ? (
                              <div className='flex items-center'>
                                <p>Overall, the price has increased by:</p>
                                <span className="inline-flex items-center text-green-600">
                                  <TbCurrencyTaka className="text-base sm:text-lg" />{overallChange}. <FaArrowTrendUp className="ml-1 text-base sm:text-lg" />
                                </span>
                              </div>
                            )
                            : overallChange < 0
                              ? (
                                <>
                                  Overall, the price has <span className="text-red-600">decreased</span> by{' '}
                                  <span className="inline-flex items-center">
                                    <TbCurrencyTaka className="text-base sm:text-lg" />{Math.abs(overallChange)}. <FaArrowTrendDown className="ml-1 text-base sm:text-lg" />
                                  </span>
                                </>
                              )
                              : (
                                <>
                                  Overall, the price has <span className="text-gray-600">remained stable</span> since {chartData[0]?.name || 'N/A'}.{' '}
                                  <FaArrowsLeftRight className="ml-1 text-base sm:text-lg" />
                                </>
                              )
                          }
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-center text-gray-500 italic mt-12">
                    Not enough historical price data (at least two entries) to draw a trend for this item.
                  </p>
                )}
              </>
            ) : (
              <p className="text-center text-gray-500 italic mt-24">
                Select an item from your tracked list to view its price trends.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPriceTrends;