import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Palette, Puzzle, Grid3x3, Brain, Sparkles, Trophy, ArrowRight, Search, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GamesPageProps {
  onGameSelect?: (gameId: string) => void;
}

export function GamesPage({ onGameSelect }: GamesPageProps) {
  const heroRef = useRef(null);
  const gamesRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const gamesInView = useInView(gamesRef, { once: true, amount: 0.2 });

  const games = [
    {
      id: 'color-me',
      title: 'Color Me Game',
      description: 'Bring beautiful Bible stories to life with your favorite colors!',
      icon: Palette,
      color: 'from-[#FF6B9D] to-[#F472B6]',
      bgColor: 'bg-pink-50',
      image: 'https://images.unsplash.com/photo-1632069820149-6101a03e0e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNvbG9yaW5nJTIwYXJ0fGVufDF8fHx8MTc2MjQ3NjQyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      emoji: '🎨'
    },
    {
      id: 'puzzle',
      title: 'Puzzle Game',
      description: 'Put the pieces together to reveal amazing healing stories!',
      icon: Puzzle,
      color: 'from-[#A78BFA] to-[#8B5CF6]',
      bgColor: 'bg-purple-50',
      image: 'https://images.unsplash.com/photo-1590146758181-4d4d31adfc76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaWdzYXclMjBwdXp6bGUlMjBwaWVjZXN8ZW58MXx8fHwxNzYyMzg0MzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      emoji: '🧩'
    },
    {
      id: 'crossword',
      title: 'Crossword Puzzle',
      description: 'Find words from the Bible and learn about Jesus\' disciples!',
      icon: Grid3x3,
      color: 'from-[#4ECDC4] to-[#06B6D4]',
      bgColor: 'bg-cyan-50',
      image: 'https://images.unsplash.com/photo-1626195205019-e39840c1df1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9zc3dvcmQlMjBwdXp6bGUlMjBnYW1lfGVufDF8fHx8MTc2MjQ3NjQyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      emoji: '📝'
    },
    {
      id: 'bible-quiz',
      title: 'Bible Quiz',
      description: 'Test your knowledge and learn fun facts about the Bible!',
      icon: Brain,
      color: 'from-[#FBBF24] to-[#F59E0B]',
      bgColor: 'bg-amber-50',
      image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHF1aXolMjBsZWFybmluZ3xlbnwxfHx8fDE3NjI0NzY0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      emoji: '🧠'
    },
    {
      id: 'word-search',
      title: 'Word Search',
      description: 'Find hidden Bible words in the letter grid! Great for all ages.',
      icon: Search,
      color: 'from-[#10B981] to-[#059669]',
      bgColor: 'bg-emerald-50',
      image: 'https://images.unsplash.com/photo-1552321046-a54642dc0cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JkJTIwc2VhcmNoJTIwcHV6emxlfGVufDF8fHx8MTc2MjQxNDUxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      emoji: '🔍'
    },
    {
      id: 'maze',
      title: 'Maze Adventure',
      description: 'Guide the little sheep through the maze to reach Jesus!',
      icon: MapPin,
      color: 'from-[#EC4899] to-[#DB2777]',
      bgColor: 'bg-rose-50',
      image: 'https://images.unsplash.com/photo-1590278458425-6aa3912a48a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXplJTIwZ2FtZSUyMGNoaWxkcmVufGVufDF8fHx8MTc2MjQ4MTIxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      emoji: '🐑'
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={heroInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] rounded-full flex items-center justify-center shadow-2xl mx-auto relative">
              <Sparkles className="w-12 h-12 text-white" />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 border-4 border-white/30 rounded-full"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] mb-6"
          >
            Fun Bible Games! 🎮
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Learn about Jesus and the Bible through exciting games! Color, solve puzzles, 
            find words, and test your knowledge. Let's have fun while learning!
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={heroInView ? { scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <div className="px-6 py-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full shadow-lg">
              <span className="text-2xl">🎨</span>
              <span className="ml-2 text-gray-700 font-bold">6 Amazing Games</span>
            </div>
            <div className="px-6 py-3 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-full shadow-lg">
              <span className="text-2xl">🏆</span>
              <span className="ml-2 text-gray-700 font-bold">Learn & Play</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Games Grid */}
      <section ref={gamesRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {games.map((game, index) => {
              const Icon = game.icon;
              return (
                <motion.div
                  key={game.id}
                  initial={{ y: 50, opacity: 0, scale: 0.9 }}
                  animate={gamesInView ? { y: 0, opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`${game.bgColor} rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer group`}
                  onClick={() => onGameSelect?.(game.id)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${game.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                    
                    {/* Floating Icon */}
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                      className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${game.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{game.emoji}</span>
                      <h3 className={`text-transparent bg-clip-text bg-gradient-to-r ${game.color}`}>
                        {game.title}
                      </h3>
                    </div>
                    <p className="text-gray-700 mb-6">
                      {game.description}
                    </p>

                    {/* Play Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full bg-gradient-to-r ${game.color} text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group-hover:gap-4`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onGameSelect?.(game.id);
                      }}
                    >
                      <span className="font-normal font-bold">Play Now</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Trophy className="w-16 h-16 mx-auto text-amber-500 mb-4" />
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] mb-4 text-[24px] font-bold">
              Why Play Our Games?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '📖', title: 'Learn the Bible', desc: 'Discover amazing Bible stories' },
              { emoji: '🧠', title: 'Grow Smarter', desc: 'Improve your memory and thinking' },
              { emoji: '😊', title: 'Have Fun', desc: 'Enjoy while learning about Jesus' }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-lg"
              >
                <div className="text-5xl mb-4">{benefit.emoji}</div>
                <h3 className="mb-2 text-gray-800 text-[24px] font-bold">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
