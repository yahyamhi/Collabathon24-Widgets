import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard'; // Refactored Dashboard component

function App() {
  return (
    <div className="app-container">
      <h1>Commerzbank Dashboard</h1>
      <Dashboard /> {/* Add the refactored dashboard component */}
    </div>
  );
}

export default App;
