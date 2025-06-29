import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Sparkles, Heart, Star } from 'lucide-react';

interface QuotePageProps {
  onComplete?: () => void;
  duration?: number;
}

const QuotePage: React.FC<QuotePageProps> = ({ 
  onComplete, 
  duration = 4000 
}) => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    {
      text: "Fashion is the armor to survive the reality of everyday life.",
      author: "Bill Cunningham",
      category: "Style Philosophy"
    },
    {
      text: "Style is a way to say who you are without having to speak.",
      author: "Rachel Zoe",
      category: "Self Expression"
    },
    {
      text: "Fashion fades, but style is eternal.",
      author: "Yves Saint Laurent",
      category: "Timeless Wisdom"
    },
    {
      text: "Elegance is the only beauty that never fades.",
      author: "Audrey Hepburn",
      category: "Elegance"
    },
    {
      text: "Fashion is about dressing according to what's fashionable. Style is more about being yourself.",
      author: "Oscar de la Renta",
      category: "Authenticity"
    }
  ];

  useEffect(() => {
    // Randomly select a quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(randomIndex);

    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete, quotes.length]);

  const quote = quotes[currentQuote];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Sparkles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              rotate: 0
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
          </motion.div>
        ))}

        {/* Floating Hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              scale: 0
            }}
            animate={{
              y: -100,
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut"
            }}
          >
            <Heart className="w-3 h-3 text-pink-300" />
          </motion.div>
        ))}

        {/* Floating Stars */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              scale: [0, 1, 0.5, 1, 0],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0, 1, 0.7, 1, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: Math.random() * 2.5,
              ease: "easeInOut"
            }}
          >
            <Star className="w-3 h-3 text-yellow-300" />
          </motion.div>
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Quote Icon */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <Quote className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Quote Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.blockquote
              className="text-3xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              "{quote.text}"
            </motion.blockquote>

            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-xl md:text-2xl text-purple-200 font-medium">
                — {quote.author}
              </p>
              <p className="text-sm md:text-base text-purple-300/80 uppercase tracking-wider">
                {quote.category}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Decorative Elements */}
        <motion.div
          className="flex justify-center items-center space-x-4 mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
          <Sparkles className="w-6 h-6 text-purple-400" />
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        </motion.div>

        {/* StyleHub Branding */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="text-purple-200/60 text-sm md:text-base tracking-wider">
            STYLEHUB
          </p>
          <p className="text-purple-300/40 text-xs md:text-sm mt-1">
            Where Fashion Meets Innovation
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
            />
          </div>
          <p className="text-purple-200/60 text-xs mt-2">
            Preparing your experience...
          </p>
        </motion.div>
      </div>

      {/* Subtle Pulse Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10 rounded-full"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default QuotePage;