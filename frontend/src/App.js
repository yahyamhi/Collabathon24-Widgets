// src/App.js

import React from 'react';
import Dashboard from './components/Dashboard';
import ConvAIChatWidget from './components/ConvAIChatWidget';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Dashboard />
      {/* Move ConvAIChatWidget here */}
      <ConvAIChatWidget />
    </div>
  );
}

export default App;
