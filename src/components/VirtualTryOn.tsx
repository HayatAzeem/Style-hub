import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RotateCcw, Download, Share2 } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

interface VirtualTryOnProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ product, isOpen, onClose }) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [poseData, setPoseData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      // Initialize pose detection
      initializePoseDetection();
    }
  }, [isOpen]);

  const initializePoseDetection = async () => {
    // Simulated pose detection initialization
    console.log('Initializing pose detection...');
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      setIsCapturing(true);
      
      // Simulate virtual try-on processing
      setTimeout(() => {
        setIsCapturing(false);
      }, 2000);
    }
  };

  const reset = () => {
    setCapturedImage(null);
    setIsCapturing(false);
  };

  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.download = `virtual-tryOn-${product.name}.jpg`;
      link.href = capturedImage;
      link.click();
    }
  };

  const shareImage = async () => {
    if (capturedImage && navigator.share) {
      try {
        const response = await fetch(capturedImage);
        const blob = await response.blob();
        const file = new File([blob], `virtual-tryOn-${product.name}.jpg`, { type: 'image/jpeg' });
        
        await navigator.share({
          title: `Virtual Try-On: ${product.name}`,
          text: 'Check out how this looks on me!',
          files: [file]
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Virtual Try-On</h2>
                <p className="text-gray-600">{product.name}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Camera Feed */}
                <div className="relative">
                  <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden relative">
                    {!capturedImage ? (
                      <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        className="w-full h-full object-cover"
                        mirrored
                      />
                    ) : (
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Overlay for pose guidance */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-48 h-64 border-2 border-white/50 rounded-full border-dashed"></div>
                      </div>
                    </div>

                    {/* Loading overlay */}
                    {isCapturing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4 mx-auto"></div>
                          <p>Processing Virtual Try-On...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Camera Controls */}
                  <div className="flex justify-center space-x-4 mt-4">
                    {!capturedImage ? (
                      <motion.button
                        onClick={capture}
                        className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Camera className="w-5 h-5" />
                        <span>Capture</span>
                      </motion.button>
                    ) : (
                      <div className="flex space-x-2">
                        <motion.button
                          onClick={reset}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Retake</span>
                        </motion.button>
                        
                        <motion.button
                          onClick={downloadImage}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </motion.button>
                        
                        <motion.button
                          onClick={shareImage}
                          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Info & Controls */}
                <div className="space-y-6">
                  <div>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="text-2xl font-bold text-blue-600">${product.price}</div>
                  </div>

                  {/* Size & Color Selection */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                      <div className="flex space-x-2">
                        {product.sizes.map((size: string) => (
                          <button
                            key={size}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                      <div className="flex space-x-2">
                        {product.colors.map((color: string) => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-colors"
                            style={{ backgroundColor: color.toLowerCase() }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AR Instructions */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">How to use Virtual Try-On:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Stand in good lighting</li>
                      <li>• Position yourself in the frame outline</li>
                      <li>• Keep your arms slightly away from your body</li>
                      <li>• Click capture when ready</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VirtualTryOn;