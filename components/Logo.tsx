import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false, size = 'md' }) => {
  const containerSizes = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-11',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-2 ${containerSizes[size]} ${className} cursor-pointer select-none`}
    >
      {/* SVG DUORISE Icon (Sweeping Arrow with Blue Swoosh) */}
      <svg 
        viewBox="0 0 100 80" 
        className={iconSizes[size]}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Black/White Main Outer Curved Arrow */}
        <path 
          d="M10 70 C 15 35, 40 18, 75 12 L 62 2 L 95 10 L 78 38 L 70 24 C 45 28, 28 42, 22 70 Z" 
          fill="currentColor" 
          className="text-white"
        />
        {/* Vibrant Cyan Inner Accent Swoosh Arc */}
        <path 
          d="M25 70 C 30 50, 48 38, 72 32 C 55 38, 40 50, 36 70 Z" 
          fill="#00A3E0" 
          />
      </svg>

      {/* Brand Wordmark */}
      {!iconOnly && (
        <div className="flex items-center font-black tracking-tight text-white uppercase" style={{ fontFamily: 'sans-serif' }}>
          <span className={`${textSizes[size]} tracking-tight font-extrabold`}>DUOR</span>
          
          {/* 'I' with Cyan Upward Arrow Head */}
          <div className="relative inline-flex flex-col items-center mx-[0.5px]">
            <svg viewBox="0 0 20 20" className="w-3 h-3 -mb-0.5 text-[#00A3E0]" fill="currentColor">
              <path d="M10 0 L19 18 L10 12 L1 18 Z" />
            </svg>
            <span className={`${textSizes[size]} font-extrabold -mt-1`}>I</span>
          </div>

          <span className={`${textSizes[size]} tracking-tight font-extrabold`}>SE</span>
        </div>
      )}
    </motion.div>
  );
};

export default Logo;

