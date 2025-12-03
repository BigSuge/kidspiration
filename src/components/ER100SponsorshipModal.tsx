import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "../utils/AuthContext";
import confetti from "canvas-confetti";

const createEmptyERForm = () => ({
  name: "",
  email: "",
  phone: "",
  hasAdultSupport: false,
});

interface ER100SponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTierId?: string | null;
  onTierSelect: (tierId: string) => void;
  sponsorshipType?: 'parent' | 'kid';
  customAmount?: string;
  customCopies?: number;
}

export function ER100SponsorshipModal({
  isOpen,
  onClose,
  selectedTierId,
  onTierSelect,
  sponsorshipType = 'parent',
  customAmount,
  customCopies,
}: ER100SponsorshipModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState(createEmptyERForm);



  const parentSponsorshipTiers = [
    {
      id: "er100-starter",
      name: "Starter",
      emoji: "⭐",
      espees: "10 ESPEES",
      description: "Begin your ER100 journey",
      gradient: "from-[#60A5FA] to-[#93C5FD]",
      impact: "Reach 10 Kids with HTTN Magazine",
      reach: "10 Kids",
    },
    {
      id: "er100-house",
      name: "Member of House",
      emoji: "🏠",
      espees: "50 ESPEES",
      description: "Join the ER100 house",
      gradient: "from-[#A78BFA] to-[#C4B5FD]",
      impact: "Reach 50 Kids with HTTN Magazine",
      reach: "50 Kids",
    },
    {
      id: "er100-prince",
      name: "Prince/Princess",
      emoji: "👑",
      espees: "100 ESPEES",
      description: "Royal impact for children",
      gradient: "from-[#F472B6] to-[#FBCFE8]",
      impact: "Reach 100 Kids with HTTN Magazine",
      reach: "100 Kids",
    },
    {
      id: "er100-duke",
      name: "Duke/Duchess",
      emoji: "💎",
      espees: "200 ESPEES",
      description: "Noble sponsorship level",
      gradient: "from-[#34D399] to-[#6EE7B7]",
      impact: "Reach 200 Kids with HTTN Magazine",
      reach: "200 Kids",
    },
    {
      id: "er100-governor",
      name: "Governor/Governess",
      emoji: "🌟",
      espees: "500 ESPEES",
      description: "Lead the ER100 movement",
      gradient: "from-[#FBBF24] to-[#FCD34D]",
      impact: "Reach 500 Kids with HTTN Magazine",
      reach: "500 Kids",
    },
    {
      id: "er100-kings",
      name: "Kings/Queens",
      emoji: "👑",
      espees: "1,000 ESPEES",
      description: "Reign in generosity",
      gradient: "from-[#8B5CF6] to-[#A78BFA]",
      impact: "Reach 1,000-9,999 Kids with HTTN Magazine",
      reach: "1,000 - 9,999 Kids",
    },
    {
      id: "er100-royal",
      name: "Royal Hero",
      emoji: "🏆",
      espees: "10,000 ESPEES",
      description: "Grand sponsor - Royal level",
      gradient: "from-[#EF4444] to-[#F87171]",
      impact: "Reach 10,000-49,999 Kids with HTTN Magazine",
      reach: "10,000 - 49,999 Kids",
      isGrandSponsor: true,
    },
    {
      id: "er100-diamond",
      name: "Diamond Hero",
      emoji: "💎",
      espees: "50,000 ESPEES",
      description: "Grand sponsor - Diamond level",
      gradient: "from-[#06B6D4] to-[#22D3EE]",
      impact: "Reach 50,000-99,999 Kids with HTTN Magazine",
      reach: "50,000 - 99,999 Kids",
      isGrandSponsor: true,
    },
    {
      id: "er100-global",
      name: "Global Hero",
      emoji: "🌍",
      espees: "100,000 ESPEES",
      description: "Grand sponsor - Global impact",
      gradient: "from-[#10B981] to-[#34D399]",
      impact: "Reach 100,000 Kids with HTTN Magazine",
      reach: "100,000 Kids",
      isGrandSponsor: true,
    },
  ];

  const kidSponsorshipTiers = [
    {
      id: "kid-mighty",
      name: "A Mighty Champ",
      emoji: "💪",
      copies: "100 - 200 Copies",
      gradient: "from-[#3B82F6] to-[#60A5FA]",
      impact: "Sponsor 100-200 copies of HTTN Magazine",
    },
    {
      id: "kid-noble",
      name: "A Noble Champ",
      emoji: "🎖️",
      copies: "201 - 400 Copies",
      gradient: "from-[#8B5CF6] to-[#A78BFA]",
      impact: "Sponsor 201-400 copies of HTTN Magazine",
    },
    {
      id: "kid-royal",
      name: "A Royal Champ",
      emoji: "👑",
      copies: "401 - 700 Copies",
      gradient: "from-[#EC4899] to-[#F472B6]",
      impact: "Sponsor 401-700 copies of HTTN Magazine",
    },
    {
      id: "kid-diamond",
      name: "A Diamond Champ",
      emoji: "💎",
      copies: "701 - 999 Copies",
      gradient: "from-[#06B6D4] to-[#22D3EE]",
      impact: "Sponsor 701-999 copies of HTTN Magazine",
    },
    {
      id: "kid-global",
      name: "A Global Champ",
      emoji: "🌍",
      copies: "1,000 Copies & Above",
      gradient: "from-[#10B981] to-[#34D399]",
      impact: "Sponsor 1,000+ copies of HTTN Magazine",
    },
  ];

  const sponsorshipTiers = sponsorshipType === 'kid' ? kidSponsorshipTiers : parentSponsorshipTiers;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setFormData(createEmptyERForm());
      return;
    }

    if (user) {
      setFormData((prev) => ({
        ...prev,
        name:
          prev.name ||
          [user.title, user.firstName, user.lastName].filter(Boolean).join(" ") ||
          user.username,
        email: prev.email || user.email || "",
      }));
    }
  }, [isOpen, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (sponsorshipType === 'kid' && !formData.hasAdultSupport) {
      alert("Please make sure you have an adult or parent to help you complete the sponsorship!");
      return;
    }

    // Here you would integrate with payment processing
    console.log("Sponsorship submission:", {
      ...formData,
      tierId: selectedTierId,
      type: sponsorshipType,
      amount: customAmount,
      copies: customCopies
    });

    // Show success message
    const tierName = sponsorshipTiers.find(t => t.id === selectedTierId)?.name;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert(`Thank you for sponsoring the ER100 Campaign! Your ${tierName} sponsorship will make a huge difference!`);
    onClose();
  };

  const selectedTier = sponsorshipTiers.find((tier) => tier.id === selectedTierId);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 pt-20 sm:pt-28 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto my-4 sm:my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          {/* Header */}
          <div className={`${sponsorshipType === 'kid' ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'} text-white pt-14 px-6 pb-6 sm:pt-16 sm:px-8 sm:pb-8 rounded-t-3xl`}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center sm:text-left font-bold">
                {sponsorshipType === 'kid' ? 'Kids CHAMP Sponsorship' : 'Parents/Teachers/Leaders Sponsorship'}
              </h2>
            </div>
            <p className="text-center text-base sm:text-lg md:text-xl text-white/90">
              {sponsorshipType === 'kid'
                ? 'Become a CHAMP and sponsor HTTN Magazine copies for other kids!'
                : 'Help children reach 100 others with God\'s Word'}
            </p>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8">
            {!selectedTierId ? (
              <>
                {/* Tier Selection */}
                <h3 className="text-xl sm:text-2xl text-gray-900 mb-4 sm:mb-6 text-center font-bold">
                  Choose Your Sponsorship Level
                </h3>

                {sponsorshipType === 'kid' && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 border-2 border-blue-300 rounded-xl flex items-start gap-2 sm:gap-3">
                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm sm:text-base text-blue-900 font-bold mb-1">Hey Champion! 👋</p>
                      <p className="text-sm sm:text-base text-blue-800">
                        Make sure you have an adult or parent with you to help complete your sponsorship!
                      </p>
                    </div>
                  </div>
                )}

                {sponsorshipType === 'parent' ? (
                  <>
                    {/* Regular Sponsorship Tiers */}
                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-lg sm:text-xl text-gray-900 mb-3 sm:mb-4 font-bold text-center font-normal">Choose Your Hero Level</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {sponsorshipTiers.filter((t: any) => !t.isGrandSponsor).map((tier: any) => (
                          <motion.button
                            key={tier.id}
                            onClick={() => onTierSelect(tier.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="text-left p-4 sm:p-6 rounded-2xl border-2 border-gray-200 hover:border-transparent hover:shadow-xl transition-all bg-white"
                          >
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${tier.gradient} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4 shadow-lg`}>
                              {tier.emoji}
                            </div>
                            <h4 className="text-lg sm:text-xl text-gray-900 mb-2 font-bold">{tier.name}</h4>
                            <p className={`text-xl sm:text-2xl mb-2 bg-gradient-to-r ${tier.gradient} text-transparent bg-clip-text font-bold`}>
                              {tier.espees}
                            </p>
                            <p className="text-gray-600 text-xs sm:text-sm mb-2">Reach: {tier.reach}</p>
                            <p className="text-gray-700 text-xs sm:text-sm font-semibold">
                              ✓ {tier.impact}
                            </p>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Grand Sponsors */}
                    <div>
                      <h4 className="text-lg sm:text-xl text-gray-900 mb-3 sm:mb-4 font-bold text-center">Grand Sponsors</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                        {sponsorshipTiers.filter((t: any) => t.isGrandSponsor).map((tier: any) => (
                          <motion.button
                            key={tier.id}
                            onClick={() => onTierSelect(tier.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="text-left p-4 sm:p-6 rounded-2xl border-2 border-gray-200 hover:border-transparent hover:shadow-xl transition-all bg-white"
                          >
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${tier.gradient} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4 shadow-lg`}>
                              {tier.emoji}
                            </div>
                            <h4 className="text-lg sm:text-xl text-gray-900 mb-2 font-bold">{tier.name}</h4>
                            <p className={`text-xl sm:text-2xl mb-2 bg-gradient-to-r ${tier.gradient} text-transparent bg-clip-text font-bold`}>
                              {tier.espees}
                            </p>
                            <p className="text-gray-600 text-xs sm:text-sm mb-2">Reach: {tier.reach}</p>
                            <p className="text-gray-700 text-xs sm:text-sm font-semibold">
                              ✓ {tier.impact}
                            </p>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Kids CHAMP Levels */}
                    <div>
                      <h4 className="text-lg sm:text-xl text-gray-900 mb-3 sm:mb-4 font-bold text-center">Choose Your CHAMP Level</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {sponsorshipTiers.map((tier: any) => (
                          <motion.button
                            key={tier.id}
                            onClick={() => onTierSelect(tier.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="text-left p-4 sm:p-6 rounded-2xl border-2 border-gray-200 hover:border-transparent hover:shadow-xl transition-all bg-white"
                          >
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${tier.gradient} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4 shadow-lg`}>
                              {tier.emoji}
                            </div>
                            <h4 className="text-lg sm:text-xl text-gray-900 mb-2 font-bold">{tier.name}</h4>
                            <p className={`text-lg sm:text-xl mb-2 bg-gradient-to-r ${tier.gradient} text-transparent bg-clip-text font-bold`}>
                              {tier.copies}
                            </p>
                            <p className="text-gray-700 text-xs sm:text-sm font-semibold">
                              ✓ {tier.impact}
                            </p>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {/* Payment Form */}
                <div className="mb-4 sm:mb-6">
                  <div className={`p-4 sm:p-6 rounded-2xl bg-gradient-to-r ${selectedTier?.gradient} text-white mb-4 sm:mb-6`}>
                    <div className="flex items-center gap-3 sm:gap-4 mb-3">
                      <div className="text-3xl sm:text-4xl md:text-5xl flex-shrink-0">{selectedTier?.emoji}</div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{selectedTier?.name}</h3>
                        <p className="text-xl sm:text-2xl md:text-3xl font-bold">
                          {sponsorshipType === 'kid'
                            ? (customCopies ? `${customCopies} Copies` : (selectedTier as any)?.copies)
                            : (customAmount || (selectedTier as any)?.espees)
                          }
                        </p>
                      </div>
                    </div>
                    <p className="text-white font-semibold text-sm sm:text-base">✓ {selectedTier?.impact}</p>
                  </div>

                  <button
                    onClick={() => onTierSelect("")}
                    className="text-blue-600 hover:text-blue-700 mb-4 sm:mb-6 flex items-center gap-2 text-sm sm:text-base"
                  >
                    ← Change sponsorship level
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {sponsorshipType === 'kid' && (
                    <div className="p-3 sm:p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
                      <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="hasAdultSupport"
                          checked={formData.hasAdultSupport}
                          onChange={handleInputChange}
                          className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                          required
                        />
                        <span className="text-gray-800 font-semibold text-sm sm:text-base">
                          I confirm that I have an adult or parent with me to help complete this sponsorship *
                        </span>
                      </label>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-full sm:flex-1 px-4 py-3 sm:px-6 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all font-bold text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`w-full sm:flex-1 px-4 py-3 sm:px-6 sm:py-4 ${sponsorshipType === 'kid' ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'} text-white rounded-full hover:shadow-xl transition-all font-bold flex items-center justify-center gap-2 group text-sm sm:text-base`}
                    >
                      <span>Complete Sponsorship</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
