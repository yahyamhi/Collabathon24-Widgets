import React from 'react';
import useFetch from '../hooks/useFetch';

const GenericWidgetContent = ({ endpoint }) => {
  const { data, loading, error } = useFetch(endpoint);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Helper function to render data in a table
  const renderTable = (data) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{typeof value === 'object' ? JSON.stringify(value, null, 2) : value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {data ? (
        data.message ? (
          <p>{data.message}</p>
        ) : (
          renderTable(data) // Render data in a table if 'message' is not available
        )
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default GenericWidgetContent;