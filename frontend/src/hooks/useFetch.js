import { useState, useEffect } from 'react';
import { fetchData } from '../api/apiClient';

const useFetch = (endpoint, queryParams = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;

    const queryString = new URLSearchParams(queryParams).toString();
    const fullUrl = queryString ? `${endpoint}?${queryString}` : endpoint;

    setLoading(true);
    fetchData(fullUrl)
      .then((data) => {
        if (!data) {
          throw new Error('No data returned from the API');
        }
        setData(data);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint, JSON.stringify(queryParams)]);

  return { data, loading, error };
};

export default useFetch;
