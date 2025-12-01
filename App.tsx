
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AgentProfile from './components/AgentProfile';
import TravelerForm from './components/TravelerForm';
import SuccessScreen from './components/SuccessScreen';
import { AppStep, TravelerFormData } from './types';
import { IconLock } from './components/Icons';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('landing');
  
  // Stores the current submission for the Success Screen
  const [currentSubmission, setCurrentSubmission] = useState<TravelerFormData | null>(null);
  
  // Stores ALL submissions for the Agent Profile (History)
  const [allSubmissions, setAllSubmissions] = useState<TravelerFormData[]>([]);
  
  // State for Agent Password Modal
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleStart = (type: 'traveler' | 'agent') => {
    if (type === 'agent') {
      setIsPasswordModalOpen(true);
      setPasswordInput('');
      setPasswordError(false);
    } else {
      setStep('form');
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "1008") {
      setIsPasswordModalOpen(false);
      setStep('agentProfile');
    } else {
      setPasswordError(true);
    }
  };

  const handleFormSubmit = (data: TravelerFormData) => {
    // Add metadata to the submission
    const newSubmission: TravelerFormData = {
      ...data,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    };

    // Save to history (Agent view)
    setAllSubmissions(prev => [newSubmission, ...prev]);
    
    // Set current for Success view
    setCurrentSubmission(newSubmission);
    
    setStep('success');
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setStep('landing');
    setCurrentSubmission(null);
  };

  return (
    <div className="min-h-screen w-full flex justify-center bg-gray-100 font-sans relative">
      {step === 'landing' && <LandingPage onStart={handleStart} />}
      
      {step === 'agentProfile' && (
        <AgentProfile 
          submissions={allSubmissions} 
          onBack={() => setStep('landing')} 
        />
      )}
      
      {step === 'form' && <TravelerForm onSubmit={handleFormSubmit} />}
      
      {step === 'success' && currentSubmission && (
        <SuccessScreen data={currentSubmission} onReset={handleReset} />
      )}

      {/* Custom Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsPasswordModalOpen(false)} />
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-[#003B5C] p-4 text-center">
               <h3 className="text-white font-bold text-lg">Área Restrita</h3>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="p-6">
              <div className="text-center mb-6">
                 <div className="mx-auto bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mb-3 text-slate-500">
                    <IconLock className="w-8 h-8" />
                 </div>
                 <p className="text-slate-500 text-sm">Digite a senha de acesso para o perfil de Agente.</p>
              </div>

              <div className="mb-4">
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError(false);
                  }}
                  placeholder="Senha"
                  className={`w-full px-4 py-3 border rounded-xl outline-none transition-all text-center text-lg tracking-widest ${passwordError ? 'border-red-500 bg-red-50 text-red-900 placeholder-red-300' : 'border-slate-200 focus:border-[#003B5C] focus:ring-4 focus:ring-[#003B5C]/10'}`}
                  autoFocus
                />
                {passwordError && <p className="text-red-500 text-xs text-center mt-2 font-medium">Senha incorreta. Tente novamente.</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-500 font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded-lg bg-[#003B5C] text-white font-bold hover:bg-[#002a42] transition-colors shadow-lg shadow-blue-900/20"
                >
                  Acessar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
