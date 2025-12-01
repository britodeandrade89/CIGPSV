import React from 'react';
import HeaderLogo from './HeaderLogo';

interface LandingPageProps {
  onStart: (type: 'traveler' | 'agent') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_0.5s_ease-out] flex flex-col mx-4 my-4 md:my-8">
      <div
        className="relative bg-cover bg-center py-6 md:py-16 px-4 md:px-6 text-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=2019&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 flex flex-col items-center w-full">
          
          {/* Logo e Slogan Agrupados */}
          <div className="flex flex-col items-center justify-center">
            <HeaderLogo showSubtitle={false} />
            {/* Slogan ajustado para caber abaixo do logo */}
            <p className="text-teal-50 text-[6px] sm:text-[8px] font-bold tracking-widest uppercase -mt-2 md:-mt-4 text-center leading-tight opacity-90 border-t border-white/20 pt-1 whitespace-nowrap">
              Plataforma inteligente para viajantes modernos
            </p>
          </div>

          {/* Título movido para baixo e redimensionado para igualar a logo */}
          <h1 
            className="w-full text-center text-2xl sm:text-3xl md:text-4xl mt-12 md:mt-16 mb-4 drop-shadow-lg leading-tight italic text-white px-4"
            style={{ fontFamily: "'Permanent Marker', cursive", transform: "rotate(-2deg)" }}
          >
            Sua jornada começa aqui.
          </h1>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-8 p-6 md:p-12">
        {/* Card Viajante - Cor Sutil Teal */}
        <div
          onClick={() => onStart('traveler')}
          className="group relative bg-teal-50 border-2 border-teal-100 hover:border-teal-400 rounded-3xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-center items-center h-full min-h-[250px]"
        >
          <h2 className="text-3xl md:text-5xl font-black text-teal-800 mb-4 group-hover:text-teal-600 transition-colors uppercase tracking-tighter">
            SOU VIAJANTE
          </h2>
          <p className="text-teal-700/70 mb-8 font-medium text-sm md:text-lg">
            Quero planejar minha próxima aventura.
          </p>
          <button className="bg-teal-600 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wide text-xs md:text-sm shadow-md transition-transform transform group-hover:scale-105">
            Começar Agora
          </button>
        </div>

        {/* Card Agente - Cor Sutil Slate/Blue */}
        <div
          onClick={() => onStart('agent')}
          className="group relative bg-slate-50 border-2 border-slate-200 hover:border-blue-800 rounded-3xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-center items-center h-full min-h-[250px]"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-4 group-hover:text-blue-900 transition-colors uppercase tracking-tighter">
            SOU AGENTE
          </h2>
          <p className="text-slate-600/70 mb-8 font-medium text-sm md:text-lg">
            Acesso restrito para gestão.
          </p>
          <button className="bg-white border-2 border-slate-300 text-slate-600 px-8 py-3 rounded-xl font-bold uppercase tracking-wide text-xs md:text-sm group-hover:border-blue-800 group-hover:text-blue-800 transition-colors">
            Acesso Profissional
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;