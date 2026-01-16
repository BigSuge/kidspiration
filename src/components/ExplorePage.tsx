import { motion } from 'motion/react';
import { Users, Heart, ShoppingBag, Languages, ArrowRight, Sparkles, Music, Gamepad, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import image_0f9a8ae30e33c625a31a88a9c4552868a558fbdf from 'figma:asset/0f9a8ae30e33c625a31a88a9c4552868a558fbdf.png';
import image_7b2f5724360e58b47e5c818f7e6408804fbfdb34 from 'figma:asset/7b2f5724360e58b47e5c818f7e6408804fbfdb34.png';
import image_7ee397727c1451e714b7b75dc34f315f393f5955 from 'figma:asset/7ee397727c1451e714b7b75dc34f315f393f5955.png';
import image_bb07a1601daf44f77a41d1ac57e45dc5ac294a33 from 'figma:asset/bb07a1601daf44f77a41d1ac57e45dc5ac294a33.png';
import image_glowfest from 'figma:asset/5b8918d244f3d9170f1b217e173a624af722400b.png'; // Reusing Glowfest image
import image_games from '../assets/bible_games_arcade.png'; // New Games image
import image_httn from 'figma:asset/4f9488c7a65b0ab8875c64ffff889f8f25e9d7d6.png'; // Reusing HTTN image

interface ExplorePageProps {
  onNavigate?: (page: string) => void;
}

export function ExplorePage({ onNavigate }: ExplorePageProps) {
  const programs = [
    {
      id: 'er100',
      title: 'ER100 Initiative',
      subtitle: 'Each One Reach 100',
      description: 'This is a campaign to reach 3 Billion Children with the message of faith,healing and hope through the C.O.M.P.L.E.T.E Mandate while distributing the instrument of faith - the Healing to the Nations Magazine for kids.',
      image: image_0f9a8ae30e33c625a31a88a9c4552868a558fbdf,
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      stats: ['10,000+ Kids', '1M+ Reached', '50+ Countries'],
    },
    {
      id: 'party',
      title: 'Kidspiration Party Initiative',
      subtitle: 'Celebrating Every Child',
      description: 'We celebrate children across the globe who never had the opportunity to be celebrated—including orphans and underprivileged kids. Every child deserves to feel special!',
      image: image_7b2f5724360e58b47e5c818f7e6408804fbfdb34,
      icon: Heart,
      gradient: 'from-[#A78BFA] to-[#C4B5FD]',
      stats: ['500+ Parties', '25,000+ Kids', 'Monthly Events'],
    },
    {
      id: 'marketplace',
      title: 'Kidspiration Marketplace',
      subtitle: 'Wear Your Inspiration',
      description: 'Get official Kidspiration merchandise including t-shirts, caps, tracksuits, stickers, and more! Show the world you\'re part of the movement. (For parents and adults)',
      image: image_7ee397727c1451e714b7b75dc34f315f393f5955,
      icon: ShoppingBag,
      gradient: 'from-[#4ECDC4] to-[#7FE8DB]',
      stats: ['100+ Items', 'Worldwide Shipping', 'Quality Guaranteed'],
      adultOnly: true,
    },
    {
      id: 'glowfest',
      title: 'Kidspiration Glowfest',
      subtitle: 'Music, Fun & Faith',
      description: 'Join the ultimate celebration of faith, music, and joy! Experience amazing performances, inspiring messages, and unforgettable moments with friends.',
      image: image_glowfest,
      icon: Music,
      gradient: 'from-[#FF6B9D] to-[#F472B6]',
      stats: ['Live Concerts', 'Global Events', 'Amazing Artists'],
    },
    {
      id: 'httn-animated',
      title: 'HTTN Magazine For Kids',
      subtitle: 'Watch the Word Come Alive',
      description: 'Experience the Healing to the Nations Magazine like never before! Watch animated stories, testimonies, and lessons that bring faith to life.',
      image: image_httn,
      icon: Play,
      gradient: 'from-[#4ECDC4] to-[#00D4FF]',
      stats: ['Animated Stories', 'Fun Lessons', 'Watch Anytime'],
      externalLink: 'https://httnmagazine.org/kids',
    },
    {
      id: 'games',
      title: 'Bible Games',
      subtitle: 'Play & Learn',
      description: 'Have fun while learning about the Bible! Enjoy puzzles, quizzes, coloring games, and more designed to challenge and inspire you.',
      image: image_games,
      icon: Gamepad,
      gradient: 'from-[#FBBF24] to-[#F59E0B]',
      stats: ['6+ Games', 'Fun Challenges', 'Win Trophies'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#FFE5EF] via-[#F3E8FF] to-[#D5F5F6] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF6B9D]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#4ECDC4]/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Sparkles className="w-10 h-10 text-[#FF6B9D]" />
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] text-5xl font-extrabold text-[40px]">
                Explore Our Initatives
              </h1>
              <Sparkles className="w-10 h-10 text-[#4ECDC4]" />
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed text-[20px]">
              Discover exciting ways to get involved, make a difference, and inspire hearts around the world!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="space-y-20">
            {programs.map((program, index) => {
              const Icon = program.icon;
              const isReverse = index % 2 !== 0;

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${isReverse ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Image */}
                  <div className={`${isReverse ? 'lg:order-2' : ''}`}>
                    <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                      <ImageWithFallback
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Icon Badge */}
                      <div className={`absolute top-6 right-6 w-16 h-16 bg-gradient-to-br ${program.gradient} rounded-2xl flex items-center justify-center shadow-xl`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`space-y-6 ${isReverse ? 'lg:order-1' : ''}`}>
                    <div>
                      <div className={`inline-block px-5 py-2 bg-gradient-to-r ${program.gradient} text-white rounded-full text-base font-semibold mb-4`}>
                        {program.subtitle}
                      </div>
                      <h2 className="text-gray-900 mb-6 text-4xl font-bold text-[32px]">{program.title}</h2>
                      <p className="text-gray-600 leading-relaxed text-[20px]">
                        {program.description}
                      </p>
                    </div>

                    {/* Special Labels */}
                    {program.trailblazersOnly && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-xl w-fit">
                        <span className="text-2xl">⭐</span>
                        <span className="text-sm text-purple-800">For Trailblazers (Ages 9-12)</span>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        if ((program as any).externalLink) {
                          window.open((program as any).externalLink, '_blank');
                        } else {
                          onNavigate?.(program.id);
                        }
                      }}
                      className={`px-8 py-4 bg-gradient-to-r ${program.gradient} text-white rounded-full hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 group`}
                    >
                      <span className="font-bold">{(program as any).externalLink ? 'Watch Now' : 'Learn More'}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h2 className="mb-6 font-bold text-[32px]">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 text-white/90 text-[24px]">
              Choose a program that speaks to your heart and start your journey of inspiration today!
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-[#FF6B9D] rounded-full hover:shadow-2xl transform hover:scale-105 transition-all text-[20px] font-bold"
            >
              Back to Top
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
