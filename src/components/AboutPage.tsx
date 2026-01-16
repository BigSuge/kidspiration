import image_f9f7953c4688f21ec50d2c75917ad075685d5286 from 'figma:asset/f9f7953c4688f21ec50d2c75917ad075685d5286.png';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Heart, BookOpen, Globe, Sparkles, Star, Users, Trophy, Zap, Target, TrendingUp, Gem, Flag, UserCheck, BookMarked, PartyPopper, Languages, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import aboutHeroImage from 'figma:asset/0be9827fc0cf186798f1b48d67101495ed9a9353.png';
import { HTTN_MAGAZINE_URL } from '../config/urls';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const visionRef = useRef(null);
  const eligibilityRef = useRef(null);
  const programsRef = useRef(null);
  const principlesRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const visionInView = useInView(visionRef, { once: true, amount: 0.3 });
  const eligibilityInView = useInView(eligibilityRef, { once: true, amount: 0.3 });
  const programsInView = useInView(programsRef, { once: true, amount: 0.3 });
  const principlesInView = useInView(principlesRef, { once: true, amount: 0.3 });

  const corePrinciples = [
    {
      icon: Users,
      title: 'ACCESSIBILITY',
      color: 'from-[#FF6B9D] to-[#F472B6]',
      bgColor: 'bg-pink-50'
    },
    {
      icon: Sparkles,
      title: 'ENGAGEMENT',
      color: 'from-[#A78BFA] to-[#8B5CF6]',
      bgColor: 'bg-purple-50'
    },
    {
      icon: TrendingUp,
      title: 'SUSTAINABILITY',
      color: 'from-[#4ECDC4] to-[#06B6D4]',
      bgColor: 'bg-cyan-50'
    },
    {
      icon: Target,
      title: 'IMPACT',
      color: 'from-[#FBBF24] to-[#F59E0B]',
      bgColor: 'bg-amber-50'
    }
  ];

  const programs = [
    {
      icon: Users,
      title: 'ER100 Campaign',
      subtitle: 'Each One Reach 100',
      description: 'Every Hero and every Champion is inspired to reach at least one hundred children with the message of the Gospel. That\'s how we\'ll reach three billion children across the world — together!',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      ctaText: 'Join ER100',
      ctaAction: 'er100'
    },
    {
      icon: Languages,
      title: 'Kidspiration Translators Network',
      subtitle: 'Training Trailblazers',
      description: 'Equipping trailblazers, ages nine to twelve, to serve as upcoming translators of our ministry materials — mentored by certified translators. What a powerful way to train up a child in the way he should go!',
      gradient: 'from-orange-500 to-pink-500',
      bgColor: 'from-orange-50 to-pink-50',
      ctaText: 'Learn More',
      ctaAction: 'translators'
    },
    {
      icon: PartyPopper,
      title: 'Kidspiration Party Initiative',
      subtitle: 'Celebrating Every Child',
      description: 'Through this initiative, we reach children who may have never celebrated their birthdays or felt such love and attention. Each celebration is an opportunity to share God\'s love and the Gospel with children in their world. You can sponsor a full celebration — or share love by gifting those celebrating with the birthday child!',
      gradient: 'from-pink-500 to-purple-500',
      bgColor: 'from-pink-50 to-purple-50',
      ctaText: 'Join the Celebration',
      ctaAction: 'party'
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero Section with Image */}
      <section ref={heroRef} className="py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-2xl mb-12"
          >
            <img
              src={image_f9f7953c4688f21ec50d2c75917ad075685d5286}
              alt="About Kidspiration"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section ref={aboutRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={aboutInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] mb-8 text-[40px] font-bold">
              WELCOME TO KIDSPIRATION!
            </h2>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                <strong className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA]">
                  A GLOBAL MOVEMENT
                </strong>{' '}
                inspired by the healing ministry of our Man of God, Pastor Chris Oyakhilome.
              </p>

              <p className="text-xl text-gray-700 leading-relaxed">
                At Kidspiration, our vision is clear — to reach{' '}
                <strong className="text-[#2D1B69]">
                  three billion children around the world
                </strong>{' '}
                with the Gospel of our Lord Jesus Christ.
              </p>

              <p className="text-xl text-gray-700 leading-relaxed">
                We're raising a generation of children, ages zero to twelve, filled with the Word and the Spirit — children who experience and share the Gospel, becoming conduits of God's grace and power.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={aboutInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-br from-[#FFE5EF] to-[#FFD1E3] rounded-2xl p-6"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B9D] to-[#F472B6] rounded-2xl flex items-center justify-center shadow-lg">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-gray-900 mb-2 text-center font-bold">OUR VISION</h3>
                  <p className="text-2xl text-center text-[#2D1B69]">
                    <strong>Reach3 Billion Children</strong>
                  </p>
                  <p className="text-center text-gray-600 mt-2">Worldwide with the gospel</p>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={aboutInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-gradient-to-br from-[#E9D5FF] to-[#DDD6FE] rounded-2xl p-6"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] rounded-2xl flex items-center justify-center shadow-lg">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-gray-900 mb-2 text-center font-bold">OUR MISSION</h3>
                  <p className="text-center text-gray-700">
                    Raising young evangelists — a generation shining with the light of God!
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who Is Eligible Section */}
      <section ref={eligibilityRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={eligibilityInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] mb-4 text-[40px] font-bold">
              WHO IS ELIGIBLE?
            </h2>
            <p className="text-xl text-gray-600 text-[20px]">
              Everyone who loves and cares for children!
            </p>
            <p className="text-lg text-gray-600 mt-2">
              Parents, pastors, guardians, teachers, youths, teens, and children — as long as you associate with children, this is the place for you!
            </p>
          </motion.div>

          {/* Heroes and Champions */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={eligibilityInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 mb-8 shadow-xl"
          >
            <div className="text-center mb-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                When you enlist, you become a{' '}
                <strong className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA]">
                  Kidspiration Hero
                </strong>.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mt-2">
                And when children enlist, they become{' '}
                <strong className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECDC4] to-[#06B6D4]">
                  Kidspiration Champions
                </strong>.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mt-4">
                Together, we're raising young evangelists — a generation shining with the light of God!
              </p>
            </div>
          </motion.div>

          {/* Kids Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={eligibilityInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 mb-8 shadow-xl"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FF6B9D] to-[#F472B6] rounded-2xl shadow-lg mb-4">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2 text-[28px] font-bold">Kidspiration Champions</h3>
              <p className="text-lg text-gray-700">Play games, earn points, share the Gospel!</p>
              <p className="text-[#FF6B9D] mt-2"><strong>Ages 0-12</strong></p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={eligibilityInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-md border-2 border-pink-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl mb-4 mx-auto">
                  <Gem className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-center text-gray-900 mb-2 font-bold text-[20px]">Treasures</h4>
                <p className="text-center text-sm text-[#FF6B9D] mb-3"><strong>(0-2 years)</strong></p>
                <p className="text-center text-sm text-gray-600">
                  Parents read, kids watch videos, share the Gospel!
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={eligibilityInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-md border-2 border-purple-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl mb-4 mx-auto">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-center text-gray-900 mb-2 font-bold text-[20px]">Sparks</h4>
                <p className="text-center text-sm text-[#A78BFA] mb-3"><strong>(3-5 years)</strong></p>
                <p className="text-center text-sm text-gray-600">
                  Learn through stories, play, and sharing!
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={eligibilityInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-md border-2 border-cyan-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-xl mb-4 mx-auto">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-center text-gray-900 mb-2 font-bold text-[20px]">Stars</h4>
                <p className="text-center text-sm text-[#4ECDC4] mb-3"><strong>(6-9 years)</strong></p>
                <p className="text-center text-sm text-gray-600">
                  Begin sharing HTTN with peers, earning points!
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={eligibilityInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-md border-2 border-amber-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl mb-4 mx-auto">
                  <Flag className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-center text-gray-900 mb-2 font-bold text-[20px]">Trailblazers</h4>
                <p className="text-center text-sm text-[#FBBF24] mb-3"><strong>(10-12 years)</strong></p>
                <p className="text-center text-sm text-gray-600">
                  Lead fundraising activities, organize outreaches!
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Adults Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={eligibilityInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#4ECDC4] to-[#06B6D4] rounded-2xl shadow-lg mb-6 mx-auto">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-center text-gray-900 mb-3 text-[24px] font-bold">Kidspiration Heroes</h3>
              <p className="text-center text-gray-700 mb-4">
                Parents, Teachers, Guardians — Organize events, mentor kids, track impact!
              </p>
              <div className="text-center">
                <span className="inline-block border-2 border-[#4ECDC4] text-[#068D9D] bg-white/60 backdrop-blur-sm px-6 py-2 rounded-full font-bold shadow-sm">
                  Guide & Lead
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={eligibilityInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] rounded-2xl shadow-lg mb-6 mx-auto">
                <BookMarked className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-center text-gray-900 mb-3 text-[24px] font-bold">Pastors & Leaders</h3>
              <p className="text-center text-gray-700 mb-4">
                Manage ministry, view reports, sponsor missions!
              </p>
              <div className="text-center">
                <span className="inline-block border-2 border-[#8B5CF6] text-[#7C3AED] bg-white/60 backdrop-blur-sm px-6 py-2 rounded-full font-bold shadow-sm">
                  Lead & Inspire
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section ref={programsRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={programsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] mb-4 text-[40px] font-bold">
              OUR PROGRAMS
            </h2>
            <p className="text-xl text-gray-600 text-[20px]">
              Discover the many ways we're reaching children worldwide
            </p>
          </motion.div>

          <div className="space-y-8">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={program.title}
                  initial={{ y: 50, opacity: 0 }}
                  animate={programsInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${program.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-white/50 backdrop-blur-sm`}
                >
                  <div className="flex items-start gap-6">
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${program.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-2 text-[24px] font-bold">{program.title}</h3>
                      <p className="text-gray-800 mb-3 font-bold text-lg opacity-90">
                        {program.subtitle}
                      </p>
                      <p className="text-gray-700 leading-relaxed text-lg mb-6">
                        {program.description}
                      </p>
                      <button
                        onClick={() => onNavigate?.(program.ctaAction)}
                        className={`bg-gradient-to-r ${program.gradient} text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all`}
                      >
                        {program.ctaText}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HTTN Magazine & Marketplace Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg mb-6 mx-auto">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-center text-gray-900 mb-4 text-[24px] font-bold">Healing to the Nations Magazine</h3>
              <p className="text-center text-gray-700 leading-relaxed mb-6">
                Let every child experience the Healing to the Nations Magazine come alive — bringing the Word to life on every page, in every story, and with every touch of the screen.
              </p>
              <div className="text-center">
                <button
                  onClick={() => window.open(HTTN_MAGAZINE_URL, '_blank')}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Read HTTN Magazine
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-6 mx-auto">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-center text-gray-900 mb-4 text-[24px] font-bold">Kidspiration Marketplace</h3>
              <p className="text-center text-gray-700 leading-relaxed mb-6">
                Don't forget to check out the Kidspiration Marketplace — featuring beautifully customized items that inspire faith, love, and joy!
              </p>
              <div className="text-center">
                <button
                  onClick={() => onNavigate?.('marketplace')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Visit Marketplace
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section ref={principlesRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={principlesInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] mb-4 text-[32px] font-bold">
              CORE PRINCIPLES
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ y: 50, opacity: 0 }}
                  animate={principlesInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className={`${principle.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${principle.color} rounded-2xl flex items-center justify-center shadow-lg mb-6 transform rotate-6 mx-auto`}>
                    <Icon className="w-8 h-8 text-white -rotate-6" />
                  </div>
                  <h3 className="text-gray-800 text-center font-bold">{principle.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Appreciation & Call to Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-center md:text-left"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-50 rounded-2xl mb-2">
                <Heart className="w-8 h-8 text-[#FF6B9D]" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900">With Gratitude</h2>
              <p className="text-xl text-gray-600 leading-relaxed font-medium">
                We appreciate all our partners, arms, and supporters who have made Kidspiration what it is today.
              </p>
              <p className="text-lg text-gray-500">
                Your partnership helps us reach millions of children with the message of God's love.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-[#4ECDC4] to-[#06B6D4] rounded-3xl p-10 text-white shadow-xl text-center relative overflow-hidden"
            >
              <div className="relative z-10">
                <Globe className="w-12 h-12 mx-auto mb-6 text-white/90" />
                <h3 className="text-3xl font-bold mb-4">Join the Movement!</h3>
                <p className="mb-8 text-white/90 text-lg">
                  Visit <strong className="text-white">www.kidspiration.org</strong> and explore all that Kidspiration has to offer!
                </p>
                <div className="inline-block text-[#06B6D4] px-8 py-3 font-bold text-lg">
                  Kidspiration — Reaching Kids, Raising Champions!
                </div>
              </div>

              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
