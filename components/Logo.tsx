
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Glow Effect Background */}
      <div className="absolute inset-0 bg-orange-500/20 blur-lg rounded-full animate-pulse"></div>
      
      {/* SVG Isotype */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]"
      >
        {/* Hexagonal Frame */}
        <path 
          d="M50 5L89 27.5V72.5L50 95L11 72.5V27.5L50 5Z" 
          stroke="#f97316" 
          strokeWidth="6" 
          strokeLinejoin="round"
        />
        {/* Stylized N */}
        <path 
          d="M30 70V30L55 55L55 30M70 30V70" 
          stroke="white" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Tech Nodes */}
        <circle cx="30" cy="30" r="4" fill="#f97316" />
        <circle cx="70" cy="70" r="4" fill="#f97316" />
      </svg>
    </div>
  );
};

export default Logo;
