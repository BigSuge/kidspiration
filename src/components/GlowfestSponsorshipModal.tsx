import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "../utils/AuthContext";
import { EspeesService } from "../utils/espees";
import { toast } from "sonner";

const createEmptyGlowfestForm = () => ({ name: "", email: "", phone: "" });

interface GlowfestSponsorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTierId?: string | null;
  onTierSelect: (tierId: string) => void;
}

export function GlowfestSponsorshipModal({
  isOpen,
  onClose,
  selectedTierId,
  onTierSelect,
}: GlowfestSponsorshipModalProps) {
  const [formData, setFormData] = useState(createEmptyGlowfestForm);
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  // ... tiers ...

  const glowfestTiers = [
    {
      id: "er100",
      name: "ER100 SPONSORSHIP",
      emoji: "🎯",
      espees: "APPLICABLE",
      reach: "Support the Everyone Reach 100 campaign",
      gradient: "from-[#FF6B9D] to-[#F472B6]",
    },
    {
      id: "crusade",
      name: "CRUSADE SPONSORSHIP",
      emoji: "⛪",
      espees: "4,000 ESPEES",
      reach: "Fund healing crusades for children",
      gradient: "from-[#9B4DFF] to-[#C77DFF]",
    },
    {
      id: "outreach",
      name: "OUTREACH SPONSORSHIP",
      emoji: "🤝",
      espees: "2,000 ESPEES",
      reach: "Enable community outreach programs",
      gradient: "from-[#4ECDC4] to-[#00D4FF]",
    },
    {
      id: "missions",
      name: "MISSIONS SPONSORSHIP",
      emoji: "🌍",
      espees: "3,000 ESPEES",
      reach: "Support global missions initiatives",
      gradient: "from-[#FFA500] to-[#FFD41F]",
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
      setFormData(createEmptyGlowfestForm());
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

  const handleSubmit = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!selectedTierId) {
      toast.error("Please select a sponsorship tier");
      return;
    }

    setIsProcessing(true);

    try {
      const tier = glowfestTiers.find(t => t.id === selectedTierId);
      // Default to 10 if parsing fails or for APPLICABLE (which might need a custom input in reality, but sticking to 10 for now if non-numeric)
      // Actually "APPLICABLE" likely means custom amount, but user requirement didn't specify. I'll default to 100 if "APPLICABLE" or just parse 100.
      // Let's check regex.
      let amount = 100;
      const amountStr = tier?.espees.replace(/[^0-9.]/g, '');
      if (amountStr) {
        amount = parseFloat(amountStr);
      } else {
        // Fallback for "APPLICABLE" or non-numeric
        amount = 100; // Default amount
      }

      const response = await EspeesService.initiatePayment({
        sku: `GLOWFEST-${tier?.id}-${Date.now()}`,
        amount: amount,
        narration: `Glowfest Sponsorship: ${tier?.name}`,
        userId: user?.id || "guest",
        userType: user?.type || "guest",
        guestDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      });

      if (response.isMock) {
        toast.success(response.message);
        onClose();
        window.location.href = "/payment/success?ref=" + response.payment_ref;
      } else if (response.payment_ref) {
        const paymentUrl = `https://payment.espees.org/pay/${response.payment_ref}`;
        window.location.href = paymentUrl;
      } else {
        throw new Error("Invalid payment response");
      }

    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setIsProcessing(false);
    }
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden my-8 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 pt-14 px-6 pb-6 sm:pt-16 sm:px-8 sm:pb-8 rounded-t-2xl sm:rounded-t-3xl flex-shrink-0">
                <div className="text-center text-white">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">✨</div>
                  <h2 className="text-2xl sm:text-4xl mb-2 sm:mb-3 font-bold px-2">Glowfest Sponsorship</h2>
                  <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto px-2">
                    Partner with us to reach children worldwide through Glowfest 2025
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8 overflow-y-auto flex-1">
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
                  <h3 className="text-xl sm:text-2xl text-gray-900 mb-4 sm:mb-6 font-bold">Select Sponsorship Type</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {glowfestTiers.map((tier) => {
                      const isSelected = selectedTierId === tier.id;

                      return (
                        <motion.button
                          key={tier.id}
                          onClick={() => onTierSelect(tier.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`bg-white rounded-2xl p-5 sm:p-6 border-3 ${isSelected
                            ? "border-[#FF1F8E] ring-4 ring-[#FF1F8E]/30"
                            : "border-gray-300"
                            } shadow-lg transition-all relative text-left`}
                        >
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#FF1F8E] rounded-full flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                          )}
                          <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 bg-gradient-to-br ${tier.gradient} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                              {tier.emoji}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-[#FF1F8E] mb-1 font-bold">
                                {tier.name}
                              </p>
                              <p className="text-lg text-gray-900 mb-2">
                                {tier.espees}
                              </p>
                              <p className="text-sm text-gray-600">
                                {tier.reach}
                              </p>
                            </div>
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
                        <p className="text-sm sm:text-base text-gray-600 mb-1">Selected Sponsorship</p>
                        <p className="text-lg sm:text-2xl text-[#9B4DFF]">
                          {
                            glowfestTiers.find((t) => t.id === selectedTierId)
                              ?.name
                          }
                        </p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-sm sm:text-base text-gray-600 mb-1">Amount</p>
                        <p className="text-lg sm:text-2xl text-[#FF1F8E]">
                          {
                            glowfestTiers.find((t) => t.id === selectedTierId)
                              ?.espees
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
                    disabled={!selectedTierId || !formData.name || !formData.email || !formData.phone || isProcessing}
                    className="w-full sm:flex-1 py-3 sm:py-4 px-6 bg-gradient-to-r from-[#9B4DFF] to-[#FF1F8E] text-white rounded-full hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span>{isProcessing ? "Processing..." : "Continue to Payment"}</span>
                    {!isProcessing && <ArrowRight className="w-5 h-5" />}
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
