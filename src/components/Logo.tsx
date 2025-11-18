import imgHttnForKidsLogo1 from "figma:asset/6a063057597d397ba5b026401ea4f16ea19423bc.png";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

/**
 * HTTN For Kids Logo Component
 * 
 * Official Healing to the Nations For Kids logo
 * Used in Navigation, Footer, and Onboarding Modal
 */
export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeMap[size]} flex items-center justify-center transform hover:scale-110 transition-transform`}>
        <img
          src={imgHttnForKidsLogo1}
          alt="Healing to the Nations For Kids Logo"
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <div>
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A78BFA] to-[#4ECDC4] text-[24px] font-semibold">
            Healing To The Nations
          </h1>
          <p className="text-xs text-gray-500 -mt-1 text-[16px]">For Kids</p>
        </div>
      )}
    </div>
  );
}
