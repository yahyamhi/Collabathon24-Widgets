import React, { useEffect, useState, useRef } from 'react';
import { ConvaiClient } from 'convai-web-sdk'; // Import ConvaiClient

const ChatSupportWidget = () => {
  const convaiClient = useRef(null); // Ref to store the ConvaiClient instance
  const [npcText, setNpcText] = useState(''); // State to store NPC responses
  const [userText, setUserText] = useState(''); // State for user input
  const [started, setStarted] = useState(false);
  const [isTalking, setIsTalking] = useState(false); // Track if NPC is speaking

  useEffect(() => {
    // Initialize the ConvaiClient when the component mounts
    convaiClient.current = new ConvaiClient({
      apiKey: process.env.REACT_APP_CONVAI_API_KEY, // API Key
      characterId: process.env.REACT_APP_CONVAI_CHARACTER_ID, // Character ID
      enableAudio: true, // Enable audio for both text and voice chat
      sessionId: '', // Optional: Track chat history via session ID
      disableAudioGeneration: false, // Enable audio response generation
    });

    // Set the response callback to handle NPC responses
    convaiClient.current.setResponseCallback((response) => {
      if (response.hasUserQuery()) {
        const transcript = response.getUserQuery().getTextData();
        console.log("User query transcript: ", transcript);
      }

      if (response.hasAudioResponse()) {
        const audioResponse = response.getAudioResponse();

        // Handle text data if available
        if (audioResponse.getTextData) {
          const npcResponse = audioResponse.getTextData();
          setNpcText(npcResponse); // Update state with NPC response text
        }

        // Handle audio data if available
        if (audioResponse.getAudioData) {
          const audioData = audioResponse.getAudioData_asU8();
          // Here you can process or play the audio data using an AudioContext
          console.log("Audio response received:", audioData);
        }
      }
    });

    // Set when the NPC starts and stops talking
    convaiClient.current.onAudioPlay(() => {
      setIsTalking(true);
    });

    convaiClient.current.onAudioStop(() => {
      setIsTalking(false);
    });

  }, []);

  // Function to send user input to the Convai API
  const handleSendText = () => {
    if (convaiClient.current && userText) {
      convaiClient.current.sendTextChunk(userText); // Send user text to Convai
      setUserText(''); // Clear user input after sending
    }
  };

  return (
    <div className="chat-support-widget">
      <h2>Chat Support</h2>
      {!started ? (
        <button onClick={() => setStarted(true)}>Start Chat</button>
      ) : (
        <div>
          <p>{isTalking ? "NPC is talking..." : "NPC: " + npcText}</p>
          <input
            type="text"
            value={userText}
            onChange={(e) => setUserText(e.target.value)} // Update user input
            placeholder="Type your message..."
          />
          <button onClick={handleSendText}>Send</button>
        </div>
      )}
    </div>
  );
};

export default ChatSupportWidget;
