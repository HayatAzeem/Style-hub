import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  ContactShadows,
  Html,
  Float
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import * as THREE from 'three';

interface Product3DViewerProps {
  productName: string;
  productImage: string;
  className?: string;
}

const Product3DModel: React.FC<{ color: string }> = ({ color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1.2, 2, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Product details overlay */}
      <Html position={[0, 2, 0]} center>
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm font-medium text-gray-800">Premium Quality</p>
          <p className="text-xs text-gray-600">360° View Available</p>
        </motion.div>
      </Html>
    </Float>
  );
};

const Product3DViewer: React.FC<Product3DViewerProps> = ({
  productName,
  productImage,
  className = ""
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const controlsRef = useRef<any>();

  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <motion.div 
      className={`relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden ${className}`}
      layout
      animate={{ 
        height: isFullscreen ? '80vh' : '400px',
        width: isFullscreen ? '80vw' : '100%'
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <motion.button
          onClick={resetCamera}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <RotateCcw className="w-4 h-4 text-gray-700" />
        </motion.button>
        
        <motion.button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-gray-700" />
          ) : (
            <Maximize2 className="w-4 h-4 text-gray-700" />
          )}
        </motion.button>
      </div>

      {/* Color Selector */}
      <div className="absolute bottom-4 left-4 z-10 flex space-x-2">
        {colors.map((color, index) => (
          <motion.button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full border-2 ${
              selectedColor === color ? 'border-white shadow-lg' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>

      {/* Product Info */}
      <div className="absolute bottom-4 right-4 z-10">
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-semibold text-gray-800 text-sm">{productName}</h3>
          <p className="text-xs text-gray-600">Interactive 3D Model</p>
        </motion.div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={0.3} />

        <Environment preset="studio" />
        
        <Product3DModel color={selectedColor} />
        
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={5}
          blur={2}
          far={4}
        />

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          maxDistance={8}
          minDistance={3}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>

      {/* Loading overlay */}
      <AnimatePresence>
        <motion.div
          className="absolute inset-0 bg-gray-100 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{ pointerEvents: 'none' }}
        >
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading 3D Model...</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Product3DViewer;