import React, { useEffect, useState } from 'react';
import { TravelerFormData } from '../types';
import { getTravelTips } from '../services/geminiService';
import { IconCheck, IconLightbulb } from './Icons';

interface SuccessScreenProps {
  data: TravelerFormData;
  onReset: () => void;
}

interface PlanCardProps {
  title: string;
  price: string;
  desc: string;
  oldPrice?: string;
  popular?: boolean;
  travelerName: string;
  whatsappNumber: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, desc, oldPrice, popular, travelerName, whatsappNumber }) => {
  const message = `Olá! Meu nome é ${travelerName}. Preenchi o formulário no app Check-in, GO! e tenho interesse em contratar o plano: *${title}*. Podemos conversar?`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className={`bg-white border ${popular ? 'border-2 border-emerald-500' : 'border-gray-200'} rounded-2xl p-5 relative shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col`}>
      {popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Mais Popular</div>}
      <h3 className="font-bold text-emerald-700 text-lg text-center mb-1">{title}</h3>
      <div className="text-center mb-3">
        <span className="text-2xl font-black text-slate-800">R$ {price}</span>
        {oldPrice && <span className="text-xs text-slate-400 line-through ml-2">R$ {oldPrice}</span>}
      </div>
      <p className="text-xs text-slate-500 mb-4 leading-relaxed flex-grow">{desc}</p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-sm transition-colors shadow-md shadow-emerald-500/20"
      >
        Contratar via WhatsApp
      </a>
    </div>
  );
};

const SuccessScreen: React.FC<SuccessScreenProps> = ({ data, onReset }) => {
  const [tips, setTips] = useState<string[]>([]);
  const [loadingTips, setLoadingTips] = useState(true);
  
  const whatsappNumber = "5521994527694";
  const travelerName = data.nome.split(' ')[0] || 'Cliente';

  useEffect(() => {
    const fetchTips = async () => {
      const result = await getTravelTips(data.nomeDestino);
      setTips(result);
      setLoadingTips(false);
    };
    fetchTips();
  }, [data.nomeDestino]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-[fadeIn_0.5s_ease-out] p-4 my-8">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center border-t-4 border-emerald-500">
        <div className="inline-flex justify-center mb-4 bg-emerald-50 p-3 rounded-full text-emerald-600">
          <IconCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Perfil Recebido!</h2>
        <p className="text-slate-600 mb-4 text-sm">
          Obrigado, <strong>{travelerName}</strong>! Já tenho tudo para montar o roteiro perfeito para <strong>{data.nomeDestino || 'sua viagem'}</strong>.
        </p>

        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-left">
          <div className="flex items-center gap-2 mb-2 font-bold text-emerald-800 text-sm">
            <IconLightbulb className="w-5 h-5" /> Dicas Exclusivas (IA) para seu destino
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

      <div className="bg-sky-50 border border-sky-100 p-5 rounded-2xl text-center">
        <h3 className="font-bold text-sky-900 mb-2 text-base">Minha Metodologia de Trabalho</h3>
        <p className="text-sky-800 text-xs leading-relaxed max-w-2xl mx-auto">
          Meu serviço é encontrar as <strong>duas melhores opções</strong> de voos e/ou hospedagens que se encaixem perfeitamente no seu perfil. A partir da sua escolha, se o objetivo for economia, continuo monitorando os preços para garantir o melhor negócio até a compra.
        </p>
      </div>

      <div>
        <div className="text-center mb-4 p-3 bg-red-500 text-white rounded-xl shadow-lg">
          <h3 className="font-black text-xl tracking-wider">BLACK FRIDAY CONGELADA! ❄️</h3>
          <p className="text-xs opacity-90">Preços especiais por tempo limitadíssimo. Aproveite!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PlanCard 
            title="Consultoria Inicial" 
            price="100" 
            desc="Não sabe por onde começar? Te dou o mapa do tesouro! Encontramos o destino perfeito e o valor da consultoria é 100% abatido se você fechar um dos planos de assessoria."
            travelerName={travelerName}
            whatsappNumber={whatsappNumber}
          />
          <PlanCard 
            title="Assessoria Essencial" 
            price="150" 
            oldPrice="200" 
            desc="Foco total na sua maior dor de cabeça. Escolha entre passagens aéreas OU hospedagem e deixe que eu encontro as melhores ofertas que você não acharia sozinho."
            travelerName={travelerName}
            whatsappNumber={whatsappNumber}
          />
          <PlanCard 
            title="Assessoria Completa" 
            price="200" 
            oldPrice="250" 
            popular={true} 
            desc="O favorito dos viajantes inteligentes! Eu cuido de TUDO: passagens E hospedagens, encontrando a combinação perfeita que economiza seu tempo e dinheiro. É a tranquilidade que você merece, com o melhor custo-benefício."
            travelerName={travelerName}
            whatsappNumber={whatsappNumber}
          />
          <PlanCard 
            title="Premium + Roteiro" 
            price="250" 
            oldPrice="300" 
            desc="A experiência VIP definitiva. Além de toda a assessoria completa, eu monto seu roteiro diário personalizado. Você só se preocupa em fazer as malas e curtir."
            travelerName={travelerName}
            whatsappNumber={whatsappNumber}
          />
        </div>
      </div>
      <button onClick={onReset} className="block mx-auto text-slate-500 text-xs underline opacity-80 hover:opacity-100 pb-8 pt-4">
        Voltar ao início
      </button>
    </div>
  );
};

export default SuccessScreen;