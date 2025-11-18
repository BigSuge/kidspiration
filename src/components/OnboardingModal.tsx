import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Logo } from './Logo';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && formData.name && formData.age) {
      // Store data in localStorage for analytics
      const userData = {
        name: formData.name,
        age: formData.age,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('httn_user_data', JSON.stringify(userData));
      setStep(2);
    }
  };

  const handleSalvationResponse = (hasSalvation: boolean) => {
    const userData = JSON.parse(localStorage.getItem('httn_user_data') || '{}');
    userData.hasSalvation = hasSalvation;
    localStorage.setItem('httn_user_data', JSON.stringify(userData));

    if (hasSalvation) {
      setStep(4); // Show confirmation
    } else {
      setStep(3); // Show prayer
    }
  };

  const handlePrayerComplete = () => {
    const userData = JSON.parse(localStorage.getItem('httn_user_data') || '{}');
    userData.prayedSalvation = true;
    localStorage.setItem('httn_user_data', JSON.stringify(userData));
    setStep(4);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            {/* Header with colorful gradient */}
            <div className="bg-gradient-to-r from-[#FF6B9D] via-[#4ECDC4] to-[#A78BFA] pt-14 px-6 pb-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center justify-center mb-2">
                <div className="mb-3 bg-white p-2 rounded-2xl shadow-lg">
                  <Logo size="lg" showText={false} />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6 text-white animate-pulse" />
                  <h2 className="text-white text-center">Welcome to HTTN!</h2>
                  <Sparkles className="w-6 h-6 text-white animate-pulse" />
                </div>
              </div>
              <p className="text-white/90 text-center text-sm">
                We're so happy you're here!
              </p>
            </div>

            <div className="p-6">
              {/* Step 1: Collect name and age */}
              {step === 1 && (
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label className="block mb-2 text-gray-700">What is your name?</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full rounded-2xl border-2 border-gray-200 focus:border-[#FF6B9D] px-4 py-3"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">How old are you?</label>
                    <Input
                      type="number"
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="Enter your age"
                      className="w-full rounded-2xl border-2 border-gray-200 focus:border-[#FF6B9D] px-4 py-3"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] hover:from-[#F472B6] hover:to-[#FF6B9D] text-white rounded-2xl py-6 transition-all transform hover:scale-105"
                  >
                    Next
                  </Button>
                </motion.form>
              )}

              {/* Step 2: Ask about salvation */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <p className="text-center text-gray-700 mb-6">
                    {formData.name}, have you given your life to Jesus Christ?
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleSalvationResponse(true)}
                      className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#48D1CC] hover:from-[#48D1CC] hover:to-[#4ECDC4] text-white rounded-2xl py-6 transition-all transform hover:scale-105"
                    >
                      Yes, I have! ✨
                    </Button>
                    <Button
                      onClick={() => handleSalvationResponse(false)}
                      className="w-full bg-gradient-to-r from-[#FFE66D] to-[#FFC107] hover:from-[#FFC107] hover:to-[#FFE66D] text-gray-800 rounded-2xl py-6 transition-all transform hover:scale-105"
                    >
                      Not yet
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Prayer of Salvation */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-center text-gray-800 mb-4">Let's pray together! 🙏</h3>
                  <div className="bg-gradient-to-br from-[#FFF5F7] to-[#F0F9FF] p-6 rounded-2xl border-2 border-[#FF6B9D]/20">
                    <p className="text-gray-700 leading-relaxed text-center italic">
                      "Dear Lord Jesus, I believe You are the Son of God. I believe You died for me and God raised You from the dead. I accept You now as my Lord and Savior. Come into my heart and make me a child of God. Thank You, Jesus. Amen."
                    </p>
                  </div>
                  <Button
                    onClick={handlePrayerComplete}
                    className="w-full bg-gradient-to-r from-[#FF6B9D] to-[#F472B6] hover:from-[#F472B6] hover:to-[#FF6B9D] text-white rounded-2xl py-6 transition-all transform hover:scale-105"
                  >
                    Amen! 🎉
                  </Button>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-4"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-gray-800">Awesome!</h3>
                  <p className="text-gray-600">
                    We're so excited to have you here! Enjoy exploring Healing to the Nations.
                  </p>
                  <Button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#48D1CC] hover:from-[#48D1CC] hover:to-[#4ECDC4] text-white rounded-2xl py-6 transition-all transform hover:scale-105"
                  >
                    Let's Go! 🚀
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
