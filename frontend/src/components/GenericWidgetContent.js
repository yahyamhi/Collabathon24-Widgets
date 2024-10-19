import React from 'react';
import useFetch from '../hooks/useFetch';

const GenericWidgetContent = ({ endpoint }) => {
  const { data, loading, error } = useFetch(endpoint);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <p>{data ? data.message : 'No data available.'}</p>;
};

export default GenericWidgetContent;