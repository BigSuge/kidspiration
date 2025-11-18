import { motion } from 'motion/react';

export function BackgroundEffects() {
  // Generate random positions for floating bubbles
  const bubbles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: 20 + Math.random() * 60, // 20px to 80px
    delay: Math.random() * 10,
    duration: 15 + Math.random() * 10, // 15-25 seconds
  }));

  // Generate random positions for sparkles
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 2, // 2-4 seconds
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #FF6B9D 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* Animated gradient mesh overlay */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 107, 157, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(78, 205, 196, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(255, 230, 109, 0.1) 0%, transparent 50%)
          `,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            background: `radial-gradient(circle at 30% 30%, 
              rgba(255, 255, 255, 0.4), 
              rgba(255, 107, 157, 0.1) 50%, 
              rgba(78, 205, 196, 0.15))`,
            filter: 'blur(1px)',
          }}
          initial={{
            bottom: '-100px',
            x: 0,
          }}
          animate={{
            bottom: '110vh',
            x: [0, 30, -30, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'linear',
            x: {
              duration: bubble.duration / 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      ))}

      {/* Twinkling sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: '4px',
            height: '4px',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="relative w-full h-full">
            {/* Star shape using pseudo-elements via SVG */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                fill="#FFE66D"
                opacity="0.8"
              />
            </svg>
          </div>
        </motion.div>
      ))}

      {/* Soft floating orbs in corners */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 230, 109, 0.2) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-40 right-20 w-40 h-40 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(78, 205, 196, 0.2) 0%, transparent 70%)',
          filter: 'blur(35px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/3 right-10 w-24 h-24 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 107, 157, 0.15) 0%, transparent 70%)',
          filter: 'blur(25px)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5,
        }}
      />
    </div>
  );
}
