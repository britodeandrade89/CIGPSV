import React, { useState } from 'react';
import { getDestinationSuggestions } from '../services/geminiService';
import { IconSparkles } from './Icons';
import { DestinationSuggestion } from '../types';

interface AIDestinationFinderProps {
  onComplete: (suggestions: DestinationSuggestion[]) => void;
}

const AIDestinationFinder: React.FC<AIDestinationFinderProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    { key: 'clima', question: 'Qual clima você prefere?', options: [{ label: '☀️ Praia', val: 'praia' }, { label: '❄️ Frio', val: 'frio' }, { label: '🏙️ Urbano', val: 'urbano' }] },
    { key: 'vibe', question: 'Qual a vibe principal da viagem?', options: [{ label: '🧘 Relax', val: 'relax' }, { label: '🧗 Aventura', val: 'aventura' }, { label: '🏰 Cultura', val: 'cultura' }, { label: '🍷 Luxo', val: 'luxo' }] },
    { key: 'companhia', question: 'Quem vai com você?', options: [{ label: '💑 Casal', val: 'casal' }, { label: '👨‍👩‍👧‍👦 Família', val: 'familia' }, { label: '👯 Amigos', val: 'amigos' }, { label: '🎒 Solo', val: 'solo' }] },
    { key: 'orcamento', question: 'Qual sua expectativa de gasto (por pessoa, aéreo + estadia)?', options: [
      { label: '💰 Até R$1.500', val: 'ate 1500 BRL' }, 
      { label: '💸 Até R$3.000', val: 'ate 3000 BRL' }, 
      { label: '💵 Até R$5.000', val: 'ate 5000 BRL' },
      { label: '💎 Até R$7.000', val: 'ate 7000 BRL' },
      { label: '✨ Acima de R$7.000', val: 'acima de 7000 BRL' }
    ] },
    { key: 'local', question: 'Você prefere destinos...', options: [{ label: '🇧🇷 Nacionais', val: 'nacional' }, { label: '✈️ Internacionais', val: 'internacional' }, { label: '🤔 Indiferente', val: 'indiferente' }] },
    { key: 'ambiente', question: 'E o tipo de turismo?', options: [{ label: '🏞️ Interior / Natureza', val: 'interior' }, { label: '🏙️ Urbano / Cidade', val: 'urbano' }, { label: '🤝 Ambos', val: 'ambos' }] }
  ];

  const handleSelect = async (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setAnalyzing(true);
      // Passa o objeto completo de respostas para o serviço
      const suggestions = await getDestinationSuggestions(newAnswers);
      onComplete(suggestions);
      setAnalyzing(false);
    }
  };

  if (analyzing) {
    return (
      <div className="p-4 text-center text-teal-600 font-bold bg-white rounded-xl border border-teal-100 flex items-center justify-center gap-2">
        <IconSparkles className="animate-spin text-teal-500" />
        Analisando seu perfil...
      </div>
    );
  }

  const currentQ = questions[step];

  return (
    <div className="bg-white p-4 rounded-xl border border-teal-100 shadow-sm mt-2 animate-[fadeIn_0.5s_ease-out]">
      <div className="text-xs font-bold text-teal-600 uppercase mb-2">Assistente Virtual ({step + 1}/{questions.length})</div>
      <div className="font-bold text-slate-800 mb-3 text-sm">{currentQ.question}</div>
      <div className="grid grid-cols-2 gap-2">
        {currentQ.options.map((opt) => (
          <button
            key={opt.val}
            type="button"
            onClick={() => handleSelect(currentQ.key, opt.val)}
            className="text-sm p-2 border rounded-lg hover:bg-teal-50 hover:border-teal-500 text-left transition-colors text-slate-600"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIDestinationFinder;