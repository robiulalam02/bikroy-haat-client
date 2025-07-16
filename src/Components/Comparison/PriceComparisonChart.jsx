import { Legend } from '@headlessui/react';
import React, { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell,
  LineChart,
  Line
} from 'recharts';

const PriceComparisonChart = ({ product }) => {
  // const priceHistory = product?.prices?.map(entry => ({
  //   date: entry.date,
  //   price: entry.price,
  // })) || [];

  // console.log(priceHistory)

  console.log(product.prices)

  const [startDate, setStartDate] = useState('');
  const [chartData, setChartData] = useState([]);
  const [initialPrice, setInitialPrice] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);

  // Sort price history on component mount or if it changes (though mock data is static)
  useEffect(() => {
    product?.prices?.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, []);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const showPriceTrend = () => {
    if (!startDate) {
      alert('Please select a starting date.');
      setChartData([]);
      setInitialPrice(null);
      setCurrentPrice(null);
      return;
    }

    // Convert selected startDate string to a Date object for comparison
    const selectedStartDateObj = new Date(startDate);

    // Filter data to include only entries on or after the selected start date
    const filteredData = product?.prices?.filter(entry => {
      const entryDateObj = new Date(entry.date);
      // Compare dates, ignoring time component for consistency
      return entryDateObj >= selectedStartDateObj;
    });

    // If there's no data for or after the selected date
    if (filteredData.length === 0) {
      setChartData([]);
      setInitialPrice(null);
      setCurrentPrice(null);
      alert('No price data found for the selected start date or after.');
      return;
    }

    // Prepare data for the chart, mapping to 'name' and 'Price'
    const formattedChartData = filteredData.map(entry => ({
      name: entry.date,
      Price: entry.price,
    }));

    setChartData(formattedChartData);

    // Set initial and current prices for summary display
    setInitialPrice(formattedChartData[0].Price);
    setCurrentPrice(formattedChartData[formattedChartData.length - 1].Price);
  };

  const calculateOverallChange = () => {
    if (initialPrice === null || currentPrice === null) return null;
    return currentPrice - initialPrice;
  };

  const overallChange = calculateOverallChange();

  return (
    <div className="font-sans p-5 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Product Price Trend Analysis 📈</h2>
      <p className="text-gray-600 leading-relaxed mb-6 text-center">
        Select a historical date to see how the item's price has changed since then. The chart will display all price updates from your selected date forward, providing a clear view of market fluctuations over time.
      </p>

      <div className="flex flex-wrap gap-5 mb-8 items-end justify-center">
        <div className="flex flex-col">
          <label htmlFor="start-date" className="mb-1 font-semibold text-gray-700">Track Price from Date:</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={handleStartDateChange}
            className="p-2 border border-gray-300 rounded-md text-base min-w-[150px]"
          />
        </div>

        <button
          onClick={showPriceTrend}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-md text-base transition-colors duration-300"
        >
          Show Price Trend
        </button>
      </div>

      <hr className="border-t border-gray-200 my-8" />

      {chartData.length > 0 ? (
        <div className="mt-5">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'Price (৳)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `৳${value}`} />
              {/* <Legend /> */}
              <Line type="monotone" dataKey="Price" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>

          {overallChange !== null && (
            <p className="text-center text-lg font-bold mt-5 p-3 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
              <span className="block mb-1">**Initial Price on {startDate}:** ৳{initialPrice}</span>
              <span className="block mb-2">**Current Price (Latest):** ৳{currentPrice}</span>
              {overallChange > 0
                ? `Overall, the price has **increased** by ৳${overallChange}. ⬆️`
                : overallChange < 0
                  ? `Overall, the price has **decreased** by ৳${Math.abs(overallChange)}. ⬇️`
                  : `Overall, the price has **remained stable** since ${startDate}. ↔️`}
            </p>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic mt-12">
          Select a starting date and click "Show Price Trend" to see the historical price changes.
        </p>
      )}
    </div>
  )
}

export default PriceComparisonChart
