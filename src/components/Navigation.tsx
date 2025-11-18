import { useState } from 'react';
import { Menu, X, ChevronDown, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { KidspirationLogo } from './KidspirationLogo';
import { useAuth } from '../utils/AuthContext';

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  onAuthClick?: () => void;
}

export function Navigation({ currentPage = 'home', onNavigate, onAuthClick }: NavigationProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'About Kidspiration', page: 'about' },
    { label: 'Explore', page: 'explore' },
    { label: 'Live TV', page: 'live-tv' },
    { label: 'Impact Stories', page: 'impact-stories' },
  ];

  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
    handleNavClick('home');
  };

  const languages = [
    { name: 'English', code: 'gb' },
    { name: 'Spanish', code: 'es' },
    { name: 'French', code: 'fr' },
    { name: 'Portuguese', code: 'pt' },
    { name: 'Chinese', code: 'cn' },
  ];

  const getFlagUrl = (code: string) => {
    return `https://flagcdn.com/w40/${code}.png`;
  };

  const currentLanguage = languages.find(lang => lang.name === selectedLanguage) || languages[0];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-40 rounded-b-3xl">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <KidspirationLogo size="lg" showText={true} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`relative text-[16px] font-semibold transition-colors hover:text-[#FF6B9D] ${
                  currentPage === item.page
                    ? 'text-[#FF6B9D]'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
                {currentPage === item.page && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img
                  src={getFlagUrl(currentLanguage.code)}
                  alt={currentLanguage.name}
                  className="w-6 h-4 object-cover rounded"
                />
                <span className="text-sm text-gray-700">{currentLanguage.name}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${languageOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.name);
                          setLanguageOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                      >
                        <img
                          src={getFlagUrl(lang.code)}
                          alt={lang.name}
                          className="w-6 h-4 object-cover rounded"
                        />
                        <span className="text-sm text-gray-700">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Auth Button / User Menu */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFE5EF] to-[#E9D5FF] rounded-full">
                  <User className="w-4 h-4 text-[#FF6B9D]" />
                  <span className="text-sm text-[16px] font-bold font-normal">
                    {user.title ? `${user.title} ` : ''}{user.firstName}
                  </span>
                </div>
                {user.type !== 'admin' && (
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="px-4 py-2 bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white rounded-full hover:shadow-lg transition-all text-[14px] font-semibold font-bold"
                  >
                    Dashboard
                  </button>
                )}
                {user.type === 'admin' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="px-4 py-2 bg-gradient-to-r from-[#A78BFA] to-[#4ECDC4] text-white rounded-full hover:shadow-lg transition-all text-[14px]"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border-2 border-gray-200 rounded-full hover:border-[#FF6B9D] hover:text-[#FF6B9D] transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-[14px]">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-6 py-3 bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all font-bold"
              >
                Join Kidspiration
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden py-4 border-t border-gray-100"
            >
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-colors ${
                      currentPage === item.page
                        ? 'bg-gradient-to-r from-[#FFE5EF] to-[#E9D5FF] text-[#FF6B9D]'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Language Selection */}
                <div className="px-4 py-2">
                  <p className="text-xs text-gray-500 mb-2">Language</p>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6B9D]"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.name}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile Auth Button / User Info */}
                <div className="px-4 pt-2">
                  {isAuthenticated && user ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#FFE5EF] to-[#E9D5FF] rounded-xl">
                        <User className="w-4 h-4 text-[#FF6B9D]" />
                        <span className="text-sm">
                          {user.title ? `${user.title} ` : ''}{user.firstName} {user.lastName}
                        </span>
                      </div>
                      {user.type !== 'admin' && (
                        <button
                          onClick={() => handleNavClick('dashboard')}
                          className="w-full px-4 py-3 bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] text-white rounded-xl hover:shadow-lg transition-all font-semibold text-center"
                        >
                          Dashboard
                        </button>
                      )}
                      {user.type === 'admin' && (
                        <button
                          onClick={() => handleNavClick('admin')}
                          className="w-full px-4 py-3 bg-gradient-to-r from-[#A78BFA] to-[#4ECDC4] text-white rounded-xl hover:shadow-lg transition-all"
                        >
                          Admin Panel
                        </button>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-[#FF6B9D] hover:text-[#FF6B9D] transition-all flex items-center justify-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        onAuthClick?.();
                        setIsOpen(false);
                      }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] text-white rounded-xl hover:shadow-lg transition-all text-center font-bold"
                    >
                      Join Kidspiration
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
