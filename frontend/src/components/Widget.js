import React from 'react';
import './Widget.css'; // Import the CSS file for styling

function Widget({ title, children, onClose }) {
  return (
    <div className="widget">
      <div className="widget-header">
        <h3>{title}</h3>
        <button className="widget-close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="widget-content">{children}</div>
    </div>
  );
}

export default Widget;
