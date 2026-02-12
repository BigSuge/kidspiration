import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Heart, Sparkles, Globe, Gift, Users, ZoomIn, X } from 'lucide-react';
import { Button } from "./ui/button";
import { UnifiedSponsorshipModal } from './UnifiedSponsorshipModal';

interface GivePageProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

const INITIATIVES = [
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
    id: "last-child",
    title: "Last Child Challenge",
    description: "Ensuring every child in every nation receives the Gospel.",
    icon: <Sparkles className="w-8 h-8 text-purple-500" />,
    color: "bg-purple-500",
    gradient: "from-purple-500 to-pink-500",
    image: "/images/initiatives/last-child.png"
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

export function GivePage({ onBack, onNavigate }: GivePageProps) {
  const [selectedInitiative, setSelectedInitiative] = useState<typeof INITIATIVES[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const handleSponsorClick = (initiative: typeof INITIATIVES[0]) => {
    setSelectedInitiative(initiative);
    setIsModalOpen(true);
  };

  return (
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
          <div className="flex gap-2">
            {onNavigate && (
              <button
                onClick={() => onNavigate('give/old')}
                className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
              >
                View Previous Layout
              </button>
            )}
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
            Impact Lives Today
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your sponsorship helps us bring hope, joy, and the Gospel to children around the world.
            Select an initiative below to get started.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIATIVES.map((initiative, index) => (
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

      {/* Sponsorship Modal */}
      <UnifiedSponsorshipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initiative={selectedInitiative?.title || "Initiative"}
      />
    </div>
  );
}
