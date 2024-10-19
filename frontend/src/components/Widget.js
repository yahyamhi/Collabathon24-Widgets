import React, { useState } from 'react';
import './Widget.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const shareWidget = () => {
    const currentUrl = window.location.origin;
    const shareUrl = `${currentUrl}/widget/${title.toLowerCase().replace(/\s/g, '')}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success("Widget link copied to clipboard!", {
        position: "bottom-right", // Use position as a string
        autoClose: 3000, // Closes after 3 seconds
      });
    });
  };

  // Retrieve current font size class from the body
  const fontSizeClass = document.body.className
    .split(' ')
    .find((c) => c.includes('-font'));

  return (
    <div
      className={`widget-container ${isMaximized ? 'widget-maximized' : ''} ${fontSizeClass}`}
    >
      <h2>{title}</h2>

      {showInfo && (
        <div className="widget-description">
          {description || 'No description provided.'}
        </div>
      )}

      <div className="widget-content">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { isMaximized })
            : child
        )}
      </div>

      <div className="widget-buttons">
        <button className="widget-button widget-info" onClick={handleInfo}>
          ℹ️
        </button>
        <button
          className="widget-button widget-maximize"
          onClick={handleMaximize}
        >
          {isMaximized ? '⤡' : '⤢'}
        </button>
        <button className="widget-button widget-share" onClick={shareWidget}>
          🔗
        </button>
        {!isMaximized && (
          <button className="widget-button widget-close-button" onClick={onClose}>
            x
          </button>
        )}
      </div>
      {/* Toast container to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default Widget;
