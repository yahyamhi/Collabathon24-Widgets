import { useState, useEffect } from 'react';
import { fetchData } from '../api/apiClient';

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(endpoint)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetch;
