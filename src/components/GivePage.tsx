import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Gift, Sparkles, ArrowLeft, Target, PartyPopper, Cake } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';
import { SponsorshipModal } from './SponsorshipModal';
import { ER100SponsorshipModal } from './ER100SponsorshipModal';
import { GlowfestSponsorshipModal } from './GlowfestSponsorshipModal';
import { PartyInitiativeSponsorshipModal } from './PartyInitiativeSponsorshipModal';

interface GivePageProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

export function GivePage({ onBack, onNavigate }: GivePageProps) {
  const { user } = useAuth();
  
  // Modal states
  const [showSponsorshipModal, setShowSponsorshipModal] = useState(false);
  const [showER100Modal, setShowER100Modal] = useState(false);
  const [showGlowfestModal, setShowGlowfestModal] = useState(false);
  const [showPartyModal, setShowPartyModal] = useState(false);
  
  // Selected tier states
  const [selectedSponsorshipTier, setSelectedSponsorshipTier] = useState<string | null>(null);
  const [selectedER100Tier, setSelectedER100Tier] = useState<string | null>(null);
  const [selectedGlowfestTier, setSelectedGlowfestTier] = useState<string | null>(null);
  const [selectedPartyTier, setSelectedPartyTier] = useState<string | null>(null);
  
  // Sponsorship type states
  const [er100SponsorshipType, setER100SponsorshipType] = useState<'parent' | 'kid'>('parent');
  const [partyProgramType, setPartyProgramType] = useState<'full-party' | 'spread-love' | null>(null);

  const isKid = user?.type === 'kid';

  // HTTN Magazine Sponsorship Tiers
  const httnSponsorships = [
    {
      id: 'starter',
      name: 'STARTER',
      emoji: '⭐',
      espees: '10 ESPEES',
      reach: '10 children',
      gradient: 'from-[#60A5FA] to-[#93C5FD]',
    },
    {
      id: 'house',
      name: 'MEMBER OF HOUSE',
      emoji: '🏠',
      espees: '50 ESPEES',
      reach: '50 children',
      gradient: 'from-[#A78BFA] to-[#C4B5FD]',
    },
    {
      id: 'prince',
      name: 'PRINCE/PRINCESS',
      emoji: '👑',
      espees: '100 ESPEES',
      reach: '100 children',
      gradient: 'from-[#F472B6] to-[#FBCFE8]',
    },
    {
      id: 'duke',
      name: 'DUKE/DUCHESS',
      emoji: '💎',
      espees: '200 ESPEES',
      reach: '200 children',
      gradient: 'from-[#34D399] to-[#6EE7B7]',
    },
  ];

  // ER100 Parent Sponsorship Tiers
  const er100ParentSponsorships = [
    {
      id: 'er100-starter',
      title: 'Starter',
      emoji: '⭐',
      espees: '10 ESPEES',
      reach: '10 Kids',
      gradient: 'from-[#60A5FA] to-[#93C5FD]',
    },
    {
      id: 'er100-house',
      title: 'Member of House',
      emoji: '🏠',
      espees: '50 ESPEES',
      reach: '50 Kids',
      gradient: 'from-[#A78BFA] to-[#C4B5FD]',
    },
    {
      id: 'er100-prince',
      title: 'Prince/Princess',
      emoji: '👑',
      espees: '100 ESPEES',
      reach: '100 Kids',
      gradient: 'from-[#F472B6] to-[#FBCFE8]',
    },
    {
      id: 'er100-duke',
      title: 'Duke/Duchess',
      emoji: '💎',
      espees: '200 ESPEES',
      reach: '200 Kids',
      gradient: 'from-[#34D399] to-[#6EE7B7]',
    },
  ];

  // ER100 Kids CHAMP Sponsorship Tiers
  const er100KidSponsorships = [
    {
      id: 'kid-mighty',
      title: 'A Mighty Champ',
      emoji: '💪',
      copies: '100 - 200 Copies',
      gradient: 'from-[#3B82F6] to-[#60A5FA]',
    },
    {
      id: 'kid-noble',
      title: 'A Noble Champ',
      emoji: '🎖️',
      copies: '201 - 400 Copies',
      gradient: 'from-[#8B5CF6] to-[#A78BFA]',
    },
    {
      id: 'kid-royal',
      title: 'A Royal Champ',
      emoji: '👑',
      copies: '401 - 700 Copies',
      gradient: 'from-[#EC4899] to-[#F472B6]',
    },
    {
      id: 'kid-diamond',
      title: 'A Diamond Champ',
      emoji: '💎',
      copies: '701 - 999 Copies',
      gradient: 'from-[#06B6D4] to-[#22D3EE]',
    },
  ];

  // Glowfest Sponsorships
  const glowfestSponsorships = [
    {
      id: 'er100',
      name: 'ER100 SPONSORSHIP',
      emoji: '🎯',
      espees: 'Applicable',
      description: 'Support the Everyone Reach 100 campaign',
      gradient: 'from-[#FF6B9D] to-[#F472B6]',
    },
    {
      id: 'crusade',
      name: 'CRUSADE SPONSORSHIP',
      emoji: '⛪',
      espees: '4,000 ESPEES',
      description: 'Fund healing crusades for children',
      gradient: 'from-[#9B4DFF] to-[#C77DFF]',
    },
    {
      id: 'outreach',
      name: 'OUTREACH SPONSORSHIP',
      emoji: '🤝',
      espees: '2,000 ESPEES',
      description: 'Enable community outreach programs',
      gradient: 'from-[#4ECDC4] to-[#00D4FF]',
    },
    {
      id: 'missions',
      name: 'MISSIONS SPONSORSHIP',
      emoji: '🌍',
      espees: '3,000 ESPEES',
      description: 'Support global missions initiatives',
      gradient: 'from-[#FFA500] to-[#FFD41F]',
    },
  ];

  // Party Initiative - Full Party Tiers
  const fullPartyTiers = [
    {
      id: 'party-50',
      children: '50 Children',
      espees: '1,000 ESPEES',
      icon: '🎉',
      gradient: 'from-[#FF6B9D] to-[#F472B6]',
      description: 'Full party package for 50 amazing kids',
    },
    {
      id: 'party-100',
      children: '100 Children',
      espees: '2,000 ESPEES',
      icon: '🎊',
      gradient: 'from-[#9B4DFF] to-[#C77DFF]',
      description: 'Celebrate 100 children with joy and love',
    },
  ];

  // Party Initiative - Spread Love Tiers
  const spreadLoveTiers = [
    {
      id: 'love-50',
      children: '50 Children',
      espees: '500 ESPEES',
      icon: '💝',
      gradient: 'from-[#FF6B9D] to-[#F472B6]',
      description: 'Gift packages with HTTN Magazine',
    },
    {
      id: 'love-100',
      children: '100 Children',
      espees: '1,000 ESPEES',
      icon: '💖',
      gradient: 'from-[#9B4DFF] to-[#C77DFF]',
      description: 'Spread love to 100 kids on birthdays',
    },
  ];

  const handleHTTNSponsorClick = (tierId: string) => {
    setSelectedSponsorshipTier(tierId);
    setShowSponsorshipModal(true);
  };

  const handleER100Click = (tierId: string, type: 'parent' | 'kid') => {
    setSelectedER100Tier(tierId);
    setER100SponsorshipType(type);
    setShowER100Modal(true);
  };

  const handleGlowfestClick = (tierId: string) => {
    setSelectedGlowfestTier(tierId);
    setShowGlowfestModal(true);
  };

  const handlePartyClick = (tierId: string, type: 'full-party' | 'spread-love') => {
    setSelectedPartyTier(tierId);
    setPartyProgramType(type);
    setShowPartyModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden pt-32 pb-20">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF6B9D]/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#A78BFA]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#4ECDC4]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Back Button */}
        {onBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </motion.button>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-12 h-12 text-pink-500" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-5xl sm:text-6xl font-extrabold">
              Give & Sponsor
            </h1>
            <Gift className="w-12 h-12 text-purple-500" />
          </div>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-xl">
            Support our mission to reach every child with the Gospel. Choose from our various sponsorship options below.
          </p>
        </motion.div>

        {/* HTTN Magazine Sponsorship Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-purple-200">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-purple-500" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">
                HTTN Magazine Sponsorship
              </h2>
              <Sparkles className="w-8 h-8 text-pink-500" />
            </div>
            <p className="text-gray-600 text-center mb-8 text-lg">
              Sponsor Healing to the Nations Magazine to reach children with God's Word
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {httnSponsorships.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-purple-400 hover:shadow-xl transition-all"
                >
                  <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${tier.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                    {tier.emoji}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 text-center mb-2">{tier.name}</h3>
                  <p className={`text-center font-bold mb-1 bg-gradient-to-r ${tier.gradient} text-transparent bg-clip-text`}>
                    {tier.espees}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm text-center mb-4">Reach: {tier.reach}</p>
                  <button
                    onClick={() => handleHTTNSponsorClick(tier.id)}
                    className={`w-full px-4 py-2 bg-gradient-to-r ${tier.gradient} text-white rounded-full hover:shadow-lg transition-all font-bold text-sm transform hover:scale-105`}
                  >
                    Sponsor Now
                  </button>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setSelectedSponsorshipTier(null);
                  setShowSponsorshipModal(true);
                }}
                className="text-purple-600 hover:text-purple-700 font-bold flex items-center gap-2 mx-auto group"
              >
                <span>View All Sponsorship Tiers</span>
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </motion.section>

        {/* ER100 Initiative Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-blue-200">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Target className="w-8 h-8 text-blue-500" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">
                ER100 Initiative
              </h2>
              <Target className="w-8 h-8 text-cyan-500" />
            </div>
            <p className="text-gray-600 text-center mb-8 text-lg">
              Each One Reach 100 - Help children reach 100 others with God's Word
            </p>

            {/* Parent/Teacher Sponsorship */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Parents/Teachers Sponsorship</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {er100ParentSponsorships.map((tier, index) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all"
                  >
                    <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${tier.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                      {tier.emoji}
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 text-center mb-2">{tier.title}</h4>
                    <p className={`text-center font-bold mb-1 bg-gradient-to-r ${tier.gradient} text-transparent bg-clip-text`}>
                      {tier.espees}
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm text-center mb-4">Reach: {tier.reach}</p>
                    <button
                      onClick={() => handleER100Click(tier.id, 'parent')}
                      className={`w-full px-4 py-2 bg-gradient-to-r ${tier.gradient} text-white rounded-full hover:shadow-lg transition-all font-bold text-sm transform hover:scale-105`}
                    >
                      Sponsor Now
                    </button>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button
                  onClick={() => handleER100Click('', 'parent')}
                  className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-2 mx-auto group"
                >
                  <span>View All Parent Sponsorship Options</span>
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            {/* Kids CHAMP Sponsorship */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Kids CHAMP Sponsorship</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {er100KidSponsorships.map((tier, index) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-purple-400 hover:shadow-xl transition-all"
                  >
                    <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${tier.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                      {tier.emoji}
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 text-center mb-2">{tier.title}</h4>
                    <p className={`text-center font-bold mb-1 bg-gradient-to-r ${tier.gradient} text-transparent bg-clip-text text-sm`}>
                      {tier.copies}
                    </p>
                    <button
                      onClick={() => handleER100Click(tier.id, 'kid')}
                      className={`w-full px-4 py-2 mt-4 bg-gradient-to-r ${tier.gradient} text-white rounded-full hover:shadow-lg transition-all font-bold text-sm transform hover:scale-105`}
                    >
                      Sponsor Now
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={() => onNavigate?.('er100')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:shadow-xl transition-all font-bold transform hover:scale-105"
              >
                Learn More About ER100
              </button>
            </div>
          </div>
        </motion.section>

        {/* Glowfest Sponsorship Section */}
        {!isKid && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-purple-500">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-yellow-400" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">
                  Glowfest 2025 Sponsorship
                </h2>
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-gray-600 text-center mb-8 text-lg">
                Partner with us to reach children worldwide through Glowfest
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {glowfestSponsorships.map((tier, index) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:shadow-xl transition-all"
                  >
                    <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${tier.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                      {tier.emoji}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#FF1F8E] text-center mb-2">{tier.name}</h4>
                    <p className={`text-center font-bold mb-1 text-gray-900`}>
                      {tier.espees}
                    </p>
                    <p className="text-gray-600 text-xs text-center mb-4">{tier.description}</p>
                    <button
                      onClick={() => handleGlowfestClick(tier.id)}
                      className={`w-full px-4 py-2 bg-gradient-to-r ${tier.gradient} text-white rounded-full hover:shadow-lg transition-all font-bold text-sm transform hover:scale-105`}
                    >
                      Sponsor Now
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => onNavigate?.('glowfest')}
                  className="px-6 py-3 bg-purple text-white rounded-full hover:shadow-xl transition-all font-bold transform hover:scale-105"
                >
                  Learn More About Glowfest
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* Party Initiative Section */}
        {!isKid && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-pink-200">
              <div className="flex items-center justify-center gap-3 mb-6">
                <PartyPopper className="w-8 h-8 text-pink-500" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center">
                  Kidspiration Party Initiative
                </h2>
                <Cake className="w-8 h-8 text-purple-500" />
              </div>
              <p className="text-gray-600 text-center mb-8 text-lg">
                Celebrate children who may have never had a birthday party before
              </p>

              {/* Full Party & Outreach */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4 text-center">
                  🎉 Full Party & Outreach
                </h3>
                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {fullPartyTiers.map((tier, index) => (
                    <motion.div
                      key={tier.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all"
                    >
                      <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${tier.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                        {tier.icon}
                      </div>
                      <h4 className="text-base font-bold text-gray-900 text-center mb-2">{tier.children}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm text-center mb-2">{tier.description}</p>
                      <p className={`text-center font-bold mb-4 bg-gradient-to-r ${tier.gradient} text-transparent bg-clip-text`}>
                        {tier.espees}
                      </p>
                      <button
                        onClick={() => handlePartyClick(tier.id, 'full-party')}
                        className={`w-full px-4 py-2 bg-gradient-to-r ${tier.gradient} text-white rounded-full hover:shadow-lg transition-all font-bold text-sm transform hover:scale-105`}
                      >
                        Sponsor Now
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Spread Love */}
              <div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-4 text-center">
                  💝 Spread Love
                </h3>
                <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {spreadLoveTiers.map((tier, index) => (
                    <motion.div
                      key={tier.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-pink-200 hover:border-pink-400 hover:shadow-xl transition-all"
                    >
                      <div className={`w-14 h-14 mx-auto bg-gradient-to-br ${tier.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                        {tier.icon}
                      </div>
                      <h4 className="text-base font-bold text-gray-900 text-center mb-2">{tier.children}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm text-center mb-2">{tier.description}</p>
                      <p className={`text-center font-bold mb-4 bg-gradient-to-r ${tier.gradient} text-transparent bg-clip-text`}>
                        {tier.espees}
                      </p>
                      <button
                        onClick={() => handlePartyClick(tier.id, 'spread-love')}
                        className={`w-full px-4 py-2 bg-gradient-to-r ${tier.gradient} text-white rounded-full hover:shadow-lg transition-all font-bold text-sm transform hover:scale-105`}
                      >
                        Sponsor Now
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => onNavigate?.('party')}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:shadow-xl transition-all font-bold transform hover:scale-105"
                >
                  Learn More About Party Initiative
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* Thank You Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl"
        >
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl mb-6 font-bold">Thank You for Your Support! 💖</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Your generous sponsorship helps us reach millions of children around the world with God's love. Together, we're making a difference that will last for eternity! 🌍✨
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-4xl">
            <span>🎉</span>
            <span>❤️</span>
            <span>⛪</span>
            <span>⭐</span>
            <span>🎊</span>
            <span>💫</span>
          </div>
        </motion.div>
      </div>

      {/* Sponsorship Modals */}
      <SponsorshipModal
        isOpen={showSponsorshipModal}
        onClose={() => {
          setShowSponsorshipModal(false);
          setSelectedSponsorshipTier(null);
        }}
        selectedTierId={selectedSponsorshipTier}
        onTierSelect={setSelectedSponsorshipTier}
      />

      <ER100SponsorshipModal
        isOpen={showER100Modal}
        onClose={() => {
          setShowER100Modal(false);
          setSelectedER100Tier(null);
        }}
        selectedTierId={selectedER100Tier}
        onTierSelect={setSelectedER100Tier}
        sponsorshipType={er100SponsorshipType}
      />

      <GlowfestSponsorshipModal
        isOpen={showGlowfestModal}
        onClose={() => {
          setShowGlowfestModal(false);
          setSelectedGlowfestTier(null);
        }}
        selectedTierId={selectedGlowfestTier}
        onTierSelect={setSelectedGlowfestTier}
      />

      <PartyInitiativeSponsorshipModal
        isOpen={showPartyModal}
        onClose={() => {
          setShowPartyModal(false);
          setSelectedPartyTier(null);
        }}
        selectedTierId={selectedPartyTier}
        onTierSelect={setSelectedPartyTier}
        programType={partyProgramType}
      />
    </div>
  );
}
