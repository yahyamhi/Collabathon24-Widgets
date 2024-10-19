// src/components/ConvAIAvatar.js

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AvatarModel from './AvatarModel';

const ConvAIAvatar = ({ isTalking, facialData, actionText, isExpanded }) => {
  // Adjust canvas size based on expansion
  const canvasStyle = isExpanded
    ? { height: '50%', width: '100%' } // Adjust as needed
    : { height: '200px', width: '200px' };

  // Adjust camera position
  const cameraPosition = isExpanded ? [0, 1, 2] : [0, 1, 3];

  return (
    <Canvas camera={{ position: cameraPosition }} style={canvasStyle}>
      <ambientLight intensity={0.5} />
      <AvatarModel
        isTalking={isTalking}
        facialData={facialData}
        actionText={actionText}
        isExpanded={isExpanded}
      />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default ConvAIAvatar;
