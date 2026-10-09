export type QuoteItem = {
  id: string;
  descricao: string;
  quantidade: number;
  unidade: string;
  valorUnitario: number;
};

export type QuoteData = {
  numero: string;

  cliente: string;
  telefone: string;
  endereco: string;
  cidade: string;

  data: string;
  validade: string;

  descricaoObra: string;

  prazoExecucao: string;
  formaPagamento: string;
  observacoes: string;

  desconto: number;

  itens: QuoteItem[];
};