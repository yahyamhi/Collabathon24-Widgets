import React, { useState, useEffect } from 'react';
import Widget from './Widget';
import BranchFinderContent from './BranchFinderContent';
import CurrencyExchangeWidget from './CurrencyExchangeWidget';
import CashFlowWidget from './CashFlowWidget'; // Import the CashFlowWidget
import GenericWidgetContent from './GenericWidgetContent';
import AccountSummaryWidgetContent from './AccountSummaryWidgetContent';
import './Dashboard.css';

function Dashboard() {
  const initialWidgets = [
    { id: 'accountSummary', title: 'Account Summary', visible: true, description: 'Displays account balances and term deposits' },
    { id: 'currencyExchange', title: 'Currency Exchange', visible: true, description: 'View exchange rates and convert currencies' },
    { id: 'globalTrade', title: 'Global Trade', visible: true, description: 'Shows global trade insights' },
    { id: 'esgMarkets', title: 'ESG in Emerging Markets', visible: true, description: 'ESG trends and data' },
    { id: 'iso20022', title: 'ISO 20022', visible: true, description: 'Migration success and insights' },
    { id: 'consumerLoans', title: 'Consumer Loans', visible: true, description: 'Consumer loan data' },
    { id: 'corporatePayments', title: 'Corporate Payments', visible: true, description: 'Corporate payment solutions' },
    { id: 'securitiesInfo', title: 'Securities Information', visible: true, description: 'Securities-related data' },
    { id: 'branchFinder', title: 'Branch Finder', visible: true, description: 'Find branches easily' },
    { id: 'cashFlow', title: 'Cash Flow Overview', visible: true, description: 'Monitor your company’s cash flow and liquidity position.' }, // Added CashFlowWidget
  ];

  const [widgets, setWidgets] = useState(initialWidgets);
  const [showPopup, setShowPopup] = useState(false);
  const [isWidgetMaximized, setIsWidgetMaximized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false); 
  const [fontSize, setFontSize] = useState('medium'); 

  useEffect(() => {
    if (isWidgetMaximized) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isWidgetMaximized]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    document.body.classList.remove('small-font', 'medium-font', 'large-font');
    document.body.classList.add(`${fontSize}-font`);
  }, [fontSize]);

  const handleWidgetSelectionChange = (id, isChecked) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, visible: isChecked } : widget
      )
    );
  };

  const handleCloseWidget = (id) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, visible: false } : widget
      )
    );
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleMaximize = (isMaximized) => {
    setIsWidgetMaximized(isMaximized);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  return (
    <div className={isWidgetMaximized ? 'dashboard-overlay' : ''}>
      <button className="edit-button" onClick={togglePopup}>✏️ Edit Widgets</button>
      <button className="settings-button" onClick={toggleSettings}>⚙️ Settings</button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Select Widgets to Display</h3>
            {widgets.map((widget) => (
              <div key={widget.id}>
                <input
                  type="checkbox"
                  id={widget.id}
                  checked={widget.visible}
                  onChange={(e) =>
                    handleWidgetSelectionChange(widget.id, e.target.checked)
                  }
                />
                <label htmlFor={widget.id}>{widget.title}</label>
              </div>
            ))}
            <button className="close-button" onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Settings Popup */}
      {showSettings && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Settings</h3>
            {/* Dark Mode */}
            <div>
              <label htmlFor="darkMode">Dark Mode</label>
              <input
                type="checkbox"
                id="darkMode"
                checked={darkMode}
                onChange={handleDarkModeToggle}
              />
            </div>

            {/* Font Size */}
            <div>
              <label htmlFor="fontSize">Font Size</label>
              <select id="fontSize" value={fontSize} onChange={handleFontSizeChange}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <button className="close-button" onClick={toggleSettings}>Close</button>
          </div>
        </div>
      )}

      {/* Widget Grid */}
      <div className="grid-container">
        {widgets
          .filter((widget) => widget.visible)
          .map((widget) => (
            <div key={widget.id} className="widget-item">
              <Widget
                title={widget.title}
                description={widget.description}
                onClose={() => handleCloseWidget(widget.id)}
                onMaximize={handleMaximize}
              >
                {widget.id === 'branchFinder' ? (
                  <BranchFinderContent />
                ) : widget.id === 'currencyExchange' ? (
                  <CurrencyExchangeWidget />
                ) : widget.id === 'accountSummary' ? (
                  <AccountSummaryWidgetContent endpoint="/api/account-summary" />
                ) : widget.id === 'cashFlow' ? ( // Added rendering for CashFlowWidget
                  <CashFlowWidget />
                ) : (
                  <GenericWidgetContent endpoint={`/widget-data/${widget.id}`} />
                )}
              </Widget>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
