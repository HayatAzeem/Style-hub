import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Cylinder, 
  Torus, 
  Sphere, 
  MeshDistortMaterial,
  Html,
  Float,
  Environment
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const HolographicObject: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.8;
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={sphereRef} args={[0.8]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#00ffff"
            transparent
            opacity={0.7}
            distort={0.3}
            speed={2}
            roughness={0}
            metalness={1}
          />
        </Sphere>
      </Float>
      
      <Torus ref={torusRef} args={[1.5, 0.1, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ff00ff"
          transparent
          opacity={0.8}
          emissive="#ff00ff"
          emissiveIntensity={0.2}
        />
      </Torus>
      
      <Cylinder args={[0.05, 0.05, 4]} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial
          color="#ffff00"
          transparent
          opacity={0.6}
          emissive="#ffff00"
          emissiveIntensity={0.3}
        />
      </Cylinder>
    </group>
  );
};

const Holographic3DDisplay: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
      <Canvas camera={{ position: [0, 0, 5] }} className="rounded-xl">
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} color="#00ffff" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={1} />
        
        <Environment preset="night" />
        
        <HolographicObject />
        
        <Html center>
          <motion.div 
            className="text-center pointer-events-none"
            animate={{ 
              textShadow: [
                "0 0 10px #00ffff",
                "0 0 20px #ff00ff", 
                "0 0 10px #00ffff"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h3 className="text-white text-xl font-bold mb-2">Future Fashion</h3>
            <p className="text-cyan-300 text-sm">Experience Tomorrow</p>
          </motion.div>
        </Html>
      </Canvas>
    </motion.div>
  );
};

export default Holographic3DDisplay;