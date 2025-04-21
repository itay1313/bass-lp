'use client';

import React from 'react';
import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';
import { useTheme } from 'next-themes';

interface BassModelProps {
  position?: [number, number, number];
  rotationOffset?: number;
}

function BassModel({ position = [-3, 0, 0], rotationOffset = 0 }: BassModelProps) {
  const meshRef = useRef<Mesh>(null);
  const texture = useLoader(TextureLoader, '/jelly.png');
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
    <mesh ref={meshRef} scale={[2.2, 1, 1]} position={position}>
      <planeGeometry args={[1, 2.5]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.9}
        emissive={[0.2, 1, 0]}
        emissiveIntensity={0.03}
        metalness={0.1}
        roughness={0.8}
        color={theme === 'dark' ? '#ffffff' : '#a1ff14'}
      />
    </mesh>
  );
}

export default function BassScene() {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 z-10">
      <Canvas camera={{ position: [0, 0, isMobile ? 4 : 5], fov: isMobile ? 45 : 50 }}>
        {/* Ambient light */}
        <ambientLight intensity={isMobile ? 0.6 : 0.4} />

        {/* Main light */}
        <pointLight
          position={[5, 5, 5]}
          intensity={isMobile ? 1.2 : 1}
          color={theme === 'dark' ? '#a1ff14' : '#ffffff'}
        />

        {/* Rim light */}
        <pointLight
          position={[-5, 3, -5]}
          intensity={isMobile ? 0.6 : 0.4}
          color={theme === 'dark' ? '#a1ff14' : '#ffffff'}
        />

        {/* Ground light */}
        <pointLight
          position={[0, -3, 0]}
          intensity={isMobile ? 0.4 : 0.2}
          color={theme === 'dark' ? '#a1ff14' : '#ffffff'}
        />

        {/* Bass Models */}
        {isMobile ? (
          <BassModel position={[0, 0, 0]} rotationOffset={0} />
        ) : (
          <>
            <BassModel position={[-3.5, 0, 0]} rotationOffset={0} />
            <BassModel position={[3.5, 0, 0]} rotationOffset={Math.PI} />
          </>
        )}
      </Canvas>
    </div>
  );
}
