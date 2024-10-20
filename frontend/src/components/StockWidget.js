import React, { useState, useEffect } from 'react';
import './StockWidget.css';

// API key
const apiKey = process.env.REACT_APP_STOCK_API_KEY;

const StockWidget = () => {
  const [stockDetails, setStockDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Preselected favorite stocks
  const favoriteStocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];

  // Function to fetch individual stock data with a delay
  const fetchStockDataWithDelay = async (ticker, delay) => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        try {
          const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?apiKey=${apiKey}`;
          const response = await fetch(url);
          const result = await response.json();
          resolve(result.results ? { ...result.results[0], ticker } : null);
        } catch (error) {
          console.error('Error fetching stock data:', error);
          resolve(null); // Resolve null in case of error to keep the Promise.all working
        }
      }, delay); // Adding delay
    });
  };

  useEffect(() => {
    const fetchAllStocks = async () => {
      setLoading(true); // Start loading

      // Check if stock data is already cached in localStorage
      const cachedData = localStorage.getItem('stockData');
      if (cachedData) {
        setStockDetails(JSON.parse(cachedData));
        setLoading(false);
        return; // Use cached data and stop further execution
      }

      const delay = 1000; // Delay between API calls (1 second)
      const promises = favoriteStocks.map((ticker, index) => 
        fetchStockDataWithDelay(ticker, index * delay)
      );

      try {
        const results = await Promise.all(promises);
        const validResults = results.filter(result => result !== null); // Filter out null results
        if (validResults.length > 0) {
          setStockDetails(validResults);
          localStorage.setItem('stockData', JSON.stringify(validResults)); // Cache results in localStorage
          setError(''); // Clear any previous error
        } else {
          setError('No stock data available');
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError('Error fetching stock data');
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchAllStocks();
  }, []);

  return (
    <div className="stock-widget widget-container medium-font">
      <h1>Invested Stocks</h1>

      {loading ? (
        <p className="loading-message">Loading stock data...</p>  // Display loading message
      ) : stockDetails.length > 0 ? (
        <table className="account-summary-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Open</th>
              <th>Close</th>
              <th>Growth (%)</th>
            </tr>
          </thead>
          <tbody>
            {stockDetails.map((stock, index) => {
              const growth = (((stock.c - stock.o) / stock.o) * 100).toFixed(2);
              return (
                <tr key={index}>
                  <td>{stock.ticker}</td>
                  <td>{stock.o}</td>
                  <td>{stock.c}</td>
                  <td>{growth}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>No stock data available.</div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default StockWidget;
