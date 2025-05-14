
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface BubbleProps {
  position: [number, number, number];
  color: string;
  size: number;
  onClick: (id: number) => void;
  id: number;
  burst: boolean;
}

const Bubble: React.FC<BubbleProps> = ({ position, color, size, onClick, id, burst }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    // More dramatic floating motion
    mesh.current.position.y += Math.sin(Date.now() * 0.001 + id * 0.5) * 0.003;
    mesh.current.position.x += Math.cos(Date.now() * 0.001 + id * 0.3) * 0.001;
    
    // Enhanced rotation for more 3D feeling
    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.005;
    mesh.current.rotation.z += 0.002;
    
    // Scale animation for burst effect
    if (burst) {
      mesh.current.scale.x += 0.08;
      mesh.current.scale.y += 0.08;
      mesh.current.scale.z += 0.08;
      
      // Type assertion to access the opacity property
      const material = mesh.current.material as THREE.MeshStandardMaterial;
      material.opacity -= 0.06;
    }
  });

  return (
    <mesh
      position={position}
      ref={mesh}
      onClick={() => onClick(id)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      visible={burst ? (mesh.current?.material as THREE.MeshStandardMaterial)?.opacity > 0 : true}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        color={hovered ? '#ffffff' : color} 
        transparent={true}
        opacity={1}
        roughness={0.2}
        metalness={0.8}
        envMapIntensity={1.5}
      />
    </mesh>
  );
};

interface BubbleBackgroundProps {
  theme: 'theme1' | 'theme2';
}

const BubbleBackground: React.FC<BubbleBackgroundProps> = ({ theme }) => {
  const [bubbles, setBubbles] = useState<Array<{
    id: number;
    position: [number, number, number];
    color: string;
    size: number;
    burst: boolean;
  }>>([]);

  const theme1Colors = useMemo(() => ['#8B5CF6', '#9b87f5', '#D3E4FD', '#a89af5'], []);
  const theme2Colors = useMemo(() => ['#F97316', '#FB923C', '#FFEDD5', '#fd9c41'], []);
  const colors = theme === 'theme1' ? theme1Colors : theme2Colors;

  // Generate initial bubbles
  useMemo(() => {
    const newBubbles = [];
    for (let i = 0; i < 40; i++) {
      newBubbles.push({
        id: i,
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 0.5 + 0.3,
        burst: false
      });
    }
    setBubbles(newBubbles);
  }, [colors, theme]);

  const handleBubbleClick = useCallback((id: number) => {
    setBubbles(prevBubbles => 
      prevBubbles.map(bubble => 
        bubble.id === id ? { ...bubble, burst: true } : bubble
      )
    );
    
    // Regenerate the bubble after 5 seconds
    setTimeout(() => {
      setBubbles(prevBubbles => 
        prevBubbles.map(bubble => 
          bubble.id === id ? {
            ...bubble,
            burst: false,
            position: [
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 25,
              (Math.random() - 0.5) * 25
            ],
            color: colors[Math.floor(Math.random() * colors.length)]
          } : bubble
        )
      );
    }, 5000);
  }, [colors]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1]">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <pointLight position={[0, 0, 10]} intensity={0.8} />
        
        <Environment preset="city" />
        
        {bubbles.map((bubble) => (
          <Bubble 
            key={bubble.id}
            id={bubble.id}
            position={bubble.position}
            color={bubble.color}
            size={bubble.size}
            onClick={handleBubbleClick}
            burst={bubble.burst}
          />
        ))}
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 2 - 0.6}
          maxPolarAngle={Math.PI / 2 + 0.6}
        />
      </Canvas>
    </div>
  );
};

export default BubbleBackground;
