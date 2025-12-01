import React from 'react';

interface HeaderLogoProps {
  showSubtitle?: boolean;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ showSubtitle = true }) => (
  <div className="flex flex-col items-center justify-center font-black tracking-tighter select-none mb-1 md:mb-4 leading-none">
    <div className="flex items-center justify-center mb-0 md:mb-1">
      <span className="text-white text-3xl mr-1">CHECK-IN,</span>
      <div className="flex items-center">
        <span className="text-green-400 text-3xl">G</span>
        <div className="h-6 w-6 relative flex items-center justify-center mx-0.5">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_6s_linear_infinite]" fill="none">
            <circle cx="50" cy="50" r="48" fill="#1D4ED8" />
            <path
              d="M50 2C23.5 2 2 23.5 2 50C2 76.5 23.5 98 50 98C76.5 98 98 76.5 98 50C98 23.5 76.5 2 50 2ZM85 45C80 50 75 45 70 48C65 51 62 55 58 52C55 49 58 40 55 35C52 30 48 32 45 28C42 25 45 15 50 12C55 9 60 10 65 12C85 18 95 35 85 45ZM35 70C30 75 25 65 20 60C18 55 20 50 25 48C30 46 35 50 38 55C41 60 40 65 35 70ZM65 80C60 85 50 82 45 78C40 74 42 65 45 62C48 59 55 60 58 65C61 70 68 75 65 80Z"
              fill="#22C55E"
            />
          </svg>
        </div>
        <span className="text-white text-3xl">!</span>
      </div>
    </div>
    {showSubtitle && (
      <span className="text-gray-200 text-[10px] md:text-sm font-normal mt-0 md:mt-1 tracking-normal opacity-90 text-center leading-tight">
        Anamnese funcional de planejamento e gestão de novas viagens
      </span>
    )}
  </div>
);

export default HeaderLogo;