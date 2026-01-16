import { Sparkles, Target, Calendar, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { HomepageGlowfestVideo, HomepageImpactVideo } from "../imports/HomepageGlowfestVideo";

interface GlowfestSectionProps {
  onNavigate?: (page: string) => void;
}

export function GlowfestSection({
  onNavigate,
}: GlowfestSectionProps) {

  return (
    <section className="mt-20 py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 rounded-[0px] my-[0px] m-[0px]">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF6B9D]/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#4ECDC4]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#A78BFA]/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Target className="w-10 h-10 text-yellow-400" />
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-5xl font-extrabold text-[40px]">
              Our Impact Stories
            </h2>
            <Target className="w-10 h-10 text-yellow-400" />
          </div>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-[20px]">
            Real stories from Kidspiration Heroes and Champs, making a real difference around the world. You can be next!
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-16 space-y-12">
          {/* Video Player - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <HomepageImpactVideo />
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full shadow-lg flex items-center justify-center"
            >
              <span className="text-2xl">⭐</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 w-10 h-10 bg-pink-400 rounded-full shadow-lg flex items-center justify-center"
            >
              <span className="text-3xl">💖</span>
            </motion.div>
          </motion.div>

          {/* Description - Below Video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={() => onNavigate?.('impact-stories')}
            className="px-6 py-4 md:px-10 md:py-5 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-white rounded-full text-lg md:text-xl hover:shadow-2xl transform hover:scale-105 transition-all inline-flex items-center gap-2 md:gap-3 group relative overflow-hidden w-full max-w-[400px] md:w-auto md:max-w-none justify-center"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="relative z-10 font-bold text-[20px]">See our Impact</span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform relative z-10" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
