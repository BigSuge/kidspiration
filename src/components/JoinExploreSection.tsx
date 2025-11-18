import { motion } from 'motion/react';
import { UserPlus, Compass, Sparkles, ArrowRight } from 'lucide-react';

interface JoinExploreSectionProps {
  onAuthClick?: () => void;
  onNavigate?: (page: string) => void;
}

export function JoinExploreSection({ onAuthClick, onNavigate }: JoinExploreSectionProps) {
  return (
    <section className="mt-20 py-20 bg-gradient-to-br from-[#FFE5EF] via-[#F3E8FF] to-[#D5F5F6] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF6B9D]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#4ECDC4]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] mb-6 text-5xl font-extrabold text-[40px]">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-[24px]">
            Join thousands of kids worldwide or explore our exciting programs and initiatives!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Join Kidspiration Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B9D] to-[#A78BFA] rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-50" />
            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#FF6B9D] to-[#A78BFA] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <UserPlus className="w-8 h-8 text-white" />
              </div>

              <div className="mt-8 text-center space-y-6">
                <h3 className="text-gray-900 text-3xl font-bold text-[32px]">Join Kidspiration</h3>
                <p className="text-gray-600 leading-relaxed text-[20px]">
                  Become part of the global movement! Create your account and start inspiring hearts around the world.
                </p>

                <ul className="space-y-3 text-left">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#FF6B9D]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-[#FF6B9D]" />
                    </div>
                    <span className="text-gray-700">Access exclusive games and content</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#A78BFA]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-[#A78BFA]" />
                    </div>
                    <span className="text-gray-700">Connect with kids worldwide</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#4ECDC4]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-[#4ECDC4]" />
                    </div>
                    <span className="text-gray-700">Track your inspiring journey</span>
                  </li>
                </ul>

                <button
                  onClick={onAuthClick}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA] text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                >
                  <span className="font-bold">Join Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Explore Programs Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#A78BFA] to-[#4ECDC4] rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-50" />
            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#A78BFA] to-[#4ECDC4] rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <Compass className="w-8 h-8 text-white" />
              </div>

              <div className="mt-8 text-center space-y-6">
                <h3 className="text-gray-900 text-3xl font-bold text-[32px]">Explore Programs</h3>
                <p className="text-gray-600 leading-relaxed text-[20px]">
                  Discover exciting initiatives, events, and ways to get involved in the Kidspiration movement!
                </p>

                <ul className="space-y-3 text-left">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#FF6B9D]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-[#FF6B9D]" />
                    </div>
                    <span className="text-gray-700">ER100 Initiative</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#A78BFA]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-[#A78BFA]" />
                    </div>
                    <span className="text-gray-700">Kidspiration Party</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#4ECDC4]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-[#4ECDC4]" />
                    </div>
                    <span className="text-gray-700">Marketplace & More</span>
                  </li>
                </ul>

                <button
                  onClick={() => onNavigate?.('explore')}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#A78BFA] to-[#4ECDC4] text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                >
                  <span className="font-bold">Explore Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
