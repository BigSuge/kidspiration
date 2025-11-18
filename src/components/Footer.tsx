import { motion } from 'motion/react';
import { KidspirationLogo } from './KidspirationLogo';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-[#2D3748] to-[#1A202C] text-white py-16 px-4 md:px-6 lg:px-8 rounded-t-3xl mt-[36px] pt-[36px] pr-[36px] pb-[72px] pl-[36px] mr-[0px] mb-[0px] ml-[0px]">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          {/* About Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4 max-w-2xl mx-auto text-center"
          >
            <div className="mb-6 flex justify-center">
              <KidspirationLogo size="md" showText={true} />
            </div>
            <p className="text-white/80 leading-relaxed text-lg mt-[-50px] mr-[0px] mb-[18px] ml-[0px] text-[16px]">
              Empowering children worldwide to inspire hearts and change lives through faith, love, and action.
            </p>
            <div className="flex gap-4 pt-4 justify-center">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                📘
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                📸
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110"
              >
                📺
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
             © 2025 Kidspiration. Rooted in the Healing Ministry of Pastor Chris Oyakhilome.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
