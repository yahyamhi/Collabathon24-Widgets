import React from "react";
import useFetch from "../hooks/useFetch";

const Widget = ({ endpoint }) => {
  const { data, loading, error } = useFetch(endpoint);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="widget-container">
      <h2>Commerzbank Widget</h2>
      {data ? <p>{data.message}</p> : <p>No data available</p>}
    </div>
  );
};

export default Widget;
