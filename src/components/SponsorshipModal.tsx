import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "../utils/AuthContext";

const createEmptySponsorForm = () => ({ name: "", email: "", phone: "" });

interface SponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTierId?: string | null;
  onTierSelect: (tierId: string) => void;
}

export function SponsorshipModal({
  isOpen,
  onClose,
  selectedTierId,
  onTierSelect,
}: SponsorshipModalProps) {
  const [formData, setFormData] = useState(createEmptySponsorForm);
  const { user } = useAuth();

  const sponsorshipTiers = [
    {
      id: "starter",
      name: "STARTER",
      emoji: "⭐",
      espees: "10 ESPEES",
      reach: "10 children",
      color: "bg-white",
      borderColor: "border-purple-300",
      textColor: "text-[#9B4DFF]",
    },
    {
      id: "house",
      name: "MEMBER OF HOUSE",
      emoji: "🏠",
      espees: "50 ESPEES",
      reach: "50 children",
      color: "bg-white",
      borderColor: "border-purple-300",
      textColor: "text-[#9B4DFF]",
    },
    {
      id: "prince",
      name: "PRINCE/PRINCESS",
      emoji: "👑",
      espees: "100 ESPEES",
      reach: "100 children",
      color: "bg-white",
      borderColor: "border-purple-400",
      textColor: "text-[#9B4DFF]",
    },
    {
      id: "duke",
      name: "DUKE/DUCHESS",
      emoji: "💎",
      espees: "200 ESPEES",
      reach: "200 children",
      color: "bg-gradient-to-br from-[#9B4DFF] to-[#C77DFF]",
      borderColor: "border-purple-500",
      textColor: "text-white",
    },
    {
      id: "governor",
      name: "GOVERNOR/GOVERNESS",
      emoji: "🌟",
      espees: "500 ESPEES",
      reach: "500 children",
      color: "bg-white",
      borderColor: "border-purple-400",
      textColor: "text-[#9B4DFF]",
    },
    {
      id: "king",
      name: "KING/QUEEN",
      emoji: "👑",
      espees: "1,000 ESPEES",
      reach: "1,000 children",
      color: "bg-white",
      borderColor: "border-purple-400",
      textColor: "text-[#9B4DFF]",
    },
    {
      id: "emperor",
      name: "EMPEROR/EMPRESS",
      emoji: "🌍",
      espees: "1,000+ ESPEES",
      reach: "Thousands!",
      color: "bg-gradient-to-br from-[#9B4DFF] to-[#C77DFF]",
      borderColor: "border-purple-500",
      textColor: "text-white",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setFormData(createEmptySponsorForm());
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

  const handleSubmit = () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all fields");
      return;
    }

    if (!selectedTierId) {
      alert("Please select a sponsorship tier");
      return;
    }

    // In production, this would process the payment
    console.log("Processing sponsorship:", {
      ...formData,
      tier: selectedTierId,
    });

    // For now, show success and close
    alert("Thank you for your sponsorship! Redirecting to payment...");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 overflow-y-auto pt-20 sm:pt-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto my-4 sm:my-8"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 pt-14 px-6 pb-6 sm:pt-16 sm:px-8 sm:pb-8 rounded-t-2xl sm:rounded-t-3xl">
                <div className="text-center text-white">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">💝</div>
                  <h2 className="text-2xl sm:text-4xl mb-2 sm:mb-3 font-bold px-2">Sponsor Children's Evangelism</h2>
                  <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto px-2">
                    Your sponsorship reaches children with the Gospel through HTTN Magazine
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8">
                {/* Contact Information Form */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl text-gray-900 mb-4 sm:mb-6 font-bold">Your Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm sm:text-base">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-[#9B4DFF] focus:outline-none transition-colors text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm sm:text-base">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-[#9B4DFF] focus:outline-none transition-colors text-sm sm:text-base"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2 text-sm sm:text-base">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-[#9B4DFF] focus:outline-none transition-colors text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Tier Selection */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl text-gray-900 mb-4 sm:mb-6 font-bold">Select Sponsorship Tier</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {sponsorshipTiers.map((tier) => {
                      const isSelected = selectedTierId === tier.id;
                      const isGradient = tier.color.includes("gradient");

                      return (
                        <motion.button
                          key={tier.id}
                          onClick={() => onTierSelect(tier.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className={`${tier.color} rounded-xl sm:rounded-2xl p-3 sm:p-4 border-3 ${
                            isSelected
                              ? "border-[#FF1F8E] ring-4 ring-[#FF1F8E]/30"
                              : tier.borderColor
                          } shadow-lg transition-all relative`}
                        >
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 bg-[#FF1F8E] rounded-full flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                          )}
                          <div className="text-center">
                            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{tier.emoji}</div>
                            <p
                              className={`text-[10px] sm:text-xs mb-1 sm:mb-2 leading-tight ${
                                isGradient ? "text-white" : "text-[#FF1F8E]"
                              }`}
                            >
                              {tier.name}
                            </p>
                            <p className={`mb-1 sm:mb-2 text-sm sm:text-base ${tier.textColor}`}>
                              {tier.espees}
                            </p>
                            <p
                              className={`text-[10px] sm:text-xs ${
                                isGradient ? "text-white/90" : "text-gray-600"
                              }`}
                            >
                              {tier.reach}
                            </p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Tier Summary */}
                {selectedTierId && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-5 sm:mb-6 border-2 border-purple-200"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                      <div>
                        <p className="text-sm sm:text-base text-gray-600 mb-1">Selected Tier</p>
                        <p className="text-lg sm:text-2xl text-[#9B4DFF]">
                          {
                            sponsorshipTiers.find((t) => t.id === selectedTierId)
                              ?.name
                          }
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-sm sm:text-base text-gray-600 mb-1">Impact</p>
                        <p className="text-lg sm:text-2xl text-[#FF1F8E]">
                          {
                            sponsorshipTiers.find((t) => t.id === selectedTierId)
                              ?.reach
                          }
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={onClose}
                    className="w-full sm:flex-1 py-3 sm:py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-all text-center"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedTierId || !formData.name || !formData.email || !formData.phone}
                    className="w-full sm:flex-1 py-3 sm:py-4 px-6 bg-gradient-to-r from-[#9B4DFF] to-[#FF1F8E] text-white rounded-full hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Trust Badge */}
                <div className="mt-5 sm:mt-6 text-center">
                  <p className="text-xs sm:text-sm text-gray-500 px-2">
                    🔒 Secure payment processing • Tax-deductible donations
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
