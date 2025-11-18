import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Share2, Radio, Sparkles, Calendar } from 'lucide-react';

export function LiveStream() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // IPPC starts on Monday, November 10, 2025 at 12:00 PM
    const targetDate = new Date('2025-11-10T12:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'IPPC 2025 - Live Stream',
      text: 'Join us for the International Pastors\' and Partners\' Conference live stream!',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Try clipboard API with error handling
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard! Share it with your friends! 🎉');
      } catch (clipboardErr) {
        // If clipboard fails, just show a simple alert with the URL
        alert(`Share this link with your friends:\n\n${window.location.href}\n\n(Copy the link above to share!)`);
      }
    }
  };

  const CountdownBox = ({ value, label }: { value: number; label: string }) => {
    const isSeconds = label === "Seconds";
    
    return (
      <div className="relative">
        <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-[#4ECDC4]/30 hover:border-[#FF6B9D]/50 transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center">
          {isSeconds ? (
            <motion.div
              key={value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-5xl md:text-6xl bg-gradient-to-br from-[#FF6B9D] to-[#F472B6] bg-clip-text text-transparent mb-2 tabular-nums"
            >
              {String(value).padStart(2, '0')}
            </motion.div>
          ) : (
            <div className="text-5xl md:text-6xl bg-gradient-to-br from-[#FF6B9D] to-[#F472B6] bg-clip-text text-transparent mb-2 tabular-nums">
              {String(value).padStart(2, '0')}
            </div>
          )}
          <div className="text-gray-600 text-sm md:text-base uppercase tracking-wider text-center">{label}</div>
        </div>
      {/* Floating decorative element */}
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-[#FFE66D] to-[#FFC107] rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      </div>
    );
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-[#4ECDC4]/10 via-[#FF6B9D]/5 to-[#FFE66D]/10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-[#4ECDC4]/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-[#FF6B9D]/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#FFE66D]/20 rounded-full blur-3xl"
          animate={{
            x: [-24, 24, -24],
            y: [-24, 24, -24],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] rounded-full shadow-xl mb-6 transform hover:scale-105 transition-transform">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Radio className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-white uppercase tracking-wider">Live Stream Coming Soon</span>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          
          <h2 className="text-gray-800 mb-4 font-semibold">
            International Pastors' & Partners' Conference
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get ready for an amazing experience! The IPPC 2025 live stream starts in:
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 max-w-4xl mx-auto">
          <CountdownBox value={timeLeft.days} label="Days" />
          <CountdownBox value={timeLeft.hours} label="Hours" />
          <CountdownBox value={timeLeft.minutes} label="Minutes" />
          <CountdownBox value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Event Info Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border-4 border-[#4ECDC4]/20 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-gradient-to-br from-[#4ECDC4] to-[#48D1CC] p-4 rounded-2xl shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-gray-800 mb-2">Monday, November 10, 2025</h3>
                <p className="text-gray-600 text-lg">
                  Join thousands of believers worldwide for this powerful event! 🌍✨
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFE66D]/30 to-[#FFC107]/20 rounded-full">
                  <span className="text-2xl">📺</span>
                  <span className="text-gray-700">Watch it live here!</span>
                </div>
              </div>
            </div>

            {/* Share CTA */}
            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 whitespace-nowrap"
            >
              <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="text-lg">Share Live Stream</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✨
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border-2 border-[#FFE66D]/50">
            <span className="text-2xl">🎉</span>
            <p className="text-gray-700">
              Set a reminder so you don't miss it!
            </p>
            <span className="text-2xl">🔔</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
