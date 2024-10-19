import React, { useState } from 'react';
import './Widget.css';

const Widget = ({ title, description, onClose, children, onMaximize }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false); // State to control inline notification

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
      setShowCopiedMessage(true); // Show inline message when link is copied

      // Automatically hide the message after 3 seconds
      setTimeout(() => {
        setShowCopiedMessage(false);
      }, 3000);
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
      {/* Widget Header */}
      <div className="widget-header">
        <h2>{title}</h2>

        <div className="widget-buttons">
  <button
    className="widget-button widget-info"
    onClick={handleInfo}
    title="More Info"
  >
    ℹ️
  </button>
  <button
    className="widget-button widget-maximize"
    onClick={handleMaximize}
    title={isMaximized ? "Restore" : "Maximize"}  // Updated title dynamically
  >
    {isMaximized ? '⤡' : '⤢'}
  </button>
  <button
    className="widget-button widget-share"
    onClick={shareWidget}
    title="Share Widget"
  >
    🔗
  </button>
  {!isMaximized && (
    <button
      className="widget-button widget-close-button"
      onClick={onClose}
      title="Remove Widget"
    >
      x
    </button>
  )}
</div>


      </div>

      {/* Info Box */}
      {showInfo && (
        <div className="widget-description">
          {description || 'No description provided.'}
        </div>
      )}

      {/* Widget Content */}
      <div className="widget-content">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { isMaximized })
            : child
        )}
      </div>

      {/* Inline notification for link copied */}
      {showCopiedMessage && (
        <div className="copy-notification">
          {`${title} link copied to clipboard!`}
        </div>
      )}
    </div>
  );
};

export default Widget;
