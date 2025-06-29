import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, RotateCcw, Shield, Plus, Minus, ArrowLeft, Check, Eye, Share2, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import VirtualTryOn from '../components/VirtualTryOn';
import SocialProof from '../components/SocialProof';
import AIRecommendations from '../components/AIRecommendations';
import Product3DViewer from '../components/Product3DViewer';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);
  const [show3DView, setShow3DView] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'recommendations'>('details');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    
    setIsAddingToCart(true);
    
    try {
      console.log('Adding to cart:', { product: product.name, selectedSize, selectedColor, quantity });
      addToCart(product, selectedSize, selectedColor, quantity);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-8 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </motion.button>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <Check className="w-5 h-5" />
              <span>Added to cart!</span>
              <button
                onClick={handleViewCart}
                className="underline hover:no-underline font-medium"
              >
                View Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 relative group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Image Overlay Actions */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  onClick={() => setShowVirtualTryOn(true)}
                  className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Eye className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </motion.button>
                
                <motion.button
                  onClick={() => setShow3DView(true)}
                  className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Zap className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </motion.button>
              </div>
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index ? 'border-blue-600 ring-2 ring-blue-200 dark:ring-blue-800' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}

            {/* 3D View Button */}
            <motion.button
              onClick={() => setShow3DView(true)}
              className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="w-5 h-5" />
              <span>View in 3D</span>
            </motion.button>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-full border-2 transition-all duration-300 ${
                    isWishlisted 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-500' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </motion.button>
                
                <motion.button
                  onClick={handleShare}
                  className="p-3 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-6 h-6" />
                </motion.button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 dark:text-gray-400 line-through ml-3">${product.originalPrice}</span>
                  <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full ml-3">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map(color => (
                  <motion.button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      selectedColor === color ? 'border-blue-600 ring-2 ring-blue-200 dark:ring-blue-800 scale-110' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
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
                    title={color}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
              {selectedColor && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Selected: {selectedColor}</p>
              )}
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Size</h3>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(size => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 border rounded-md text-sm font-medium transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 scale-105'
                        : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
              {selectedSize && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Selected: {selectedSize}</p>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <motion.button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.button>
                <span className="text-lg font-medium w-8 text-center text-gray-900 dark:text-white">{quantity}</span>
                <motion.button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-8">
              <motion.button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || isAddingToCart}
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  selectedSize && selectedColor && !isAddingToCart
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
                whileHover={selectedSize && selectedColor && !isAddingToCart ? { scale: 1.02 } : {}}
                whileTap={selectedSize && selectedColor && !isAddingToCart ? { scale: 0.98 } : {}}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
              </motion.button>

              <motion.button
                onClick={() => setShowVirtualTryOn(true)}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-5 h-5" />
                <span>Virtual Try-On</span>
              </motion.button>
            </div>

            {(!selectedSize || !selectedColor) && (
              <p className="text-red-500 text-sm text-center mb-6">
                Please select {!selectedSize && !selectedColor ? 'size and color' : !selectedSize ? 'size' : 'color'}
              </p>
            )}

            {/* Product Features */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Secure payment guaranteed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'details', label: 'Product Details' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'recommendations', label: 'You May Also Like' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Product Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Material:</span>
                    <span className="font-medium text-gray-900 dark:text-white">100% Cotton</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Care:</span>
                    <span className="font-medium text-gray-900 dark:text-white">Machine wash cold</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Origin:</span>
                    <span className="font-medium text-gray-900 dark:text-white">Made in USA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">SKU:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.id}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Size Guide</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Size chart coming soon...</p>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                    View detailed size guide
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SocialProof productId={product.id} />
            </motion.div>
          )}

          {activeTab === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AIRecommendations currentProduct={product} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Virtual Try-On Modal */}
      <VirtualTryOn
        product={product}
        isOpen={showVirtualTryOn}
        onClose={() => setShowVirtualTryOn(false)}
      />

      {/* 3D View Modal */}
      <AnimatePresence>
        {show3DView && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3D Product View</h2>
                <button
                  onClick={() => setShow3DView(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              
              <div className="p-6">
                <Product3DViewer
                  productName={product.name}
                  productImage={product.images[0]}
                  className="h-96"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;