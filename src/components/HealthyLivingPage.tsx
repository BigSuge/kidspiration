import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles, Heart, Zap, Brain, Star, Moon, Sun, Apple, Droplet, Activity, Trophy, Play, Pause, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

export function HealthyLivingPage() {
  const [activeBreak, setActiveBreak] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const startWiggleBreak = (seconds: number, breakId: number) => {
    setActiveBreak(breakId);
    setTimer(seconds);
    setIsTimerRunning(true);
  };

  const wiggleBreakIdeas = [
    {
      id: 1,
      title: 'Pray in the Holy Ghost',
      description: 'Speak in tongues fervently and pace on the spot.',
      icon: '🙏',
      color: 'from-[#8B5CF6] to-[#A78BFA]',
      duration: 60,
      image: 'https://images.unsplash.com/photo-1644822861244-1257985cbf0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHByYXlpbmclMjB0b2dldGhlcnxlbnwxfHx8fDE3NjI0ODM1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Brain Boost',
      description: 'Jog in place behind your chair for 30 seconds.',
      icon: '🧠',
      color: 'from-[#F59E0B] to-[#FCD34D]',
      duration: 30,
      image: 'https://images.unsplash.com/photo-1615544983150-0760f39857f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGV4ZXJjaXNpbmclMjBmdW58ZW58MXx8fHwxNzYyNDg0ODgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'Shake It Out',
      description: 'Shake each arm and leg 5 times, then repeat in descending order.',
      icon: '💪',
      color: 'from-[#10B981] to-[#34D399]',
      duration: 45,
      image: 'https://images.unsplash.com/photo-1702357376825-ffb84f24559a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGtpZHMlMjBqdW1waW5nfGVufDF8fHx8MTc2MjQ4NDg4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 4,
      title: 'Stretch & Reach Combo',
      description: 'Reach for the stars, stretch to the side like a rainbow, and touch your toes like you dropped your pencil.',
      icon: '🌈',
      color: 'from-[#06B6D4] to-[#22D3EE]',
      duration: 60,
      image: 'https://images.unsplash.com/photo-1649008726820-d90aeb70c32e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwc3RyZXRjaGluZ3xlbnwxfHx8fDE3NjI0ODQ4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 5,
      title: 'Silent Dance Challenge',
      description: 'Dance to music but with no noise! Can you stay in silent mode?',
      icon: '🎵',
      color: 'from-[#EC4899] to-[#F472B6]',
      duration: 90,
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGRhbmNpbmd8ZW58MXx8fHwxNzYyNDg0ODgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 6,
      title: 'Mirror Moves',
      description: "Copy a partner's slow, awesome movements like you're a human mirror.",
      icon: '🪞',
      color: 'from-[#6366F1] to-[#818CF8]',
      duration: 60,
      image: 'https://images.unsplash.com/photo-1702357376825-ffb84f24559a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGtpZHMlMjBqdW1waW5nfGVufDF8fHx8MTc2MjQ4NDg4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const healthBenefits = [
    {
      text: 'Boosts blood flow and keeps your heart strong',
      color: 'from-[#F59E0B] to-[#FCD34D]',
      icon: <Heart className="w-6 h-6" />,
    },
    {
      text: 'Helps you focus, remember, and learn faster',
      color: 'from-[#EF4444] to-[#F87171]',
      icon: <Brain className="w-6 h-6" />,
    },
    {
      text: 'Releases feel-good chemicals that fight stress',
      color: 'from-[#EC4899] to-[#F472B6]',
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      text: 'Builds strength with every move',
      color: 'from-[#06B6D4] to-[#22D3EE]',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      text: 'Moving during the day helps you rest better at night',
      color: 'from-[#8B5CF6] to-[#A78BFA]',
      icon: <Moon className="w-6 h-6" />,
    },
  ];

  const healthyHabits = [
    {
      title: 'Eat the Rainbow',
      description: 'Fill your plate with colorful fruits and veggies! Each color gives you different superpowers!',
      icon: <Apple className="w-8 h-8" />,
      color: 'from-[#10B981] to-[#34D399]',
      tips: [
        'Red foods (strawberries, tomatoes) help your heart',
        'Orange foods (carrots, oranges) help you see better',
        'Green foods (broccoli, spinach) make you strong',
        'Purple foods (grapes, blueberries) help you remember',
      ],
      image: 'https://images.unsplash.com/photo-1761839258671-6495fdc188b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwaGVhbHRoeSUyMGVhdGluZ3xlbnwxfHx8fDE3NjI0ODQ4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Drink Water',
      description: 'Your body is like a plant - it needs water to grow strong! Drink 6-8 glasses every day.',
      icon: <Droplet className="w-8 h-8" />,
      color: 'from-[#06B6D4] to-[#22D3EE]',
      tips: [
        'Start your day with a glass of water',
        'Drink water with every meal',
        'Bring a water bottle to school',
        'If your pee is light yellow, you\'re doing great!',
      ],
      image: 'https://images.unsplash.com/photo-1573309069683-f061f3a42ca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHdhdGVyJTIwZnJlc2h8ZW58MXx8fHwxNzYyNDkwNjc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Sleep Well',
      description: 'Sleep is when your body grows and your brain organizes everything you learned!',
      icon: <Moon className="w-8 h-8" />,
      color: 'from-[#8B5CF6] to-[#A78BFA]',
      tips: [
        'Kids need 9-12 hours of sleep every night',
        'Go to bed at the same time each night',
        'No screens 1 hour before bed',
        'Read a book or pray before sleeping',
      ],
      image: 'https://images.unsplash.com/photo-1762343287205-c0ebbafac406?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZCUyMHNsZWVwaW5nJTIwcGVhY2VmdWx8ZW58MXx8fHwxNzYyNDg0ODgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Stay Active',
      description: 'Play, run, jump, and move for at least 60 minutes every day! Make it fun!',
      icon: <Activity className="w-8 h-8" />,
      color: 'from-[#F59E0B] to-[#FCD34D]',
      tips: [
        'Play outside whenever you can',
        'Try a new sport or activity',
        'Dance to your favorite music',
        'Walk or bike instead of riding in the car',
      ],
      image: 'https://images.unsplash.com/photo-1702357376825-ffb84f24559a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGtpZHMlMjBqdW1waW5nfGVufDF8fHx8MTc2MjQ4NDg4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFFFFF] to-[#F0F9FF] py-8 px-4">
      <motion.div
        ref={ref}
        className="container mx-auto max-w-7xl mt-[100px]"
        style={{
          transform: isInView ? 'none' : 'rotateY(-15deg)',
          opacity: isInView ? 1 : 0.3,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s',
        }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-[#EF4444] to-[#F87171] text-white rounded-full shadow-lg">
            <span className="uppercase tracking-wider text-sm font-semibold">Healthy Living for Winners</span>
          </div>
          
          <h1 className="text-[48px] sm:text-[72px] lg:text-[96px] text-transparent bg-clip-text bg-gradient-to-r from-[#FFE66D] via-[#4ECDC4] to-[#A78BFA] mb-4 leading-none font-semibold"
            style={{
              textShadow: '3px 3px 0 rgba(0,0,0,0.1), 6px 6px 0 rgba(0,0,0,0.05)',
            }}
          >
            WIGGLE BREAKS
          </h1>
          
          <h2 className="text-[24px] sm:text-[32px] text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F87171] mb-6 font-semibold uppercase tracking-wide">
            Stay Focused and Energized!
          </h2>
          
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-[18px] sm:text-[20px] text-gray-700 leading-relaxed">
              <span className="text-[24px] font-semibold">Hey there, Champs!</span> Did you know that your body and spirit love to move, even when you're learning, meditating, or indoors all day? When you sit too long, your brain gets sleepy, and the wiggles build up like popcorn ready to pop! That's why wiggle breaks are important. They help you:
            </p>
          </div>

          {/* Key Benefits Boxes */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white p-6 rounded-2xl shadow-lg"
            >
              <p className="text-[20px] font-semibold">Stay Focused.</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-r from-[#10B981] to-[#34D399] text-white p-6 rounded-2xl shadow-lg"
            >
              <p className="text-[20px] font-semibold">Feel Energized.</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-r from-[#F59E0B] to-[#FCD34D] text-white p-6 rounded-2xl shadow-lg"
            >
              <p className="text-[20px] font-semibold">Keep your body strong.</p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-r from-[#06B6D4] to-[#22D3EE] text-white p-6 rounded-2xl shadow-lg"
            >
              <p className="text-[20px] font-semibold">Have fun while learning!</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Health Benefits Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-[36px] sm:text-[48px] text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F87171] mb-4 font-semibold uppercase">
              Health Benefits
            </h2>
            <p className="text-[18px] text-gray-700 max-w-2xl mx-auto">
              Wiggle breaks aren't just fun—they're great for your body and brain!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {healthBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className={`bg-gradient-to-r ${benefit.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {benefit.icon}
                  <p className="text-[16px] sm:text-[18px] font-semibold leading-snug">{benefit.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Wiggle Break Ideas */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-[36px] sm:text-[48px] text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F87171] mb-4 font-semibold uppercase">
              Wiggle Break Ideas
            </h2>
            <p className="text-[18px] text-gray-700 max-w-2xl mx-auto">
              Try these fun activities when you need a brain-boosting wiggle break!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wiggleBreakIdeas.map((breakIdea, index) => (
              <motion.div
                key={breakIdea.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group border-4 border-transparent hover:border-[#FFE66D]"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={breakIdea.image}
                    alt={breakIdea.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl">{breakIdea.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`text-[20px] sm:text-[24px] text-transparent bg-clip-text bg-gradient-to-r ${breakIdea.color} mb-3 font-semibold uppercase`}>
                    {breakIdea.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {breakIdea.description}
                  </p>

                  {/* Timer Display */}
                  {activeBreak === breakIdea.id && timer > 0 && (
                    <div className="mb-4 text-center">
                      <div className="text-[48px] text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] font-semibold">
                        {timer}s
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${breakIdea.color}`}
                          initial={{ width: '100%' }}
                          animate={{ width: `${(timer / breakIdea.duration) * 100}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  )}

                  {activeBreak === breakIdea.id && timer === 0 && isTimerRunning === false && (
                    <div className="mb-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-[#10B981] text-[24px] font-semibold">
                        <Check className="w-8 h-8" />
                        Great Job!
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={() => startWiggleBreak(breakIdea.duration, breakIdea.id)}
                    disabled={isTimerRunning && activeBreak === breakIdea.id}
                    className={`w-full bg-gradient-to-r ${breakIdea.color} text-white rounded-full px-6 py-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50`}
                  >
                    {activeBreak === breakIdea.id && timer > 0 ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        In Progress...
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Start ({breakIdea.duration}s)
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 p-6 bg-gradient-to-r from-[#FFF5F7] to-[#F0F9FF] rounded-3xl border-2 border-[#FF6B9D]/30">
            <p className="text-[18px] text-gray-700">
              Even adults sometimes need wiggle breaks, too! So, the next time you're feeling squirmy, ask: <span className="font-semibold">"Can I take a brain-boosting wiggle break?"</span>
            </p>
          </div>
        </motion.div>

        {/* Healthy Habits Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="w-8 h-8 text-[#FFE66D]" />
              <h2 className="text-[36px] sm:text-[48px] text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] font-semibold">
                More Healthy Habits
              </h2>
              <Star className="w-8 h-8 text-[#4ECDC4]" />
            </div>
            <p className="text-[18px] text-gray-700 max-w-2xl mx-auto">
              Build these super habits to become the healthiest, happiest you!
            </p>
          </div>

          <div className="space-y-8">
            {healthyHabits.map((habit, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all"
              >
                <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Image Side */}
                  <div className={`relative h-64 md:h-auto overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <ImageWithFallback
                      src={habit.image}
                      alt={habit.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-6 left-6 w-16 h-16 bg-gradient-to-r ${habit.color} rounded-full flex items-center justify-center shadow-lg text-white`}>
                      {habit.icon}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <h3 className={`text-[28px] sm:text-[32px] text-transparent bg-clip-text bg-gradient-to-r ${habit.color} mb-4 font-semibold`}>
                      {habit.title}
                    </h3>
                    <p className="text-gray-700 text-[18px] mb-6 leading-relaxed">
                      {habit.description}
                    </p>
                    <ul className="space-y-3">
                      {habit.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-6 h-6 bg-gradient-to-r ${habit.color} rounded-full flex items-center justify-center mt-1`}>
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-600">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mb-12"
        >
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-[#FFE66D] via-[#FFC93C] to-[#FFE66D] p-8 rounded-3xl shadow-2xl border-4 border-white">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-800" />
            <h3 className="text-[28px] sm:text-[32px] text-gray-800 mb-4 font-semibold">
              You're a Healthy Living Champion! 🏆
            </h3>
            <p className="text-gray-700 text-[18px]">
              Remember, God created your body to be strong and healthy! When you take care of yourself, you're honoring Him and preparing yourself to do amazing things!
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-center"
        >
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-3xl mx-auto">
            <h3 className="text-[24px] sm:text-[28px] text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#4ECDC4] mb-4 font-semibold">
              Start Your Healthy Journey Today! 🌟
            </h3>
            <p className="text-gray-600 mb-6 text-[18px]">
              Pick one wiggle break and one healthy habit to try this week. You've got this!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <Heart className="w-5 h-5 mr-2" />
                I'm Ready to Be Healthy!
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
