import { useState, useEffect } from 'react';
import { fetchData } from '../api/apiClient';

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);  // Set to false by default
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;  // If endpoint is not defined, don't trigger fetch

    setLoading(true);
    fetchData(endpoint)
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
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;
