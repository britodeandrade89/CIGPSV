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
  oldPrice?: string;
  desc: string;
  features: string[];
  image: string;
  popular?: boolean;
  bestValue?: boolean;
  percentOff?: number;
  planId: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, oldPrice, desc, features, image, popular, bestValue, percentOff, planId }) => {
  const whatsappNumber = "5521994527694";
  const message = `Olá! Acabei de preencher meu perfil no Check-in GO! e quero contratar o plano *${title}* por R$ ${price}.`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className={`relative flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl border ${popular ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-gray-200'} ${bestValue ? 'border-purple-500 ring-4 ring-purple-500/10' : ''}`}>
      
      {/* Badges */}
      {popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-black uppercase tracking-widest text-center py-1.5 z-20 shadow-md">
          🔥 Mais Escolhido
        </div>
      )}
      {bestValue && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black uppercase tracking-widest text-center py-1.5 z-20 shadow-md">
          💎 Experiência VIP
        </div>
      )}

      {/* Image Header */}
      <div className="h-40 w-full relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        
        {/* Frozen Price Tag */}
        {percentOff && (
            <div className="absolute bottom-3 right-3 z-20 bg-black/60 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                <span className="text-lg">❄️</span>
                <div className="flex flex-col leading-none">
                    <span className="text-[8px] uppercase font-bold text-gray-300">Black Friday</span>
                    <span className="text-xs font-bold text-yellow-400">Congelado</span>
                </div>
            </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow relative">
        {/* Discount Badge */}
        {percentOff && (
            <div className="absolute -top-4 left-6 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-lg shadow-lg rotate-[-2deg] border-2 border-white">
                {percentOff}% OFF
            </div>
        )}

        <h3 className={`text-xl font-black mb-2 uppercase tracking-tight ${popular ? 'text-emerald-700' : 'text-slate-800'}`}>
            {title}
        </h3>
        
        <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4 min-h-[40px]">
            {desc}
        </p>

        {/* Pricing */}
        <div className="mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
            {oldPrice && (
                <div className="text-slate-400 text-xs line-through font-medium mb-0.5">
                    De R$ {oldPrice}
                </div>
            )}
            <div className="flex items-center justify-center gap-1 text-slate-800">
                <span className="text-sm font-medium mt-1">Por</span>
                <span className="text-4xl font-black tracking-tighter text-[#003B5C]">R$ {price}</span>
            </div>
            {percentOff && (
                 <p className="text-[10px] text-red-500 font-bold mt-1 uppercase animate-pulse">
                    Oferta por tempo limitado!
                 </p>
            )}
        </div>

        {/* Features List */}
        <ul className="space-y-2 mb-6 flex-grow">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                    <IconCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>

        {/* CTA Button */}
        <a 
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className={`w-full py-4 rounded-xl font-black uppercase tracking-wide text-sm shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 ${
                popular 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/20' 
                : bestValue
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-900/20'
                    : 'bg-slate-800 hover:bg-slate-900 text-white shadow-slate-900/20'
            }`}
        >
            <span>Garantir Oferta</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path></svg>
        </a>
      </div>
    </div>
  );
};

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
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-out] p-4 my-8 pb-12">
      
      {/* Confirmation Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl text-center border-b-8 border-emerald-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
        <div className="inline-flex justify-center mb-4 bg-emerald-100 p-4 rounded-full text-emerald-600 shadow-sm">
          <IconCheck className="w-10 h-10" />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-2 tracking-tight">Tudo Pronto, {data.nome.split(' ')[0]}!</h2>
        <p className="text-slate-600 mb-6 text-base md:text-lg max-w-2xl mx-auto">
          Recebi seu perfil para <strong>{data.nomeDestino || 'sua próxima viagem'}</strong>. Agora é hora de transformar planos em passagens na mão!
        </p>

        {/* AI Tips Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-3xl mx-auto shadow-inner">
          <div className="flex items-center gap-2 mb-3 font-bold text-[#003B5C] text-base">
            <IconLightbulb className="w-6 h-6 text-yellow-500" /> Dicas da IA para seu destino:
          </div>
          {loadingTips ? (
            <div className="text-sm text-slate-500 flex items-center gap-2 italic">
              <span className="animate-spin">✨</span> Personalizando dicas exclusivas...
            </div>
          ) : (
            <ul className="text-sm text-slate-700 space-y-2 pl-2">
              {tips.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">●</span>
                    <span>{t}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Black Friday Banner */}
      <div className="bg-black rounded-2xl p-4 md:p-6 text-center text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 animate-gradient-x"></div>
        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
            <span className="text-3xl md:text-4xl">❄️</span>
            <div>
                <h3 className="text-xl md:text-3xl font-black uppercase tracking-widest text-yellow-400 drop-shadow-md">
                    Black Friday Congelada
                </h3>
                <p className="text-gray-300 text-xs md:text-sm font-medium">
                    Garanta os preços promocionais por tempo limitado. O valor não vai subir nas próximas 24h!
                </p>
            </div>
        </div>
      </div>

      {/* Methodology Explanation */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-[#003B5C] mb-2 text-lg">🎯 Como eu trabalho?</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
                Eu filtro o caos da internet. Ao invés de te dar 50 opções confusas, eu apresento <strong>as 2 melhores opções</strong> (custo-benefício vs. conforto) para você apenas decidir.
            </p>
        </div>
        <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-2 text-lg">💰 Monitoramento de Preço</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
                Se o seu foco for economia, após escolher o plano, nós monitoramos as tarifas diariamente. Se o preço cair, você é o primeiro a saber para emitir.
            </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="relative">
        <h3 className="text-center font-black text-slate-800 text-2xl md:text-3xl mb-8 uppercase tracking-tight">
            Escolha seu Nível de Conforto
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10">
          
          <PlanCard 
            title="Consultoria Inicial" 
            price="100" 
            desc="Está perdido? Eu te dou o norte. Ideal para quem não sabe por onde começar o planejamento."
            image="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400&auto=format&fit=crop"
            features={[
                "Chamada de vídeo de 30min",
                "Tira-dúvidas sobre documentação",
                "Definição de perfil de viajante",
                "Valor abatido se fechar outro plano"
            ]}
            planId="consultoria"
          />

          <PlanCard 
            title="Assessoria Essencial" 
            price="150" 
            oldPrice="200"
            percentOff={25}
            desc="Segurança básica. Não erre na hora de emitir sua passagem OU escolher seu hotel."
            image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=400&auto=format&fit=crop"
            features={[
                "Busca ativa: Passagem OU Hotel",
                "Apresentação de 2 melhores opções",
                "Suporte até a emissão",
                "Checklist de embarque"
            ]}
            planId="essencial"
          />

          <PlanCard 
            title="Assessoria Completa" 
            price="200" 
            oldPrice="250"
            percentOff={20}
            popular={true}
            desc="A escolha inteligente. Voo e Hotel alinhados para você não ter dor de cabeça."
            image="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop"
            features={[
                "Busca completa: Aéreo + Hospedagem",
                "Curadoria de melhores localizações",
                "Monitoramento de preços",
                "Suporte integral via WhatsApp"
            ]}
            planId="completa"
          />

          <PlanCard 
            title="Premium + Roteiro" 
            price="250" 
            oldPrice="300"
            percentOff={17}
            bestValue={true}
            desc="Sua única preocupação será fazer as malas. Experiência VIP do início ao fim."
            image="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=400&auto=format&fit=crop"
            features={[
                "Tudo da Assessoria Completa",
                "Roteiro Dia-a-Dia Personalizado",
                "Sugestão de Restaurantes e Passeios",
                "Link direto para compra de atrações"
            ]}
            planId="premium"
          />

        </div>
      </div>

      <button onClick={onReset} className="block mx-auto text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-600 transition-colors mt-8 mb-4">
        ← Voltar ao início
      </button>
    </div>
  );
};

export default SuccessScreen;
