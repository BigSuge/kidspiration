import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Sparkles, Globe, Gift, Users, ZoomIn, Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from "./ui/button";
import { UnifiedSponsorshipModal } from './UnifiedSponsorshipModal';

interface GivePageProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

const FEATURED_INITIATIVE = {
  id: "last-child",
  title: "The Last Child Challenge",
  description: "We are on the race to reach the last child with the Healing to the Nations Magazine for Kids.",
  icon: <Sparkles className="w-8 h-8 text-purple-500" />,
  color: "bg-purple-500",
  gradient: "from-purple-500 to-pink-500",
  slides: [
    "/images/featured/last-child/slide1.png",
    "/images/featured/last-child/slide2.png",
    "/images/featured/last-child/slide3.png"
  ]
};

const OTHER_INITIATIVES = [
  {
    id: "er100",
    title: "ER100",
    description: "Reach 100 children with the Gospel through the C.O.M.P.L.E.T.E mandate.",
    icon: <Users className="w-8 h-8 text-blue-500" />,
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    image: "/images/initiatives/er100.png"
  },
  {
    id: "party",
    title: "Party Initiative",
    description: "Sponsor birthday parties for underprivileged children.",
    icon: <Gift className="w-8 h-8 text-pink-500" />,
    color: "bg-pink-500",
    gradient: "from-pink-500 to-red-500",
    image: "/images/initiatives/party.png"
  },
  {
    id: "missions",
    title: "Missions",
    description: "Support global missionary trips and outreach programs.",
    icon: <Globe className="w-8 h-8 text-green-500" />,
    color: "bg-green-500",
    gradient: "from-green-500 to-emerald-500",
    image: "/images/initiatives/missions.png"
  },
  {
    id: "outreach",
    title: "Outreach",
    description: "Community development and aid programs.",
    icon: <Heart className="w-8 h-8 text-orange-500" />,
    color: "bg-orange-600",
    gradient: "from-orange-600 to-red-600",
    image: "/images/initiatives/outreach.png"
  }
];

export function GivePage({ onBack }: GivePageProps) {
  const [selectedInitiative, setSelectedInitiative] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % FEATURED_INITIATIVE.slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % FEATURED_INITIATIVE.slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + FEATURED_INITIATIVE.slides.length) % FEATURED_INITIATIVE.slides.length);
  };

  const handleSponsorClick = (initiative: any) => {
    setSelectedInitiative(initiative);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-20 pt-24 relative z-0">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
              Impact Lives Today
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your sponsorship helps us bring hope, joy, and the Gospel to children around the world.
            </p>
          </div>

          {/* Featured Initiative Carousel Section - Split Layout */}
          <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl bg-white grid grid-cols-1 lg:grid-cols-2 isolate">

            {/* Image Side (Left on Desktop, Top on Mobile) */}
            <div className="relative h-[400px] lg:h-auto lg:min-h-[500px] bg-gray-100 overflow-hidden group">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={currentSlide}
                  custom={direction}
                  src={FEATURED_INITIATIVE.slides[currentSlide]}
                  initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Dots Overlay on Image */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {FEATURED_INITIATIVE.slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setDirection(idx > currentSlide ? 1 : -1); setCurrentSlide(idx); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all shadow-lg ${currentSlide === idx ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'}`}
                  />
                ))}
              </div>
            </div>

            {/* Content Side (Right on Desktop, Bottom on Mobile) */}
            <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white">

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-white/20 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                  FEATURED CAMPAIGN
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                  {FEATURED_INITIATIVE.title}
                </h2>

                <p className="text-lg md:text-xl text-purple-100 mb-8 max-w-xl leading-relaxed">
                  {FEATURED_INITIATIVE.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <Button
                    onClick={() => handleSponsorClick(FEATURED_INITIATIVE)}
                    className="px-8 py-6 text-lg font-bold bg-white text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all shadow-xl border-none"
                  >
                    Sponsor Now
                  </Button>
                </div>

                {/* Navigation Controls */}
                <div className="flex gap-4 mt-12">
                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all border border-white/20"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-all border border-white/20"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">More Ways to Give</h3>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {OTHER_INITIATIVES.map((initiative, index) => (
              <motion.div
                key={initiative.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100"
              >
                {/* Image Section (Top) */}
                <div className="h-56 relative overflow-hidden group cursor-pointer" onClick={() => setZoomedImage(initiative.image)}>
                  <img
                    src={initiative.image}
                    alt={initiative.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay with Zoom Icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Content Section (Middle & Bottom) */}
                <div className="p-6 flex flex-col flex-grow items-center text-center">
                  <div className="mb-4 p-3 bg-gray-50 rounded-2xl">
                    {initiative.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{initiative.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed mb-6">
                    {initiative.description}
                  </p>

                  <div className="mt-auto w-full">
                    <Button
                      onClick={() => handleSponsorClick(initiative)}
                      className={`w-full py-6 text-lg font-bold text-white bg-gradient-to-r ${initiative.gradient} hover:opacity-90 hover:scale-[1.02] active:scale-95 rounded-xl shadow-md transition-all border-0 ring-0`}
                    >
                      Sponsor {initiative.title}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Image Zoom Modal */}
        <AnimatePresence>
          {zoomedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setZoomedImage(null)}
            >
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={zoomedImage}
                alt="Zoomed view"
                className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain cursor-default"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <UnifiedSponsorshipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initiative={selectedInitiative?.title || "Initiative"}
      />
    </>
  );
}
