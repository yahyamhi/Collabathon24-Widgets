import React, { useEffect, useState } from 'react';
import Widget from './components/Widget';
import { fetchData } from './api/apiClient'; // Import fetchData from centralized apiClient

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData('/') // Centralized API call for root endpoint
      .then((data) => setMessage(data))
      .catch((error) => console.error('Error fetching message:', error));
  }, []);

  return (
    <div>
      <h1>Commerzbank</h1>
      <p>{message}</p>

      {/* Render the new Widget component */}
      <Widget endpoint="/widget-data" />
    </div>
  );
}

export default App;
