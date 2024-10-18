import React, { useEffect, useState } from 'react';
import Widget from './components/Widget';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((response) => response.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div>
      <h1>Commerzbank Widget</h1>
      <p>{message}</p>

      {/* Render the new Widget component */}
      <Widget />
    </div>
  );
}

export default App;
