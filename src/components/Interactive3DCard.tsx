import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Box, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface Interactive3DCardProps {
  title: string;
  description: string;
  color?: string;
  className?: string;
}

const Card3D: React.FC<{ color: string; hovered: boolean }> = ({ color, hovered }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Box ref={meshRef} args={[2, 2.5, 0.1]}>
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </Box>
      <Sphere position={[0, 0, 0.2]} args={[0.3]}>
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
};

const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  title,
  description,
  color = "#3b82f6",
  className = ""
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className={`relative h-64 rounded-xl overflow-hidden ${className}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Card3D color={color} hovered={hovered} />
      </Canvas>
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent">
        <motion.h3 
          className="text-white text-xl font-bold mb-2"
          animate={{ y: hovered ? -5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-white/80 text-sm"
          animate={{ y: hovered ? -5 : 0, opacity: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Interactive3DCard;