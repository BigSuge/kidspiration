import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Heart, Star, Lightbulb } from 'lucide-react';

export function MiracleZone() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const [likes, setLikes] = useState<{ [key: number]: number }>({ 1: 42, 2: 38 });
  const [isLiked, setIsLiked] = useState<{ [key: number]: boolean }>({});
  const [sparkles, setSparkles] = useState<{ [key: number]: boolean }>({});
  const [expandedMiracles, setExpandedMiracles] = useState<{ [key: number]: boolean }>({});

  const handleLike = (miracleId: number) => {
    const newLikedState = !isLiked[miracleId];
    setIsLiked({ ...isLiked, [miracleId]: newLikedState });
    setLikes({
      ...likes,
      [miracleId]: newLikedState ? (likes[miracleId] || 0) + 1 : (likes[miracleId] || 0) - 1,
    });
    
    if (newLikedState) {
      setSparkles({ ...sparkles, [miracleId]: true });
      setTimeout(() => {
        setSparkles({ ...sparkles, [miracleId]: false });
      }, 1000);
    }
  };

  const toggleExpanded = (miracleId: number) => {
    setExpandedMiracles({ ...expandedMiracles, [miracleId]: !expandedMiracles[miracleId] });
  };

  const miracles = [
    {
      id: 1,
      title: 'Sarah\'s Healing',
      story: 'Sarah was sick for many days with a high fever that wouldn\'t go away. The doctors tried everything, but nothing worked. Her parents and church members gathered to pray for her healing. As they laid hands on her and declared God\'s Word over her life, something amazing happened! Sarah felt warmth flowing through her body, and immediately the fever broke! She jumped out of bed full of energy and started playing. The doctors were amazed when they examined her the next day - there was no sign of the illness. God is so faithful!',
      lesson: 'When we pray with faith and declare God\'s Word, miracles happen! God\'s healing power is always available to us. No matter how difficult the situation looks, God is faithful and able to heal completely.',
      image: 'https://images.unsplash.com/photo-1628435509114-969a718d64e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkcmVuJTIwcGxheWluZ3xlbnwxfHx8fDE3NjI0MDcwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      age: 8,
      location: 'Nigeria',
    },
    {
      id: 2,
      title: 'Michael\'s Miracle',
      story: 'Michael was born with a condition that made it very difficult for him to walk. He had to use crutches and couldn\'t run or play sports like other kids. His dream was to play soccer with his friends at school. One Sunday at church, during a special healing service, Pastor prayed for all the children. Michael felt a tingling sensation in his legs. That week at home, he tried walking without his crutches - and he could do it! Day by day, his legs grew stronger. Now Michael is the fastest runner in his class and plays on the school soccer team. He gives all the glory to God for his miraculous healing!',
      lesson: 'God cares about our dreams and desires! Nothing is impossible with God. Even when you\'re born with a challenge, God\'s power can transform your situation completely. Keep believing and give God all the glory!',
      image: 'https://images.unsplash.com/photo-1762350096516-cfe17afb8d29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY2VsZWJyYXRpbmclMjBvdXRkb29yc3xlbnwxfHx8fDE3NjI0NjcxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      age: 10,
      location: 'USA',
    },
  ];

  return (
    <motion.section
      ref={ref}
      id="miracles"
      className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-[#FFE66D]/20 to-[#FF6B9D]/20"
      style={{
        transform: isInView ? 'none' : 'rotateY(15deg)',
        opacity: isInView ? 1 : 0.3,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#A78BFA] to-[#C084FC] text-white rounded-full mb-6 shadow-lg">
            <Star className="w-5 h-5" />
            <span className="text-[24px]">Miracle Zone</span>
          </div>
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] mb-4">
            Amazing Miracles & Testimonies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-[20px]">
            Real stories from kids just like you who experienced God's miraculous power!
          </p>
        </motion.div>

        <div className="space-y-8">
          {miracles.map((miracle, index) => {
            const isExpanded = expandedMiracles[miracle.id];
            const truncatedStory = miracle.story.slice(0, 150) + '...';
            
            return (
              <motion.div
                key={miracle.id}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-stretch bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-[#4ECDC4]/20 hover:border-[#FF6B9D]/40 transition-all`}
              >
                {/* Image */}
                <div className="w-full md:w-1/2 min-h-[300px] relative overflow-hidden group">
                  <img
                    src={miracle.image}
                    alt={miracle.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                      <span className="text-lg">
                        {miracle.location === 'Nigeria' ? '🇳🇬' : 
                         miracle.location === 'USA' ? '🇺🇸' : '🌍'}
                      </span>
                      <span className="text-sm text-gray-700">{miracle.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 space-y-4">
                  <div className="inline-block px-4 py-1 bg-gradient-to-r from-[#FFE66D] to-[#FFC107] text-gray-800 rounded-full text-sm">
                    Age {miracle.age}
                  </div>
                  <h3 className="text-gray-800 font-normal">{miracle.title}</h3>
                  <div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {isExpanded ? miracle.story : truncatedStory}
                    </p>
                    
                    {/* Lesson Section - Only shown when expanded */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="mt-4 p-4 bg-gradient-to-r from-[#FFE66D]/20 via-[#FFC107]/10 to-[#FFE66D]/20 border-l-4 border-[#FFC107] rounded-r-2xl"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#FFE66D] to-[#FFC107] rounded-full flex items-center justify-center shadow-md">
                              <Lightbulb className="w-4 h-4 text-gray-800" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-[#FFA000] mb-2 uppercase tracking-wide text-sm">
                              Lesson from this testimony
                            </h4>
                            <p className="text-gray-700 leading-relaxed italic">
                              {miracle.lesson}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    <button
                      onClick={() => toggleExpanded(miracle.id)}
                      className="text-[#FF6B9D] hover:text-[#F472B6] mt-2 text-lg transition-colors"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  </div>
                  <div className="flex items-center gap-3 pt-4 relative">
                    <button
                      onClick={() => handleLike(miracle.id)}
                      className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF6B9D]/10 to-[#FF6B9D]/20 hover:from-[#FF6B9D]/20 hover:to-[#FF6B9D]/30 rounded-full transition-all transform hover:scale-105"
                    >
                      <motion.span
                        className="text-2xl"
                        animate={{
                          scale: isLiked[miracle.id] ? [1, 1.3, 1] : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {isLiked[miracle.id] ? '❤️' : '🤍'}
                      </motion.span>
                      <span className="text-gray-700">{likes[miracle.id] || 0}</span>
                      
                      {/* Sparkle hearts animation */}
                      {sparkles[miracle.id] && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <motion.span
                              key={i}
                              className="absolute text-sm pointer-events-none"
                              initial={{ 
                                x: 0, 
                                y: 0, 
                                opacity: 1,
                                scale: 0.5,
                              }}
                              animate={{
                                x: Math.cos((i * Math.PI * 2) / 6) * 40,
                                y: Math.sin((i * Math.PI * 2) / 6) * 40 - 20,
                                opacity: 0,
                                scale: 1,
                              }}
                              transition={{
                                duration: 1,
                                ease: 'easeOut',
                              }}
                            >
                              ❤️
                            </motion.span>
                          ))}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Share Your Story CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { 
            y: [0, -10, 0], 
            opacity: 1,
            scale: [1, 1.02, 1],
          } : {}}
          transition={{ 
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: 0.6,
              delay: 0.6
            }
          }}
          className="mt-12 text-center bg-gradient-to-r from-[#4ECDC4] to-[#48D1CC] rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden"
        >
          {/* Animated shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
              ease: "easeInOut"
            }}
          />
          
          <div className="relative z-10">
            <motion.h3 
              className="text-white mb-4 text-[24px] font-semibold"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Have a miracle story to share?
            </motion.h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              We'd love to hear how God has worked in your life! Share your testimony and inspire other kids around the world.
            </p>
            <motion.button 
              className="px-8 py-4 bg-white text-[#4ECDC4] rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Share Your Story ✨
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
