import image_7b2f5724360e58b47e5c818f7e6408804fbfdb34 from 'figma:asset/7b2f5724360e58b47e5c818f7e6408804fbfdb34.png';
import image_57a8d0f946d1db1c7324aeca20477e476b6a49d9 from 'figma:asset/57a8d0f946d1db1c7324aeca20477e476b6a49d9.png';
import image_7ee397727c1451e714b7b75dc34f315f393f5955 from 'figma:asset/7ee397727c1451e714b7b75dc34f315f393f5955.png';
import image_5b8918d244f3d9170f1b217e173a624af722400b from 'figma:asset/5b8918d244f3d9170f1b217e173a624af722400b.png';
import image_0f9a8ae30e33c625a31a88a9c4552868a558fbdf from 'figma:asset/0f9a8ae30e33c625a31a88a9c4552868a558fbdf.png';
import image_0a7cbf864b8e6de8cbd28879a11b16d402dba0e9 from 'figma:asset/0a7cbf864b8e6de8cbd28879a11b16d402dba0e9.png';
import image_4f9488c7a65b0ab8875c64ffff889f8f25e9d7d6 from 'figma:asset/4f9488c7a65b0ab8875c64ffff889f8f25e9d7d6.png';
import image_df5ddd2e48a69f07c2a5ea948154814462659579 from 'figma:asset/df5ddd2e48a69f07c2a5ea948154814462659579.png';
import image_a54fe49f263085b7799f38fcfdf3d3186f2ad9e3 from 'figma:asset/a54fe49f263085b7799f38fcfdf3d3186f2ad9e3.png';
import image_e7506fa59ace7795db96662da684683e9316c803 from 'figma:asset/e7506fa59ace7795db96662da684683e9316c803.png';
import image_3b530c062a1e4a0287ce00ec4e7549cbd8c41f1b from 'figma:asset/3b530c062a1e4a0287ce00ec4e7549cbd8c41f1b.png';
import image_bb07a1601daf44f77a41d1ac57e45dc5ac294a33 from 'figma:asset/bb07a1601daf44f77a41d1ac57e45dc5ac294a33.png';
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Users,
  BookOpen,
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
      type: 'image',
      title: "Take Off with Kidspiration! 🎉",
      subtitle: "Join thousands of kids worldwide",
      description: "Experience inspiring stories, fun activities and adventures.",
      image:
        image_0a7cbf864b8e6de8cbd28879a11b16d402dba0e9,
      ctaText: "Get Started",
      ctaAction: "explore",
      gradient: "from-yellow-400 via-blue-400 to-cyan-500",
      overlayText: "WELCOME TO KIDSPIRATION",
      overlaySubtext:
        "Join the global movement of kids making a difference around the world",
    },
    {
      id: 2,
      type: 'image',
      title: "Become a Kidspiration Hero Today",
      subtitle: "Enlist to join the ER💯 Campaign.",
      description: "Everyone reach 100 children.",
      image:
        image_0f9a8ae30e33c625a31a88a9c4552868a558fbdf,
      ctaText: "Join Now",
      ctaAction: "join",
      gradient: "from-teal-400 via-cyan-500 to-blue-500",
      overlayText: "ENLIST AS A KIDSPIRATION HERO TODAY",
      overlaySubtext:
        "Enlist to join the ER100 CAMPAIGN, EVERYONE REACH 100 CHILDREN during the October Edition of the HEALING STREAMS LIVE HEALING SERVICES",
    },
    {
      id: 3,
      type: 'image',
      title: "Read Healing to the Nations Magazine",
      subtitle: "Interactive Digital Magazine for Kids",
      description:
        "Stories, games, and miracles made just for you!",
      image:
        image_4f9488c7a65b0ab8875c64ffff889f8f25e9d7d6,
      ctaText: "HTTN Magazine",
      ctaAction: "httn",
      gradient: "from-teal-400 via-cyan-500 to-blue-500",
      overlayText: "HEALING TO THE NATIONS",
      overlaySubtext:
        "Experience our interactive digital magazine with inspiring stories and fun activities",
    },
    {
      id: 5,
      type: 'image',
      title: "Order HTTN Magazine for Kids",
      subtitle: "Get the January Edition of the HTTN FOR KIDS",
      description:
        "Order the new Healing to the Nations Magazine for Kids",
      image:
        image_4f9488c7a65b0ab8875c64ffff889f8f25e9d7d6,
      ctaText: "Order Now",
      ctaAction: "order",
      gradient: "from-cyan-400 via-blue-500 to-indigo-500",
      overlayText: "HTTN FOR KIDS JANUARY EDITION",
      overlaySubtext:
        "Help reach children around the world with the Healing to the Nations Magazine for Kids",
    },
    {
      id: 6,
      type: 'image',
      title: "Kidspiration Marketplace",
      subtitle: "Shop with Purpose",
      description:
        "Get official merchandise and support children worldwide!",
      image:
        image_7ee397727c1451e714b7b75dc34f315f393f5955,
      ctaText: "Shop Now",
      ctaAction: "marketplace",
      gradient: "from-purple-500 via-pink-500 to-orange-400",
      overlayText: "KIDSPIRATION MARKETPLACE",
      overlaySubtext:
        "Discover amazing products while supporting children worldwide. Every purchase makes a difference!",
    },
    {
      id: 7,
      type: 'image',
      title: "Kidspiration Party Initiative",
      subtitle: "Celebrate Every Child",
      description:
        "Bring joy to children who may have never had a birthday party.",
      image:
        image_7b2f5724360e58b47e5c818f7e6408804fbfdb34,
      ctaText: "Join the Celebration",
      ctaAction: "party",
      gradient: "from-pink-500 via-purple-500 to-blue-500",
      overlayText: "KIDSPIRATION PARTY INITIATIVE",
      overlaySubtext:
        "Celebrating children who may have never had a birthday party before. Spreading love, joy, and the message of God's love to every child.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length,
    );
  };

  const handleCTA = (action: string) => {
    if (action === "join" && onAuthClick) {
      onAuthClick();
    } else if (action === "httn") {
      window.open(HTTN_MAGAZINE_URL, "_blank");
    } else if (action === "explore") {
      onNavigate?.("explore");
    } else if (action === "order") {
      window.open("https://httnmagazine.org/magazine/order?type=kids", "_blank");
    } else if (action === "marketplace") {
      onNavigate?.("marketplace");
    } else if (action === "party") {
      onNavigate?.("party");
    }
  };

  return (
    <section className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2">
            {/* Left Image - 1:1 Aspect Ratio */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-100 flex items-center justify-center">
              <ImageWithFallback
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Right Content */}
            <div
              className={`bg-gradient-to-br ${slides[currentSlide].gradient} p-12 xl:p-16 flex flex-col justify-center items-start`}
            >
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <h1 className="text-white leading-none max-w-xl font-bold text-[40px]">
                  {slides[currentSlide].title}
                </h1>

                <div className="space-y-3">
                  <p className="text-white text-2xl xl:text-3xl font-semibold font-bold text-[27px] font-normal">
                    {slides[currentSlide].subtitle}
                  </p>
                  <p className="text-white text-xl xl:text-2xl font-medium opacity-90 font-bold font-normal">
                    {slides[currentSlide].description}
                  </p>
                </div>

                <div className="space-y-8">
                  <button
                    onClick={() =>
                      handleCTA(slides[currentSlide].ctaAction)
                    }
                    className={`bg-white/90 backdrop-blur-sm border-2 border-white/50 px-6 py-3 rounded-full text-base font-bold hover:shadow-2xl hover:bg-white transform hover:scale-105 transition-all text-transparent bg-clip-text bg-gradient-to-r ${slides[
                      currentSlide
                    ].gradient
                      .replace(
                        /from-(\w+)-(\d+)/,
                        "from-$1-800",
                      )
                      .replace(/via-(\w+)-(\d+)/, "via-$1-700")
                      .replace(/to-(\w+)-(\d+)/, "to-$1-700")}`}
                  >
                    {slides[currentSlide].ctaText}
                  </button>

                  {/* Navigation Arrows */}
                  <div className="flex gap-6 m-[0px]">
                    <button
                      onClick={prevSlide}
                      className="w-15 h-15 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all border border-white/30 shadow-lg"
                    >
                      <ChevronLeft className="w-8 h-8 text-white" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="w-15 h-15 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all border border-white/30 shadow-lg"
                    >
                      <ChevronRight className="w-8 h-8 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col relative">
            {/* Mobile Image Section - 1:1 Aspect Ratio */}
            <div className="relative w-full aspect-square flex-shrink-0 bg-gray-100 flex items-center justify-center">
              <ImageWithFallback
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-contain"
              />
              {/* Gradient Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 p-[0px]" />
            </div>

            {/* Compact Content Section */}
            <div
              className={`bg-gradient-to-br ${slides[currentSlide].gradient} p-5 pb-16 flex flex-col justify-between flex-shrink-0 relative`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <h1 className="text-white leading-tight font-bold text-[24px]">
                  {slides[currentSlide].title}
                </h1>

                <div className="space-y-1">
                  <p className="text-white font-semibold opacity-95 text-[16px] font-bold">
                    {slides[currentSlide].subtitle}
                  </p>
                  <p className="text-white font-medium opacity-90 text-[16px]">
                    {slides[currentSlide].description}
                  </p>
                </div>

                {/* CTA Button - After Description */}
                <div className="pt-2">
                  <button
                    onClick={() =>
                      handleCTA(slides[currentSlide].ctaAction)
                    }
                    className={`bg-white/90 backdrop-blur-sm border-2 border-white/50 px-4 py-2 rounded-full font-bold hover:shadow-xl hover:bg-white transform hover:scale-105 transition-all text-transparent bg-clip-text bg-gradient-to-r ${slides[
                      currentSlide
                    ].gradient
                      .replace(/from-(\w+)-(\d+)/, "from-$1-800")
                      .replace(/via-(\w+)-(\d+)/, "via-$1-700")
                      .replace(/to-(\w+)-(\d+)/, "to-$1-700")}`}
                  >
                    {slides[currentSlide].ctaText}
                  </button>
                </div>
              </motion.div>

              {/* Slide Indicators - Bottom Left */}
              <div className="absolute bottom-5 left-5 flex gap-2 z-20">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${index === currentSlide
                        ? "w-8 bg-white"
                        : "w-2 bg-white/50"
                      }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows - Bottom Right */}
              <div className="absolute bottom-5 right-5 flex gap-2 z-20">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-105 transition-all border border-white/30 shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-105 transition-all border border-white/30 shadow-lg"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}


How can I get the HTTN magazine Slide to have two CTAs, such that one button redirects to another link.
