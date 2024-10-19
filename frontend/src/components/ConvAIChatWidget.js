// src/components/ConvAIChatWidget.js

import React, { useState } from 'react';
import { useConvaiClient } from '../hooks/useConvaiClient';
import ConvAIAvatar from './ConvAIAvatar';
import ChatBubble from './ChatBubble';
import './ConvAIChatWidget.css';

const ConvAIChatWidget = () => {
  const {
    userText,
    npcText,
    keyPressed,
    isTalking,
    facialData,
    actionText,
  } = useConvaiClient();

  const [isExpanded, setIsExpanded] = useState(false);

  const handleWidgetClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleClose = (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up
    setIsExpanded(false);
  };

  return (
    <div
      className={`convai-chat-widget ${isExpanded ? 'expanded' : ''}`}
      onClick={handleWidgetClick}
    >
      {isExpanded && (
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
      )}
      <ConvAIAvatar
        isTalking={isTalking}
        facialData={facialData}
        actionText={actionText}
        isExpanded={isExpanded}
      />
      <ChatBubble
        userText={userText}
        npcText={npcText}
        keyPressed={keyPressed}
        isExpanded={isExpanded}
      />
    </div>
  );
};

export default ConvAIChatWidget;
