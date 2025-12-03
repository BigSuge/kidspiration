import { useState, useEffect, useRef } from 'react';
import { X, User, Users, BookOpen, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { KidspirationLogo } from './KidspirationLogo';
import { useAuth } from '../utils/AuthContext';
import { projectId, publicAnonKey, functionName } from '../utils/supabase/info';
import { sanitizeInput, isValidEmail, validatePasswordStrength, sanitizeFormData } from '../utils/inputSanitization';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type UserType = 'kid' | 'parent' | 'leader' | null;
type AuthMode = 'select' | 'login' | 'signup' | 'verify-otp' | 'forgot-password' | 'reset-password';

const adultAssistanceAudio = new Audio('/assets/audio/signup onboarding.mp3');

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { login } = useAuth();
  const [userType, setUserType] = useState<UserType>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('select');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Kid signup state
  const [showAdultAssistance, setShowAdultAssistance] = useState(false);
  const [adultConfirmed, setAdultConfirmed] = useState(false);
  const [kidForm, setKidForm] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    username: '',
    country: '',
  });

  // Adult signup state
  const [adultForm, setAdultForm] = useState({
    title: '',
    firstName: '',
    lastName: '',
    username: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    occupation: '',
    churchAffiliation: '',
    churchBranch: '',
    churchName: '',
  });

  // Helper function to calculate age from birthday
  const calculateAge = (birthday: string): number => {
    if (!birthday) return 0;
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Login state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  // OTP state
  const [otpForm, setOtpForm] = useState({
    email: '',
    otp: '',
  });

  // Password reset state
  const [resetForm, setResetForm] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [resetStep, setResetStep] = useState<'email' | 'otp'>('email');

  // Password visibility state
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);


  // Ref for scrolling to top
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen]);

  // Scroll to top when error or success message appears
  useEffect(() => {
    if ((error || successMessage) && modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [error, successMessage]);

  const resetState = () => {
    setUserType(null);
    setAuthMode('select');
    setError('');
    setSuccessMessage('');
    setLoading(false);
    setShowAdultAssistance(false);
    setAdultConfirmed(false);
    setKidForm({ firstName: '', lastName: '', birthday: '', username: '', country: '' });
    setAdultForm({
      title: '',
      firstName: '',
      lastName: '',
      username: '',
      birthday: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      occupation: '',
      churchAffiliation: '',
      churchBranch: '',
      churchName: '',
    });
    setLoginForm({ username: '', password: '' });
    setOtpForm({ email: '', otp: '' });
    setResetForm({ email: '', otp: '', newPassword: '', confirmPassword: '' });
    setResetStep('email');
    // Reset password visibility states
    setShowLoginPassword(false);
    setShowSignupPassword(false);
    setShowSignupConfirmPassword(false);
    setShowResetPassword(false);
    setShowResetConfirmPassword(false);
  };

  const playAdultAssistanceAudio = () => {
    adultAssistanceAudio.pause();
    adultAssistanceAudio.currentTime = 0;
    adultAssistanceAudio.play().catch(() => {
      /* Ignored: autoplay restrictions will surface UI controls elsewhere */
    });
  };

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setAuthMode('login');
  };

  const handleKidLogin = async () => {
    setError('');
    setLoading(true);

    // Sanitize username
    const sanitizedUsername = sanitizeInput(loginForm.username);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${functionName}/auth/kid/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ username: sanitizedUsername }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      login(data.user);
      setSuccessMessage(data.message);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleKidSignupRequest = () => {
    setShowAdultAssistance(true);
    playAdultAssistanceAudio();
  };

  const handleKidSignup = async () => {
    setError('');
    setLoading(true);

    // Sanitize all input fields
    const sanitizedKidForm = sanitizeFormData(kidForm);

    // Validate
    if (!sanitizedKidForm.firstName || !sanitizedKidForm.lastName || !sanitizedKidForm.birthday || !sanitizedKidForm.username || !sanitizedKidForm.country) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const age = calculateAge(sanitizedKidForm.birthday);
    if (age < 0 || age > 12) {
      setError('Age must be between 0 and 12');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${functionName}/auth/kid/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ ...sanitizedKidForm, age }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      setSuccessMessage(data.message);
      setTimeout(() => {
        setAuthMode('login');
        setShowAdultAssistance(false);
        setAdultConfirmed(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAdultLogin = async () => {
    setError('');
    setLoading(true);

    // Sanitize username but not password
    const sanitizedUsername = sanitizeInput(loginForm.username);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${functionName}/auth/adult/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            username: sanitizedUsername,
            password: loginForm.password,
            type: userType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      login(data.user);
      setSuccessMessage(data.message);
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAdultSignup = async () => {
    setError('');
    setLoading(true);

    // Sanitize all fields except passwords
    const sanitizedAdultForm = sanitizeFormData(adultForm, ['password', 'confirmPassword']);

    // Validate
    if (!sanitizedAdultForm.title || !sanitizedAdultForm.firstName || !sanitizedAdultForm.lastName || !sanitizedAdultForm.username ||
      !sanitizedAdultForm.birthday || !sanitizedAdultForm.email || !sanitizedAdultForm.password || !sanitizedAdultForm.confirmPassword || !sanitizedAdultForm.country || !sanitizedAdultForm.occupation) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Validate email format
    if (!isValidEmail(sanitizedAdultForm.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (userType === 'leader') {
      if (!sanitizedAdultForm.churchAffiliation) {
        setError('Please select your church');
        setLoading(false);
        return;
      }

      if (sanitizedAdultForm.churchAffiliation === 'christ-embassy' && !sanitizedAdultForm.churchBranch) {
        setError('Please enter your Christ Embassy branch');
        setLoading(false);
        return;
      }

      if (sanitizedAdultForm.churchAffiliation === 'other' && !sanitizedAdultForm.churchName) {
        setError('Please enter your church name');
        setLoading(false);
        return;
      }
    }

    const age = calculateAge(sanitizedAdultForm.birthday);

    if (sanitizedAdultForm.password !== sanitizedAdultForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(sanitizedAdultForm.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${functionName}/auth/adult/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            ...sanitizedAdultForm,
            age,
            type: userType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Auto-login after successful signup
      if (data.autoLogin && data.user) {
        login(data.user);
        setSuccessMessage(data.message);
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 2000);
      } else {
        // Fallback to OTP flow if needed
        setOtpForm({ email: sanitizedAdultForm.email, otp: '' });
        setAuthMode('verify-otp');
        setSuccessMessage(data.message);
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError('');
    setLoading(true);

    // Sanitize email and OTP
    const sanitizedOtpForm = sanitizeFormData(otpForm);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${functionName}/auth/adult/verify-otp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(sanitizedOtpForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setSuccessMessage(data.message);
      setTimeout(() => {
        setAuthMode('login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    setLoading(true);

    // Sanitize and validate email
    const sanitizedEmail = sanitizeInput(resetForm.email);

    if (!isValidEmail(sanitizedEmail)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${functionName}/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email: sanitizedEmail }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      setSuccessMessage(data.message);
      setResetStep('otp');
    } catch (err: any) {
      setError(err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError('');
    setLoading(true);

    // Sanitize email and OTP, but not passwords
    const sanitizedEmail = sanitizeInput(resetForm.email);
    const sanitizedOtp = sanitizeInput(resetForm.otp);

    if (resetForm.newPassword !== resetForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(resetForm.newPassword);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/${functionName}/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email: sanitizedEmail,
            otp: sanitizedOtp,
            newPassword: resetForm.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Reset failed');
      }

      setSuccessMessage(data.message);
      setTimeout(() => {
        setAuthMode('login');
        setResetStep('email');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 pt-20 sm:pt-4 overflow-y-auto">
      <div ref={modalContentRef} className={`bg-white rounded-3xl shadow-2xl w-full max-h-[85vh] overflow-y-auto my-4 sm:my-8 ${authMode === 'select' ? 'max-w-5xl' : 'max-w-md'}`}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] p-6 rounded-t-3xl z-10">
          <div className="flex items-center justify-between">
            <KidspirationLogo size="sm" showText={true} />
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-700 text-center">{successMessage}</p>
            </div>
          )}

          {/* User Type Selection */}
          {authMode === 'select' && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1493] to-[#FF69B4] mb-2 font-extrabold text-[32px]">Who Are You?</h2>
                <p className="text-gray-500 text-lg">Choose your role and start your Kidspiration journey!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => handleUserTypeSelect('kid')}
                  className="w-full p-8 bg-[#FFF5F9] rounded-3xl border-4 border-[#FF1493] hover:shadow-xl transition-all transform hover:scale-105 group"
                >
                  <div className="text-6xl mb-4 text-center">🎨</div>
                  <h3 className="text-[#2D1B69] mb-2 font-extrabold text-[24px] text-center">I'm a Kid!</h3>
                  <p className="text-gray-500 text-center">Ages 0-12</p>
                  <p className="text-gray-500 text-center text-sm mt-1">Play, Learn & Share!</p>
                </button>

                <button
                  onClick={() => handleUserTypeSelect('parent')}
                  className="w-full p-8 bg-[#F0F9FF] rounded-3xl border-4 border-[#00BCD4] hover:shadow-xl transition-all transform hover:scale-105 group"
                >
                  <div className="text-6xl mb-4 text-center">👨‍👩‍👧‍👦</div>
                  <h3 className="text-[#2D1B69] mb-2 text-[24px] font-extrabold text-center">I'm a<br />Parent/Teacher</h3>
                  <p className="text-gray-500 text-center text-sm mt-1">Guide & Mentor</p>
                  <p className="text-gray-500 text-center text-sm">Organize Events!</p>
                </button>

                <button
                  onClick={() => handleUserTypeSelect('leader')}
                  className="w-full p-8 bg-[#F3F0FF] rounded-3xl border-4 border-[#9333EA] hover:shadow-xl transition-all transform hover:scale-105 group"
                >
                  <div className="text-6xl mb-4 text-center">📖</div>
                  <h3 className="text-[#2D1B69] mb-2 text-[24px] font-extrabold text-center">I'm a<br />Pastor/Leader</h3>
                  <p className="text-gray-500 text-center text-sm mt-1">Ministry Leader</p>
                  <p className="text-gray-500 text-center text-sm">Lead the Vision!</p>
                </button>
              </div>
            </div>
          )}

          {/* Kid Login */}
          {authMode === 'login' && userType === 'kid' && !showAdultAssistance && (
            <div className="space-y-4">
              <h2 className="text-center text-gray-900 mb-6 text-[24px] font-bold">Welcome Back, Champion! 🌟</h2>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none"
                  placeholder="Enter your username"
                />
              </div>

              <button
                onClick={handleKidLogin}
                disabled={loading || !loginForm.username}
                className="w-full py-3 bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 text-center font-bold text-[24px]"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <div className="text-center">
                <button
                  onClick={handleKidSignupRequest}
                  className="text-[#A78BFA] hover:text-[#FF6B9D] transition-colors"
                >
                  Don't have an account? Create one
                </button>
              </div>

              <button
                onClick={() => setAuthMode('select')}
                className="w-full py-2 text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
            </div>
          )}

          {/* Kid Signup - Adult Assistance Request */}
          {showAdultAssistance && authMode !== 'signup' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👋</span>
                </div>
                <h2 className="text-gray-900 mb-4">Hold on, Champ!</h2>
                <p className="text-gray-600 mb-6">
                  To create your account, you need an adult's help. Please ask a parent or teacher to help you.
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                <input
                  type="checkbox"
                  id="adult-confirm"
                  checked={adultConfirmed}
                  onChange={(e) => setAdultConfirmed(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#4ECDC4]"
                />
                <label htmlFor="adult-confirm" className="text-sm text-gray-700">
                  I have an adult with me now to help me sign up
                </label>
              </div>

              <button
                onClick={() => {
                  setAuthMode('signup');
                  setShowAdultAssistance(false);
                }}
                disabled={!adultConfirmed}
                className="w-full py-3 bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 text-center font-bold text-[24px]"
              >
                Continue to Sign Up
              </button>

              <button
                onClick={() => {
                  setShowAdultAssistance(false);
                  setAdultConfirmed(false);
                }}
                className="w-full py-2 text-gray-600 hover:text-gray-900"
              >
                ← Back to Login
              </button>
            </div>
          )}

          {/* Kid Signup Form */}
          {authMode === 'signup' && userType === 'kid' && (
            <div className="space-y-4">
              <h2 className="text-center text-gray-900 mb-6 text-[24px] font-bold">Create Your Account 🎉</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={kidForm.firstName}
                    onChange={(e) => setKidForm({ ...kidForm, firstName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={kidForm.lastName}
                    onChange={(e) => setKidForm({ ...kidForm, lastName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Birthday</label>
                <input
                  type="date"
                  value={kidForm.birthday}
                  onChange={(e) => setKidForm({ ...kidForm, birthday: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={kidForm.username}
                  onChange={(e) => setKidForm({ ...kidForm, username: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none"
                  placeholder="Choose a cool username"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Country</label>
                <select
                  value={kidForm.country}
                  onChange={(e) => setKidForm({ ...kidForm, country: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#FF6B9D] focus:outline-none"
                >
<option value="">Select your country</option>
<option value="Australia">Australia</option>
<option value="Brazil">Brazil</option>
<option value="Canada">Canada</option>
<option value="France">France</option>
<option value="Germany">Germany</option>
<option value="Ghana">Ghana</option>
<option value="India">India</option>
<option value="Italy">Italy</option>
<option value="Jamaica">Jamaica</option>
<option value="Kenya">Kenya</option>
<option value="Malaysia">Malaysia</option>
<option value="Mexico">Mexico</option>
<option value="Netherlands">Netherlands</option>
<option value="Nigeria">Nigeria</option>
<option value="Philippines">Philippines</option>
<option value="Singapore">Singapore</option>
<option value="South Africa">South Africa</option>
<option value="Spain">Spain</option>
<option value="Trinidad and Tobago">Trinidad and Tobago</option>
<option value="United Kingdom">United Kingdom</option>
<option value="United States">United States</option>
<option value="Other">Other</option>
                </select>
              </div>

              <button
                onClick={handleKidSignup}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#FF6B9D] to-[#A78BFA] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 text-center font-bold"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <button
                onClick={() => {
                  setAuthMode('login');
                  setShowAdultAssistance(false);
                }}
                className="w-full py-2 text-gray-600 hover:text-gray-900"
              >
                ← Back to Login
              </button>
            </div>
          )}

          {/* Adult Login */}
          {authMode === 'login' && (userType === 'parent' || userType === 'leader') && (
            <div className="space-y-4">
              <h2 className="text-center text-gray-900 mb-6 text-[24px] font-bold text-[20px]">
                {userType === 'parent' ? 'Parent/Teacher Login' : 'Pastor/Leader Login'}
              </h2>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdultLogin}
                disabled={loading || !loginForm.username || !loginForm.password}
                className="w-full py-3 bg-gradient-to-r from-[#A78BFA] to-[#4ECDC4] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 text-center text-[20px] font-bold"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <div className="flex justify-between text-sm">
                <button
                  onClick={() => setAuthMode('signup')}
                  className="text-[#A78BFA] hover:text-[#FF6B9D] transition-colors"
                >
                  Create account
                </button>
                <button
                  onClick={() => setAuthMode('forgot-password')}
                  className="text-[#4ECDC4] hover:text-[#A78BFA] transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                onClick={() => setAuthMode('select')}
                className="w-full py-2 text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
            </div>
          )}

          {/* Adult Signup */}
          {authMode === 'signup' && (userType === 'parent' || userType === 'leader') && (
            <div className="space-y-4">
              <h2 className="text-center text-gray-900 mb-6 text-[24px] font-bold">Create Account</h2>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Title</label>
                <select
                  value={adultForm.title}
                  onChange={(e) => setAdultForm({ ...adultForm, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                >
                  <option value="">Select your title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Ms">Ms</option>
                  <option value="Pastor">Pastor</option>
                  <option value="Dr">Dr</option>
                  <option value="Apostle">Apostle</option>
                  <option value="Bishop">Bishop</option>
                  <option value="Reverend">Reverend</option>
                  <option value="Elder">Elder</option>
                  <option value="Deacon">Deacon</option>
                  <option value="Deaconess">Deaconess</option>
                  <option value="Minister">Minister</option>
                  <option value="Evangelist">Evangelist</option>
                  <option value="Prophet">Prophet</option>
                  <option value="Prophetess">Prophetess</option>
                  <option value="Ambassador">Ambassador</option>
                  <option value="Prof">Prof</option>
                  <option value="Sir">Sir</option>
                  <option value="Lady">Lady</option>
                  <option value="Chief">Chief</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={adultForm.firstName}
                    onChange={(e) => setAdultForm({ ...adultForm, firstName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={adultForm.lastName}
                    onChange={(e) => setAdultForm({ ...adultForm, lastName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={adultForm.username}
                  onChange={(e) => setAdultForm({ ...adultForm, username: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Birthday</label>
                <input
                  type="date"
                  value={adultForm.birthday}
                  onChange={(e) => setAdultForm({ ...adultForm, birthday: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={adultForm.email}
                  onChange={(e) => setAdultForm({ ...adultForm, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    value={adultForm.password}
                    onChange={(e) => setAdultForm({ ...adultForm, password: e.target.value })}
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters with uppercase, lowercase, and number</p>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showSignupConfirmPassword ? "text" : "password"}
                    value={adultForm.confirmPassword}
                    onChange={(e) => setAdultForm({ ...adultForm, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showSignupConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Country</label>
                <select
                  value={adultForm.country}
                  onChange={(e) => setAdultForm({ ...adultForm, country: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                >
<option value="">Select your country</option>
<option value="Australia">Australia</option>
<option value="Brazil">Brazil</option>
<option value="Canada">Canada</option>
<option value="France">France</option>
<option value="Germany">Germany</option>
<option value="Ghana">Ghana</option>
<option value="India">India</option>
<option value="Italy">Italy</option>
<option value="Jamaica">Jamaica</option>
<option value="Kenya">Kenya</option>
<option value="Malaysia">Malaysia</option>
<option value="Mexico">Mexico</option>
<option value="Netherlands">Netherlands</option>
<option value="Nigeria">Nigeria</option>
<option value="Philippines">Philippines</option>
<option value="Singapore">Singapore</option>
<option value="South Africa">South Africa</option>
<option value="Spain">Spain</option>
<option value="Trinidad and Tobago">Trinidad and Tobago</option>
<option value="United Kingdom">United Kingdom</option>
<option value="United States">United States</option>
<option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Occupation</label>
                <input
                  type="text"
                  value={adultForm.occupation}
                  onChange={(e) => setAdultForm({ ...adultForm, occupation: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                  placeholder="Enter your occupation"
                />
              </div>

              {userType === 'leader' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Church</label>
                    <select
                      value={adultForm.churchAffiliation}
                      onChange={(e) =>
                        setAdultForm({
                          ...adultForm,
                          churchAffiliation: e.target.value,
                          churchBranch: '',
                          churchName: '',
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                    >
                      <option value="">Select your church</option>
                      <option value="christ-embassy">Christ Embassy</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {adultForm.churchAffiliation === 'christ-embassy' && (
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Christ Embassy Branch</label>
                      <input
                        type="text"
                        value={adultForm.churchBranch}
                        onChange={(e) => setAdultForm({ ...adultForm, churchBranch: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                        placeholder="e.g. Christ Embassy Lekki"
                      />
                    </div>
                  )}

                  {adultForm.churchAffiliation === 'other' && (
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Church Name</label>
                      <input
                        type="text"
                        value={adultForm.churchName}
                        onChange={(e) => setAdultForm({ ...adultForm, churchName: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#A78BFA] focus:outline-none"
                        placeholder="Enter your church name"
                      />
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleAdultSignup}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#A78BFA] to-[#4ECDC4] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 text-center font-bold"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>

              <button
                onClick={() => setAuthMode('login')}
                className="w-full py-2 text-gray-600 hover:text-gray-900"
              >
                ← Back to Login
              </button>
            </div>
          )}

          {/* OTP Verification */}
          {authMode === 'verify-otp' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📧</span>
                </div>
                <h2 className="text-gray-900 mb-2">Check Your Email</h2>
                <p className="text-sm text-gray-600 mb-6">
                  We've sent a 6-digit code to <strong>{otpForm.email}</strong>
                </p>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Enter OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpForm.otp}
                  onChange={(e) => setOtpForm({ ...otpForm, otp: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4ECDC4] focus:outline-none text-center text-2xl tracking-widest"
                  placeholder="000000"
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={loading || otpForm.otp.length !== 6}
                className="w-full py-3 bg-gradient-to-r from-[#4ECDC4] to-[#A78BFA] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          )}

          {/* Forgot Password */}
          {authMode === 'forgot-password' && (
            <div className="space-y-4">
              <h2 className="text-center text-gray-900 mb-6 text-[24px] font-bold">Reset Password</h2>

              {resetStep === 'email' ? (
                <>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={resetForm.email}
                      onChange={(e) => setResetForm({ ...resetForm, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4ECDC4] focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleForgotPassword}
                    disabled={loading || !resetForm.email}
                    className="w-full py-3 bg-gradient-to-r from-[#4ECDC4] to-[#A78BFA] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 font-bold text-center"
                  >
                    {loading ? 'Sending Code...' : 'Send Reset Code'}
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Enter OTP</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={resetForm.otp}
                      onChange={(e) => setResetForm({ ...resetForm, otp: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#4ECDC4] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showResetPassword ? "text" : "password"}
                        value={resetForm.newPassword}
                        onChange={(e) => setResetForm({ ...resetForm, newPassword: e.target.value })}
                        className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#4ECDC4] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowResetPassword(!showResetPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showResetPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters with uppercase, lowercase, and number</p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showResetConfirmPassword ? "text" : "password"}
                        value={resetForm.confirmPassword}
                        onChange={(e) => setResetForm({ ...resetForm, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#4ECDC4] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowResetConfirmPassword(!showResetConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showResetConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleResetPassword}
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-[#4ECDC4] to-[#A78BFA] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </>
              )}

              <button
                onClick={() => setAuthMode('login')}
                className="w-full py-2 text-gray-600 hover:text-gray-900"
              >
                ← Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
