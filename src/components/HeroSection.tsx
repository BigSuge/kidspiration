import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import coverImage from 'figma:asset/aaeaebde10e3a5c9fda9826185fa9028500912d1.png';
import glowfestImage from 'figma:asset/73f6da91498fb6566edc7569a9c25849ca85a64c.png';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: coverImage,
      title: 'Healing to the Nations',
      subtitle: 'For Kids - November 2025',
    },
    {
      image: 'https://images.unsplash.com/photo-1513579636119-039095f588d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNlbGVicmF0aW5nJTIwZmVzdGl2YWwlMjBsaWdodHN8ZW58MXx8fHwxNzYzMTEzNzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Glowfest 2025',
      subtitle: 'Choose Faith Over Fear! ✨',
    },
    {
      image: 'https://images.unsplash.com/photo-1628435509114-969a718d64e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkcmVuJTIwcGxheWluZ3xlbnwxfHx8fDE3NjI0MDcwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Join Our Adventure!',
      subtitle: 'Fun stories and games for everyone',
    },
    {
      image: 'https://images.unsplash.com/photo-1762350096516-cfe17afb8d29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY2VsZWJyYXRpbmclMjBvdXRkb29yc3xlbnwxfHx8fDE3NjI0NjcxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Celebrate our Miracles With Us!',
      subtitle: 'Experience God\'s love every day',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative h-[70vh] md:h-[80vh] overflow-hidden rounded-3xl mx-4 mt-24 shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>

          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-white text-4xl md:text-6xl lg:text-7xl drop-shadow-lg">
                {slides[currentSlide].title}
              </h1>
              <p className="text-white/90 text-lg md:text-2xl drop-shadow-lg">
                {slides[currentSlide].subtitle}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white rounded-full shadow-xl hover:shadow-2xl transition-all"
              >
                Explore Now! ✨
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
