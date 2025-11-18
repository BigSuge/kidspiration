import { motion } from 'motion/react';
import { Users, Target, Trophy, CheckCircle, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from '../utils/AuthContext';

interface ER100PageProps {
  onAuthClick?: () => void;
}

export function ER100Page({ onAuthClick }: ER100PageProps) {
  const { isAuthenticated, user } = useAuth();

  const steps = [
    {
      number: 1,
      title: 'Sign Up',
      description: 'Register for the ER100 Initiative and get your tracking card',
      icon: Users,
    },
    {
      number: 2,
      title: 'Make Your Plan',
      description: 'Decide how you\'ll reach out - through school, church, neighborhood, or online',
      icon: Target,
    },
    {
      number: 3,
      title: 'Start Reaching',
      description: 'Share God\'s love with one child at a time, tracking your progress',
      icon: Heart,
    },
    {
      number: 4,
      title: 'Celebrate 100',
      description: 'Reach your goal and receive your ER100 Champion certificate!',
      icon: Trophy,
    },
  ];

  const methods = [
    {
      title: 'At School',
      description: 'Share HTTN magazines, organize lunch discussions, start a Bible club',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    },
    {
      title: 'In Your Neighborhood',
      description: 'Go door-to-door, host backyard events, organize game days with messages',
      image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    },
    {
      title: 'At Church',
      description: 'Lead children\'s ministry, organize Sunday school activities, start a youth group',
      image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    },
    {
      title: 'Online',
      description: 'Create social media content, start a blog, share videos with inspiring messages',
      image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    },
  ];

  const testimonials = [
    {
      name: 'David',
      age: 8,
      location: 'United States',
      quote: 'I reached 100 kids in just 6 months! Each conversation was special and reminded me that God can use anyone, even kids like me.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    {
      name: 'Sophia',
      age: 11,
      location: 'South Africa',
      quote: 'ER100 changed my life! I learned that sharing God\'s love isn\'t scary—it\'s the most exciting adventure ever.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
    {
      name: 'Emmanuel',
      age: 10,
      location: 'Ghana',
      quote: 'My whole family got involved! We reached over 200 kids together. Now other families in our church are joining too.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#FF6B9D] via-[#FFB4D6] to-[#FFC9E0] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto text-white"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Users className="w-16 h-16" />
            </div>
            <h1 className="text-6xl mb-6">
              ER100 Initiative
            </h1>
            <p className="text-3xl mb-4">Each One Reach a Hundred</p>
            <p className="text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Imagine if every child reached 100 other kids with God's love. That's the power of ER100—one child at a time, creating a ripple effect that changes the world!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    onAuthClick?.();
                  } else {
                    // Handle join action
                    window.location.hash = 'er100-signup';
                  }
                }}
                className="px-8 py-4 bg-white text-[#FF6B9D] rounded-full hover:shadow-2xl transform hover:scale-105 transition-all flex items-center gap-2 group"
              >
                <span>Join ER100 Today</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white rounded-full hover:bg-white/30 transition-all">
                Watch How It Works
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { label: 'Active Participants', value: '10,000+', icon: Users },
              { label: 'Kids Reached', value: '1M+', icon: Heart },
              { label: 'Countries', value: '50+', icon: Sparkles },
              { label: 'Champions', value: '5,000+', icon: Trophy },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 text-[#FF6B9D] mx-auto mb-3" />
                <div className="text-4xl text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#FFB4D6] text-5xl mb-6">
              How It Works
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Four simple steps to becoming an ER100 Champion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-[#FF6B9D] to-[#FFB4D6] rounded-full flex items-center justify-center text-white shadow-lg">
                    {step.number}
                  </div>
                  
                  <step.icon className="w-12 h-12 text-[#FF6B9D] mb-4 mt-2" />
                  <h3 className="text-gray-900 mb-3 text-xl">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-[#FF6B9D]/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#FFB4D6] text-5xl mb-6">
              Ways to Reach 100
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Choose the method that works best for you, or mix and match!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {methods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={method.image}
                    alt={method.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-white text-2xl">
                    {method.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-lg">{method.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-[#FFE5EF] to-[#FFF5F7]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] to-[#FFB4D6] text-5xl mb-6">
              ER100 Champions
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Hear from kids who've completed the challenge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-gray-900">{testimonial.name}, {testimonial.age}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF6B9D] to-[#FFB4D6] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-5xl mb-6">Ready to Be an ER100 Champion?</h2>
            <p className="text-2xl mb-8 text-white/90">
              Join thousands of kids around the world who are reaching 100 children with God's love. Your journey starts today!
            </p>
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  onAuthClick?.();
                } else {
                  window.location.hash = 'er100-signup';
                }
              }}
              className="px-10 py-5 bg-white text-[#FF6B9D] rounded-full hover:shadow-2xl transform hover:scale-105 transition-all text-xl"
            >
              Start Your ER100 Journey
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
