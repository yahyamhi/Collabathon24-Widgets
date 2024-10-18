import React from 'react';
import useFetch from '../hooks/useFetch';

const Widget = ({ endpoint, title }) => {
  const { data, loading, error } = useFetch(endpoint);

  return (
    <div className="widget-container">
      <h2>{title}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>{data ? data.message : 'No data available'}</p>
      )}
    </div>
  );
};

export default Widget;
