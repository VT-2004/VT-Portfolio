
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Import images directly rather than using useTexture
import sharinganImg from '/sharingan.png';
import mangekyoImg from '/mangekyo.png';

interface SharinganProps {
  position: [number, number, number];
  activateMangekyoEffect: boolean;
}

const Sharingan: React.FC<SharinganProps> = ({ position, activateMangekyoEffect }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [sharinganTexture] = useState(() => new THREE.TextureLoader().load(sharinganImg));
  const [mangekyoTexture] = useState(() => new THREE.TextureLoader().load(mangekyoImg));
  
  useFrame((state) => {
    if (!mesh.current) return;
    
    // Regular rotation
    mesh.current.rotation.z -= 0.005;
    
    // Mangekyo effect animation
    if (activateMangekyoEffect) {
      mesh.current.rotation.z -= 0.02;
      
      // Pulse effect during Mangekyo activation
      const pulseEffect = Math.sin(state.clock.elapsedTime * 5) * 0.1 + 1;
      mesh.current.scale.set(pulseEffect, pulseEffect, 1);
    } else {
      // Normal subtle floating motion when not in Mangekyo mode
      mesh.current.position.y += Math.sin(state.clock.elapsedTime) * 0.0005;
    }
  });

  return (
    <mesh position={position} ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial 
        map={activateMangekyoEffect ? mangekyoTexture : sharinganTexture}
        transparent={true}
        depthWrite={false}
        side={THREE.DoubleSide}
        emissive={"red"}
        emissiveIntensity={activateMangekyoEffect ? 2 : 0.5}
      />
    </mesh>
  );
};

const FloatingCrows = () => {
  const group = useRef<THREE.Group>(null);
  const crowCount = 20;
  const crows = Array.from({ length: crowCount }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10 - 5
    ] as [number, number, number],
    speed: Math.random() * 0.02 + 0.01
  }));
  
  useFrame(() => {
    if (!group.current) return;
    
    // Make crows fly in a pattern
    group.current.children.forEach((crow, i) => {
      crow.position.x -= crows[i].speed;
      
      // Reset position when crow flies out of view
      if (crow.position.x < -15) {
        crow.position.x = 15;
        crow.position.y = (Math.random() - 0.5) * 15;
      }
      
      // Flapping motion
      crow.rotation.z = Math.sin(Date.now() * 0.01 + i) * 0.2;
    });
  });
  
  return (
    <group ref={group}>
      {crows.map((crow) => (
        <mesh key={crow.id} position={crow.position}>
          <boxGeometry args={[0.3, 0.05, 0.3]} />
          <meshStandardMaterial color="black" />
        </mesh>
      ))}
    </group>
  );
};

interface ItachiBackgroundProps {
  isMusicEnabled: boolean;
  toggleMusic: () => void;
}

const ItachiBackgroundScene: React.FC<ItachiBackgroundProps> = ({ isMusicEnabled, toggleMusic }) => {
  const [activateMangekyoEffect, setActivateMangekyoEffect] = useState(false);
  
  useEffect(() => {
    // Activate Mangekyo Sharingan effect every 30 seconds
    const interval = setInterval(() => {
      setActivateMangekyoEffect(true);
      
      // Reset after 5 seconds
      setTimeout(() => {
        setActivateMangekyoEffect(false);
      }, 5000);
    }, 30000);
    
    // Initial activation after 5 seconds
    const initialTimeout = setTimeout(() => {
      setActivateMangekyoEffect(true);
      setTimeout(() => {
        setActivateMangekyoEffect(false);
      }, 5000);
    }, 5000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);
  
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <fog attach="fog" args={['#000', 5, 30]} />
      
      {/* Main Sharingan */}
      <Sharingan 
        position={[0, 0, -2]} 
        activateMangekyoEffect={activateMangekyoEffect} 
      />
      
      {/* Additional smaller Sharingans */}
      <Sharingan 
        position={[-8, 5, -5]} 
        activateMangekyoEffect={activateMangekyoEffect} 
      />
      <Sharingan 
        position={[8, -5, -5]} 
        activateMangekyoEffect={activateMangekyoEffect} 
      />
      
      {/* Add flying crows */}
      <FloatingCrows />
      
      {/* Red clouds (Akatsuki) */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 20, 
            (Math.random() - 0.5) * 15, 
            -10
          ]}
        >
          <sphereGeometry args={[1 + Math.random() * 2, 32, 32]} />
          <meshStandardMaterial 
            color="#8a0303" 
            opacity={0.6} 
            transparent={true} 
            emissive="#ff0000"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 2 - 0.3}
        maxPolarAngle={Math.PI / 2 + 0.3}
      />
    </>
  );
};

const ItachiBackground: React.FC = () => {
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/itachi-theme.mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isMusicEnabled) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.log("Audio playback failed:", err);
      });
    }
    
    setIsMusicEnabled(!isMusicEnabled);
  };
  
  useEffect(() => {
    // Handle audio playback based on state
    if (!audioRef.current) return;
    
    if (isMusicEnabled) {
      audioRef.current.play().catch(err => {
        console.log("Audio playback failed:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isMusicEnabled]);
  
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1]">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ItachiBackgroundScene isMusicEnabled={isMusicEnabled} toggleMusic={toggleMusic} />
      </Canvas>
      
      {/* Audio control button */}
      <button
        onClick={toggleMusic}
        className={`fixed bottom-20 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
          isMusicEnabled 
            ? 'bg-red-600 text-white' 
            : 'bg-gray-800 text-gray-200'
        }`}
      >
        {isMusicEnabled ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="22" y1="9" x2="16" y2="15"></line>
            <line x1="16" y1="9" x2="22" y2="15"></line>
          </svg>
        )}
      </button>
    </div>
  );
};

export default ItachiBackground;
