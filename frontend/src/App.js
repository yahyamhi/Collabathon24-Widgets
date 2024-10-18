import React from 'react';
import './App.css';
import Widget from './components/Widget';
import BranchFinderWidget from './components/BranchFinderWidget'; // Import the new BranchFinderWidget

function App() {
  return (
    <div className="app-container">
      <h1>Commerzbank Dashboard</h1>
      <div className="grid-container">
        {/* Add widgets with standardized theme */}
        <Widget endpoint="/widget-data/1" title="Global Trade" />
        <Widget endpoint="/widget-data/2" title="ESG in Emerging Markets" />
        <Widget endpoint="/widget-data/3" title="ISO 20022" />
        <Widget endpoint="/widget-data/4" title="Consumer Loans" />
        <Widget endpoint="/widget-data/5" title="Corporate Payments" />
        <Widget endpoint="/widget-data/6" title="Securities Information" />
        
        {/* Branch Finder Widget */}
        <BranchFinderWidget />
      </div>
    </div>
  );
}

export default App;
