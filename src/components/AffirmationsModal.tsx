import { motion, AnimatePresence } from 'motion/react';
import { X, Heart } from 'lucide-react';
import { Button } from './ui/button';

interface AffirmationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AffirmationsModal({ isOpen, onClose }: AffirmationsModalProps) {
  const affirmations = [
    'I am a child of God and His life is in me!',
    'I am strong and healthy in Jesus\' name!',
    'God loves me and cares for me every day!',
    'I am protected by God\'s power!',
    'I can do all things through Christ who strengthens me!',
    'I am fearfully and wonderfully made!',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#A78BFA] via-[#FF6B9D] to-[#FFE66D] pt-14 px-8 pb-8 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  ✨
                </motion.div>
                <h2 className="text-white mb-2">Divine Health Affirmations</h2>
                <p className="text-white/90">Speak these powerful words every day!</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              {/* Featured Image */}
              <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1628435509114-969a718d64e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkcmVuJTIwcGxheWluZ3xlbnwxfHx8fDE3NjI0MDcwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Happy children"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Affirmations List */}
              <div className="space-y-4">
                {affirmations.map((affirmation, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 bg-gradient-to-r from-[#FFF5F7] to-[#F0F9FF] p-4 rounded-2xl border-2 border-[#FF6B9D]/20 hover:border-[#FF6B9D]/40 transition-all"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF6B9D] to-[#F472B6] rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                    <p className="text-gray-700 flex-1 pt-1">{affirmation}</p>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="bg-gradient-to-r from-[#4ECDC4]/10 to-[#A78BFA]/10 p-6 rounded-2xl border-2 border-[#4ECDC4]/20">
                <p className="text-gray-700 text-center italic mb-4">
                  "Death and life are in the power of the tongue: and they that love it shall eat the fruit thereof." - Proverbs 18:21
                </p>
                <p className="text-gray-600 text-center text-sm">
                  Say these affirmations daily and watch God's power work in your life!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-[#4ECDC4] to-[#48D1CC] hover:from-[#48D1CC] hover:to-[#4ECDC4] text-white rounded-2xl py-6 transition-all transform hover:scale-105"
                >
                  Got it! 🎉
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-2 border-[#FF6B9D] text-[#FF6B9D] hover:bg-[#FF6B9D] hover:text-white rounded-2xl py-6 transition-all"
                >
                  Save & Print 📄
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
