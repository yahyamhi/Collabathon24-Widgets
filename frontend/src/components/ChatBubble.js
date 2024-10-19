// src/components/ChatBubble.js

import React from 'react';
import './ChatBubble.css';

const ChatBubble = ({ userText, npcText, keyPressed, isExpanded }) => {
  return (
    <div className={`chat-container ${isExpanded ? 'expanded' : ''}`}>
      {keyPressed && (
        <div className="listening-indicator">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      )}
      {userText === '' ? (
        <p className="prompt-text">Press [T] to talk</p>
      ) : (
        <div className="chat-messages">
          <p className="user-text">{userText}</p>
          <p className="npc-text">{npcText}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
