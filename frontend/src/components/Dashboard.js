// Dashboard.js
import React, { useState, useEffect } from 'react';
import Widget from './Widget';
import BranchFinderContent from './BranchFinderContent';
import CurrencyExchangeWidget from './CurrencyExchangeWidget';
import CashFlowWidget from './CashFlowWidget';
import GenericWidgetContent from './GenericWidgetContent';
import './Dashboard.css';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'; // Using @hello-pangea/dnd
import { FaBell, FaEnvelope } from 'react-icons/fa';

function Dashboard() {
  const initialWidgets = [
    { id: 'currencyExchange', title: 'Currency Exchange', visible: true, description: 'View exchange rates and convert currencies' },
    { id: 'globalTrade', title: 'Global Trade', visible: true, description: 'Shows global trade insights' },
    { id: 'esgMarkets', title: 'ESG in Emerging Markets', visible: true, description: 'ESG trends and data' },
    { id: 'iso20022', title: 'ISO 20022', visible: true, description: 'Migration success and insights' },
    { id: 'consumerLoans', title: 'Consumer Loans', visible: true, description: 'Consumer loan data' },
    { id: 'corporatePayments', title: 'Corporate Payments', visible: true, description: 'Corporate payment solutions' },
    { id: 'securitiesInfo', title: 'Securities Information', visible: true, description: 'Securities-related data' },
    { id: 'branchFinder', title: 'Branch Finder', visible: true, description: 'Find branches easily' },
    { id: 'cashFlow', title: 'Cash Flow Overview', visible: true, description: 'Monitor your company’s cash flow and liquidity position.' },
  ];

  const [widgets, setWidgets] = useState(initialWidgets);
  const [showPopup, setShowPopup] = useState(false);
  const [isWidgetMaximized, setIsWidgetMaximized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [widgetsPerRow, setWidgetsPerRow] = useState(3); // Default value
  const [refreshRate, setRefreshRate] = useState(60); // Default to 60 seconds

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

    // Create a copy of the widgets array
    const updatedWidgets = [...widgets];

    // Extract visible widgets from the main widgets array
    const visibleWidgetIndices = widgets
      .map((widget, index) => (widget.visible ? index : -1))
      .filter((index) => index !== -1);

    // Map the source and destination indices to the indices in the main widgets array
    const sourceWidgetIndex = visibleWidgetIndices[sourceIndex];
    const destinationWidgetIndex = visibleWidgetIndices[destinationIndex];

    // Swap the widgets in the main widgets array
    const [movedWidget] = updatedWidgets.splice(sourceWidgetIndex, 1);
    updatedWidgets.splice(destinationWidgetIndex, 0, movedWidget);

    setWidgets(updatedWidgets);
  };

  return (
    <div className={isWidgetMaximized ? 'dashboard-overlay' : ''}>
      <div className="notification-icons">
        <FaEnvelope className="icon" />
        <FaBell className="icon" />
      </div>
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
                      >
                        {widget.id === 'branchFinder' ? (
                          <BranchFinderContent />
                        ) : widget.id === 'currencyExchange' ? (
                          <CurrencyExchangeWidget />
                        ) : widget.id === 'cashFlow' ? (
                          <CashFlowWidget refreshRate={refreshRate} />
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
