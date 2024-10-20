import React, { useState, useEffect, useRef } from 'react';
import { ConvaiClient } from 'convai-web-sdk';
import characterImage from '../assets/logo.svg'; // Your specified logo
import './Chatbot.css';

// Function to detect URLs in text and render them as clickable links
function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    } else {
      return part;
    }
  });
}

const Chatbot = () => {
  // State variables
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Array to hold messages
  const [inputText, setInputText] = useState('');
  const [keyPressed, setKeyPressed] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const convaiClientRef = useRef(null);
  const finalizedUserText = useRef('');
  const npcTextRef = useRef('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize ConvAI client
  useEffect(() => {
    const apiKey = process.env.REACT_APP_CONVAI_API_KEY; // ConvAI API Key
    const characterId = process.env.REACT_APP_CONVAI_CHARACTER_ID; // ConvAI Character ID

    convaiClientRef.current = new ConvaiClient({
      apiKey: apiKey,
      characterId: characterId,
      enableAudio: true,
      disableAudioGeneration: false,
    });

    // Set response callback
    convaiClientRef.current.setResponseCallback((response) => {
      setIsThinking(false);

      if (response.hasAudioResponse()) {
        const audioResponse = response.getAudioResponse();
        const npcResponse = audioResponse.getTextData();
        npcTextRef.current += ' ' + npcResponse;
        // Update messages with AI response
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'ai', text: npcResponse },
        ]);
      }
    });

    // Error handling
    convaiClientRef.current.setErrorCallback((type, message) => {
      console.error(`ConvAI Error [${type}]: ${message}`);
    });
  }, []);

  // Handle voice recording using the "T" key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'KeyT' && !keyPressed && chatOpen) {
        setKeyPressed(true);
        finalizedUserText.current = '';
        npcTextRef.current = '';
        setIsThinking(true);
        convaiClientRef.current.startAudioChunk();
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'KeyT' && keyPressed && chatOpen) {
        setKeyPressed(false);
        convaiClientRef.current.endAudioChunk();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keyPressed, chatOpen]);

  // Handle text input submission
  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() !== '') {
      // Update messages with user text input
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: inputText },
      ]);
      // Send text to ConvAI
      setIsThinking(true);
      convaiClientRef.current.sendTextChunk(inputText);
      setInputText('');
    }
  };

  // Character click handler to open chatbox
  const handleCharacterClick = () => {
    setChatOpen(true);
  };

  // Close chatbox handler
  const handleCloseChat = () => {
    setChatOpen(false);
  };

  // Reset session handler
  const handleResetSession = () => {
    convaiClientRef.current.resetSession();
    setMessages([]);
  };

  return (
    <div>
      {/* Static character at the bottom of the screen */}
      {!chatOpen && (
        <div className="chatbot-character" onClick={handleCharacterClick}>
          <div className="chatbot-character-inner">
            <img src={characterImage} alt="AI Chat Support" />
            <p>AI Chat Support</p>
          </div>
        </div>
      )}

      {/* Chatbox */}
      {chatOpen && (
        <div className="chatbox">
          {/* Logo and AI Chat Support text on top of the chatbox */}
          <div className="chatbox-logo-container">
            {/* Reset and Close buttons */}
            <button
              className="chatbox-reset-button"
              onClick={handleResetSession}
              title="Reset Chat"
            >
              🔄
            </button>
            <img
              src={characterImage}
              alt="AI Chat Support"
              className="chatbox-logo"
            />
            <p className="chatbox-title">AI Chat Support</p>
            <button
              className="chatbox-close-button"
              onClick={handleCloseChat}
              title="Close Chat"
            >
              ❎
            </button>
          </div>

          {/* Chatbox content */}
          <div className="chatbox-content">
            {/* Chat messages */}
            <div className="chatbox-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message-bubble ${message.sender}`}>
                  {linkify(message.text)}
                </div>
              ))}
              {isThinking && (
                <div className="message-bubble ai">Thinking...</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 'Press T to start talking' prompt */}
            <div className="press-t-prompt">Press 'T' to start talking</div>

            {/* Input field for text messages */}
            <form className="chatbox-input" onSubmit={handleInputSubmit}>
              <input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="send-button">
                ➡️
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
