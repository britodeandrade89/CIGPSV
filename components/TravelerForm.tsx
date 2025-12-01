import React, { useState } from 'react';
import HeaderLogo from './HeaderLogo';
import OptionButton from './OptionButton';
import AIDestinationFinder from './AIDestinationFinder';
import { IconUser, IconSuitcase, IconPlane, IconBus, IconBed, IconCard, IconMoney, IconLink, IconDownload } from './Icons';
import { TravelerFormData, DestinationSuggestion } from '../types';

interface TravelerFormProps {
  onSubmit: (data: TravelerFormData) => void;
}

const TravelerForm: React.FC<TravelerFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<TravelerFormData>({
    nome: '', whatsapp: '', viajantes: '', nivelExperiencia: '',
    tipoDestino: '', nomeDestino: '', tipoViagem: '', antecedencia: '',
    dataIda: '', dataVolta: '', flexibilidadeDatas: '',
    aeroportoSaida: '', bagagem: [], ciaAerea: '', preferenciaVoo: '',
    locomocao: [], estiloHospedagem: [], alimentacao: '', formasPagamento: [], plataformas: [],
    investimentoPrioritario: '', estrategiaCompra: '', ritmoViagem: '', itensObrigatorios: [],
    restricoes: '', cienteRegras: false, obsFinais: ''
  });
  const [aiSuggestions, setAiSuggestions] = useState<DestinationSuggestion[] | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        // Safe casting because we know which fields are arrays based on name
        const list = (prev as any)[name] as string[] || [];
        if (name === 'cienteRegras') return { ...prev, [name]: checked }; // boolean case
        return {
          ...prev,
          [name]: checked ? [...list, value] : list.filter(i => i !== value)
        };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSuggestionSelect = (suggestion: DestinationSuggestion) => {
    setFormData({ ...formData, nomeDestino: suggestion.name });
    setAiSuggestions(null);
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.whatsapp) return alert("Preencha seus dados básicos.");
    onSubmit(formData);
  };

  // Reusable Section Header
  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-2 mb-2 mt-5 border-b border-gray-100 pb-1">
      <Icon className="text-emerald-500 w-5 h-5" />
      <span className="font-extrabold text-lg text-slate-900">{title}</span>
    </div>
  );

  // Common Input Styles - Reduced padding
  const inputClass = "w-full px-4 py-2 border border-slate-200 rounded-full bg-white text-slate-600 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all shadow-sm text-sm";
  const labelClass = "block text-xs font-bold text-slate-700 mb-1 ml-2";

  return (
    <div className="w-full max-w-2xl bg-white shadow-xl overflow-hidden sm:rounded-3xl my-4 animate-[fadeIn_0.5s_ease-out]">
      {/* Header */}
      <div
        className="bg-[#003B5C] px-4 py-4 text-center relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=2019&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 scale-90 origin-top">
          <HeaderLogo showSubtitle={true} />
        </div>
        <div className="absolute top-3 right-3 flex gap-2 text-white opacity-80 z-20">
          <div className="w-7 h-7 border border-white/30 bg-white/10 rounded flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
              <IconLink className="w-3.5 h-3.5"/>
          </div>
          <div className="w-7 h-7 border border-white/30 bg-white/10 rounded flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
              <IconDownload className="w-3.5 h-3.5"/>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-1">
        {/* 1. Sobre Você */}
        <SectionHeader icon={IconUser} title="Sobre Você e a Viagem" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div><label className={labelClass}>Nome</label><input type="text" name="nome" className={inputClass} onChange={handleInputChange} value={formData.nome} /></div>
          <div><label className={labelClass}>WhatsApp</label><input type="tel" name="whatsapp" className={inputClass} onChange={handleInputChange} value={formData.whatsapp} /></div>
          <div className="md:col-span-2"><label className={labelClass}>Quem vai viajar?</label><input type="text" name="viajantes" className={inputClass} onChange={handleInputChange} value={formData.viajantes} /></div>

          <div className="md:col-span-2 mt-1">
            <label className={labelClass}>Nível de Experiência</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <OptionButton name="nivelExperiencia" value="iniciante" label="Iniciante" checked={formData.nivelExperiencia === 'iniciante'} onChange={handleInputChange} />
              <OptionButton name="nivelExperiencia" value="intermediario" label="Intermediário" checked={formData.nivelExperiencia === 'intermediario'} onChange={handleInputChange} />
              <OptionButton name="nivelExperiencia" value="experiente" label="Experiente" checked={formData.nivelExperiencia === 'experiente'} onChange={handleInputChange} />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Ritmo da Viagem</label>
            <div className="grid grid-cols-3 gap-2">
              <OptionButton name="ritmoViagem" value="slow" label="Lento" checked={formData.ritmoViagem === 'slow'} onChange={handleInputChange} />
              <OptionButton name="ritmoViagem" value="equilibrado" label="Equilibrado" checked={formData.ritmoViagem === 'equilibrado'} onChange={handleInputChange} />
              <OptionButton name="ritmoViagem" value="intenso" label="Intenso" checked={formData.ritmoViagem === 'intenso'} onChange={handleInputChange} />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>O que não pode faltar?</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['Gastronomia', 'Museus/História', 'Natureza', 'Compras', 'Festas', 'Infantil', 'Fotos'].map(i =>
                <OptionButton key={i} name="itensObrigatorios" value={i} label={i} type="checkbox" checked={formData.itensObrigatorios.includes(i)} onChange={handleInputChange} />
              )}
            </div>
          </div>
        </div>

        {/* 2. A Viagem */}
        <SectionHeader icon={IconSuitcase} title="A Viagem" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2 flex gap-2">
            <OptionButton name="tipoDestino" value="definido" label="Já tenho destino" checked={formData.tipoDestino === 'definido'} onChange={handleInputChange} />
            <OptionButton name="tipoDestino" value="sugestao" label="Quero sugestões (IA)" checked={formData.tipoDestino === 'sugestao'} onChange={handleInputChange} />
          </div>

          {formData.tipoDestino === 'definido' && (
            <div className="md:col-span-2 space-y-3 animate-[fadeIn_0.5s] bg-slate-50 p-4 rounded-xl border border-slate-200">
              <input type="text" name="nomeDestino" placeholder="Qual o destino?" className={inputClass} onChange={handleInputChange} value={formData.nomeDestino} />
              <div className="flex gap-2">
                <OptionButton name="tipoViagem" value="nacional" label="Nacional" checked={formData.tipoViagem === 'nacional'} onChange={handleInputChange} />
                <OptionButton name="tipoViagem" value="internacional" label="Internacional" checked={formData.tipoViagem === 'internacional'} onChange={handleInputChange} />
              </div>
              {(formData.tipoViagem) && (
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Antecedência ({formData.tipoViagem === 'nacional' ? '45' : '90'} dias)</label>
                  <div className="flex gap-2">
                    <OptionButton name="antecedencia" value="curto" label="Menos (Mais caro)" checked={formData.antecedencia === 'curto'} onChange={handleInputChange} />
                    <OptionButton name="antecedencia" value="longo" label="Mais (Ideal)" checked={formData.antecedencia === 'longo'} onChange={handleInputChange} />
                  </div>
                </div>
              )}
            </div>
          )}

          {formData.tipoDestino === 'sugestao' && !formData.nomeDestino && (
            <div className="md:col-span-2">
              <AIDestinationFinder onComplete={setAiSuggestions} />
              {aiSuggestions && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {aiSuggestions.map((s, i) => (
                    <div key={i} onClick={() => handleSuggestionSelect(s)} className="p-3 bg-teal-50 border border-teal-200 rounded-lg cursor-pointer hover:bg-teal-100 transition-colors group">
                      <div className="font-bold text-sm text-teal-900 group-hover:text-teal-700">{s.name}</div>
                      <div className="text-xs text-teal-600 mb-0.5">{s.desc}</div>
                      <div className="text-[10px] font-bold text-teal-500">{s.match}% Match</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {formData.nomeDestino && formData.tipoDestino === 'sugestao' && (
            <div className="md:col-span-2 p-2 bg-teal-50 rounded-full text-center text-sm font-bold text-teal-700 border border-teal-200 flex justify-between items-center px-4">
              <span>Destino: {formData.nomeDestino}</span>
              <button onClick={() => setFormData({ ...formData, nomeDestino: '' })} className="text-xs underline text-red-400 hover:text-red-600">Alterar</button>
            </div>
          )}

          <div><label className={labelClass}>Ida</label><input type="date" name="dataIda" className={`${inputClass} text-slate-500`} onChange={handleInputChange} value={formData.dataIda} /></div>
          <div><label className={labelClass}>Volta</label><input type="date" name="dataVolta" className={`${inputClass} text-slate-500`} onChange={handleInputChange} value={formData.dataVolta} /></div>
          <div className="md:col-span-2">
            <label className={labelClass}>Flexibilidade de Datas <span className="text-emerald-600 font-normal text-xs">(Até 30% off!)</span></label>
            <div className="grid grid-cols-3 gap-2">
              <OptionButton name="flexibilidadeDatas" value="total" label="Total" checked={formData.flexibilidadeDatas === 'total'} onChange={handleInputChange} />
              <OptionButton name="flexibilidadeDatas" value="parcial" label="+/- Dias" checked={formData.flexibilidadeDatas === 'parcial'} onChange={handleInputChange} />
              <OptionButton name="flexibilidadeDatas" value="nenhuma" label="Fixa" checked={formData.flexibilidadeDatas === 'nenhuma'} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        {/* 3. Voos e Bagagem */}
        <SectionHeader icon={IconPlane} title="Voos e Bagagem" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="text" name="aeroportoSaida" placeholder="Aeroporto Origem" className={inputClass} onChange={handleInputChange} value={formData.aeroportoSaida} />
          <div className="relative">
            <select className={`${inputClass} appearance-none cursor-pointer`} name="ciaAerea" onChange={handleInputChange} value={formData.ciaAerea}>
              <option value="">Cia Preferida</option><option>Azul</option><option>Gol</option><option>Latam</option><option>Indiferente</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Bagagem (Pode marcar vários)</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <OptionButton name="bagagem" value="mochila" label="Apenas Mochila" type="checkbox" checked={formData.bagagem.includes('mochila')} onChange={handleInputChange} />
              <OptionButton name="bagagem" value="mao_10kg" label="Mala de Mão (10kg)" type="checkbox" checked={formData.bagagem.includes('mao_10kg')} onChange={handleInputChange} />
              <OptionButton name="bagagem" value="despachada_23kg" label="Despachada (23kg)" type="checkbox" checked={formData.bagagem.includes('despachada_23kg')} onChange={handleInputChange} />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Preferência Voo</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <OptionButton name="preferenciaVoo" value="direto" label="Voos Diretos" checked={formData.preferenciaVoo === 'direto'} onChange={handleInputChange} />
              <OptionButton name="preferenciaVoo" value="conexao" label="Com Escalas (Econ.)" checked={formData.preferenciaVoo === 'conexao'} onChange={handleInputChange} />
              <OptionButton name="preferenciaVoo" value="stopover" label="Stopover" checked={formData.preferenciaVoo === 'stopover'} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        {/* 4. Transporte */}
        <SectionHeader icon={IconBus} title="Transporte no Destino" />
        <div className="grid grid-cols-2 gap-2">
          {['Alugar Carro', 'Uber/Táxi', 'Transfer', 'Púbico'].map(l =>
            <OptionButton key={l} name="locomocao" value={l} label={l} type="checkbox" checked={formData.locomocao.includes(l)} onChange={handleInputChange} />
          )}
        </div>

        {/* 5. Hospedagem */}
        <SectionHeader icon={IconBed} title="Hospedagem" />
        <div className="space-y-3">
          <div>
            <label className={labelClass}>Estilo Preferido (Pode marcar vários)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['Hotel', 'Pousada', 'Resort', 'Airbnb'].map(l =>
                <OptionButton key={l} name="estiloHospedagem" value={l} label={l} type="checkbox" checked={formData.estiloHospedagem.includes(l)} onChange={handleInputChange} />
              )}
            </div>
          </div>
          <div className="relative">
             <select className={`${inputClass} appearance-none cursor-pointer`} name="alimentacao" onChange={handleInputChange} value={formData.alimentacao}>
                <option value="">Alimentação Inclusa</option><option>Café da Manhã</option><option>Meia Pensão</option><option>All Inclusive</option><option>Nenhuma</option>
            </select>
          </div>
        </div>

        {/* 6. Pagamento */}
        <SectionHeader icon={IconCard} title="Pagamento" />
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Forma</label>
            <div className="grid gap-2">
              {['Cartão', 'Pix (Descontos)', 'Boleto'].map(l =>
                <OptionButton key={l} name="formasPagamento" value={l} label={l} type="checkbox" checked={formData.formasPagamento.includes(l)} onChange={handleInputChange} />
              )}
            </div>
          </div>
          <div>
            <label className={labelClass}>Plataforma</label>
            <div className="grid gap-2">
              {['Menor Preço', 'Site Cia (Parcelado)', 'Milhas', 'Vaivoando (Sem SPC)'].map(l =>
                <OptionButton key={l} name="plataformas" value={l} label={l} type="checkbox" checked={formData.plataformas.includes(l)} onChange={handleInputChange} />
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className={labelClass}>Prioridade de Investimento</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <OptionButton name="investimentoPrioritario" value="hospedagem" label="Hospedagem (Conforto)" checked={formData.investimentoPrioritario === 'hospedagem'} onChange={handleInputChange} />
            <OptionButton name="investimentoPrioritario" value="experiencias" label="Passeios e Experiências" checked={formData.investimentoPrioritario === 'experiencias'} onChange={handleInputChange} />
            <OptionButton name="investimentoPrioritario" value="alimentacao" label="Comer bem" checked={formData.investimentoPrioritario === 'alimentacao'} onChange={handleInputChange} />
            <OptionButton name="investimentoPrioritario" value="economia" label="Economia Total" checked={formData.investimentoPrioritario === 'economia'} onChange={handleInputChange} />
          </div>
        </div>

        {/* 7. Estratégia */}
        <SectionHeader icon={IconMoney} title="Estratégia de Compra" />
        <div className="grid grid-cols-1 gap-2">
          <OptionButton name="estrategiaCompra" value="separado" label="Separado (quase sempre parcelado e sem juros)" checked={formData.estrategiaCompra === 'separado'} onChange={handleInputChange} />
          <OptionButton name="estrategiaCompra" value="pacote" label="Pacote Completo" checked={formData.estrategiaCompra === 'pacote'} onChange={handleInputChange} />
        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-900 shadow-sm">
          <strong className="block mb-1 flex items-center gap-1 font-bold">⚠️ Avisos Importantes:</strong>
          <ul className="list-disc list-inside space-y-0.5 opacity-90 pl-1">
            <li>Taxas de embarque na 1ª parcela.</li>
            <li>Promoções internacionais podem exigir à vista.</li>
            <li>Pagamento direto no site oficial (Segurança).</li>
          </ul>
        </div>

        <div className="mt-3">
          <label className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl cursor-pointer hover:bg-emerald-100 transition-colors select-none">
            <input type="checkbox" name="cienteRegras" className="w-4 h-4 accent-emerald-600 rounded" required checked={formData.cienteRegras} onChange={handleInputChange} />
            <span className="font-bold text-emerald-900 text-xs">Estou ciente das regras acima.</span>
          </label>
        </div>

        <div className="mt-4">
          <label className={labelClass}>Observações Finais</label>
          <textarea
            name="obsFinais"
            rows={2}
            placeholder="Restrições? Algo a mais?"
            className={`${inputClass} rounded-2xl`}
            onChange={handleInputChange}
            value={formData.obsFinais}
          ></textarea>
        </div>

        {/* Submit */}
        <div className="pt-6 pb-2">
          <button
            onClick={handleSubmit}
            className="w-full bg-[#003B5C] text-white font-bold py-3 rounded-xl shadow-lg hover:bg-[#002a42] transition-transform transform hover:-translate-y-1 text-base tracking-wide flex items-center justify-center gap-2"
          >
            ENVIAR PERFIL
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 text-center text-[10px] text-gray-400 flex flex-col gap-0.5 border-t border-gray-100">
        <p>Check-in, GO! &copy; 2025</p>
        <p className="font-medium">Desenvolvido por: André Brito ®</p>
        <p>Versão: 1.0</p>
        <p>Contato: britodeandrade@gmail.com</p>
      </div>
    </div>
  );
};

export default TravelerForm;