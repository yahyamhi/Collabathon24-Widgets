import React, { useState, useEffect } from 'react';
import Widget from './Widget';
import BranchFinderContent from './BranchFinderContent';
import CurrencyExchangeWidget from './CurrencyExchangeWidget';
import CashFlowWidget from './CashFlowWidget'; // Import the CashFlowWidget
import QuickTransferWidget from './QuickTransferWidget'; 
import GenericWidgetContent from './GenericWidgetContent';
import AccountSummaryWidgetContent from './AccountSummaryWidgetContent';
import SupplierPaymentTrackerWidget from './SupplierPaymentTrackerWidget'; // Import the Supplier Payment Tracker Widget
import './Dashboard.css';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'; // Using @hello-pangea/dnd
import TaxComplianceOverviewWidget from './TaxComplianceOverviewWidget';

function Dashboard() {
  const initialWidgets = [    
    { id: 'accountSummary', title: 'Account Summary', visible: true, description: 'Displays account balances and term deposits' },
    { id: 'quickTransfer', title: 'Quick Self Transfer', visible: true, description: 'Quickly transfer funds between accounts' },
    { id: 'currencyExchange', title: 'Currency Exchange', visible: true, description: 'View exchange rates and convert currencies' },
    { id: 'supplierPayment', title: 'Supplier Payment Tracker', visible: true, description: 'Track payments to key suppliers and outstanding invoices' }, // Supplier Payment Tracker Widget
    { id: 'globalTrade', title: 'Global Trade', visible: true, description: 'Shows global trade insights' },
    { id: 'esgMarkets', title: 'ESG in Emerging Markets', visible: true, description: 'ESG trends and data' },
    { id: 'iso20022', title: 'ISO 20022', visible: true, description: 'Migration success and insights' },
    { id: 'consumerLoans', title: 'Consumer Loans', visible: true, description: 'Consumer loan data' },
    { id: 'corporatePayments', title: 'Corporate Payments', visible: true, description: 'Corporate payment solutions' },
    { id: 'securitiesInfo', title: 'Securities Information', visible: true, description: 'Securities-related data' },
    { id: 'branchFinder', title: 'Branch Finder', visible: true, description: 'Find branches easily' },
    { id: 'cashFlow', title: 'Cash Flow Overview', visible: true, description: 'Monitor your company’s cash flow and liquidity position.' }, // Added CashFlowWidget
    { id: 'taxCompliance', title: 'Tax Compliance Overview', visible: true, description: 'Summary of corporate tax obligations' },
  ];

  const proTips = [
    "At Commerzbank, we care about our Customer's Productivity.",
    "You can customize your dashboard to suit your preferences!",
    "Use the currency exchange widget to stay updated on exchange rates.",
    "Monitor your cash flow in real-time with the cash flow overview.",
    "Drag and drop widgets to rearrange your dashboard easily.",
    "Click on the settings icon to adjust widget refresh rates.",
    "Dark mode is available in the settings for easier viewing.",
    "Resize your browser to see how the widgets adjust dynamically.",
    "Edit your widgets by clicking the ✏️ icon to show or hide them.",
    "Stay informed about global trade insights using the global trade widget.",
  ];  

  const [widgets, setWidgets] = useState(initialWidgets);
  const [removedWidget, setRemovedWidget] = useState(null); // Store removed widget
  const [showUndo, setShowUndo] = useState(false); // Toggle undo button
  const [currentProTip, setCurrentProTip] = useState(proTips[0]); // Current pro tip
  const [showPopup, setShowPopup] = useState(false);
  const [isWidgetMaximized, setIsWidgetMaximized] = useState(false); // Track whether a widget is maximized
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [widgetsPerRow, setWidgetsPerRow] = useState(3); // Default value
  const [refreshRate, setRefreshRate] = useState(60); // Default to 60 seconds
  const [mailMessage, setMailMessage] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  // Functions for mail and notification handling
  const handleMailClick = () => {
    setMailMessage('No new messages');
    setTimeout(() => setMailMessage(''), 3000); // Message disappears after 3 seconds
  };

  const handleNotificationClick = () => {
    setNotificationMessage('No new notifications');
    setTimeout(() => setNotificationMessage(''), 3000); // Message disappears after 3 seconds
  };

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

  // Update CSS variable for widgets per row
  useEffect(() => {
    document.documentElement.style.setProperty('--widgets-per-row', widgetsPerRow);
  }, [widgetsPerRow]);

  // Update pro tip every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentProTip(proTips[Math.floor(Math.random() * proTips.length)]);
    }, 10000); // 10 seconds interval  

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const handleWidgetSelectionChange = (id, isChecked) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, visible: isChecked } : widget
      )
    );
  };

  const handleCloseWidget = (id) => {
    const widgetToRemove = widgets.find((widget) => widget.id === id);
    setRemovedWidget(widgetToRemove);
    setWidgets((prevWidgets) => prevWidgets.filter((widget) => widget.id !== id));
    setShowUndo(true); // Show undo button when widget is removed

    // Automatically hide undo button after 5 seconds
    setTimeout(() => {
      setShowUndo(false);
      setRemovedWidget(null);
    }, 5000);
  };

  const handleUndo = () => {
    if (removedWidget) {
      setWidgets((prevWidgets) => [...prevWidgets, removedWidget]);
      setRemovedWidget(null);
      setShowUndo(false); // Hide undo button after restoration
    }
  };

  const handleMaximize = (isMaximized) => {
    setIsWidgetMaximized(isMaximized);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
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

  const handleWidgetsPerRowChange = (e) => {
    setWidgetsPerRow(e.target.value);
  };

  const handleRefreshRateChange = (e) => {
    setRefreshRate(e.target.value);
  };

  // Prepare visible widgets
  const visibleWidgets = widgets.filter((widget) => widget.visible);

  // Handler for drag end event
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedWidgets = [...widgets];
    const visibleWidgetIndices = widgets
      .map((widget, index) => (widget.visible ? index : -1))
      .filter((index) => index !== -1);

    const sourceWidgetIndex = visibleWidgetIndices[sourceIndex];
    const destinationWidgetIndex = visibleWidgetIndices[destinationIndex];

    const [movedWidget] = updatedWidgets.splice(sourceWidgetIndex, 1);
    updatedWidgets.splice(destinationWidgetIndex, 0, movedWidget);

    setWidgets(updatedWidgets);
  };

  return (
    <div className={isWidgetMaximized ? 'dashboard-overlay' : ''}>
      <div className="notification-icons">
        <span 
          className="icon mail-icon" 
          role="img" 
          aria-label="mail" 
          onClick={handleMailClick}
        >
          ✉️
        </span> {/* Mail Emoji */}
        <span 
          className="icon notification-icon" 
          role="img" 
          aria-label="notifications" 
          onClick={handleNotificationClick}
        >
          🔔
        </span> {/* Notifications Emoji */}
        <span 
          className="icon edit-icon" 
          role="img" 
          aria-label="edit" 
          onClick={togglePopup}
        >
          ✏️
        </span> {/* Edit Emoji */}
        <span 
          className="icon settings-icon" 
          role="img" 
          aria-label="settings" 
          onClick={toggleSettings}
        >
          ⚙️
        </span> {/* Settings Emoji */}
      </div>

      {/* Display Mail and Notifications Messages */}
      {mailMessage && <div className="message-box mail-message">{mailMessage}</div>}
      {notificationMessage && <div className="message-box notification-message">{notificationMessage}</div>}

      {/* Pro Tip Box */}
      <div className="pro-tip-container">
        <span role="img" aria-label="bulb">💡</span> Pro Tip: {currentProTip}
      </div>
      
      {/* Undo Button */}
      {showUndo && (
        <div className="undo-container">
          <span>You can add this Widget again later 😀</span>
          <button className="undo-button" onClick={handleUndo}>
            Undo
          </button>
        </div>
      )}

      {/* Removed Edit and Settings Buttons with Text */}
      {/* These have been removed to avoid redundancy */}
      {/* 
      <button className="edit-button" onClick={togglePopup}>✏️ Edit Widgets</button>
      <button className="settings-button" onClick={toggleSettings}>⚙️ Settings</button>
      */}

      {/* Widgets Selection Popup */}
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

            {/* Number of Widgets per Row */}
            <div>
              <label htmlFor="widgetsPerRow">Widgets per Row</label>
              <select
                id="widgetsPerRow"
                value={widgetsPerRow}
                onChange={handleWidgetsPerRowChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            {/* Data Refresh Rate */}
            <div>
              <label htmlFor="refreshRate">Data Refresh Rate (seconds)</label>
              <input
                type="number"
                id="refreshRate"
                value={refreshRate}
                onChange={handleRefreshRateChange}
                min="10"
              />
            </div>

            <button className="close-button" onClick={toggleSettings}>Close</button>
          </div>
        </div>
      )}

      {/* Widget Grid with Drag-and-Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <div
              className="grid-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {visibleWidgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(provided) => (
                    <div
                      className="widget-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Widget
                        title={widget.title}
                        description={widget.description}
                        onClose={() => handleCloseWidget(widget.id)}
                        onMaximize={handleMaximize}
                        isMaximized={isWidgetMaximized}  // Pass the isMaximized state to hide close button
                      >
                        {widget.id === 'branchFinder' ? (
                          <BranchFinderContent />
                        ) : widget.id === 'currencyExchange' ? (
                          <CurrencyExchangeWidget />
                        ) : widget.id === 'cashFlow' ? (
                          <CashFlowWidget refreshRate={refreshRate} />
                        ) : widget.id === 'accountSummary' ? (
                          <AccountSummaryWidgetContent endpoint="/api/account-summary" />
                        ) : widget.id === 'quickTransfer' ? (
                          <QuickTransferWidget />
                        ) : widget.id === 'taxCompliance' ? (
                          <TaxComplianceOverviewWidget />
                        ) : widget.id === 'supplierPayment' ? ( // Supplier Payment Tracker Widget
                          <SupplierPaymentTrackerWidget />
                        ) : (
                          <GenericWidgetContent
                            endpoint={`/widget-data/${widget.id}`}
                          />
                        )}
                      </Widget>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Dashboard;
