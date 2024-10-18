import React, { useEffect, useState } from 'react';

const Widget = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from backend
    fetch('http://localhost:5000/widget-data')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching widget data:', error));
  }, []);

  return (
    <div className="widget-container">
      <h2>Commerzbank Widget</h2>
      {data ? (
        <div>
          <p>{data.message}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Widget;
