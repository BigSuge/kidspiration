import { motion } from 'motion/react';
import { Target, Church, Users, MapPin, Languages, Tv, Radio, MessageSquare, ArrowLeft, Heart, Sparkles, Crown, Trophy } from 'lucide-react';
import parentsCardImage from 'figma:asset/97488369eb863ef80a9fac78969757b23e65a5ac.png';
import kidsCardImage from 'figma:asset/afc22e2c90f34863a76ade54ca7f86a3d7e486db.png';
import { useAuth } from '../utils/AuthContext';
import { useState } from 'react';
import { ER100SponsorshipModal } from './ER100SponsorshipModal';

interface ER100SectionProps {
  onAuthClick?: () => void;
  onBack?: () => void;
}

export function ER100Section({ onAuthClick, onBack }: ER100SectionProps) {
  const { isAuthenticated } = useAuth();
  const [showSponsorshipModal, setShowSponsorshipModal] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [sponsorshipType, setSponsorshipType] = useState<'parent' | 'kid'>('parent');

  const handleJoin = () => {
    if (!isAuthenticated) {
      onAuthClick?.();
    } else {
      window.location.hash = 'join-er100';
    }
  };

  const handleSponsorClick = (tierId: string, type: 'parent' | 'kid') => {
    if (!isAuthenticated) {
      onAuthClick?.();
    } else {
      setSelectedTierId(tierId);
      setSponsorshipType(type);
      setShowSponsorshipModal(true);
    }
  };

  const completeStrategies = [
    {
      letter: 'C',
      title: 'Crusades and Strategic Centers',
      description: 'Organize large-scale crusades and establish strategic centers to reach children',
      icon: Church,
      color: 'from-[#FF6B9D] to-[#FFB4D6]',
    },
    {
      letter: 'O',
      title: 'Outreaches',
      description: 'Conduct targeted outreach programs in communities, schools, and neighborhoods',
      icon: Users,
      color: 'from-[#A78BFA] to-[#C4B5FD]',
    },
    {
      letter: 'M',
      title: 'Missions',
      description: 'Launch mission trips to reach children in remote and unreached areas',
      icon: MapPin,
      color: 'from-[#4ECDC4] to-[#7FE8DB]',
    },
    {
      letter: 'P',
      title: 'Penetrating Places',
      description: 'Access hard-to-reach places and penetrate resistant communities with love',
      icon: Target,
      color: 'from-yellow-400 to-yellow-300',
    },
    {
      letter: 'L',
      title: 'Languages & Dialects',
      description: 'Translate and distribute materials in multiple languages and local dialects',
      icon: Languages,
      color: 'from-purple-500 to-purple-400',
    },
    {
      letter: 'E',
      title: 'Engage Youth, Teens & Children',
      description: 'Create engaging content and activities for all age groups',
      icon: Users,
      color: 'from-pink-500 to-pink-400',
    },
    {
      letter: 'T',
      title: 'TV & Radio Broadcast',
      description: 'Utilize television and radio to broadcast the message far and wide',
      icon: Tv,
      color: 'from-blue-500 to-blue-400',
    },
    {
      letter: 'E',
      title: 'Effective Heralds',
      description: 'Raise up and equip effective heralds to declare God\'s Word powerfully',
      icon: MessageSquare,
      color: 'from-green-500 to-green-400',
    },
  ];

  const parentSponsorships = [
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
    {
      id: 'er100-governor',
      title: 'Governor/Governess',
      emoji: '🌟',
      espees: '500 ESPEES',
      reach: '500 Kids',
      gradient: 'from-[#FBBF24] to-[#FCD34D]',
    },
    {
      id: 'er100-kings',
      title: 'Kings/Queens',
      emoji: '👑',
      espees: '1,000 ESPEES',
      reach: '1,000 - 9,999 Kids',
      gradient: 'from-[#8B5CF6] to-[#A78BFA]',
    },
  ];

  const kidSponsorships = [
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
    {
      id: 'kid-global',
      title: 'A Global Champ',
      emoji: '🌍',
      copies: '1,000 Copies & Above',
      gradient: 'from-[#10B981] to-[#34D399]',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 mx-[0px] my-[32px]">
        {/* Back Button */}
        {onBack && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Explore</span>
          </motion.button>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-6 bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-full shadow-lg">
            <Target className="w-10 h-10 text-white" />
            <h2 className="text-white text-5xl font-extrabold">
              ER100
            </h2>
            <Target className="w-10 h-10 text-white" />
          </div>
          <p className="text-gray-900 max-w-3xl mx-auto text-2xl mb-2 font-bold text-[24px]">
            Each One Reach 100 Children
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A bold initiative to impact 100 children through strategic and complete outreach
          </p>
        </motion.div>

        {/* Vision Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-center mb-4 text-[40px] font-bold">The ER100 Vision</h3>
            <p className="text-center text-lg">
              Every child has the power to reach 100 other children with the transformative message of God's love. Through the COMPLETE strategy and Healing to the Nations Magazine, we're equipping a generation of champions to make a global impact.
            </p>
          </div>
        </motion.div>

        {/* COMPLETE Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-gray-900 mb-8 text-center text-[40px] font-bold">The COMPLETE Strategy</h3>
          <p className="text-center text-xl text-gray-600 mb-12 text-[20px]">On our way to reach 3 billion children through:</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {completeStrategies.map((strategy, index) => {
              const Icon = strategy.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${strategy.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    <span className="text-white text-2xl">{strategy.letter}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-gray-700" />
                    <h4 className="text-gray-900 text-center text-sm text-[16px] font-bold">{strategy.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm text-center leading-relaxed">
                    {strategy.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-gray-900 mb-6 text-center text-[40px] font-bold">How ER100 Works</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">Commit to the Vision</h4>
                  <p className="text-gray-600">
                    Make a commitment to reach 100 children with the Gospel using the COMPLETE strategy
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">Choose Your Approach</h4>
                  <p className="text-gray-600">
                    Select one or more methods from the COMPLETE strategy that align with your gifts and opportunities
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">Take Action</h4>
                  <p className="text-gray-600">
                    Use Healing to the Nations magazine and other Kidspiration resources to reach children
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">Track Your Impact</h4>
                  <p className="text-gray-600">
                    Document your outreach efforts and celebrate as you reach your goal of 100 children
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">5</span>
                </div>
                <div>
                  <h4 className="text-gray-900 mb-1">Share & Inspire</h4>
                  <p className="text-gray-600">
                    Share testimonies and photos to inspire others to join the ER100 movement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Parents Sponsorship Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-12 h-12 text-blue-600" />
              <h3 className="text-gray-900 text-[40px] font-bold">Parents/Teachers Sponsorship</h3>
              <Sparkles className="w-12 h-12 text-cyan-500" />
            </div>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto mb-8">
              Sponsor HTTN magazines to help children reach 100 others with God's Word
            </p>

            {/* Parent E-Card Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={parentsCardImage} alt="ER100 Parents Sponsorship Levels" className="w-full h-auto" />
              </div>
            </motion.div>
          </div>

          {/* Parent Sponsorship Tiers */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {parentSponsorships.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-200"
              >
                <div className={`bg-gradient-to-r ${tier.gradient} p-6 text-white text-center`}>
                  <div className="text-6xl mb-3">{tier.emoji}</div>
                  <h4 className="text-2xl font-bold mb-2">{tier.title}</h4>
                  <p className="text-3xl font-bold">{tier.espees}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6 text-center font-semibold">
                    Reach: {tier.reach}
                  </p>
                  <button
                    onClick={() => handleSponsorClick(tier.id, 'parent')}
                    className={`w-full px-6 py-3 bg-gradient-to-r ${tier.gradient} text-white rounded-full hover:shadow-xl transition-all font-bold transform hover:scale-105 text-center`}
                  >
                    Sponsor Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => handleSponsorClick('', 'parent')}
              className="text-blue-600 hover:text-blue-700 font-bold text-lg flex items-center gap-2 mx-auto group"
            >
              <span>View All Parent Sponsorship Options (Including Grand Sponsors)</span>
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Kids Sponsorship Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-12 h-12 text-yellow-500" />
              <h3 className="text-gray-900 text-[40px] font-bold">Kids Sponsorship - CHAMP Levels</h3>
              <Crown className="w-12 h-12 text-purple-500" />
            </div>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto mb-8">
              Kids can sponsor copies of HTTN Magazine to share God's Word with other children!
            </p>

            {/* Kids E-Card Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={kidsCardImage} alt="Kids Sponsorship CHAMP Levels" className="w-full h-auto" />
              </div>
            </motion.div>
          </div>

          {/* Kids Sponsorship Tiers */}
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {kidSponsorships.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-200"
              >
                <div className={`bg-gradient-to-r ${tier.gradient} p-6 text-white text-center`}>
                  <div className="text-5xl mb-3">{tier.emoji}</div>
                  <h4 className="text-xl font-bold mb-2">{tier.title}</h4>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 mb-4 text-center font-semibold text-sm">
                    {tier.copies}
                  </p>
                  <button
                    onClick={() => handleSponsorClick(tier.id, 'kid')}
                    className={`w-full px-4 py-3 bg-gradient-to-r ${tier.gradient} text-white rounded-full hover:shadow-xl transition-all font-bold transform hover:scale-105 text-center text-sm`}
                  >
                    Sponsor Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 max-w-3xl mx-auto shadow-2xl">
            <h3 className="text-white mb-4 text-[40px] font-bold">Join the ER100 Movement Today!</h3>
            <p className="text-white mb-6 text-lg">
              Be part of a global movement reaching millions of children with God's Word
            </p>
            <button
              onClick={handleJoin}
              className="px-12 py-4 bg-white text-blue-600 rounded-full hover:shadow-2xl transition-all transform hover:scale-105 font-bold"
            >
              I'm Ready to Reach 100 Children
            </button>
          </div>
        </motion.div>
      </div>

      {/* Sponsorship Modal */}
      <ER100SponsorshipModal
        isOpen={showSponsorshipModal}
        onClose={() => {
          setShowSponsorshipModal(false);
          setSelectedTierId(null);
        }}
        selectedTierId={selectedTierId}
        onTierSelect={setSelectedTierId}
        sponsorshipType={sponsorshipType}
      />
    </section>
  );
}
