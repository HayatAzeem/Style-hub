import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Sliders, 
  Palette,
  Ruler,
  DollarSign,
  Star,
  Calendar,
  Sparkles
} from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
  color?: string;
}

interface FilterSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  type: 'checkbox' | 'range' | 'color' | 'size' | 'rating';
  options?: FilterOption[];
  min?: number;
  max?: number;
  value?: any;
}

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  className?: string;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  className = ''
}) => {
  const [filters, setFilters] = useState<any>({});
  const [expandedSections, setExpandedSections] = useState<string[]>(['category', 'price']);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  const filterSections: FilterSection[] = [
    {
      id: 'category',
      title: 'Category',
      icon: Filter,
      type: 'checkbox',
      options: [
        { id: 'tops', label: 'Tops', count: 45 },
        { id: 'bottoms', label: 'Bottoms', count: 32 },
        { id: 'dresses', label: 'Dresses', count: 28 },
        { id: 'outerwear', label: 'Outerwear', count: 19 },
        { id: 'activewear', label: 'Activewear', count: 15 }
      ]
    },
    {
      id: 'price',
      title: 'Price Range',
      icon: DollarSign,
      type: 'range',
      min: 0,
      max: 500
    },
    {
      id: 'colors',
      title: 'Colors',
      icon: Palette,
      type: 'color',
      options: [
        { id: 'black', label: 'Black', color: '#000000', count: 23 },
        { id: 'white', label: 'White', color: '#FFFFFF', count: 19 },
        { id: 'blue', label: 'Blue', color: '#3B82F6', count: 15 },
        { id: 'red', label: 'Red', color: '#EF4444', count: 12 },
        { id: 'green', label: 'Green', color: '#10B981', count: 8 },
        { id: 'purple', label: 'Purple', color: '#8B5CF6', count: 6 },
        { id: 'yellow', label: 'Yellow', color: '#F59E0B', count: 4 },
        { id: 'pink', label: 'Pink', color: '#EC4899', count: 7 }
      ]
    },
    {
      id: 'sizes',
      title: 'Sizes',
      icon: Ruler,
      type: 'size',
      options: [
        { id: 'xs', label: 'XS', count: 12 },
        { id: 's', label: 'S', count: 28 },
        { id: 'm', label: 'M', count: 35 },
        { id: 'l', label: 'L', count: 31 },
        { id: 'xl', label: 'XL', count: 18 },
        { id: 'xxl', label: 'XXL', count: 8 }
      ]
    },
    {
      id: 'rating',
      title: 'Customer Rating',
      icon: Star,
      type: 'rating'
    },
    {
      id: 'availability',
      title: 'Availability',
      icon: Calendar,
      type: 'checkbox',
      options: [
        { id: 'in-stock', label: 'In Stock', count: 89 },
        { id: 'new-arrivals', label: 'New Arrivals', count: 12 },
        { id: 'on-sale', label: 'On Sale', count: 23 },
        { id: 'limited-edition', label: 'Limited Edition', count: 5 }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleFilterChange = (sectionId: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [sectionId]: value
    }));
  };

  const handleColorToggle = (colorId: string) => {
    setSelectedColors(prev =>
      prev.includes(colorId)
        ? prev.filter(id => id !== colorId)
        : [...prev, colorId]
    );
  };

  const handleSizeToggle = (sizeId: string) => {
    setSelectedSizes(prev =>
      prev.includes(sizeId)
        ? prev.filter(id => id !== sizeId)
        : [...prev, sizeId]
    );
  };

  const clearAllFilters = () => {
    setFilters({});
    setPriceRange([0, 500]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setMinRating(0);
  };

  const applyFilters = () => {
    const appliedFilters = {
      ...filters,
      priceRange,
      colors: selectedColors,
      sizes: selectedSizes,
      minRating
    };
    onApplyFilters(appliedFilters);
    onClose();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (Object.keys(filters).length > 0) count += Object.keys(filters).length;
    if (selectedColors.length > 0) count += 1;
    if (selectedSizes.length > 0) count += 1;
    if (minRating > 0) count += 1;
    if (priceRange[0] > 0 || priceRange[1] < 500) count += 1;
    return count;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Filter Panel */}
          <motion.div
            className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto ${className}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Sliders className="w-6 h-6 text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                  {getActiveFilterCount() > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {getActiveFilterCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Filter Sections */}
            <div className="p-6 space-y-6">
              {filterSections.map((section, index) => {
                const Icon = section.icon;
                const isExpanded = expandedSections.includes(section.id);

                return (
                  <motion.div
                    key={section.id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">{section.title}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {/* Section Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          className="border-t border-gray-200"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-4">
                            {/* Checkbox Options */}
                            {section.type === 'checkbox' && section.options && (
                              <div className="space-y-3">
                                {section.options.map((option) => (
                                  <label
                                    key={option.id}
                                    className="flex items-center justify-between cursor-pointer group"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        onChange={(e) => {
                                          const currentValues = filters[section.id] || [];
                                          const newValues = e.target.checked
                                            ? [...currentValues, option.id]
                                            : currentValues.filter((id: string) => id !== option.id);
                                          handleFilterChange(section.id, newValues);
                                        }}
                                      />
                                      <span className="text-gray-700 group-hover:text-gray-900">
                                        {option.label}
                                      </span>
                                    </div>
                                    {option.count && (
                                      <span className="text-sm text-gray-500">({option.count})</span>
                                    )}
                                  </label>
                                ))}
                              </div>
                            )}

                            {/* Price Range */}
                            {section.type === 'range' && (
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600">
                                    ${priceRange[0]} - ${priceRange[1]}
                                  </span>
                                </div>
                                <div className="relative">
                                  <input
                                    type="range"
                                    min={section.min}
                                    max={section.max}
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Min</label>
                                    <input
                                      type="number"
                                      value={priceRange[0]}
                                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">Max</label>
                                    <input
                                      type="number"
                                      value={priceRange[1]}
                                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Color Options */}
                            {section.type === 'color' && section.options && (
                              <div className="grid grid-cols-4 gap-3">
                                {section.options.map((color) => (
                                  <button
                                    key={color.id}
                                    onClick={() => handleColorToggle(color.id)}
                                    className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                                      selectedColors.includes(color.id)
                                        ? 'border-blue-500 ring-2 ring-blue-200'
                                        : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    style={{ backgroundColor: color.color }}
                                    title={color.label}
                                  >
                                    {selectedColors.includes(color.id) && (
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                      </div>
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Size Options */}
                            {section.type === 'size' && section.options && (
                              <div className="grid grid-cols-3 gap-2">
                                {section.options.map((size) => (
                                  <button
                                    key={size.id}
                                    onClick={() => handleSizeToggle(size.id)}
                                    className={`py-2 px-4 border rounded-lg text-sm font-medium transition-all duration-300 ${
                                      selectedSizes.includes(size.id)
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                    }`}
                                  >
                                    {size.label}
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Rating */}
                            {section.type === 'rating' && (
                              <div className="space-y-3">
                                {[4, 3, 2, 1].map((rating) => (
                                  <button
                                    key={rating}
                                    onClick={() => setMinRating(rating)}
                                    className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                                      minRating === rating ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                                    }`}
                                  >
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-gray-700">& up</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
              <div className="flex space-x-3">
                <button
                  onClick={clearAllFilters}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Clear All
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Apply Filters</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdvancedFilters;