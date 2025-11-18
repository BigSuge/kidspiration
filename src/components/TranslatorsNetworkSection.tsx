import { motion } from 'motion/react';
import { Globe, BookOpen, Users, Award, Languages, Heart } from 'lucide-react';
import translatorsImage from 'figma:asset/444b064473701f515abb0274d487083a1468da72.png';
import { useAuth } from '../utils/AuthContext';

interface TranslatorsNetworkSectionProps {
  onAuthClick?: () => void;
}

export function TranslatorsNetworkSection({ onAuthClick }: TranslatorsNetworkSectionProps) {
  const { isAuthenticated } = useAuth();

  const handleEnlist = () => {
    if (!isAuthenticated) {
      onAuthClick?.();
    } else {
      // Handle enlistment - could open a form or redirect
      window.location.hash = 'enlist-translator';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 sm:px-6 mx-[0px] my-[38px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Languages className="w-10 h-10 text-[#4ECDC4]" />
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECDC4] via-[#A78BFA] to-[#FF6B9D]">
              Kidspiration Translators Network
            </h2>
            <Languages className="w-10 h-10 text-[#4ECDC4]" />
          </div>
          <p className="text-gray-700 max-w-3xl mx-auto text-xl">
            Empowering young Trailblazers (Ages 9-12) to spread God's Word in every language!
          </p>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={translatorsImage} 
              alt="Kidspiration Translators Network - Enlist Children Translators" 
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-gray-900 mb-6 text-center">About the Translators Network</h3>
            <div className="space-y-4 text-gray-700 text-lg">
              <p>
                The Kidspiration Translators Network is a special initiative that enlists gifted children 
                (Trailblazers, ages 9-12) to help translate Healing to the Nations magazine and other 
                Kidspiration resources into different languages.
              </p>
              <p>
                By joining the Translators Network, young champions become part of a global mission to 
                ensure that every child, in every language, can access God's Word and experience His 
                healing power!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-gray-900 text-center mb-8">Why Join the Translators Network?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#FF6B9D]/10 to-[#FF6B9D]/5 rounded-2xl p-6 border border-[#FF6B9D]/20">
              <div className="w-12 h-12 bg-[#FF6B9D] rounded-full flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-gray-900 mb-2">Global Impact</h4>
              <p className="text-gray-600">
                Help children around the world receive God's Word in their own language
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#A78BFA]/10 to-[#A78BFA]/5 rounded-2xl p-6 border border-[#A78BFA]/20">
              <div className="w-12 h-12 bg-[#A78BFA] rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-gray-900 mb-2">Develop Skills</h4>
              <p className="text-gray-600">
                Sharpen your language skills while serving God's kingdom
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#4ECDC4]/10 to-[#4ECDC4]/5 rounded-2xl p-6 border border-[#4ECDC4]/20">
              <div className="w-12 h-12 bg-[#4ECDC4] rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-gray-900 mb-2">Join a Community</h4>
              <p className="text-gray-600">
                Connect with other young translators from around the world
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-400/10 to-yellow-400/5 rounded-2xl p-6 border border-yellow-400/20">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-gray-900 mb-2">Earn Recognition</h4>
              <p className="text-gray-600">
                Receive certificates and recognition for your valuable contribution
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                <Languages className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-gray-900 mb-2">Break Barriers</h4>
              <p className="text-gray-600">
                Help overcome language barriers and reach unreached children
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 rounded-2xl p-6 border border-pink-500/20">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-gray-900 mb-2">Spread Love</h4>
              <p className="text-gray-600">
                Be an ambassador of God's love to children everywhere
              </p>
            </div>
          </div>
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-gray-900 mb-6 text-center">Who Can Join?</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-[#4ECDC4] text-xl">✓</span>
                <span>Trailblazers (children ages 9-12)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4ECDC4] text-xl">✓</span>
                <span>Fluent in English and at least one other language</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4ECDC4] text-xl">✓</span>
                <span>Passionate about sharing God's Word with other children</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4ECDC4] text-xl">✓</span>
                <span>Committed to translating with accuracy and love</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4ECDC4] text-xl">✓</span>
                <span>Parent/Guardian permission and support required</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={handleEnlist}
            className="px-12 py-4 bg-gradient-to-r from-[#4ECDC4] via-[#A78BFA] to-[#FF6B9D] text-white rounded-full hover:shadow-2xl transition-all transform hover:scale-105 font-bold"
          >
            Enlist Now as a Translator
          </button>
          <p className="text-gray-600 mt-4 text-sm">
            Join the movement and help children worldwide access God's Word!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
