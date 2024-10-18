import React, { useState } from 'react';
import Widget from './Widget';
import ChatSupportWidget from './ChatSupportWidget';
import MarketTrendsWidget from './MarketTrendsWidget';
// Import other widget components as needed
import './Dashboard.css';

function Dashboard() {
  const initialWidgets = [
    { id: 'widget1', title: 'Sales Overview', visible: true },
    { id: 'marketTrends', title: 'Market Trends', visible: true },
    { id: 'chatSupport', title: 'Chat Support', visible: true },
    // Add more widgets here
  ];

  const [widgets, setWidgets] = useState(initialWidgets);
  const [removedWidgetId, setRemovedWidgetId] = useState(null);

  const handleRemoveWidget = (id) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, visible: false } : widget
      )
    );
    setRemovedWidgetId(id);
  };

  const handleUndoRemove = () => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === removedWidgetId ? { ...widget, visible: true } : widget
      )
    );
    setRemovedWidgetId(null);
  };

  const handleWidgetSelectionChange = (id, isChecked) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === id ? { ...widget, visible: isChecked } : widget
      )
    );
  };

  return (
    <div className="dashboard">
      {removedWidgetId && (
        <button className="undo-button" onClick={handleUndoRemove}>
          Undo Remove Widget
        </button>
      )}

      <div className="widget-selection">
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
      </div>

      <div className="widgets-container">
        {widgets
          .filter((widget) => widget.visible)
          .map((widget) => (
            <Widget
              key={widget.id}
              title={widget.title}
              onClose={() => handleRemoveWidget(widget.id)}
            >
              {widget.id === 'chatSupport' && <ChatSupportWidget />}
              {widget.id === 'marketTrends' && <MarketTrendsWidget />}
            </Widget>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
