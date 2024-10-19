// src/components/AvatarModel.js

import React, { useEffect, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer } from 'three';

const AvatarModel = ({ isTalking, facialData, actionText, isExpanded }) => {
  const gltf = useLoader(GLTFLoader, '/anna/anna_animated.glb'); // Adjust the path as needed
  const modelRef = useRef();
  const mixerRef = useRef();
  const actionClipsRef = useRef({});
  const currentBlendFrame = useRef(0);

  // Define the viseme mapping
  const VisemeMapping = {
    0: 'viseme_sil',
    1: 'viseme_PP',
    2: 'viseme_FF',
    3: 'viseme_TH',
    4: 'viseme_DD',
    5: 'viseme_kk',
    6: 'viseme_CH',
    7: 'viseme_SS',
    8: 'viseme_NN',
    9: 'viseme_RR',
    10: 'viseme_AA',
    11: 'viseme_E',
    12: 'viseme_I',
    13: 'viseme_O',
    14: 'viseme_U',
  };

  useEffect(() => {
    if (gltf) {
      modelRef.current = gltf.scene;
      mixerRef.current = new AnimationMixer(gltf.scene);

      // Map animations
      gltf.animations.forEach((clip) => {
        actionClipsRef.current[clip.name.toLowerCase()] = clip;
      });
    }
  }, [gltf]);

  useEffect(() => {
    if (actionText && mixerRef.current) {
      const actionName = actionText[0].toLowerCase();
      const clip = actionClipsRef.current[actionName];
      if (clip) {
        playAnimation(clip);
      }
    }
  }, [actionText]);

  const playAnimation = (clip) => {
    if (mixerRef.current && clip) {
      mixerRef.current.stopAllAction();
      const action = mixerRef.current.clipAction(clip);
      action.reset();
      action.play();
    }
  };

  const applyVisemeFrame = (visemeFrame, model) => {
    model.traverse((child) => {
      if (child.isMesh && child.morphTargetDictionary) {
        for (let i = 0; i < visemeFrame.length; i++) {
          const morphTargetName = VisemeMapping[i];
          const morphTargetIndex = child.morphTargetDictionary[morphTargetName];
          if (morphTargetIndex !== undefined) {
            child.morphTargetInfluences[morphTargetIndex] = visemeFrame[i];
          }
        }
      }
    });
  };

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    // Apply viseme data for lip-syncing
    if (modelRef.current && facialData.length > 0) {
      const visemeFrame = facialData[currentBlendFrame.current];
      applyVisemeFrame(visemeFrame, modelRef.current);
      currentBlendFrame.current += 1;
      if (currentBlendFrame.current >= facialData.length) {
        currentBlendFrame.current = 0;
        facialData.splice(0, facialData.length); // Clear facialData array
      }
    }
  });

  // Adjust the scale based on whether the widget is expanded
  const modelScale = isExpanded ? [2, 2, 2] : [1.5, 1.5, 1.5];

  return modelRef.current ? (
    <primitive object={modelRef.current} scale={modelScale} />
  ) : null;
};

export default AvatarModel;
