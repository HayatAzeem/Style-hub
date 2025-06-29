import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, MessageCircle, Share2, Camera, Users } from 'lucide-react';

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  rating: number;
  comment: string;
  images: string[];
  helpful: number;
  date: string;
  size: string;
  fit: 'tight' | 'perfect' | 'loose';
}

interface SocialProofProps {
  productId: string;
  className?: string;
}

const SocialProof: React.FC<SocialProofProps> = ({ productId, className = '' }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userPhotos, setUserPhotos] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'photos' | 'questions'>('reviews');
  const [sortBy, setSortBy] = useState<'newest' | 'helpful' | 'rating'>('newest');

  useEffect(() => {
    loadSocialProof();
  }, [productId, sortBy]);

  const loadSocialProof = () => {
    // Mock data - in real app, fetch from API
    const mockReviews: Review[] = [
      {
        id: '1',
        user: {
          name: 'Sarah Johnson',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
          verified: true
        },
        rating: 5,
        comment: 'Absolutely love this! The quality is amazing and it fits perfectly. I\'ve gotten so many compliments.',
        images: [
          'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        helpful: 24,
        date: '2024-01-15',
        size: 'M',
        fit: 'perfect'
      },
      {
        id: '2',
        user: {
          name: 'Emily Chen',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
          verified: true
        },
        rating: 4,
        comment: 'Great quality and fast shipping. The color is exactly as shown in the photos.',
        images: [],
        helpful: 18,
        date: '2024-01-12',
        size: 'S',
        fit: 'perfect'
      },
      {
        id: '3',
        user: {
          name: 'Jessica Williams',
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
          verified: false
        },
        rating: 5,
        comment: 'This exceeded my expectations! The material is so soft and comfortable.',
        images: [
          'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        helpful: 12,
        date: '2024-01-10',
        size: 'L',
        fit: 'loose'
      }
    ];

    const mockUserPhotos = [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300'
    ];

    setReviews(mockReviews);
    setUserPhotos(mockUserPhotos);
  };

  const getFitColor = (fit: string) => {
    switch (fit) {
      case 'tight': return 'text-red-600 bg-red-100';
      case 'perfect': return 'text-green-600 bg-green-100';
      case 'loose': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const tabs = [
    { id: 'reviews', label: 'Reviews', count: reviews.length },
    { id: 'photos', label: 'Photos', count: userPhotos.length },
    { id: 'questions', label: 'Q&A', count: 8 }
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-lg font-semibold">4.8</span>
            <span className="text-gray-500">({reviews.length} reviews)</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="font-medium">{tab.label}</span>
              <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Sort Options */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newest">Newest</option>
                    <option value="helpful">Most Helpful</option>
                    <option value="rating">Highest Rating</option>
                  </select>
                </div>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                  <span>Add Photo Review</span>
                </button>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    className="border border-gray-200 rounded-xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                            {review.user.verified && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Verified
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Size: {review.size}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getFitColor(review.fit)}`}>
                          Fit: {review.fit}
                        </span>
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    {/* Review Images */}
                    {review.images.length > 0 && (
                      <div className="flex space-x-2 mb-4">
                        {review.images.map((image, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={image}
                            alt={`Review ${imgIndex + 1}`}
                            className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </div>
                    )}

                    {/* Review Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">Helpful ({review.helpful})</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">Reply</span>
                        </button>
                      </div>
                      
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'photos' && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userPhotos.map((photo, index) => (
                  <motion.div
                    key={index}
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={photo}
                      alt={`User photo ${index + 1}`}
                      className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <Users className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12"
            >
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions & Answers</h3>
              <p className="text-gray-600 mb-6">Get answers from other customers and our team</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Ask a Question
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SocialProof;