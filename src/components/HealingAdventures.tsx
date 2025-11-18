import { useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Palette, Puzzle, Gamepad2 } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import imgComic1 from 'figma:asset/2ce5a36e14e87806485c33800656ded5a1485124.png';
import imgComic2 from 'figma:asset/e145d46d138b86f7d4dcd4a4996839a18e68edf7.png';
import imgComic3 from 'figma:asset/6106edd412f878f27ce98ecae257c1e5a17a7f77.png';
import imgComic4 from 'figma:asset/2281fd25f5cea14c4e86cbe294def8e9122d8885.png';
import imgComic5 from 'figma:asset/c785ef4e083f943a6476d946c253313fad8f3d4a.png';

interface HealingAdventuresProps {
  onNavigateToGames?: () => void;
  onNavigateToColorGame?: () => void;
  onNavigateToPuzzleGame?: () => void;
}

export function HealingAdventures({ onNavigateToGames, onNavigateToColorGame, onNavigateToPuzzleGame }: HealingAdventuresProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: 'image',
      image: imgComic1,
      caption: 'Jesus Heals the Crippled Woman - Luke 13:10-17',
    },
    {
      type: 'image',
      image: imgComic2,
      caption: 'The woman had been crippled for eighteen years',
    },
    {
      type: 'image',
      image: imgComic3,
      caption: 'Jesus called her forward and said, "Woman, you are set free!"',
    },
    {
      type: 'image',
      image: imgComic4,
      caption: 'Immediately she straightened up and praised God!',
    },
    {
      type: 'image',
      image: imgComic5,
      caption: 'The people rejoiced at all the wonderful things Jesus did',
    },
    {
      type: 'verse',
      title: 'Memory Verse',
      verse: '"So, if the son sets you free, you will be free indeed."',
      reference: 'John 8:36 (KJV)',
    },
  ];

  const progress = ((currentSlide + 1) / slides.length) * 100;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <motion.section
      ref={ref}
      id="adventures"
      className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-[#FFE5EC] via-[#FFF0F5] to-[#E0F2FE] relative overflow-hidden"
      style={{
        transform: isInView ? 'none' : 'rotateY(15deg)',
        opacity: isInView ? 1 : 0.3,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#FF6B9D] to-[#F472B6] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-10 left-1/3 w-36 h-36 bg-gradient-to-br from-[#4ECDC4] to-[#06B6D4] rounded-full blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.55, 0.3],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] mb-4 text-[32px] font-semibold relative inline-block"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255, 107, 157, 0.4))',
            }}
          >
            Healing Adventures from the Bible
            <motion.span
              className="absolute -inset-2 bg-gradient-to-r from-[#FF6B9D]/20 via-[#A78BFA]/20 to-[#4ECDC4]/20 blur-xl rounded-lg -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-[20px]">
            Swipe through amazing stories of healing and miracles from the Bible!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] mx-auto rounded-full mt-4" />
        </motion.div>

        {/* Comic Carousel */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-[#FF6B9D]/20"
        >
          {/* Progress Bar */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Page {currentSlide + 1} of {slides.length}
              </span>
              <span className="text-sm text-[#FF6B9D]">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Slides */}
          <div className="relative min-h-[500px] md:min-h-[600px]">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  scale: index === currentSlide ? 1 : 0.8,
                  x: index === currentSlide ? 0 : index < currentSlide ? -100 : 100,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }}
              >
                {slide.type === 'image' ? (
                  <div className="relative w-full h-full">
                    <img
                      src={slide.image}
                      alt={slide.caption}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <p className="text-white text-center text-[20px]">{slide.caption}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-[#4ECDC4]/10 to-[#A78BFA]/10 p-8 md:p-16">
                    <div className="max-w-2xl text-center space-y-6">
                      <div className="text-6xl m-[0px]">📖</div>
                      <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA] text-[24px] mt-[0px] mr-[0px] mb-[16px] ml-[0px]">
                        {slide.title}
                      </h3>
                      <div className="bg-white p-8 rounded-2xl shadow-lg border-4 border-[#FFE66D]/30 m-[0px]">
                        <p className="text-gray-700 text-lg leading-relaxed mb-4 italic">
                          {slide.verse}
                        </p>
                        <p className="text-[#FF6B9D]">{slide.reference}</p>
                      </div>

                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="pointer-events-auto w-12 h-12 bg-[#FF6B9D] hover:bg-[#F472B6] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 disabled:hover:scale-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="pointer-events-auto w-12 h-12 bg-[#FF6B9D] hover:bg-[#F472B6] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 disabled:hover:scale-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 p-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-[#FF6B9D] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { 
              y: [0, -8, 0], 
              opacity: 1 
            } : {}}
            transition={{ 
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: {
                duration: 0.6,
                delay: 0.4
              }
            }}
          >
            <Button 
              onClick={onNavigateToColorGame}
              className="w-full bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] hover:from-[#F472B6] hover:to-[#FF6B9D] text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Palette className="w-6 h-6" />
              Color the Artwork 🎨
            </Button>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { 
              y: [0, -8, 0], 
              opacity: 1 
            } : {}}
            transition={{ 
              y: {
                duration: 2,
                delay: 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: {
                duration: 0.6,
                delay: 0.5
              }
            }}
          >
            <Button 
              onClick={onNavigateToPuzzleGame}
              className="w-full bg-gradient-to-r from-[#A78BFA] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#A78BFA] text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Puzzle className="w-6 h-6" />
              Complete the Puzzle 🧩
            </Button>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { 
              y: [0, -8, 0], 
              opacity: 1 
            } : {}}
            transition={{ 
              y: {
                duration: 2,
                delay: 0.4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: {
                duration: 0.6,
                delay: 0.6
              }
            }}
          >
            <Button 
              onClick={onNavigateToGames}
              className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4] hover:from-[#06B6D4] hover:to-[#4ECDC4] text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Gamepad2 className="w-6 h-6" />
              Explore Other Games 🎮
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
