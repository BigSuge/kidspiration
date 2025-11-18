import { motion } from 'motion/react';
import { Languages, Globe, BookOpen, Users, Award, ArrowRight, Sparkles, Target, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from '../utils/AuthContext';
import translatorImage1 from 'figma:asset/72bbc3f5bc0fb068e0d1a0a4ff54ed3768b35b7f.png';
import translatorImage2 from 'figma:asset/6cf09b69045bf4c382dc0cf49ef52ea0124592ce.png';
import translatorImage3 from 'figma:asset/3ef9faea09bf814e2cfa2a6e5d238da3dd457eb9.png';

interface TranslatorsNetworkPageProps {
  onAuthClick?: () => void;
  onBack?: () => void;
}

export function TranslatorsNetworkPage({ onAuthClick, onBack }: TranslatorsNetworkPageProps) {
  const { isAuthenticated, user } = useAuth();

  const languages = [
    { name: 'Spanish', translators: 45, flag: '🇪🇸' },
    { name: 'French', translators: 38, flag: '🇫🇷' },
    { name: 'Portuguese', translators: 32, flag: '🇵🇹' },
    { name: 'Swahili', translators: 28, flag: '🇰🇪' },
    { name: 'Arabic', translators: 24, flag: '🇸🇦' },
    { name: 'Chinese', translators: 20, flag: '🇨🇳' },
    { name: 'Hindi', translators: 18, flag: '🇮🇳' },
    { name: 'Russian', translators: 15, flag: '🇷🇺' },
  ];

  const requirements = [
    {
      title: 'Age 9-12',
      description: 'This program is for Trailblazers only',
      icon: Users,
      color: 'from-[#FF9A8B] to-[#FFA894]',
    },
    {
      title: 'Language Skills',
      description: 'Fluent in English and one other language',
      icon: Languages,
      color: 'from-[#A78BFA] to-[#C4B5FD]',
    },
    {
      title: 'Commitment',
      description: 'Translate 1-2 stories or articles per month',
      icon: Target,
      color: 'from-[#4ECDC4] to-[#7FE8DB]',
    },
    {
      title: 'Passion',
      description: 'Love for helping others access God\'s word',
      icon: Sparkles,
      color: 'from-[#FFE66D] to-[#FFC93C]',
    },
  ];

  const benefits = [
    'Official Translator Certificate',
    'Monthly Recognition',
    'Leadership Skills Development',
    'Global Impact',
    'Portfolio Building',
    'Community Access',
  ];

  const process = [
    {
      step: 1,
      title: 'Apply',
      description: 'Submit your application with language proficiency details',
    },
    {
      step: 2,
      title: 'Test',
      description: 'Complete a short translation test to demonstrate your skills',
    },
    {
      step: 3,
      title: 'Train',
      description: 'Attend online training sessions on translation best practices',
    },
    {
      step: 4,
      title: 'Translate',
      description: 'Start translating HTTN content and reach more kids!',
    },
  ];

  const translators = [
    {
      name: 'Amara',
      age: 10,
      location: 'Kenya',
      languages: 'English → Swahili',
      translated: 24,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    {
      name: 'Carlos',
      age: 11,
      location: 'Brazil',
      languages: 'English → Portuguese',
      translated: 31,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    {
      name: 'Mei',
      age: 12,
      location: 'China',
      languages: 'English → Chinese',
      translated: 28,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
  ];

  const isTrailblazer = user?.age && user.age >= 9 && user.age <= 12;
  const canJoin = isTrailblazer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#FF9A8B] via-[#FFA894] to-[#FFBBA8] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Back Button */}
          {onBack && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onBack}
              className="mb-8 flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Explore</span>
            </motion.button>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto text-white"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Languages className="w-16 h-16" />
              <Globe className="w-16 h-16" />
            </div>
            <h1 className="text-6xl mb-6 text-[40px] font-bold">
              Kidspiration Translators Network
            </h1>
            <p className="text-3xl mb-4 text-[24px]">Young Language Heroes</p>
            <p className="text-2xl mb-8 text-white/90 max-w-3xl mx-auto text-[20px]">
              Calling all Trailblazers aged 9-12! Use your language superpowers to help translate Kidspiration content and reach even more children around the world.
            </p>
            
            {!user && (
              <div className="p-6 bg-white/20 backdrop-blur-sm rounded-2xl max-w-2xl mx-auto">
                <p className="text-xl mb-4">
                  Sign in to see if you're eligible to join the Translators Network!
                </p>
                <button
                  onClick={onAuthClick}
                  className="px-8 py-4 bg-white text-[#FF9A8B] rounded-full hover:shadow-2xl transform hover:scale-105 transition-all font-bold"
                >
                  Sign In
                </button>
              </div>
            )}

            {user && !canJoin && (
              <div className="p-6 bg-white/20 backdrop-blur-sm rounded-2xl max-w-2xl mx-auto">
                <p className="text-xl">
                  ⭐ This program is for Trailblazers (ages 9-12). Keep growing and you'll be eligible soon!
                </p>
              </div>
            )}

            {canJoin && (
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => window.location.hash = 'translators-apply'}
                  className="px-8 py-4 bg-white text-[#FF9A8B] rounded-full hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-2 group"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-full hover:bg-white/30 transition-all">
                  Learn More
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { label: 'Languages', value: '30+', icon: Languages },
              { label: 'Translators', value: '200+', icon: Users },
              { label: 'Stories Translated', value: '1,000+', icon: BookOpen },
              { label: 'Countries', value: '40+', icon: Globe },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 text-[#FF9A8B] mx-auto mb-3" />
                <div className="text-4xl text-gray-900 mb-2 font-bold">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A8B] to-[#FFA894] text-5xl mb-6 font-bold text-[40px] text-[48px]">
              Requirements
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto text-[20px]">
              What you need to become a Kidspiration translator
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${req.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <req.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-gray-900 mb-3 text-xl font-bold text-[20px]">{req.title}</h3>
                <p className="text-gray-600 text-[16px]">{req.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages We Need */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A8B] to-[#FFA894] text-5xl mb-6 text-[40px] font-bold">
              Languages We Translate
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto text-[20px]">
              Join one of our active translation teams
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div className="text-5xl mb-3 text-[40px]">{lang.flag}</div>
                <h3 className="text-gray-900 mb-2 text-xl text-[20px]">{lang.name}</h3>
                <p className="text-gray-600 text-[16px]">{lang.translators} translators</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-[#FFE5F1] to-[#FFF5F7]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A8B] to-[#FFA894] text-5xl mb-6 text-[40px] font-bold">
              How to Join
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto text-[20px]">
              Four simple steps to becoming a translator
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-[#FF9A8B] to-[#FFA894] rounded-full flex items-center justify-center text-white shadow-lg text-xl font-bold">
                    {item.step}
                  </div>
                  
                  <h3 className="text-gray-900 mb-3 text-xl mt-2 font-bold text-[24px]">{item.title}</h3>
                  <p className="text-gray-600 text-[16px]">{item.description}</p>
                </div>
                
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-[#FF9A8B]/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A8B] to-[#FFA894] text-5xl mb-6 text-[40px] font-bold">
              Translator Benefits
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto text-[20px]">
              What you'll gain from joining the network
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm"
              >
                <Award className="w-6 h-6 text-[#FF9A8B] flex-shrink-0" />
                <span className="text-gray-700 font-bold font-normal">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Translators */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A8B] to-[#FFA894] text-5xl mb-6 text-[40px] font-bold">
              Become a Translator Today!
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto text-[20px]">
              Join young heroes making content accessible worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {[translatorImage1, translatorImage2, translatorImage3].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image}
                    alt="Young translator"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={() => window.location.hash = 'translators-apply'}
              className="px-10 py-5 bg-gradient-to-r from-[#FF9A8B] to-[#FFA894] text-white rounded-full hover:shadow-2xl transform hover:scale-105 transition-all text-xl inline-flex items-center gap-3"
            >
              <Languages className="w-6 h-6" />
              <span>Enroll as a Translator</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      {canJoin && (
        <section className="py-20 bg-gradient-to-r from-[#FF9A8B] to-[#FFA894] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30" />
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center text-white max-w-3xl mx-auto"
            >
              <Sparkles className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-5xl mb-6">Ready to Be a Language Hero?</h2>
              <p className="text-2xl mb-8 text-white/90">
                Use your bilingual superpowers to help children around the world access God's word in their own language. Your translations can inspire thousands!
              </p>
              <button
                onClick={() => window.location.hash = 'translators-apply'}
                className="px-10 py-5 bg-white text-[#FF9A8B] rounded-full hover:shadow-2xl transform hover:scale-105 transition-all text-xl"
              >
                Apply to Join
              </button>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
