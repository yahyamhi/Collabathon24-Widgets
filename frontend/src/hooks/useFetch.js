// useFetch.js
import { useState, useEffect } from 'react';
import { fetchData } from '../api/apiClient'; // Import fetchData

const useFetch = (endpoint, queryParams = {}, refreshRate = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let intervalId = null;

    const fetchDataFromApi = () => {
      if (!endpoint) return;

      const queryString = new URLSearchParams(queryParams).toString();
      const fullUrl = queryString ? `${endpoint}?${queryString}` : endpoint;

      console.log('Fetching URL:', fullUrl); // For debugging

      setLoading(true);
      fetchData(fullUrl)
        .then((data) => {
          if (!data) {
            throw new Error('No data returned from the API');
          }
          if (isMounted) {
            setData(data);
            setError(null);
          }
        })
        .catch((error) => {
          if (isMounted) {
            console.error('Error fetching data:', error);
            setError(error.message);
            setData(null);
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
    };

    fetchDataFromApi();

    if (refreshRate) {
      intervalId = setInterval(fetchDataFromApi, refreshRate * 1000);
    }

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [endpoint, JSON.stringify(queryParams), refreshRate]);

  return { data, loading, error };
};

export default useFetch;
