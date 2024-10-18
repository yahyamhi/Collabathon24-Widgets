import React, { useState } from 'react';
import './Widget.css';

const Widget = ({ title, description, onClose, children, onMaximize }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleMaximize = () => {
    const newIsMaximized = !isMaximized;
    setIsMaximized(newIsMaximized);
    if (onMaximize) {
      onMaximize(newIsMaximized);
    }
  };

  const handleInfo = () => {
    setShowInfo(!showInfo);
  };

  // Retrieve current font size class from the body
  const fontSizeClass = document.body.className.split(' ').find(c => c.includes('-font'));

  return (
    <div className={`widget-container ${isMaximized ? 'widget-maximized' : ''} ${fontSizeClass}`}>
      <h2>{title}</h2>

      {/* Info Description */}
      {showInfo && (
        <div className="widget-description">
          {description || 'No description provided.'}
        </div>
      )}

      {/* Widget Content */}
      <div className="widget-content">
        {children}
      </div>

      {/* Widget Buttons */}
      <div className="widget-buttons">
        <button className="widget-button widget-info" onClick={handleInfo}>ℹ️</button>
        <button className="widget-button widget-maximize" onClick={handleMaximize}>
          {isMaximized ? '⤡' : '⤢'}
        </button>
        <button className="widget-button widget-close-button" onClick={onClose}>x</button>
      </div>
    </div>
  );
};

export default Widget;
