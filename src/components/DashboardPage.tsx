import { motion } from 'motion/react';
import { useAuth } from '../utils/AuthContext';
import { useState, useEffect } from 'react';
import {
  Gamepad2,
  BookOpen,
  Heart,
  Trophy,
  Sparkles,
  
  
  Star,
  Crown,
  Zap,
  
  Newspaper,
  PartyPopper,
  ArrowRight,
  
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ParentDashboard } from './ParentDashboard';

// External URL for HTTN Magazine - to be updated when available
export const HTTN_MAGAZINE_URL = '#httn-magazine'; // TODO: Replace with actual external URL

interface DashboardPageProps {
  onNavigate?: (page: string) => void;
}

// HTTN Carousel Component
function HTTNCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1760115090655-9ca46694d97a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGFydHklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NjI4NzUzNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      emoji: '🎉',
      title: 'At Super Fun Parties!',
      gradient: 'from-[#EC4899] to-[#F472B6]',
    },
    {
      image: 'https://images.unsplash.com/photo-1623514790081-4591eb4b898b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHNjaG9vbCUyMGZyaWVuZHN8ZW58MXx8fHwxNzYyODc1MzQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      emoji: '🏫',
      title: 'Sharing at Schools!',
      gradient: 'from-[#A78BFA] to-[#C4B5FD]',
    },
    {
      image: 'https://images.unsplash.com/photo-1628099568673-ecbc6698fef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwbWVldGluZyUyMG91dGRvb3J8ZW58MXx8fHwxNzYyODc1MzQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      emoji: '🎊',
      title: 'Meeting Friends Everywhere!',
      gradient: 'from-[#4ECDC4] to-[#7FE8DB]',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Auto-slide every 4 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Carousel Container */}
      <div className="relative h-80 sm:h-96 overflow-hidden rounded-3xl">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 0.95,
              zIndex: currentSlide === index ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className={`relative h-full bg-gradient-to-br ${slide.gradient} rounded-3xl overflow-hidden border-4 border-white shadow-2xl`}>
              {/* Image */}
              <ImageWithFallback
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover opacity-90"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="text-4xl sm:text-5xl"
                  >
                    {slide.emoji}
                  </motion.div>
                  <h4 className="text-white text-2xl sm:text-3xl font-extrabold text-[24px]">
                    {slide.title}
                  </h4>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
        aria-label="Previous slide"
      >
        <span className="text-xl sm:text-2xl">←</span>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
        aria-label="Next slide"
      >
        <span className="text-xl sm:text-2xl">→</span>
      </button>
    </div>
  );
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Kids Dashboard
  if (user.type === 'kid') {
    const dashboardCards = [
      {

      // Parent/Teacher and Pastor/Leader Dashboard (same experience)
      if (user.type === 'parent' || user.type === 'leader' || (user as any).type === 'pastor') {
        return <ParentDashboard onNavigate={onNavigate} />;
      }
        title: 'Play Bible Games',
        description: 'Bible quizzes, puzzles, word search & more!',
        icon: Gamepad2,
        gradient: 'from-[#FF6B9D] to-[#F472B6]',
        action: () => onNavigate?.('games'),
        delay: 0.1,
        emoji: '🎮',
      },
      {
        title: 'Join Prayer Time',
        description: 'Pastor Chris prays for children like you',
        icon: Heart,
        gradient: 'from-[#A78BFA] to-[#8B5CF6]',
        action: () => window.open('https://healingstreams.tv/kids/', '_blank'),
        delay: 0.2,
        emoji: '🙏',
      },
      {
        title: 'Read Impact Stories',
        description: 'Amazing impact stories from around the world',
        icon: BookOpen,
        gradient: 'from-[#4ECDC4] to-[#06B6D4]',
        action: () => onNavigate?.('impact-stories'),
        delay: 0.3,
        emoji: '📖',
      },
      {
        title: 'Fun HTTN Magazine',
        description: 'Interactive HTTN Magazine',
        icon: Sparkles,
        gradient: 'from-[#FBBF24] to-[#F59E0B]',
        action: () => window.open(HTTN_MAGAZINE_URL, '_blank'),
        delay: 0.4,
        emoji: '✨',
      },
      {
        title: 'Kidspiration Glowfest',
        description: 'Be a faith hero!',
        icon: Star,
        gradient: 'from-[#EC4899] to-[#BE185D]',
        action: () => onNavigate?.('glowfest'),
        delay: 0.5,
        emoji: '⭐',
      },
      {
        title: 'ER100 Campaign',
        description: 'Be a part of this amazing initiative',
        icon: Crown,
        gradient: 'from-[#10B981] to-[#059669]',
        action: () => onNavigate?.('er100'),
        delay: 0.6,
        emoji: '👑',
      },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFFFFF] to-[#F0F9FF] pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header with animated welcome */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="inline-block mb-4"
            >
              <div className="text-6xl">👋</div>
            </motion.div>
            
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] mb-4 text-5xl font-extrabold text-[40px]">
              Welcome back, {user.title || ''} {user.firstName}!
            </h1>
            
            <p className="text-gray-600 max-w-2xl mx-auto text-[24px]">
              What would you like to do today? Pick an adventure below! 🌟
            </p>
          </motion.div>

          {/* Floating decorative elements */}
          <div className="absolute top-40 left-10 hidden lg:block">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="text-4xl"
            >
              🎨
            </motion.div>
          </div>

          <div className="absolute top-60 right-20 hidden lg:block">
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="text-4xl"
            >
              🎵
            </motion.div>
          </div>

          {/* Dashboard Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative">
            {dashboardCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: card.delay,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="group relative cursor-pointer"
                onClick={card.action}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />

                {/* Card */}
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-4 border-transparent group-hover:border-opacity-50 group-hover:border-white overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <card.icon className="w-full h-full" />
                    </motion.div>
                  </div>

                  {/* Icon with bounce animation */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <card.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Emoji badge */}
                  <div className="absolute top-6 right-6 text-3xl">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      {card.emoji}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3 className="text-gray-900 mb-2 text-2xl font-bold">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-[18px]">
                    {card.description}
                  </p>

                  {/* Hover arrow */}
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                    className={`mt-4 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r ${card.gradient}`}
                  >
                    <span className="font-bold">Let's go!</span>
                    <Zap className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* You're Amazing Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20 max-w-6xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#EC4899] via-[#A78BFA] to-[#4ECDC4] p-12">
              {/* Floating animated bubbles */}
              <div className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
                  className="text-center mb-8"
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="text-5xl"
                    >
                      🎨
                    </motion.div>
                    <h2 className="text-white text-5xl font-extrabold text-[40px]">
                      YOU'RE AMAZING!
                    </h2>
                    <motion.div
                      animate={{
                        rotate: [0, -360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="text-5xl"
                    >
                      🌍
                    </motion.div>
                  </div>
                  <p className="text-white/90 text-[20px] italic">
                    Let's Share Jesus with the WHOLE World! 🎉
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: '🎉', number: '150,000', label: 'Friends Reached!', delay: 1.0 },
                    { icon: '📖', number: '500,000', label: 'HTTNs Shared!', delay: 1.1 },
                    { icon: '⭐', number: '1,250', label: 'Super Parties!', delay: 1.2 },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: stat.delay, type: 'spring', stiffness: 200 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white rounded-2xl p-8 text-center shadow-2xl"
                    >
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                        className="text-5xl mb-4"
                      >
                        {stat.icon}
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: stat.delay + 0.2, type: 'spring', stiffness: 200 }}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC4899] to-[#A78BFA] mb-2"
                      >
                        <div className="text-5xl font-extrabold text-[40px]">
                          {stat.number}
                        </div>
                      </motion.div>
                      <p className="text-gray-700 text-[18px] font-semibold">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video Section - Kids Divine Health Confessions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-20 max-w-5xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#EC4899] via-[#D946EF] to-[#A78BFA] p-10">
              {/* Sparkle decorations */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="absolute text-yellow-300 text-2xl"
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 90 + 5}%`,
                  }}
                >
                  ✨
                </motion.div>
              ))}

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4 }}
                  className="text-center mb-6"
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl"
                    >
                      ✨
                    </motion.div>
                    <h2 className="text-white text-4xl font-extrabold text-[40px]">
                      Kids Divine Health Confessions!
                    </h2>
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl"
                    >
                      ✨
                    </motion.div>
                  </div>
                  <p className="text-white/90 text-[20px]">
                    Say these powerful words with Pastor Chris! 🙏
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="bg-white rounded-2xl p-4 shadow-2xl"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                    <video
                      controls
                      className="w-full h-full"
                      poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='%23EC4899' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='white' font-family='sans-serif'%3E▶ Play Video%3C/text%3E%3C/svg%3E"
                    >
                      <source
                        src="/videos/kids_health_confessions.mp4"
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="text-center mt-4 text-gray-700 text-[18px]"
                  >
                    ⭐ Watch every day and declare your divine health! ⭐
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* The C.O.M.P.L.E.T.E. Way Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
            className="mt-20 max-w-6xl mx-auto mb-16"
          >
            <div className="text-center mb-10">
              <motion.h2
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.8, type: 'spring', stiffness: 200 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] mb-4 text-5xl font-extrabold text-[48px]"
              >
                The C.O.M.P.L.E.T.E. Way!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9 }}
                className="text-gray-600 text-[24px]"
              >
                7 Amazing Ways to Share Jesus! 🌟
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { letter: 'C', title: 'Crusades', description: 'Join fun playground events and mall takeovers!', gradient: 'from-[#EC4899] to-[#D946EF]', delay: 2.0 },
                { letter: 'O', title: 'Outreaches', description: 'Share HTTN at parties and sports days!', gradient: 'from-[#D946EF] to-[#A78BFA]', delay: 2.1 },
                { letter: 'M', title: 'Missions', description: 'Visit hospitals and bring hope!', gradient: 'from-[#A78BFA] to-[#8B5CF6]', delay: 2.2 },
                { letter: 'P', title: 'Places', description: 'Stream healing prayers everywhere!', gradient: 'from-[#8B5CF6] to-[#7C3AED]', delay: 2.3 },
                { letter: 'L', title: 'Languages', description: 'Translate God\'s Word for everyone!', gradient: 'from-[#EC4899] to-[#D946EF]', delay: 2.4 },
                { letter: 'E', title: 'Every Person', description: 'Share with family, friends, and teachers!', gradient: 'from-[#D946EF] to-[#A78BFA]', delay: 2.5 },
                { letter: 'T', title: 'TV, Radio & Media', description: 'Create videos and podcasts!', gradient: 'from-[#A78BFA] to-[#8B5CF6]', delay: 2.6 },
                { letter: 'E', title: 'Effective HERALD', description: 'Evangelism and Festivals!', gradient: 'from-[#8B5CF6] to-[#7C3AED]', delay: 2.7 },
              ].map((item, index) => (
                <motion.div
                  key={`${item.letter}-${index}`}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: item.delay,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                  className="group relative"
                >
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
                  
                  <div className="relative bg-gradient-to-br from-[#EC4899] to-[#A78BFA] rounded-3xl p-[3px]">
                    <div className="bg-gradient-to-br bg-gradient-to-br from-[#EC4899] via-[#D946EF] to-[#A78BFA] rounded-3xl p-6 h-full">
                      {/* Large Letter */}
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                        className="mb-3"
                      >
                        <div className="text-6xl font-extrabold text-center text-white">
                          {item.letter}
                        </div>
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-white text-center mb-2 text-xl font-bold">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/90 text-center text-[16px] leading-relaxed">
                        {item.description}
                      </p>

                      {/* Sparkle decoration */}
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.3,
                        }}
                        className="text-center mt-3 text-2xl"
                      >
                        ✨
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* HTTN Magazine Magic Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8 }}
            className="mt-20 max-w-6xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FBBF24] via-[#F59E0B] to-[#EF4444] p-8 sm:p-12">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              
              {/* Floating book emojis */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -30, 0],
                    rotate: [0, 10, -10, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.8,
                  }}
                  className="absolute text-3xl sm:text-4xl"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${10 + i * 20}%`,
                  }}
                >
                  📚
                </motion.div>
              ))}

              <div className="relative z-10">
                {/* Title */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 2.9, type: 'spring', stiffness: 200 }}
                  className="text-center mb-8"
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                    >
                      <Newspaper className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </motion.div>
                    <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[40px]">
                      HTTN Magazine Magic!
                    </h2>
                    <motion.div
                      animate={{
                        rotate: [0, -360],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="text-4xl sm:text-5xl"
                    >
                      ✨
                    </motion.div>
                  </div>
                  <p className="text-white/90 text-lg sm:text-xl lg:text-[24px]">
                    Healing To The Nations - The Coolest Magazine Ever!
                  </p>
                </motion.div>

                {/* What's HTTN? Card */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 3.0, type: 'spring', stiffness: 200 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl mb-10 max-w-3xl mx-auto"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="text-7xl sm:text-8xl flex-shrink-0"
                    >
                      📖
                    </motion.div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC4899] to-[#D946EF] mb-3 text-3xl sm:text-4xl font-extrabold text-[32px]">
                        What is HTTN?
                      </h3>
                      <p className="text-gray-700 sm:text-lg leading-relaxed text-[16px]">
                        It's a <span className="font-bold text-[#F59E0B]">SUPER AMAZING</span> magazine full of stories about our Lord Jesus, cool activities, and ways <span className="font-bold text-[#F59E0B]">YOU</span> can share God's love with your friends! Every kid in the world needs one! 👍
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Look How We're Sharing HTTN Everywhere - Auto Carousel */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.2 }}
                  className="mb-8"
                >
                  <h3 className="text-white text-2xl sm:text-3xl font-extrabold text-center mb-8 text-[32px]">
                    Look How We're Sharing HTTN Everywhere! 🎉
                  </h3>
                  
                  <HTTNCarousel />
                </motion.div>

                {/* CTA Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {/* Get HTTN Magazine Card */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 3.5 }}
                    whileHover={{ y: -5 }}
                    className="relative bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-3xl p-[3px]"
                  >
                    <div className="bg-white rounded-3xl p-6 h-full flex flex-col items-center text-center">
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                        className="text-6xl mb-4"
                      >
                        📬
                      </motion.div>
                      <h3 className="text-gray-900 mb-3 text-2xl font-extrabold text-[24px]">
                        Get your own HTTN Magazine!
                      </h3>
                      <p className="text-gray-600 mb-6 text-base leading-relaxed flex-grow">
                        Request free copies for you and your friends!
                      </p>
                      <button
                        onClick={() => window.open(HTTN_MAGAZINE_URL, '_blank')}
                        className="px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white rounded-full font-bold hover:shadow-xl transform hover:scale-105 transition-all"
                      >
                        Get HTTN →
                      </button>
                    </div>
                  </motion.div>

                  {/* Share HTTN & Win */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 3.6 }}
                    whileHover={{ y: -5 }}
                    className="relative bg-gradient-to-br from-[#EC4899] to-[#D946EF] rounded-3xl p-[3px]"
                  >
                    <div className="bg-white rounded-3xl p-6 h-full flex flex-col items-center text-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                        }}
                        className="text-6xl mb-4"
                      >
                        ☀️
                      </motion.div>
                      <h3 className="text-gray-900 mb-3 text-2xl font-extrabold text-[24px]">
                        Share HTTN & Win!
                      </h3>
                      <p className="text-gray-600 mb-6 text-base leading-relaxed flex-grow">
                        Earn super cool badges when you share!
                      </p>
                      <button
                        onClick={() => window.open('#glowfest', '_blank')}
                        className="px-6 py-3 bg-gradient-to-r from-[#EC4899] to-[#D946EF] text-white rounded-full font-bold hover:shadow-xl transform hover:scale-105 transition-all"
                      >
                        Start Sharing! →
                      </button>
                    </div>
                  </motion.div>

                  {/* Share Your Story Card */}
                  <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 3.7 }}
                    whileHover={{ y: -5 }}
                    className="relative bg-gradient-to-br from-[#4ECDC4] to-[#06B6D4] rounded-3xl p-[3px]"
                  >
                    <div className="bg-white rounded-3xl p-6 h-full flex flex-col items-center text-center">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                        }}
                        className="text-6xl mb-4"
                      >
                        🎨
                      </motion.div>
                      <h3 className="text-gray-900 mb-3 text-2xl font-extrabold text-[24px]">
                        Create Your Story!
                      </h3>
                      <p className="text-gray-600 mb-6 text-base leading-relaxed flex-grow">
                        Draw and write about Jesus!
                      </p>
                      <button
                        onClick={() => window.open('#impact-stories', '_blank')}
                        className="px-6 py-3 bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] text-white rounded-full font-bold hover:shadow-xl transform hover:scale-105 transition-all"
                      >
                        Let's Go! →
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Register for Glowfest Section */}
          <motion.div
            id="glowfest-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.7 }}
            className="mt-20 max-w-6xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-8 sm:p-12">
              {/* Animated background effects - matching homepage */}
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

              {/* Animated stars/confetti effect */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-100, 800],
                    x: [0, Math.random() * 200 - 100],
                    rotate: [0, 360],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  className="absolute text-xl sm:text-2xl"
                  style={{
                    left: `${i * 6.5}%`,
                    top: '-100px',
                  }}
                >
                  {['🎉', '🎊', '⭐', '🎈', '🌟'][i % 5]}
                </motion.div>
              ))}

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 3.8, type: 'spring', stiffness: 200 }}
                  className="text-center mb-10"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="inline-block mb-6"
                  >
                    <div className="text-8xl">🎊</div>
                  </motion.div>

                  <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
                    Kidspiration GLOWFEST 2025!
                  </h2>
                  <p className="text-gray-300 text-lg sm:text-xl lg:text-[24px] mb-6">
                    The Biggest Kids Celebration EVER! 🌍✨
                  </p>
                  <p className="text-gray-300 text-base sm:text-lg lg:text-[20px] max-w-3xl mx-auto leading-relaxed">
                    Instead of Halloween, dress up as your favorite Bible character and share HTTN Magazine as "eternal treats"! Join thousands of kids around the world spreading Jesus' love! 🌎💖
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  {[
                    {
                      icon: '🥻',
                      title: 'Dress Up',
                      description: 'Dress up as your favorite Bible character!',
                      delay: 3.9,
                    },
                    {
                      icon: '📔',
                      title: 'Share HTTN Magazines',
                      description: 'Give out HTTN magazines at school and everywhere!',
                      delay: 4.0,
                    },
                    {
                      icon: '👏',
                      title: 'Pray',
                      description: 'Pray for other kids around the world!',
                      delay: 4.1,
                    },
                    {
                      icon: '✝️',
                      title: 'Special Messages',
                      description: 'Hear from Pastor Chris & special guests!',
                      delay: 4.2,
                    },
                  ].map((item) => (
                    <motion.div
                      key={item.title}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        delay: item.delay,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all"
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="text-5xl flex-shrink-0"
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <h3 className="text-white text-lg sm:text-xl font-bold mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4.3 }}
                  className="text-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate?.('home')}
                    className="px-6 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-[#FF6B9D] via-[#EC4899] to-[#D946EF] text-white rounded-full shadow-2xl hover:shadow-3xl transition-all group relative overflow-hidden"
                  >
                    {/* Animated shimmer effect */}
                    <motion.div
                      animate={{
                        x: [-200, 200],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                    <span className="relative flex items-center gap-2 sm:gap-3">
                      <PartyPopper className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                      <span className="text-base sm:text-xl lg:text-[24px] font-extrabold text-center text-[18px]">Register for Glowfest!</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                      </motion.div>
                    </span>
                  </motion.button>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.4 }}
                    className="mt-6 text-gray-300 text-base sm:text-lg"
                  >
                    Don't miss out on the celebration of a lifetime! 🎉
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Fun facts section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-[#FFE5EF] via-[#E9D5FF] to-[#D5F5F6] rounded-3xl p-8 text-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="inline-block mb-4"
              >
                <Trophy className="w-12 h-12 text-[#FBBF24]" />
              </motion.div>
              <h3 className="text-gray-900 mb-2 text-2xl font-bold">
                Did you know?
              </h3>
              <p className="text-gray-700 text-[20px]">
                You're part of a global family of kids inspiring hearts in over 50 countries! 🌍
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Parent/Teacher and Pastor/Leader Dashboard (same experience)
  if (user.type === 'parent' || user.type === 'leader' || (user as any).type === 'pastor') {
    return <ParentDashboard onNavigate={onNavigate} />;
  }
  

  return null;
}
