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
    { key: 'vibe', question: 'Qual a vibe principal?', options: [{ label: '🧘 Relax', val: 'relax' }, { label: '🧗 Aventura', val: 'aventura' }, { label: '🏰 Cultura', val: 'cultura' }, { label: '🍷 Luxo', val: 'luxo' }] },
    { key: 'companhia', question: 'Quem vai junto?', options: [{ label: '💑 Casal', val: 'casal' }, { label: '👨‍👩‍👧‍👦 Família', val: 'familia' }, { label: '👯 Amigos', val: 'amigos' }, { label: '🎒 Solo', val: 'solo' }] }
  ];

  const handleSelect = async (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setAnalyzing(true);
      const suggestions = await getDestinationSuggestions(newAnswers.clima, newAnswers.vibe, newAnswers.companhia);
      onComplete(suggestions);
      setAnalyzing(false);
    }
  };

  if (analyzing) {
    return (
      <div className="p-4 text-center text-teal-600 font-bold bg-white rounded-xl border border-teal-100 flex items-center justify-center gap-2">
        <IconSparkles className="animate-spin text-teal-500" />
        Analisando perfil com IA...
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