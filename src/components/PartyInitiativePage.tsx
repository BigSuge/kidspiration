import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Gift, Music, Cake, Users, MapPin, ArrowRight, Sparkles, Calendar, PartyPopper, ArrowLeft } from 'lucide-react';
import { toast } from "sonner@2.0.3";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from '../utils/AuthContext';
import { PartyInitiativeSponsorshipModal } from './PartyInitiativeSponsorshipModal';

interface PartyInitiativePageProps {
  onAuthClick?: () => void;
  onBack?: () => void;
}

export function PartyInitiativePage({ onAuthClick, onBack }: PartyInitiativePageProps) {
  const { isAuthenticated, user } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [programType, setProgramType] = useState<'full-party' | 'spread-love' | null>(null);

  const handleSponsorClick = (type: 'full-party' | 'spread-love', tierId: string) => {
    // Kids cannot sponsor
    if (user?.type === "kid") {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }

    // Adults must be logged in
    if (!isAuthenticated) {
      toast.info("Please login to sponsor a Kidspiration Party", {
        description: "You'll need to create an account or sign in to continue",
        duration: 4000,
      });
      onAuthClick?.();
      return;
    }

    // Open modal with selected tier and program type
    setProgramType(type);
    setSelectedTier(tierId);
    setIsModalOpen(true);
  };

  const isDisabled = user?.type === "kid";

  const fullPartyTiers = [
    {
      id: "party-50",
      children: "50 Children",
      espees: "1,000 ESPEES",
      amount: "1,000",
      icon: "🎉",
      gradient: "from-[#FF6B9D] to-[#F472B6]",
      description: "Full party package for 50 amazing kids",
    },
    {
      id: "party-100",
      children: "100 Children",
      espees: "2,000 ESPEES",
      amount: "2,000",
      icon: "🎊",
      gradient: "from-[#9B4DFF] to-[#C77DFF]",
      description: "Celebrate 100 children with joy and love",
    },
    {
      id: "party-150",
      children: "150 Children",
      espees: "3,000 ESPEES",
      amount: "3,000",
      icon: "🎈",
      gradient: "from-[#4ECDC4] to-[#00D4FF]",
      description: "Host a mega party for 150 kids",
    },
    {
      id: "party-200",
      children: "200 Children",
      espees: "4,000 ESPEES",
      amount: "4,000",
      icon: "✨",
      gradient: "from-[#FFA500] to-[#FFD41F]",
      description: "Ultimate celebration for 200 children",
    },
  ];

  const spreadLoveTiers = [
    {
      id: "love-50",
      children: "50 Children",
      espees: "500 ESPEES",
      amount: "500",
      icon: "💝",
      gradient: "from-[#FF6B9D] to-[#F472B6]",
      description: "Gift packages with HTTN Magazine",
    },
    {
      id: "love-100",
      children: "100 Children",
      espees: "1,000 ESPEES",
      amount: "1,000",
      icon: "💖",
      gradient: "from-[#9B4DFF] to-[#C77DFF]",
      description: "Spread love to 100 kids on birthdays",
    },
    {
      id: "love-150",
      children: "150 Children",
      espees: "2,000 ESPEES",
      amount: "2,000",
      icon: "💗",
      gradient: "from-[#4ECDC4] to-[#00D4FF]",
      description: "Share eternal treats with 150 children",
    },
    {
      id: "love-200",
      children: "200 Children",
      espees: "3,000 ESPEES",
      amount: "3,000",
      icon: "💕",
      gradient: "from-[#FFA500] to-[#FFD41F]",
      description: "Maximum impact for 200 kids",
    },
  ];

  const successStories = [
    {
      location: 'Manila, Philippines',
      participants: 30,
      story: 'Orphanage party brought smiles to 30 children who hadn\'t celebrated birthdays in years',
      image: 'https://images.unsplash.com/photo-1587818593207-c40eb2d3c6c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    {
      location: 'Lagos, Nigeria',
      participants: 45,
      story: 'Street children experienced their first birthday party with cake, games, and new clothes',
      image: 'https://images.unsplash.com/photo-1504870712357-65ea720d6078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    {
      location: 'Nairobi, Kenya',
      participants: 60,
      story: 'Community came together to celebrate refugee children with a massive party festival',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden pt-32 pb-20">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF6B9D]/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#A78BFA]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#4ECDC4]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
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
            <span>Back to Explore</span>
          </motion.button>
        )}

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <PartyPopper className="w-12 h-12 text-pink-500" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-6xl font-extrabold text-[40px]">
              Kidspiration Party Initiative
            </h1>
            <Cake className="w-12 h-12 text-purple-500" />
          </div>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-2xl text-[20px]">
            Celebrating children who may have never had a birthday party before. Spreading love, joy, and the message of God's love to every child.
          </p>
        </motion.div>

        {/* More Than Just a Party Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-purple-200 text-center">
            <h2 className="text-purple-600 mb-6 text-[40px] font-bold">
              The Kidspiration Party Initiative is more than just a party!
            </h2>
            <div className="mb-8">
              <h3 className="text-gray-900 mb-4 text-[28px] font-bold">Our Goal:</h3>
              <p className="text-gray-700 leading-relaxed text-xl">
                To bring happiness and a sense of belonging to children who may feel marginalized or overlooked, and to share the love of God with them.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Three Ways to Participate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16 max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Partner with us to bring happiness to families with children in need",
                icon: Heart,
                gradient: "from-pink-500 to-rose-500"
              },
              {
                title: "Share the love of God with families searching for hope",
                icon: Sparkles,
                gradient: "from-purple-500 to-violet-500"
              },
              {
                title: "Join us in making a lasting impact on a child's life",
                icon: Users,
                gradient: "from-blue-500 to-cyan-500"
              }
            ].map((way, index) => {
              const Icon = way.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-purple-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${way.gradient} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-700 text-center leading-relaxed text-lg">
                    {way.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto"
        >
          {[
            { label: 'Parties Hosted', value: '500+', icon: '🎊', color: 'from-pink-500 to-pink-400' },
            { label: 'Children Celebrated', value: '25,000+', icon: '👶', color: 'from-purple-500 to-purple-400' },
            { label: 'Countries', value: '35+', icon: '🌎', color: 'from-blue-500 to-blue-400' },
            { label: 'Monthly Events', value: '50+', icon: '📅', color: 'from-teal-500 to-teal-400' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text mb-1`}>
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Full Party & Outreach Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4 text-[40px]">
              🎉 Full Party & Outreach
            </h2>
            <p className="text-gray-700 text-xl max-w-2xl mx-auto text-[20px]">
              Host complete celebration parties with food, games, gifts, and HTTN Magazine distribution!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fullPartyTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all flex flex-col"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${tier.gradient} rounded-2xl flex items-center justify-center mb-4 text-3xl shadow-lg`}>
                  {tier.icon}
                </div>
                
                <h3 className="text-gray-900 mb-2 font-bold text-xl">
                  {tier.children}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 flex-grow">
                  {tier.description}
                </p>
                
                <div className={`text-center mb-4 px-4 py-2 bg-gradient-to-r ${tier.gradient} rounded-full shadow-md`}>
                  <p className="text-white font-bold">{tier.espees}</p>
                </div>
                
                <button
                  onClick={() => handleSponsorClick('full-party', tier.id)}
                  disabled={isDisabled}
                  className={`w-full px-4 py-3 bg-gradient-to-r ${tier.gradient} text-white rounded-full hover:shadow-xl transition-all font-bold text-center ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                  }`}
                >
                  Sponsor Now
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Spread Love Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 mb-4 text-[40px]">
              💝 Spread Love
            </h2>
            <p className="text-gray-700 text-xl max-w-2xl mx-auto text-[20px]">
              Gift packages with HTTN Magazine shared during celebrant's birthdays - eternal treats for eternal impact!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {spreadLoveTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 border-2 border-pink-200 hover:border-pink-400 hover:shadow-2xl transition-all flex flex-col"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${tier.gradient} rounded-2xl flex items-center justify-center mb-4 text-3xl shadow-lg`}>
                  {tier.icon}
                </div>
                
                <h3 className="text-gray-900 mb-2 font-bold text-xl">
                  {tier.children}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 flex-grow">
                  {tier.description}
                </p>
                
                <div className={`text-center mb-4 px-4 py-2 bg-gradient-to-r ${tier.gradient} rounded-full shadow-md`}>
                  <p className="text-white font-bold">{tier.espees}</p>
                </div>
                
                <button
                  onClick={() => handleSponsorClick('spread-love', tier.id)}
                  disabled={isDisabled}
                  className={`w-full px-4 py-3 bg-gradient-to-r ${tier.gradient} text-white rounded-full hover:shadow-xl transition-all font-bold text-center ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                  }`}
                >
                  Sponsor Now
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 mb-4 text-[40px]">
              🌟 Recent Celebrations
            </h2>
            <p className="text-gray-700 text-xl max-w-2xl mx-auto text-[20px]">
              See the smiles we've created around the world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={story.image}
                    alt={story.location}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="font-bold">{story.location}</span>
                    </div>
                    <div className="text-2xl font-bold">{story.participants} Children 🎉</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">{story.story}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-5xl mb-6 font-bold text-[40px]">Be the Reason a Child Smiles</h2>
          <p className="mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed text-[20px]">
            {user?.type === 'kid' 
              ? '👋 Hey Champion! Tell your parents or teachers about Kidspiration Party and help bring joy to children around the world!'
              : 'Join us in celebrating children who deserve to feel loved and special. Your sponsorship can change a life forever! 🌟'}
          </p>
          {user?.type !== 'kid' && (
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  onAuthClick?.();
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="px-6 py-3 sm:px-10 sm:py-5 bg-white text-purple-600 rounded-full hover:shadow-2xl transform hover:scale-105 transition-all font-bold inline-flex items-center gap-2 sm:gap-3"
            >
              <span className="text-base sm:text-[20px]">Start Making a Difference</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </motion.div>

        {/* Login Prompt */}
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-6 z-50 max-w-md border-4 border-purple-300"
          >
            <p className="text-gray-800 text-center text-lg">
              <span className="text-3xl mr-2">👋</span>
              Hi Champion! Kidspiration Party sponsorship is for adults. But you can tell your parents about it! 🎉
            </p>
          </motion.div>
        )}

        {/* Sponsorship Modal */}
        <PartyInitiativeSponsorshipModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedTierId={selectedTier}
          onTierSelect={(tierId) => setSelectedTier(tierId)}
          programType={programType}
        />
      </div>
    </div>
  );
}
