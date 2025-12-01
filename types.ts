
export interface TravelerFormData {
  id?: string;
  submittedAt?: string;
  nome: string;
  whatsapp: string;
  viajantes: string;
  nivelExperiencia: string;
  tipoDestino: 'definido' | 'sugestao' | '';
  nomeDestino: string;
  tipoViagem: 'nacional' | 'internacional' | '';
  antecedencia: string;
  dataIda: string;
  dataVolta: string;
  flexibilidadeDatas: string;
  aeroportoSaida: string;
  bagagem: string[];
  ciaAerea: string;
  preferenciaVoo: string;
  locomocao: string[];
  estiloHospedagem: string[];
  alimentacao: string;
  formasPagamento: string[];
  plataformas: string[];
  investimentoPrioritario: string;
  estrategiaCompra: string;
  ritmoViagem: string;
  itensObrigatorios: string[];
  restricoes: string;
  cienteRegras: boolean;
  obsFinais: string;
}

export interface DestinationSuggestion {
  name: string;
  desc: string;
  match: number;
}

export type AppStep = 'landing' | 'form' | 'agentProfile' | 'success';
