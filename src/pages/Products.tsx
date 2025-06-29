import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal, Sparkles, Eye, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import AdvancedFilters from '../components/AdvancedFilters';
import VirtualTryOn from '../components/VirtualTryOn';
import AIRecommendations from '../components/AIRecommendations';
import { products, categories } from '../data/products';
import { FilterOptions } from '../types';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: searchParams.get('category') || undefined,
    sortBy: 'name'
  });

  // Update filters when URL params change
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    setFilters(prev => ({
      ...prev,
      category: category || undefined,
      search: search || undefined
    }));
    
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (filters.search || searchQuery) {
      const searchTerm = (filters.search || searchQuery).toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange![0] && product.price <= filters.priceRange![1]
      );
    }

    // Size filter
    if (filters.sizes && filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => filters.sizes!.includes(size))
      );
    }

    // Color filter
    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => filters.colors!.includes(color))
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [filters, searchQuery]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleAdvancedFilters = (advancedFilters: any) => {
    setFilters(prev => ({ ...prev, ...advancedFilters }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchQuery }));
  };

  const handleVirtualTryOn = (product: any) => {
    setSelectedProduct(product);
    setShowVirtualTryOn(true);
  };

  const clearFilters = () => {
    setFilters({ sortBy: 'name' });
    setSearchQuery('');
  };

  const getPageTitle = () => {
    if (filters.search || searchQuery) {
      return `Search results for "${filters.search || searchQuery}"`;
    }
    if (filters.category) {
      const category = categories.find(c => c.id === filters.category);
      return category?.name || 'Products';
    }
    return 'All Products';
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category) count++;
    if (filters.search || searchQuery) count++;
    if (filters.priceRange) count++;
    if (filters.sizes?.length) count++;
    if (filters.colors?.length) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Basic Search */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </form>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <motion.h1 
              className="text-3xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {getPageTitle()}
            </motion.h1>
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {filteredProducts.length} products found
              {getActiveFilterCount() > 0 && ` with ${getActiveFilterCount()} filter${getActiveFilterCount() > 1 ? 's' : ''} applied`}
            </motion.p>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setShowAdvancedFilters(true)}
              className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Advanced Filters
              {getActiveFilterCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
            </motion.button>
            
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Quick Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 flex-shrink-0`}>
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Filters</h3>
                {getActiveFilterCount() > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value as FilterOptions['sortBy'] })}
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={!filters.category}
                      onChange={() => handleFilterChange({ category: undefined })}
                      className="mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">All Categories</span>
                  </label>
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === category.id}
                        onChange={() => handleFilterChange({ category: category.id })}
                        className="mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <h4 className="font-medium text-gray-900 dark:text-white">AI Suggestions</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <button className="block w-full text-left text-blue-600 hover:text-blue-700">
                    Similar to your recent views
                  </button>
                  <button className="block w-full text-left text-blue-600 hover:text-blue-700">
                    Trending in your size
                  </button>
                  <button className="block w-full text-left text-blue-600 hover:text-blue-700">
                    Perfect for the season
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div 
                key={viewMode}
                className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <ProductCard product={product} />
                    
                    {/* Virtual Try-On Button */}
                    <motion.button
                      onClick={() => handleVirtualTryOn(product)}
                      className="absolute top-4 left-4 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Eye className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* AI Recommendations Section */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <AIRecommendations />
        </motion.div>
      </div>

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApplyFilters={handleAdvancedFilters}
      />

      {/* Virtual Try-On Modal */}
      {selectedProduct && (
        <VirtualTryOn
          product={selectedProduct}
          isOpen={showVirtualTryOn}
          onClose={() => {
            setShowVirtualTryOn(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Products;