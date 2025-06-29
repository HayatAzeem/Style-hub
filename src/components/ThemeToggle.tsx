import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', size = 'md' }) => {
  const { theme, toggleTheme, isDark } = useTheme();

  const sizeClasses = {
    sm: 'w-12 h-6',
    md: 'w-14 h-7',
    lg: 'w-16 h-8'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative ${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Background track */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 dark:opacity-100 transition-opacity duration-300" />
      
      {/* Toggle circle */}
      <motion.div
        className="relative z-10 w-5 h-5 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center"
        animate={{
          x: isDark ? '100%' : '0%'
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      >
        <motion.div
          animate={{
            rotate: isDark ? 360 : 0,
            scale: isDark ? 1 : 1.1
          }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Moon className={`${iconSizes[size]} text-blue-400`} />
          ) : (
            <Sun className={`${iconSizes[size]} text-yellow-500`} />
          )}
        </motion.div>
      </motion.div>

      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className={`${iconSizes[size]} text-yellow-500 opacity-${isDark ? '30' : '0'} transition-opacity duration-300`} />
        <Moon className={`${iconSizes[size]} text-blue-400 opacity-${isDark ? '0' : '30'} transition-opacity duration-300`} />
      </div>
    </motion.button>
  );
};

export default ThemeToggle;