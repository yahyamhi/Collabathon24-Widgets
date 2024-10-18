import React, { useState, useEffect } from 'react';
import ChatBubble, { useConvaiClient } from 'convai-chatui-sdk';

function ChatSupportWidget() {
  const characterId = 'your_character_id';
  const apiKey = 'your_api_key';

  const { client, error } = useConvaiClient(characterId, apiKey);

  if (error) {
    return <div>Error initializing chat support: {error.message}</div>;
  }

  if (!client) {
    return <div>Loading chat support...</div>;
  }

  return (
    <div className="chat-support-widget">
      <ChatBubble
        chatHistory="Show"
        chatUiVariant="Sequential Line Chat"
        client={client}
      />
    </div>
  );
}

export default ChatSupportWidget;
