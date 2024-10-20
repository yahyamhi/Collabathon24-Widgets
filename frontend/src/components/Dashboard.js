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
import ExpensePieChartWidget from './ExpensePieChartWidget';

function Dashboard() {
  const initialWidgets = [
    { id: 'accountsummary', title: 'Account Summary', visible: true, description: 'Displays account balances and term deposits' },
    { id: 'quickselftransfer', title: 'Quick Self Transfer', visible: true, description: 'Quickly transfer funds between accounts' },
    { id: 'currencyexchange', title: 'Currency Exchange', visible: true, description: 'View exchange rates and convert currencies' },
    { id: 'supplierpaymenttracker', title: 'Supplier Payment Tracker', visible: true, description: 'Track payments to key suppliers and outstanding invoices' }, 
    { id: 'branchfinder', title: 'Branch Finder', visible: true, description: 'Find branches easily' },
    { id: 'cashflowoverview', title: 'Cash Flow Overview', visible: true, description: 'Monitor your company’s cash flow and liquidity position.' },
    { id: 'taxcomplianceoverview', title: 'Tax Compliance Overview', visible: true, description: 'Summary of corporate tax obligations' },
    { id: 'expensepiechart', title: 'Expense Pie Chart', visible: true, description: 'Visualize expenses by category in a pie chart.' },
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

  // Get saved widget state from local storage, or fallback to initialWidgets
  const savedWidgets = JSON.parse(localStorage.getItem('widgets')) || [];
  
  // Merge saved widgets with initialWidgets to ensure all widgets are displayed
  const mergedWidgets = initialWidgets.map(widget => 
    savedWidgets.find(savedWidget => savedWidget.id === widget.id) || widget
  );

  const [widgets, setWidgets] = useState(mergedWidgets);
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

  // Functions to handle mail and notifications
  const handleMailClick = () => {
    setMailMessage('No new messages');
    setTimeout(() => setMailMessage(''), 3000); // Message disappears after 3 seconds
  };

  const handleNotificationClick = () => {
    setNotificationMessage('No new notifications');
    setTimeout(() => setNotificationMessage(''), 3000); // Message disappears after 3 seconds
  };

  // Update the widget list from local storage whenever a change occurs
  useEffect(() => {
    const updatedWidgets = JSON.parse(localStorage.getItem('widgets')) || [];
    setWidgets((prevWidgets) =>
      initialWidgets.map(widget => 
        updatedWidgets.find(savedWidget => savedWidget.id === widget.id) || widget
      )
    );
  }, []);

  // Save widget state to local storage whenever the widgets state changes
  useEffect(() => {
    localStorage.setItem('widgets', JSON.stringify(widgets));
  }, [widgets]);

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
    // Set visibility to false instead of removing it
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, visible: false } : widget
      )
    );
    setShowUndo(true); // Show undo button when widget is removed

    // Automatically hide undo button after 5 seconds
    setTimeout(() => {
      setShowUndo(false);
      setRemovedWidget(null);
    }, 5000);
  };

  const handleUndo = () => {
    if (removedWidget) {
      setWidgets((prevWidgets) =>
        prevWidgets.map((widget) =>
          widget.id === removedWidget.id ? { ...widget, visible: true } : widget
        )
      );
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
                        {widget.id === 'branchfinder' ? (
                          <BranchFinderContent />
                        ) : widget.id === 'currencyexchange' ? (
                          <CurrencyExchangeWidget />
                        ) : widget.id === 'cashflowoverview' ? (
                          <CashFlowWidget refreshRate={refreshRate} />
                        ) : widget.id === 'accountsummary' ? (
                          <AccountSummaryWidgetContent />
                        ) : widget.id === 'quickselftransfer' ? (
                          <QuickTransferWidget />
                        ) : widget.id === 'taxcomplianceoverview' ? (
                          <TaxComplianceOverviewWidget />
                        ) : widget.id === 'supplierpaymenttracker' ? ( // Supplier Payment Tracker Widget
                          <SupplierPaymentTrackerWidget />
                        ) : widget.id === 'expensepiechart' ? (
                          <ExpensePieChartWidget />
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
