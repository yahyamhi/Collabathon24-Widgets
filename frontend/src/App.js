import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import WidgetMaximized from './components/WidgetMaximized'; // New component for maximized widgets
import commerzbankLogo from './assets/logo.svg'; // Import logo
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes and Route

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Fixed Top Banner */}
        <header className="top-banner">
          <img src={commerzbankLogo} alt="Commerzbank Logo" className="logo" />
          <h1>Welcome to New User Experience</h1>
        </header>
        
        <div className="content">
          <Routes>
            {/* Main Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Route for Maximized Widgets */}
            <Route path="/widget/:id" element={<WidgetMaximized />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
