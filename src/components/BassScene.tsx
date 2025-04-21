'use client';

import React from 'react';
import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';
import { OrbitControls, Float } from '@react-three/drei';
import { useTheme } from 'next-themes';

interface BassModelProps {
  position?: [number, number, number];
  rotationOffset?: number;
}

function BassModel({ position = [-3, 0, 0], rotationOffset = 0 }: BassModelProps) {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, '/bass.webp');
  const { theme } = useTheme();

  useFrame(state => {
    if (meshRef.current) {
      // Smooth floating animation with offset for variety
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4 + rotationOffset) * 0.1;
      // Gentle rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 + rotationOffset) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} scale={[3, 1, 1]} position={position}>
        <planeGeometry args={[1, 2.5]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0.9}
          emissive={[0.2, 1, 0]}
          emissiveIntensity={0.06}
          metalness={0.1}
          roughness={0.8}
          color={theme === 'dark' ? '#ffffff' : '#a1ff14'}
        />
      </mesh>
    </Float>
  );
}

export default function BassScene() {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
        />

        {/* Ambient light */}
        <ambientLight intensity={0.4} />

        {/* Main light */}
        <pointLight
          position={[5, 5, 5]}
          intensity={1}
          color={theme === 'dark' ? '#a1ff14' : '#ffffff'}
        />

        {/* Rim light */}
        <pointLight
          position={[-5, 3, -5]}
          intensity={0.4}
          color={theme === 'dark' ? '#a1ff14' : '#ffffff'}
        />

        {/* Ground light */}
        <pointLight
          position={[0, -3, 0]}
          intensity={0.2}
          color={theme === 'dark' ? '#a1ff14' : '#ffffff'}
        />

        {/* Left Bass */}
        <BassModel position={[-3.5, 0, 0]} rotationOffset={0} />

        {/* Right Bass */}
        <BassModel position={[3.5, 0, 0]} rotationOffset={Math.PI} />
      </Canvas>
    </div>
  );
}
