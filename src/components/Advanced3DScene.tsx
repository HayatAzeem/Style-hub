import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Float, 
  Text, 
  Center,
  Sparkles,
  Sphere,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Html,
  useTexture,
  Plane
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const FloatingProduct: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[1, 1, 1]} />
        <MeshWobbleMaterial
          color={hovered ? "#ff6b6b" : "#4ecdc4"}
          speed={2}
          factor={0.6}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const AnimatedSphere: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[0.8, 64, 64]}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0}
        metalness={0.8}
      />
    </Sphere>
  );
};

const Floating3DText: React.FC = () => {
  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <Center>
        <Text
          fontSize={1}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
        >
          StyleHub
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
        </Text>
      </Center>
    </Float>
  );
};

const ParticleField: React.FC = () => {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#60a5fa"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Advanced3DScene: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#ff6b6b" intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#4ecdc4" intensity={0.5} />

        <Environment preset="city" />
        
        <ParticleField />
        
        <FloatingProduct position={[-3, 0, 0]} />
        <AnimatedSphere position={[3, 0, 0]} />
        <Floating3DText />
        
        <Sparkles
          count={100}
          scale={[20, 20, 20]}
          size={2}
          speed={0.4}
          color="#fbbf24"
        />

        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <EffectComposer>
          <Bloom intensity={0.5} luminanceThreshold={0.9} />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default Advanced3DScene;