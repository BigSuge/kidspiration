import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cake, Gift, PartyPopper, Heart, Star, Sparkles } from 'lucide-react';

interface BirthdayOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userTitle?: string;
}

export function BirthdayOverlay({ isOpen, onClose, userName, userTitle }: BirthdayOverlayProps) {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; x: number; delay: number; duration: number; color: string }>>([]);
  const [audio] = useState(() => new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3')); // Happy birthday sound

  useEffect(() => {
    if (isOpen) {
      // Generate confetti pieces
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        color: ['#FF6B9D', '#A78BFA', '#4ECDC4', '#FFD700', '#FF1493', '#00CED1'][Math.floor(Math.random() * 6)]
      }));
      setConfettiPieces(pieces);

      // Play birthday song
      audio.play().catch(err => console.log('Audio play failed:', err));

      // Auto-close after 10 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 10000);

      return () => {
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [isOpen, onClose, audio]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          {/* Confetti */}
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ y: -20, x: `${piece.x}vw`, opacity: 1, rotate: 0 }}
              animate={{
                y: '110vh',
                rotate: 360,
                opacity: 0,
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'linear',
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{ backgroundColor: piece.color }}
            />
          ))}

          {/* Birthday Card */}
          <motion.div
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.5, y: 50, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.8, delay: 0.2 }}
            className="relative bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-3xl shadow-2xl max-w-2xl w-full mx-4 p-8 md:p-12"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/50 hover:bg-white/80 flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Content */}
            <div className="text-center space-y-6">
              {/* Animated Icons */}
              <div className="flex justify-center items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Cake className="w-16 h-16 text-[#FF6B9D]" />
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.3 }}
                >
                  <Gift className="w-16 h-16 text-[#A78BFA]" />
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.6 }}
                >
                  <PartyPopper className="w-16 h-16 text-[#4ECDC4]" />
                </motion.div>
              </div>

              {/* Birthday Message */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4]"
                >
                  🎉 HAPPY BIRTHDAY! 🎉
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <p className="text-gray-900">
                    {userTitle ? `${userTitle} ` : ''}{userName}
                  </p>
                  <p className="text-gray-700 text-lg">
                    Today is YOUR special day! 🎈
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-r from-[#FFE5EF] via-[#E9D5FF] to-[#CCFBF1] rounded-2xl p-6 space-y-3"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FF6B9D]" />
                    <p className="text-gray-800">
                      God has amazing plans for your new year!
                    </p>
                    <Sparkles className="w-5 h-5 text-[#4ECDC4]" />
                  </div>
                  
                  <p className="text-gray-700 text-sm italic">
                    "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." - Jeremiah 29:11
                  </p>
                  
                  <div className="flex justify-center gap-2 text-2xl">
                    <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }}>🎂</motion.span>
                    <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}>🎁</motion.span>
                    <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}>🎈</motion.span>
                    <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}>🎊</motion.span>
                    <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}>✨</motion.span>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-gray-600"
                >
                  May your day be filled with joy, laughter, and God's endless blessings! 💖
                </motion.p>
              </div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Thank You! 🎉
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
