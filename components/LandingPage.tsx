import React from 'react';
import HeaderLogo from './HeaderLogo';

interface LandingPageProps {
  onStart: (type: 'traveler' | 'agent') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_0.5s_ease-out] flex flex-col mx-4 my-8">
      <div
        className="relative bg-cover bg-center py-24 px-6 text-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=2019&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 flex flex-col items-center w-full">
          <HeaderLogo />
          <h1 
            className="w-full text-right text-2xl sm:text-4xl md:text-6xl lg:text-7xl mb-6 mt-10 drop-shadow-lg leading-tight italic pr-2 md:pr-8 whitespace-nowrap"
            style={{ fontFamily: "'Permanent Marker', cursive", transform: "rotate(-1deg)" }}
          >
            Sua jornada começa aqui.
          </h1>
          <p className="text-xl md:text-3xl opacity-100 max-w-3xl mx-auto font-medium leading-relaxed mt-2">
            Plataforma inteligente para viajantes modernos.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 p-10 md:p-16">
        <div
          onClick={() => onStart('traveler')}
          className="group relative bg-white border-2 border-slate-100 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-teal-400 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 transition-colors group-hover:bg-teal-400"></div>
          <img
            src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=400&q=80"
            alt="Viajante"
            className="w-32 h-32 mx-auto mb-6 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-teal-600 transition-colors">
            Sou Viajante
          </h2>
          <p className="text-slate-500 mb-6 leading-relaxed">Quero planejar minha próxima aventura.</p>
          <button className="bg-teal-500 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wide text-sm shadow-md transition-transform transform group-hover:scale-105">
            Começar Agora
          </button>
        </div>

        <div
          onClick={() => onStart('agent')}
          className="group relative bg-white border-2 border-slate-100 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-800 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 transition-colors group-hover:bg-blue-800"></div>
          <img
            src="https://images.unsplash.com/photo-1572561300721-f8ac12452e1d?q=80&w=400&auto=format&fit=crop"
            alt="Agente de Viagens"
            className="w-32 h-32 mx-auto mb-6 rounded-full object-cover border-4 border-white shadow-lg object-top"
          />
          <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-900 transition-colors">
            Sou Agente
          </h2>
          <p className="text-slate-500 mb-6 leading-relaxed">Acesso restrito para gestão.</p>
          <button className="bg-transparent border-2 border-slate-300 text-slate-500 px-6 py-3 rounded-lg font-bold uppercase tracking-wide text-sm group-hover:border-blue-800 group-hover:text-blue-800 transition-colors">
            Acesso Profissional
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;