import { useState } from "react";
import {
  Sparkles,
  Calendar,
  BookOpen,
  Shirt,
  Share2,
  MapPin,
  ArrowLeft,
  Info,
  Heart,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import image_0b273eb951cf239cbcc6224f74a150ac5e95b384 from "figma:asset/0b273eb951cf239cbcc6224f74a150ac5e95b384.png";
import image_a2403b8eef88286cde45eb5ea3add1bd09fb916d from "figma:asset/a2403b8eef88286cde45eb5ea3add1bd09fb916d.png";
import image_aedc241f8e878317fb16a5fc633a5d461c6a160d from "figma:asset/aedc241f8e878317fb16a5fc633a5d461c6a160d.png";
import image_58a2d7670b02c391a867c83f69e6c0dbeab5c5ae from "figma:asset/58a2d7670b02c391a867c83f69e6c0dbeab5c5ae.png";
const image_red_shirt = "/red_shirt_I_A_G.png";
const image_glowfest_logo = "/glowfest_logo_solo.png";
import { useAuth } from "../utils/AuthContext";
import GlowfestVideo from "../imports/GlowfestVideo";
import glowfestInfoImage from "figma:asset/73f6da91498fb6566edc7569a9c25849ca85a64c.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GlowfestSponsorshipModal } from "./GlowfestSponsorshipModal";

interface GlowfestPageProps {
  onBack?: () => void;
  onAuthClick?: () => void;
}

export function GlowfestPage({ onBack, onAuthClick }: GlowfestPageProps) {
  const { isAuthenticated, user } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActionClick = (action: string) => {
    // Kids cannot access Glowfest actions
    if (user?.type === "kid") {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }

    // Adults must be logged in
    if (!isAuthenticated) {
      onAuthClick?.();
      return;
    }

    console.log(`Action: ${action}`);
  };

  const isDisabled = user?.type === "kid";

  const handleSponsorClick = (sponsorshipType: string) => {
    // Kids cannot sponsor
    if (user?.type === "kid") {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }

    // Adults must be logged in
    if (!isAuthenticated) {
      toast.info("Please login to complete your Glowfest sponsorship", {
        description: "You'll need to create an account or sign in to continue",
        duration: 4000,
      });
      onAuthClick?.();
      return;
    }

    // Open modal with selected sponsorship type
    setSelectedTier(sponsorshipType);
    setIsModalOpen(true);
  };

  const glowfestSponsorships = [
    {
      id: "er100",
      name: "ER100 SPONSORSHIP",
      description: "Support the Everyone Reach 100 campaign",
      espees: "Applicable",
      icon: "🎯",
      gradient: "from-[#FF6B9D] to-[#F472B6]",
    },
    {
      id: "crusade",
      name: "CRUSADE SPONSORSHIP",
      description: "Fund healing crusades for children",
      espees: "4,000 ESPEES",
      icon: "⛪",
      gradient: "from-[#9B4DFF] to-[#C77DFF]",
    },
    {
      id: "outreach",
      name: "OUTREACH SPONSORSHIP",
      description: "Enable community outreach programs",
      espees: "2,000 ESPEES",
      icon: "🤝",
      gradient: "from-[#4ECDC4] to-[#00D4FF]",
    },
    {
      id: "missions",
      name: "MISSIONS SPONSORSHIP",
      description: "Support global missions initiatives",
      espees: "3,000 ESPEES",
      icon: "🌍",
      gradient: "from-[#FFA500] to-[#FFD41F]",
    },
  ];

  const merchItems = [
    {
      id: 1,
      name: "I am Divine T-shirt",
      description: "Show your Kidspiration spirit with bold declarations!",
      image: image_58a2d7670b02c391a867c83f69e6c0dbeab5c5ae,
      gradient: "from-[#4ECDC4] to-[#00D4FF]",
      buttonText: "Order on KC! 📱",
    },
    {
      id: 2,
      name: "I am Strong T-shirt",
      description: "Show your Kidspiration spirit with bold declarations!",
      image: image_aedc241f8e878317fb16a5fc633a5d461c6a160d,
      gradient: "from-[#FF6B9D] to-[#F472B6]",
      buttonText: "Order on KC! 📱",
    },
    {
      id: 3,
      name: "I am Light T-shirt",
      description: "Show your Kidspiration spirit with bold declarations!",
      image: image_a2403b8eef88286cde45eb5ea3add1bd09fb916d,
      gradient: "from-[#9B4DFF] to-[#C77DFF]",
      buttonText: "Order on KC! 📱",
    },
    {
      id: 4,
      name: "I am Great T-shirt",
      description: "Show your Kidspiration spirit with bold declarations!",
      image: image_0b273eb951cf239cbcc6224f74a150ac5e95b384,
      gradient: "from-[#FFE66D] to-[#FFC93C]",
      buttonText: "Order on KC! 📱",
    },
    {
      id: 5,
      name: "I am Graced T-shirt",
      description: "Show your Kidspiration spirit with bold declarations!",
      image: image_red_shirt,
      gradient: "from-[#4ECDC4] to-[#00D4FF]",
      buttonText: "Order on KC! 📱",
    },
    {
      id: 6,
      name: "Glowfest Sticker Collection",
      description: "Mega pack with Glowfest Taglines",
      image: image_glowfest_logo,
      gradient: "from-[#FFE66D] to-[#FFC93C]",
      buttonText: "Order on KC! 📱",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden pt-32 pb-20">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF6B9D]/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#4ECDC4]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#A78BFA]/20 rounded-full blur-3xl animate-pulse"
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
            className="mb-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
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
            <Sparkles className="w-10 h-10 text-yellow-400" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-5xl font-extrabold">
              Glowfest 2025
            </h1>
            <Sparkles className="w-10 h-10 text-yellow-400" />
          </div>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-xl">
            The biggest celebration of faith, love, and inspiration! Join millions of kids and
            families worldwide in this spectacular event.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-16 space-y-12">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <GlowfestVideo />
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center"
            >
              <span className="text-2xl">⭐</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 w-10 h-10 bg-pink-400 rounded-full shadow-lg flex items-center justify-center"
            >
              <span className="text-3xl">💖</span>
            </motion.div>
          </motion.div>

          {/* What is Glowfest */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-white text-4xl text-center font-bold">What is Glowfest?</h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed text-center max-w-3xl mx-auto">
              <p>
               Glowfest is a global move to celebrate faith instead of fear, praying for children around the world; while distributing eternal verities with the Healing to the Nations Magazine for kids.
              </p>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 px-6 py-3 rounded-full border border-yellow-400/30">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <span className="text-white text-[16px]">October 31 - November 30, 2025</span>
              </div>
            </div>
          </motion.div>

          {/* How to Participate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-white text-4xl text-center mb-3 font-bold">
              Glowfest Action Guide
            </h2>
            <p className="text-gray-300 text-center mb-12 text-lg">
              How to be part of the Kidspiration Glowfest
            </p>

            {/* Image and Cards Layout */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Info Image - Left Side */}
              <div className="lg:w-2/5 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={glowfestInfoImage}
                  alt="How to be part of Kidspiration Glowfest"
                  className="w-full h-auto"
                />
              </div>

              {/* Action Cards - Right Side */}
              <div className="lg:w-3/5 grid md:grid-cols-2 gap-6">
              {/* Step 1 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B9D] to-[#A78BFA] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">1</span>
                </div>
                <h3 className="text-white mb-3">Log On</h3>
                <p className="text-gray-300 text-sm">
                  Visit www.kidspiration.org to register and connect to the global Glowfest.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-[#A78BFA] to-[#4ECDC4] rounded-full flex items-center justify-center mb-4 font-bold">
                  <span className="text-white text-xl">2</span>
                </div>
                <h3 className="text-white mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Order or Sponsor
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Order or sponsor Healing to the Nations magazine for kids to reach children.
                </p>
                <button
                  onClick={() => handleActionClick("sponsor")}
                  disabled={isDisabled}
                  className={`mt-auto px-4 py-2 bg-gradient-to-r from-[#A78BFA] to-[#4ECDC4] text-white rounded-full hover:shadow-lg transition-all text-center ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                  }`}
                >
                  Sponsor Now!
                </button>
              </div>

              {/* Step 3 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4ECDC4] to-[#FF6B9D] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">3</span>
                </div>
                <h3 className="text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Pray Fervently
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Join the global morning prayer every Wednesday and Friday from October 31 to
                  November 30 at 6am GMT+1 for 30 minutes to intercede for children worldwide.
                </p>
                <button
                  onClick={() => window.open("https://prayerclouds.org/app/kidspiration", "_blank")}
                  disabled={isDisabled}
                  className={`mt-auto px-4 py-2 bg-gradient-to-r from-[#4ECDC4] to-[#FF6B9D] text-white rounded-full hover:shadow-lg transition-all text-center ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                  }`}
                >
                  Join Prayers
                </button>
              </div>

              {/* Step 4 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">4</span>
                </div>
                <h3 className="text-white mb-3 flex items-center gap-2">
                  <Shirt className="w-5 h-5" />
                  Distribute
                </h3>
                <p className="text-gray-300 text-sm">
                  Distribute Healing to the Nations magazine for kids. Reach every child in your
                  community with God's word of faith and healing power, wearing the branded t-shirt
                  with bold declarations (download from the website).
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">5</span>
                </div>
                <h3 className="text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Host Crusades
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Host Healing to the Nations Crusades for kids, outreaches, and mission trips.
                  Spread the message of faith and healing everywhere!
                </p>
                <button
                  onClick={() => handleActionClick("crusade")}
                  disabled={isDisabled}
                  className={`mt-auto px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all text-center ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                  }`}
                >
                  Host a Crusade
                </button>
              </div>

              {/* Step 6 */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all flex flex-col">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl font-bold">6</span>
                </div>
                <h3 className="text-white mb-3 flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Share Your Impact
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Share your pictures of distribution and testimonies with the world!
                </p>
                <button
                  onClick={() => handleActionClick("testimony")}
                  disabled={isDisabled}
                  className={`mt-auto px-4 py-2 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-full hover:shadow-lg transition-all text-center ${
                    isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                  }`}
                >
                  Share Testimony
                </button>
              </div>
              </div>
            </div>
          </motion.div>

          {/* Glowfest Sponsorship Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-white text-4xl text-center mb-3 font-bold">
              Kidspiration Glowfest Sponsorship
            </h2>
            <p className="text-gray-300 text-center mb-12 text-lg">
              Partner with us to reach children worldwide through Glowfest
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {glowfestSponsorships.map((sponsorship, index) => (
                <motion.div
                  key={sponsorship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-white/30 hover:shadow-2xl transition-all flex flex-col"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${sponsorship.gradient} rounded-2xl flex items-center justify-center mb-4 text-3xl`}>
                    {sponsorship.icon}
                  </div>
                  
                  <h3 className="text-gray-900 mb-2 font-bold">
                    {sponsorship.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 flex-grow">
                    {sponsorship.description}
                  </p>
                  
                  <div className={`text-center mb-4 px-4 py-2 bg-gradient-to-r ${sponsorship.gradient} rounded-full`}>
                    <p className="text-white font-bold">{sponsorship.espees}</p>
                  </div>
                  
                  <button
                    onClick={() => handleSponsorClick(sponsorship.id)}
                    disabled={isDisabled}
                    className={`w-full px-4 py-2 bg-gradient-to-r ${sponsorship.gradient} text-white rounded-full hover:shadow-xl transition-all font-bold text-center ${
                      isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
                    }`}
                  >
                    Sponsor Now
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-white text-4xl text-center mb-6 font-bold">
              Resources
            </h2>
            
            {/* Info Banner */}
            <div className="mb-8 bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <Info className="w-5 h-5 text-blue-300 flex-shrink-0" />
                <p className="text-blue-100 text-sm">
                  All merchandise orders are handled through <span className="font-bold">@kidspiration</span> on KingsChat!
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {merchItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden border border-white/30 hover:shadow-2xl transition-all flex flex-col shadow-lg"
                >
                  {/* Merchandise Image */}
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow bg-white">
                    <h3 className="text-gray-900 mb-2 font-bold text-lg">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <button
                      onClick={() => window.open("https://kingsch.at/h/", "_blank")}
                      className={`w-full px-4 py-3 bg-gradient-to-r ${item.gradient} text-white rounded-full hover:shadow-xl transition-all font-bold inline-flex items-center justify-center gap-2 hover:scale-105`}
                    >
                      {item.buttonText}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Thank You Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20"
          >
            <div className="bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/30 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block mb-4"
                >
                  <Heart className="w-16 h-16 text-pink-400 fill-pink-400" />
                </motion.div>
                <h2 className="text-white text-4xl md:text-5xl mb-4 font-bold text-[36px]">
                  Thank You to Our Amazing Sponsors! 💖
                </h2>
                <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                  Your generous support makes Glowfest possible! Because of you, millions of children around the world will experience the love of Jesus and discover their God-given purpose. 🌍✨
                </p>
              </div>

              {/* Video Container */}
              <div className="relative max-w-4xl mx-auto">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <iframe
                    src="https://drive.google.com/file/d/1JcSY-Wa2YnEIMGUwC4mBPFmwOBL21xRN/preview"
                    className="w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                  />
                </div>

                {/* Floating decorative elements */}
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-xl flex items-center justify-center"
                >
                  <span className="text-4xl">🌟</span>
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                    rotate: [0, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full shadow-xl flex items-center justify-center"
                >
                  <span className="text-4xl">💝</span>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-xl flex items-center justify-center"
                >
                  <span className="text-3xl">✨</span>
                </motion.div>
              </div>

              {/* Appreciation Message */}
              <div className="mt-8 text-center space-y-4">
                <p className="text-white text-lg md:text-xl">
                  🙏 <span className="font-bold">Your partnership</span> is changing lives and bringing eternal impact to children everywhere!
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-3xl">
                  <span>🎉</span>
                  <span>❤️</span>
                  <span>⛪</span>
                  <span>⭐</span>
                  <span>🎊</span>
                  <span>💫</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Login Prompt */}
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-6 z-50 max-w-md"
          >
            <p className="text-gray-800 text-center">
              <span className="text-2xl mr-2">👋</span>
              Hi Champion! Glowfest registration is for adults. But you can still enjoy our games
              and stories!
            </p>
          </motion.div>
        )}

        {/* Glowfest Sponsorship Modal */}
        <GlowfestSponsorshipModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedTierId={selectedTier}
          onTierSelect={(tierId) => setSelectedTier(tierId)}
        />
      </div>
    </div>
  );
}
