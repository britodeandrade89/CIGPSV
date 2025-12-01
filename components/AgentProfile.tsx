import React, { useState } from 'react';
import { TravelerFormData } from '../types';
import { IconUser, IconSuitcase, IconPlane, IconBed, IconMoney, IconLink } from './Icons';

interface AgentProfileProps {
  submissions: TravelerFormData[];
  onBack: () => void;
}

const AgentProfile: React.FC<AgentProfileProps> = ({ submissions, onBack }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedSubmission = submissions.find(s => s.id === selectedId);

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Data desconhecida';
    return new Date(isoString).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const DetailRow = ({ label, value }: { label: string, value: string | React.ReactNode }) => (
    <div className="border-b border-gray-100 py-1.5 last:border-0">
      <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</span>
      <div className="text-slate-800 text-sm font-medium leading-tight">{value || '-'}</div>
    </div>
  );

  const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-2 mt-4 mb-2 pb-1 border-b border-gray-200">
      <Icon className="w-4 h-4 text-[#003B5C]" />
      <h3 className="font-bold text-[#003B5C] text-base">{title}</h3>
    </div>
  );

  // --- Detail View ---
  if (selectedSubmission) {
    const s = selectedSubmission;
    return (
      <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-[fadeIn_0.5s_ease-out] my-4 flex flex-col h-[90vh]">
        <div className="bg-[#003B5C] p-3 flex items-center justify-between text-white shadow-md z-10">
          <button onClick={() => setSelectedId(null)} className="flex items-center gap-1 text-xs font-bold opacity-80 hover:opacity-100 transition-opacity">
            ← Voltar para Lista
          </button>
          <div className="text-right">
             <h2 className="text-base font-bold">{s.nome}</h2>
             <p className="text-[10px] opacity-70">Enviado em: {formatDate(s.submittedAt)}</p>
          </div>
        </div>

        <div className="overflow-y-auto p-4 flex-1 bg-gray-50">
           <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
              
              <div className="flex justify-between items-start mb-3">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Novo Lead</span>
                <a 
                  href={`https://wa.me/55${s.whatsapp.replace(/\D/g,'')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Chamar no WhatsApp
                </a>
              </div>

              <SectionTitle icon={IconUser} title="Perfil do Cliente" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                 <DetailRow label="Nome" value={s.nome} />
                 <DetailRow label="WhatsApp" value={s.whatsapp} />
                 <DetailRow label="Viajantes" value={s.viajantes} />
                 <DetailRow label="Experiência" value={s.nivelExperiencia} />
                 <DetailRow label="Ritmo" value={s.ritmoViagem} />
                 <DetailRow label="Itens Obrigatórios" value={s.itensObrigatorios.join(', ')} />
              </div>

              <SectionTitle icon={IconSuitcase} title="O Destino" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                 <DetailRow label="Destino" value={s.nomeDestino} />
                 <DetailRow label="Tipo" value={s.tipoViagem} />
                 <DetailRow label="Origem da Escolha" value={s.tipoDestino === 'sugestao' ? 'Sugestão da IA' : 'Definido pelo Cliente'} />
                 <DetailRow label="Antecedência" value={s.antecedencia} />
                 <DetailRow label="Datas" value={`${s.dataIda || '?'} até ${s.dataVolta || '?'}`} />
                 <DetailRow label="Flexibilidade" value={s.flexibilidadeDatas} />
              </div>

              <SectionTitle icon={IconPlane} title="Logística Aérea" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                 <DetailRow label="Aeroporto Origem" value={s.aeroportoSaida} />
                 <DetailRow label="Cia Preferida" value={s.ciaAerea} />
                 <DetailRow label="Bagagem" value={s.bagagem.join(', ')} />
                 <DetailRow label="Preferência Voo" value={s.preferenciaVoo} />
                 <DetailRow label="No Destino" value={s.locomocao.join(', ')} />
              </div>

              <SectionTitle icon={IconBed} title="Estadia & Financeiro" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                 <DetailRow label="Estilo Hospedagem" value={s.estiloHospedagem.join(', ')} />
                 <DetailRow label="Alimentação" value={s.alimentacao} />
                 <DetailRow label="Investimento Prioritário" value={s.investimentoPrioritario} />
                 <DetailRow label="Estratégia Compra" value={s.estrategiaCompra} />
                 <DetailRow label="Formas Pagamento" value={s.formasPagamento.join(', ')} />
                 <DetailRow label="Plataformas" value={s.plataformas.join(', ')} />
              </div>

              <SectionTitle icon={IconLink} title="Outros" />
              <div className="grid grid-cols-1 gap-x-4">
                 <DetailRow label="Observações Finais" value={s.obsFinais} />
                 <DetailRow label="Ciente das Regras" value={s.cienteRegras ? 'Sim' : 'Não'} />
              </div>
           </div>
        </div>
      </div>
    );
  }

  // --- List View ---
  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-[fadeIn_0.5s_ease-out] my-8 flex flex-col h-[90vh]">
      <div className="bg-[#003B5C] p-6 text-white flex items-center justify-between shadow-md z-10">
        <div>
           <h1 className="text-2xl font-bold">Portal do Agente</h1>
           <p className="text-xs opacity-80">Gestão de Leads e Roteiros</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Agente Master</p>
                <button onClick={onBack} className="text-[10px] underline opacity-80 hover:opacity-100">Sair</button>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-green-400 overflow-hidden bg-white">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" alt="Agente" className="w-full h-full object-cover object-top" />
            </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
         {submissions.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                 <IconSuitcase className="w-16 h-16 mb-4" />
                 <p className="text-lg font-medium">Nenhum perfil recebido ainda.</p>
             </div>
         ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {submissions.map((sub) => (
                     <div 
                        key={sub.id} 
                        onClick={() => setSelectedId(sub.id)}
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-emerald-300 transition-all group relative"
                     >
                        <div className="absolute top-4 right-4 text-slate-300 group-hover:text-emerald-500 transition-colors">
                            ➜
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-lg group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                                {sub.nome.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-base leading-tight group-hover:text-emerald-700 transition-colors">{sub.nome}</h3>
                                <span className="text-[10px] text-slate-400 font-medium">{formatDate(sub.submittedAt)}</span>
                            </div>
                        </div>
                        
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <IconSuitcase className="w-3.5 h-3.5 text-slate-400" />
                                <span className="truncate font-medium">{sub.nomeDestino || 'Destino a definir'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <IconUser className="w-3.5 h-3.5 text-slate-400" />
                                <span>{sub.viajantes} • {sub.nivelExperiencia}</span>
                            </div>
                        </div>
                     </div>
                 ))}
             </div>
         )}
      </div>
    </div>
  );
};

export default AgentProfile;