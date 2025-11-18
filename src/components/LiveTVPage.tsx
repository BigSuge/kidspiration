import { motion } from 'motion/react';
import { Tv, Clock, Calendar, Play } from 'lucide-react';

export function LiveTVPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Tv className="w-12 h-12 text-[#FF6B9D]" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] text-5xl font-extrabold text-[40px]">
              Kidspiration Live TV
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-[20px]">
            Watch live shows, special events, and inspiring content made just for you!
          </p>
        </motion.div>

        {/* Live Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto mb-16"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-500 to-pink-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-10 h-10" fill="currentColor" />
                </div>
                <p className="text-2xl font-bold text-[24px]">Live Stream Coming Soon!</p>
                <p className="text-white/80">Check back for our next broadcast</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Schedule */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-gray-900 mb-12 text-4xl font-bold text-[32px]">Upcoming Schedule</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Morning Inspiration', time: 'Daily at 8:00 AM', icon: Clock },
              { title: 'Bible Stories Live', time: 'Wednesdays at 4:00 PM', icon: Calendar },
              { title: 'Kidspiration Hour', time: 'Fridays at 6:00 PM', icon: Calendar },
              { title: 'Weekend Celebration', time: 'Saturdays at 10:00 AM', icon: Calendar },
            ].map((show, index) => {
              const Icon = show.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B9D] to-[#A78BFA] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1 text-[24px] font-bold">{show.title}</h3>
                      <p className="text-gray-600">{show.time}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
