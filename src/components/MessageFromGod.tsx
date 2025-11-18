import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import messageImage from 'figma:asset/fe5681852b9a2debadbe80135a21ff85c652267e.png';

export function MessageFromGod() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      id="message"
      className="py-16 px-4 md:px-6 lg:px-8"
      style={{
        transform: isInView ? 'none' : 'rotateY(-15deg)',
        opacity: isInView ? 1 : 0.3,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] mb-4 text-[32px] font-semibold">
            Message from the Man of God
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-[#FFE66D]/30">
          {/* Image Section */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-full min-h-[400px]"
          >
            <img
              src={messageImage}
              alt="Function in God's Realm"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 md:p-10 space-y-6"
          >
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white rounded-full">
              <span className="text-sm">Featured Teaching</span>
            </div>

            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D3748] to-[#4A5568] text-[24px] font-semibold font-normal">
              Function in God's Realm 
            </h3>

            <div className="bg-gradient-to-br from-[#4ECDC4]/10 to-[#A78BFA]/10 p-6 rounded-2xl border-2 border-[#4ECDC4]/20">
              <p className="text-gray-700 italic mb-4">
                "They shall take up serpents; and if they drink any deadly thing, it shall not hurt them; they shall lay hands on the sick, and they shall recover" (Mark 16:18)
              </p>
            </div>

            <div className="space-y-4 text-gray-600">
              <p>
                It is essential to note that this is not a promise, but a statement of fact that reveals your true nature. In other words, by virtue of your new birth, you're no longer subject to diseases and infections.
              </p>
              <p>
                You now have within you the life of God, and that life cannot be brought down by any infirmity. The moment you're born again, your life no longer comes from your blood but from the Spirit of God that dwells in you.
              </p>
            </div>

            <motion.div 
              className="bg-gradient-to-r from-[#FFE66D]/30 to-[#FFC107]/30 p-6 rounded-2xl border-2 border-[#FFE66D]/40"
              animate={{
                scale: [1, 1.02, 1],
                boxShadow: [
                  '0 0 0 0 rgba(255, 230, 109, 0)',
                  '0 0 20px 5px rgba(255, 230, 109, 0.3)',
                  '0 0 0 0 rgba(255, 230, 109, 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <p className="text-sm text-gray-600 mb-2 font-semibold">💬 CONFESSION:</p>
              <p className="text-gray-700">
                I am born of God; my origin is in Him! No sickness has the power or ability to destroy my body! The life of God in me makes me indestructible and impregnable to disease and infirmity. Hallelujah!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
