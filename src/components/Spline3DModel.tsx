import React, { Suspense, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

interface Spline3DModelProps {
  scene: string;
  className?: string;
  fallbackContent?: React.ReactNode;
  onLoad?: () => void;
  onError?: (error: any) => void;
}

const Spline3DModel: React.FC<Spline3DModelProps> = ({
  scene,
  className = '',
  fallbackContent,
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = (error: any) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(error);
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 ${className}`}>
        {fallbackContent || (
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">3D</span>
            </div>
            <p className="text-gray-600">3D Model Loading...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 z-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading 3D Experience...</p>
          </div>
        </motion.div>
      )}
      
      <Suspense fallback={null}>
        <Spline
          scene={scene}
          onLoad={handleLoad}
          onError={handleError}
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
    </div>
  );
};

export default Spline3DModel;