import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div 
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-t-2xl bg-gray-100 dark:bg-gray-700 relative">
          <motion.img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          
          {/* Overlay gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <motion.span 
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                New
              </motion.span>
            )}
            {discountPercentage > 0 && (
              <motion.span 
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                -{discountPercentage}%
              </motion.span>
            )}
          </div>
        </div>
      </Link>
      
      {/* Wishlist button */}
      <motion.button 
        onClick={() => setIsWishlisted(!isWishlisted)}
        className={`absolute top-4 right-4 p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${
          isWishlisted 
            ? 'bg-red-500 text-white' 
            : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-red-500'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </motion.button>

      {/* Quick add to cart button */}
      <motion.button
        className="absolute bottom-20 right-4 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300"
        initial={{ opacity: 0, scale: 0, x: 20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0,
          x: isHovered ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ShoppingBag className="w-5 h-5" />
      </motion.button>

      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <motion.h3 
            className="text-lg font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {product.name}
          </motion.h3>
        </Link>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
              >
                <Star 
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300 dark:text-gray-600'
                  }`} 
                />
              </motion.div>
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{product.rating}</span>
            <span className="ml-1 text-sm text-gray-400 dark:text-gray-500">({product.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <motion.span 
              className="text-xl font-bold text-gray-900 dark:text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              ${product.price}
            </motion.span>
            {product.originalPrice && (
              <motion.span 
                className="text-sm text-gray-500 dark:text-gray-400 line-through"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                ${product.originalPrice}
              </motion.span>
            )}
          </div>
          
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <motion.div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm"
                style={{ 
                  backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                  color.toLowerCase() === 'black' ? '#000000' :
                                  color.toLowerCase() === 'blue' ? '#3b82f6' :
                                  color.toLowerCase() === 'light blue' ? '#93c5fd' :
                                  color.toLowerCase() === 'gray' ? '#6b7280' :
                                  color.toLowerCase() === 'navy' ? '#1e40af' :
                                  color.toLowerCase() === 'cream' ? '#fef3c7' :
                                  color.toLowerCase() === 'burgundy' ? '#7c2d12' :
                                  color.toLowerCase() === 'charcoal' ? '#374151' :
                                  color.toLowerCase() === 'brown' ? '#92400e' :
                                  color.toLowerCase() === 'floral' ? '#f3e8ff' :
                                  color.toLowerCase() === 'solid blue' ? '#3b82f6' :
                                  '#e5e7eb'
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        {/* Size indicators */}
        <motion.div 
          className="flex items-center space-x-1 opacity-60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {product.sizes.slice(0, 4).map((size, index) => (
            <span key={index} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {size}
            </span>
          ))}
          {product.sizes.length > 4 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">+{product.sizes.length - 4}</span>
          )}
        </motion.div>
      </div>

      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProductCard;