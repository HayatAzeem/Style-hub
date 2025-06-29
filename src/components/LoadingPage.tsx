import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Star, Heart } from 'lucide-react';

interface LoadingPageProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const LoadingPage: React.FC<LoadingPageProps> = ({ 
  onLoadingComplete, 
  duration = 3000 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Initializing StyleHub...",
    "Loading 3D experiences...",
    "Preparing your fashion journey...",
    "Almost ready..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete?.();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, duration / 50);

    return () => clearInterval(interval);
  }, [duration, onLoadingComplete]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, duration / 4);

    return () => clearInterval(textInterval);
  }, [duration, loadingTexts.length]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              y: [null, -100],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl"
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(147, 51, 234, 0.7)",
                "0 0 20px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              className="text-white font-bold text-3xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              S
            </motion.span>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            StyleHub
          </motion.h1>
          
          <motion.p
            className="text-blue-200 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Premium Fashion Experience
          </motion.p>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="mb-8 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentText}
              className="text-white/80 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {loadingTexts[currentText]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          
          <motion.p
            className="text-white/60 text-sm"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {progress}%
          </motion.p>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[Sparkles, Zap, Star, Heart].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${20 + index * 20}%`,
                top: `${30 + (index % 2) * 40}%`
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-6 h-6 text-white/30" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingPage;