import React, { useEffect, useState } from 'react';
import { TravelerFormData } from '../types';
import { getTravelTips } from '../services/geminiService';
import { IconCheck, IconLightbulb, IconSparkles } from './Icons';

interface SuccessScreenProps {
  data: TravelerFormData;
  onReset: () => void;
}

const PlanCard: React.FC<{ title: string; price: string; desc: string; oldPrice?: string; popular?: boolean }> = ({ title, price, desc, oldPrice, popular }) => (
  <div className={`bg-white border ${popular ? 'border-2 border-emerald-500' : 'border-gray-200'} rounded-2xl p-5 relative shadow-sm hover:shadow-md transition-shadow`}>
    {popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">Popular</div>}
    <h3 className="font-bold text-emerald-700 text-lg text-center mb-1">{title}</h3>
    <div className="text-center mb-3">
      <span className="text-2xl font-black text-slate-800">R$ {price}</span>
      {oldPrice && <span className="text-xs text-slate-400 line-through ml-2">R$ {oldPrice}</span>}
    </div>
    <p className="text-xs text-slate-500 mb-4 leading-relaxed">{desc}</p>
    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-lg text-sm transition-colors">Contratar</button>
  </div>
);

const SuccessScreen: React.FC<SuccessScreenProps> = ({ data, onReset }) => {
  const [tips, setTips] = useState<string[]>([]);
  const [loadingTips, setLoadingTips] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      const result = await getTravelTips(data.nomeDestino);
      setTips(result);
      setLoadingTips(false);
    };
    fetchTips();
  }, [data.nomeDestino]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-[fadeIn_0.5s_ease-out] p-4 my-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-t-4 border-emerald-500">
        <div className="inline-flex justify-center mb-4 bg-emerald-50 p-3 rounded-full text-emerald-600">
          <IconCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Perfil Recebido!</h2>
        <p className="text-slate-600 mb-4 text-sm">
          Obrigado, <strong>{data.nome.split(' ')[0]}</strong>! Já tenho tudo para montar o roteiro perfeito para <strong>{data.nomeDestino || 'sua viagem'}</strong>.
        </p>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-left">
          <div className="flex items-center gap-2 mb-2 font-bold text-emerald-800 text-sm">
            <IconLightbulb className="w-5 h-5" /> Dicas Exclusivas (IA)
          </div>
          {loadingTips ? (
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="animate-spin">✨</span> Gerando dicas...
            </div>
          ) : (
            <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc marker:text-emerald-500">
              {tips.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-sky-50 border border-sky-100 p-5 rounded-2xl">
        <h3 className="font-bold text-sky-900 mb-2 text-sm">Meu Papel Como Seu Agente</h3>
        <p className="text-sky-800 text-xs leading-relaxed">
          Não sou uma agência comum. Sou seu agente pessoal, conectando você às melhores opções do mercado e facilitando todo o planejamento até o embarque.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-md h-48 relative">
         {/* Using placeholder as requested, although the original used a specific generated image */}
        <img src="https://picsum.photos/800/400" alt="Promoção" className="w-full h-full object-cover" />
         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
             <span className="text-white font-bold text-lg">Descubra novas possibilidades</span>
         </div>
      </div>

      <div>
        <h3 className="text-center font-bold text-slate-700 text-xl mb-4">Escolha seu Plano</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PlanCard title="Consultoria Inicial" price="100" desc="Ideal para quem não sabe por onde começar. Valor abatido se fechar assessoria." />
          <PlanCard title="Assessoria Essencial" price="150" oldPrice="200" desc="Busca de passagens OU hospedagem com suporte completo." />
          <PlanCard title="Assessoria Completa" price="200" oldPrice="250" popular={true} desc="Passagens E hospedagens, com as melhores combinações." />
          <PlanCard title="Premium + Roteiro" price="250" oldPrice="300" desc="Tudo da completa + Roteiro diário personalizado." />
        </div>
      </div>
      <button onClick={onReset} className="block mx-auto text-slate-500 text-xs underline opacity-80 hover:opacity-100 pb-8">
        Voltar ao início
      </button>
    </div>
  );
};

export default SuccessScreen;