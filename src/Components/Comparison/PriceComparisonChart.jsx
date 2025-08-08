import { Legend } from '@headlessui/react'; // Legend is imported but not used, can be removed if not needed
import React, { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, // Cell is imported but not used, can be removed if not needed
  LineChart,
  Line
} from 'recharts';

// Import moment for robust date handling and formatting if not already used globally
import moment from 'moment';
import { BsGraphDownArrow, BsGraphUpArrow } from 'react-icons/bs';
import analysisIcon from '../../assets/analysis.png';


const PriceComparisonChart = ({ product }) => {
  const [startDate, setStartDate] = useState('');
  const [chartData, setChartData] = useState([]);
  const [initialPrice, setInitialPrice] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);

  // Sort price history once on component mount for consistent date order
  // This is crucial for correct filtering and initial/current price calculation
  useEffect(() => {
    if (product?.prices) {
      product.prices.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  }, [product?.prices]); // Depend on product.prices to re-sort if prop changes

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

    // Use moment for robust date comparison to ensure it includes the entire day
    // This parses the date string to a moment object and sets time to start of day
    const selectedStartDateMoment = moment(startDate).startOf('day');

    // Filter data to include only entries on or after the selected start date
    const filteredData = product?.prices?.filter(entry => {
      // Convert each entry's date to a moment object at start of day for accurate comparison
      const entryDateMoment = moment(entry.date).startOf('day');
      return entryDateMoment.isSameOrAfter(selectedStartDateMoment);
    });

    if (filteredData.length === 0) {
      setChartData([]);
      setInitialPrice(null);
      setCurrentPrice(null);
      alert('No price data found for the selected start date or after. Please choose an earlier date.');
      return;
    }

    // Prepare data for the chart, mapping to 'name' (formatted date) and 'Price'
    const formattedChartData = filteredData.map(entry => ({
      name: moment(entry.date).format('MMM D, YY'), // Format date for X-axis labels
      Price: entry.price,
    }));

    setChartData(formattedChartData);

    // Set initial and current prices for summary display based on FILTERED data
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
      <div className='flex items-center gap-2 justify-center mb-4'>
        <h2 className="text-3xl font-bold text-gray-800 text-center ">Product Price Trend Analysis</h2>
        <img className='w-8' src={analysisIcon} alt="" />
      </div>
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
              <XAxis dataKey="name" /> {/* 'name' will be the formatted date */}
              <YAxis label={{ value: 'Price (৳)', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `৳${value}`} />
              {/* <Legend /> */} {/* Uncomment if you want a legend, though "Price" is self-explanatory */}
              <Line type="monotone" dataKey="Price" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>

          {overallChange !== null && (
            <div className="mt-5 p-5 rounded-lg bg-blue-50 border border-blue-200 shadow-md">
              <div className="flex justify-between items-center mb-2 pb-2 border-b border-blue-100">
                <p className="text-blue-800 text-lg font-semibold">Initial Price on {moment(startDate).format('MMM D, YYYY')}:</p>
                <p className="text-blue-800 text-xl font-bold">৳{initialPrice}</p>
              </div>

              <div className="flex justify-between items-center mb-4 pb-2 border-b border-blue-100">
                <p className="text-blue-800 text-lg font-semibold">Latest Recorded Price:</p>
                <p className="text-blue-800 text-xl font-bold">৳{currentPrice}</p>
              </div>

              <div className="text-center flex justify-center text-xl font-bold">
                {overallChange > 0
                  ? <span className="text-green-700 flex items-center gap-2">Overall, the price has increased by ৳{overallChange.toFixed(2)} <BsGraphUpArrow /></span>
                  : overallChange < 0
                    ? <span className="text-red-700 flex items-center gap-2">Overall, the price has decreased by ৳{Math.abs(overallChange).toFixed(2)} <BsGraphDownArrow /></span>
                    : <span className="text-gray-700">Overall, the price has remained stable within the selected period.</span>
                }
              </div>
            </div>
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

export default PriceComparisonChart;