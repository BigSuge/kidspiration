import imgImage3 from "figma:asset/998e1333223a691be364d61c39bfa68a41a6848f.png";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

/**
 * Kidspiration Logo Component
 * 
 * Official Kidspiration logo
 * Used in Navigation, Footer, and Authentication Modals
 */
export function KidspirationLogo({ size = 'md', showText = false, className = '' }: LogoProps) {
  const sizeMap = {
    sm: 'h-24',
    md: 'h-32',
    lg: 'h-40',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={imgImage3}
        alt="Kidspiration Logo"
        className={`${sizeMap[size]} w-auto object-contain`}
      />
    </div>
  );
}
