import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard'; // Refactored Dashboard component
import commerzbankLogo from './assets/logo.svg'; // Import the Commerzbank logo

function App() {
  return (
    <div className="app-container">
      {/* Fixed Top Banner */}
      <header className="top-banner">
        <img src={commerzbankLogo} alt="Commerzbank Logo" className="logo" />
        <h1>Welcome to New User Experience</h1>
      </header>
      
      {/* Main content */}
      <div className="content">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
