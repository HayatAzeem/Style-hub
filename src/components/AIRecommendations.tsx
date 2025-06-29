import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, User, Calendar, MapPin } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

interface AIRecommendationsProps {
  userId?: string;
  currentProduct?: any;
  className?: string;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  userId,
  currentProduct,
  className = ''
}) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'personal' | 'trending' | 'seasonal' | 'location'>('personal');

  useEffect(() => {
    generateRecommendations();
  }, [activeTab, currentProduct]);

  const generateRecommendations = async () => {
    setLoading(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let filtered = [...products];
    
    switch (activeTab) {
      case 'personal':
        // Simulate personalized recommendations based on user behavior
        filtered = products.filter(p => p.rating >= 4.5).slice(0, 4);
        break;
      case 'trending':
        // Show trending products
        filtered = products.filter(p => p.isFeatured).slice(0, 4);
        break;
      case 'seasonal':
        // Seasonal recommendations (simulate based on current date)
        const season = getCurrentSeason();
        filtered = getSeasonalProducts(season).slice(0, 4);
        break;
      case 'location':
        // Location-based recommendations (simulate)
        filtered = products.filter(p => p.category === 'outerwear').slice(0, 4);
        break;
    }
    
    setRecommendations(filtered);
    setLoading(false);
  };

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  };

  const getSeasonalProducts = (season: string) => {
    const seasonalCategories = {
      spring: ['tops', 'dresses'],
      summer: ['dresses', 'tops'],
      fall: ['outerwear', 'tops'],
      winter: ['outerwear', 'tops']
    };
    
    const categories = seasonalCategories[season as keyof typeof seasonalCategories] || ['tops'];
    return products.filter(p => categories.includes(p.category));
  };

  const tabs = [
    { id: 'personal', label: 'For You', icon: User, description: 'Based on your style' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, description: 'Popular right now' },
    { id: 'seasonal', label: 'Seasonal', icon: Calendar, description: 'Perfect for the season' },
    { id: 'location', label: 'Local Weather', icon: MapPin, description: 'Weather-appropriate' }
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300 ${className}`}>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Recommendations</h2>
          <p className="text-gray-600 dark:text-gray-400">Curated just for you</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-800 shadow-md text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:block">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Description */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </p>
      </div>

      {/* Recommendations Grid */}
      <div className="space-y-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 aspect-square rounded-xl mb-3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {recommendations.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* AI Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">AI Insight</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {activeTab === 'personal' && "Based on your browsing history, you prefer modern, minimalist styles with neutral colors."}
              {activeTab === 'trending' && "These items are trending 40% higher than last week among users with similar preferences."}
              {activeTab === 'seasonal' && `Perfect for ${getCurrentSeason()} weather. These items match the current season's trends.`}
              {activeTab === 'location' && "Based on your location's weather forecast, these items will keep you comfortable."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;