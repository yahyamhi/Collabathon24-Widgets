// src/hooks/useConvaiClient.js

import { useState, useEffect, useRef } from 'react';
import { ConvaiClient } from 'convai-web-sdk';
import axios from 'axios';

const apiKey = process.env.REACT_APP_CONVAI_API_KEY;
const characterId = process.env.REACT_APP_CONVAI_CHARACTER_ID;

export const useConvaiClient = () => {
  const [userText, setUserText] = useState('');
  const [npcText, setNpcText] = useState('');
  const [isTalking, setIsTalking] = useState(false);
  const [keyPressed, setKeyPressed] = useState(false);
  const [facialData, setFacialData] = useState([]);
  const facialRef = useRef([]);
  const finalizedUserText = useRef('');
  const npcTextRef = useRef('');
  const [userEndOfResponse, setUserEndOfResponse] = useState(false);
  const [actionText, setActionText] = useState('');
  const convaiClient = useRef(null);

  useEffect(() => {
    convaiClient.current = new ConvaiClient({
      apiKey: apiKey,
      characterId: characterId,
      enableAudio: true,
      enableFacialData: true,
      faceModel: 3,
    });

    convaiClient.current.setErrorCallback((type, message) => {
      console.log(type, message);
    });

    convaiClient.current.setResponseCallback((response) => {
      // Handle user query
      if (response.hasUserQuery()) {
        const transcript = response.getUserQuery();
        const isFinal = transcript.getIsFinal();
        if (isFinal) {
          finalizedUserText.current += ' ' + transcript.getTextData();
          setUserText(finalizedUserText.current);
        } else {
          setUserText(finalizedUserText.current + ' ' + transcript.getTextData());
        }
      }

      // Handle NPC response
      if (response.hasAudioResponse()) {
        const audioResponse = response.getAudioResponse();
        if (audioResponse) {
          npcTextRef.current += ' ' + audioResponse.getTextData();
          setNpcText(npcTextRef.current);

          // Handle viseme data for lip-syncing
          if (audioResponse.getVisemesData()?.array[0]) {
            const faceData = audioResponse.getVisemesData().array[0];
            if (faceData[0] !== -2) {
              facialRef.current.push(faceData);
              setFacialData([...facialRef.current]);
            }
          }
        }
      }

      // Handle action response
      if (response.hasActionResponse()) {
        const actionResponse = response.getActionResponse();
        const parsedActions = actionResponse.getAction().trim().split('\n');
        setActionText(parsedActions[0].split(', '));
      }
    });

    convaiClient.current.onAudioPlay(() => {
      setIsTalking(true);
    });

    convaiClient.current.onAudioStop(() => {
      setIsTalking(false);
      facialRef.current = [];
      setFacialData([]);
    });
  }, []);

  // Key press handlers for starting/stopping audio recording
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'KeyT' && !keyPressed) {
        e.preventDefault();
        setKeyPressed(true);
        finalizedUserText.current = '';
        npcTextRef.current = '';
        setUserText('');
        setNpcText('');
        convaiClient.current.startAudioChunk();
      }
    };

    const handleKeyRelease = (e) => {
      if (e.code === 'KeyT' && keyPressed) {
        e.preventDefault();
        setKeyPressed(false);
        convaiClient.current.endAudioChunk();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyRelease);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyRelease);
    };
  }, [keyPressed]);

  return {
    convaiClient: convaiClient.current,
    userText,
    setUserText,
    npcText,
    setNpcText,
    keyPressed,
    isTalking,
    facialData,
    actionText,
    userEndOfResponse,
    setUserEndOfResponse,
  };
};
