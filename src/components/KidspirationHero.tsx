import image_7b2f5724360e58b47e5c818f7e6408804fbfdb34 from 'figma:asset/7b2f5724360e58b47e5c818f7e6408804fbfdb34.png';
import image_7ee397727c1451e714b7b75dc34f315f393f5955 from 'figma:asset/7ee397727c1451e714b7b75dc34f315f393f5955.png';
import image_0f9a8ae30e33c625a31a88a9c4552868a558fbdf from 'figma:asset/0f9a8ae30e33c625a31a88a9c4552868a558fbdf.png';
import image_0a7cbf864b8e6de8cbd28879a11b16d402dba0e9 from 'figma:asset/0a7cbf864b8e6de8cbd28879a11b16d402dba0e9.png';
import image_4f9488c7a65b0ab8875c64ffff889f8f25e9d7d6 from 'figma:asset/4f9488c7a65b0ab8875c64ffff889f8f25e9d7d6.png';

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { HTTN_MAGAZINE_URL } from '../config/urls';

interface KidspirationHeroProps {
  onAuthClick?: () => void;
  onNavigate?: (page: string) => void;
}

export function KidspirationHero({
  onAuthClick,
  onNavigate,
}: KidspirationHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Take Off with Kidspiration! 🎉",
      subtitle: "Join thousands of kids worldwide",
      description: "Experience inspiring stories, fun activities and adventures.",
      image: image_0a7cbf864b8e6de8cbd28879a11b16d402dba0e9,
      ctaText: "Get Started",
      ctaAction: "explore",
      gradient: "from-yellow-400 via-blue-400 to-cyan-500",
    },
    {
      id: 2,
      title: "Become a Kidspiration Hero Today",
      subtitle: "Enlist to join the ER💯 Campaign.",
      description: "Everyone reach 100 children.",
      image: image_0f9a8ae30e33c625a31a88a9c4552868a558fbdf,
      ctaText: "Join Now",
      ctaAction: "join",
      gradient: "from-teal-400 via-cyan-500 to-blue-500",
    },
    {
      id: 3,
      title: "Read Healing to the Nations Magazine",
      subtitle: "Interactive Digital Magazine for Kids",
      description: "Stories, games, and miracles made just for you!",
      image: image_4f9488c7a65b0ab8875c64ffff889f8f25e9d7d6,
      ctaText: "HTTN Magazine",
      ctaAction: "httn",
      gradient: "from-teal-400 via-cyan-500 to-blue-500",
    },
    {
      id: 5,
      title: "Order HTTN Magazine for Kids",
      subtitle: "Get the January Edition of the HTTN FOR KIDS",
      description: "Order the new Healing to the Nations Magazine for Kids",
      image: image_4f9488c7a65b0ab8875c64ffff889f8f25e9d7d6,
      ctaText: "Order Now",
      ctaAction: "order",
      gradient: "from-cyan-400 via-blue-500 to-indigo-500",
    },
    {
      id: 6,
      title: "Kidspiration Marketplace",
      subtitle: "Shop with Purpose",
      description: "Get official merchandise and support children worldwide!",
      image: image_7ee397727c1451e714b7b75dc34f315f393f5955,
      ctaText: "Shop Now",
      ctaAction: "marketplace",
      gradient: "from-purple-500 via-pink-500 to-orange-400",
    },
    {
      id: 7,
      title: "Kidspiration Party Initiative",
      subtitle: "Celebrate Every Child",
      description: "Bring joy to children who may have never had a birthday party.",
      image: image_7b2f5724360e58b47e5c818f7e6408804fbfdb34,
      ctaText: "Join the Celebration",
      ctaAction: "party",
      gradient: "from-pink-500 via-purple-500 to-blue-500",
    },
  ];

  // FIX: Added currentSlide to dependency array so timer resets on manual navigation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleCTA = (action: string) => {
    if (action === "join" && onAuthClick) onAuthClick();
    else if (action === "httn") window.open(HTTN_MAGAZINE_URL, "_blank");
    else if (action === "order") window.open("https://httnmagazine.org/magazine/order?type=kids", "_blank");
    else if (action === "explore") onNavigate?.("explore");
    else if (action === "marketplace") onNavigate?.("marketplace");
    else if (action === "party") onNavigate?.("party");
  };

  return (
    <section className="relative bg-white rounded-3xl overflow-hidden shadow-2xl h-[600px] lg:h-[500px]">
      <AnimatePresence mode="popLayout">
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={slide.id}
              initial={{ x: "100%" }}
              animate={{ x: 0, zIndex: 1 }}
              exit={{ x: "-100%", zIndex: 0 }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-2 h-full">
                <div className="relative w-full h-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <ImageWithFallback
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className={`bg-gradient-to-br ${slide.gradient} p-12 xl:p-16 flex flex-col justify-center items-start h-full`}>
                  <div className="space-y-8">
                    <h1 className="text-white leading-none max-w-xl font-bold text-[40px]">
                      {slide.title}
                    </h1>

                    <div className="space-y-3">
                      <p className="text-white text-2xl xl:text-3xl font-bold text-[27px]">
                        {slide.subtitle}
                      </p>
                      <p className="text-white text-xl xl:text-2xl font-medium opacity-90">
                        {slide.description}
                      </p>
                    </div>

                    <div className="space-y-8">
                      <div className="flex flex-wrap gap-4">
                        <button
                          onClick={() => handleCTA(slide.ctaAction)}
                          className={`bg-white/90 backdrop-blur-sm border-2 border-white/50 px-6 py-3 rounded-full text-base font-bold hover:shadow-2xl hover:bg-white transform hover:scale-105 transition-all text-transparent bg-clip-text bg-gradient-to-r ${slide.gradient.replace(/from-(\w+)-(\d+)/, "from-$1-800").replace(/via-(\w+)-(\d+)/, "via-$1-700").replace(/to-(\w+)-(\d+)/, "to-$1-700")}`}
                        >
                          {slide.ctaText}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="lg:hidden flex flex-col relative h-full">
                <div className="relative w-full h-1/2 flex-shrink-0 bg-gray-100 flex items-center justify-center">
                  <ImageWithFallback
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                </div>

                <div className={`bg-gradient-to-br ${slide.gradient} p-5 pb-16 flex flex-col justify-between flex-grow relative`}>
                  <div className="space-y-3">
                    <h1 className="text-white leading-tight font-bold text-[24px]">
                      {slide.title}
                    </h1>

                    <div className="space-y-1">
                      <p className="text-white font-bold text-[16px]">
                        {slide.subtitle}
                      </p>
                      <p className="text-white opacity-90 text-[16px]">
                        {slide.description}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleCTA(slide.ctaAction)}
                        className={`bg-white/90 backdrop-blur-sm border-2 border-white/50 px-4 py-2 rounded-full font-bold hover:shadow-xl hover:bg-white transform hover:scale-105 transition-all text-transparent bg-clip-text bg-gradient-to-r ${slide.gradient.replace(/from-(\w+)-(\d+)/, "from-$1-800").replace(/via-(\w+)-(\d+)/, "via-$1-700").replace(/to-(\w+)-(\d+)/, "to-$1-700")}`}
                      >
                        {slide.ctaText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Controls - Absolute on top of slides */}
      <div className="absolute bottom-5 right-5 lg:bottom-12 lg:right-12 z-20 flex gap-4">
        <button onClick={prevSlide} className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all border border-white/30">
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        </button>
        <button onClick={nextSlide} className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all border border-white/30">
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        </button>
      </div>

    </section>
  );
}
