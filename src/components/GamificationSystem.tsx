import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Gift, 
  Target, 
  Zap, 
  Crown, 
  Medal,
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  progress: number;
  maxProgress: number;
  reward: string;
  unlocked: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  deadline: string;
  progress: number;
  maxProgress: number;
  type: 'daily' | 'weekly' | 'monthly';
}

interface GamificationSystemProps {
  userId?: string;
  className?: string;
}

const GamificationSystem: React.FC<GamificationSystemProps> = ({ userId, className = '' }) => {
  const [userLevel, setUserLevel] = useState(12);
  const [userXP, setUserXP] = useState(2450);
  const [nextLevelXP] = useState(3000);
  const [stylePoints, setStylePoints] = useState(1250);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'challenges' | 'leaderboard'>('overview');
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [newReward, setNewReward] = useState<any>(null);

  useEffect(() => {
    loadGamificationData();
  }, []);

  const loadGamificationData = () => {
    // Mock achievements
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'Fashion Explorer',
        description: 'Browse 100 different products',
        icon: Target,
        progress: 87,
        maxProgress: 100,
        reward: '50 Style Points',
        unlocked: false,
        rarity: 'common'
      },
      {
        id: '2',
        title: 'Style Influencer',
        description: 'Get 10 likes on your outfit posts',
        icon: Star,
        progress: 10,
        maxProgress: 10,
        reward: 'Exclusive Badge',
        unlocked: true,
        rarity: 'rare'
      },
      {
        id: '3',
        title: 'Trendsetter',
        description: 'Be among the first 100 to buy a new arrival',
        icon: TrendingUp,
        progress: 3,
        maxProgress: 5,
        reward: '15% Discount Coupon',
        unlocked: false,
        rarity: 'epic'
      },
      {
        id: '4',
        title: 'Fashion Royalty',
        description: 'Reach VIP status',
        icon: Crown,
        progress: 1,
        maxProgress: 1,
        reward: 'VIP Access',
        unlocked: true,
        rarity: 'legendary'
      }
    ];

    // Mock challenges
    const mockChallenges: Challenge[] = [
      {
        id: '1',
        title: 'Daily Style Check',
        description: 'Browse at least 5 products today',
        reward: 25,
        deadline: '2024-01-20',
        progress: 3,
        maxProgress: 5,
        type: 'daily'
      },
      {
        id: '2',
        title: 'Weekly Shopper',
        description: 'Make a purchase this week',
        reward: 100,
        deadline: '2024-01-21',
        progress: 0,
        maxProgress: 1,
        type: 'weekly'
      },
      {
        id: '3',
        title: 'Social Butterfly',
        description: 'Share 3 products on social media',
        reward: 75,
        deadline: '2024-01-25',
        progress: 1,
        maxProgress: 3,
        type: 'weekly'
      }
    ];

    setAchievements(mockAchievements);
    setChallenges(mockChallenges);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-green-100 text-green-800';
      case 'weekly': return 'bg-blue-100 text-blue-800';
      case 'monthly': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Trophy },
    { id: 'achievements', label: 'Achievements', icon: Medal },
    { id: 'challenges', label: 'Challenges', icon: Target },
    { id: 'leaderboard', label: 'Leaderboard', icon: Users }
  ];

  return (
    <div className={`bg-white rounded-2xl shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Style Rewards</h2>
              <p className="text-gray-600">Level {userLevel} Fashion Enthusiast</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{stylePoints}</div>
            <div className="text-sm text-gray-600">Style Points</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Level Progress</span>
            <span className="text-sm text-gray-600">{userXP} / {nextLevelXP} XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(userXP / nextLevelXP) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-all duration-300 ${
                activeTab === tab.id
                  ? 'border-b-2 border-purple-500 text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium hidden sm:block">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <Star className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="text-2xl font-bold text-blue-900">{achievements.filter(a => a.unlocked).length}</div>
                      <div className="text-sm text-blue-700">Achievements</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <Target className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="text-2xl font-bold text-green-900">{challenges.length}</div>
                      <div className="text-sm text-green-700">Active Challenges</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <Crown className="w-8 h-8 text-purple-600" />
                    <div>
                      <div className="text-2xl font-bold text-purple-900">VIP</div>
                      <div className="text-sm text-purple-700">Status</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <Gift className="w-8 h-8 text-orange-600" />
                    <div>
                      <div className="text-2xl font-bold text-orange-900">3</div>
                      <div className="text-sm text-orange-700">Rewards</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  {achievements.filter(a => a.unlocked).slice(0, 2).map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <motion.div
                        key={achievement.id}
                        className={`p-4 rounded-xl bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-8 h-8" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <p className="text-sm opacity-90">{achievement.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm opacity-90">Reward</div>
                            <div className="font-semibold">{achievement.reward}</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.id}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        achievement.unlocked
                          ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white border-transparent`
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl ${achievement.unlocked ? 'bg-white/20' : 'bg-gray-200'}`}>
                          <Icon className={`w-6 h-6 ${achievement.unlocked ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-gray-900'}`}>
                              {achievement.title}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              achievement.unlocked 
                                ? 'bg-white/20 text-white' 
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {achievement.rarity}
                            </span>
                          </div>
                          
                          <p className={`text-sm mb-3 ${achievement.unlocked ? 'text-white/90' : 'text-gray-600'}`}>
                            {achievement.description}
                          </p>
                          
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs ${achievement.unlocked ? 'text-white/80' : 'text-gray-500'}`}>
                                Progress
                              </span>
                              <span className={`text-xs ${achievement.unlocked ? 'text-white' : 'text-gray-700'}`}>
                                {achievement.progress} / {achievement.maxProgress}
                              </span>
                            </div>
                            <div className={`w-full h-2 rounded-full ${achievement.unlocked ? 'bg-white/20' : 'bg-gray-200'}`}>
                              <div
                                className={`h-2 rounded-full ${achievement.unlocked ? 'bg-white' : 'bg-purple-500'}`}
                                style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className={`text-sm ${achievement.unlocked ? 'text-white' : 'text-gray-700'}`}>
                            <strong>Reward:</strong> {achievement.reward}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    className="p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(challenge.type)}`}>
                            {challenge.type}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{challenge.description}</p>
                        <div className="text-sm text-gray-500">
                          Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Zap className="w-5 h-5 text-yellow-500" />
                          <span className="text-lg font-bold text-gray-900">{challenge.reward}</span>
                          <span className="text-sm text-gray-600">SP</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-gray-900">
                          {challenge.progress} / {challenge.maxProgress}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center py-12"
            >
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Style Leaderboard</h3>
              <p className="text-gray-600 mb-6">See how you rank among fashion enthusiasts</p>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                View Leaderboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && newReward && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="mb-6">
                <Sparkles className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
                <p className="text-gray-600">You've earned a new reward!</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{newReward?.title}</h3>
                <p className="text-gray-600">{newReward?.description}</p>
              </div>
              
              <button
                onClick={() => setShowRewardModal(false)}
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Claim Reward
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GamificationSystem;