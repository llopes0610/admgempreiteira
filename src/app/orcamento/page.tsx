"use client";

import { useEffect, useState } from "react";
import { FilePlus2 } from "lucide-react";

import QuoteForm from "@/components/orcamento/QuoteForm";
import QuoteItems from "@/components/orcamento/QuoteItems";
import QuoteSummary from "@/components/orcamento/QuoteSummary";

import type { QuoteData } from "@/types/quote";

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function createEmptyQuote(numero: string): QuoteData {
  return {
    numero,

    cliente: "",
    telefone: "",
    endereco: "",
    cidade: "",

    data: getToday(),

    validade: "7 dias",

    descricaoObra: "",

    prazoExecucao:
      "",

    formaPagamento:
      "50% na aprovação e início dos serviços, 30% durante a execução e 20% na conclusão e entrega dos serviços.",

    observacoes:
      `Este orçamento contempla exclusivamente os serviços descritos nesta proposta.

Os valores consideram condições normais de execução. Caso sejam identificados problemas ocultos, infiltrações, trincas estruturais, falhas existentes ou necessidade de serviços adicionais, será realizada nova avaliação antes da execução.

Alterações de escopo, serviços extras ou mudanças solicitadas após a aprovação deste orçamento serão orçados separadamente.

Materiais, marcas, cores e acabamentos serão definidos previamente entre a ADMG Empreiteira e o cliente, conforme o escopo da proposta.

O início dos serviços está condicionado à aprovação do orçamento e ao pagamento da parcela inicial acordada.`,

    desconto: 0,

    itens: [],
  };
}

function getNextQuoteNumber() {
  const lastNumber = localStorage.getItem(
    "admg-last-quote-number"
  );

  if (!lastNumber) {
    localStorage.setItem(
      "admg-last-quote-number",
      "222"
    );

    return "222";
  }

  const parsedNumber = Number(lastNumber);

  if (Number.isNaN(parsedNumber)) {
    localStorage.setItem(
      "admg-last-quote-number",
      "222"
    );

    return "222";
  }

  const nextNumber = parsedNumber + 1;

  localStorage.setItem(
    "admg-last-quote-number",
    String(nextNumber)
  );

  return String(nextNumber);
}

export default function OrcamentoPage() {
  /*
   * IMPORTANTE:
   *
   * O estado não possui mais "| null".
   *
   * Isso resolve o erro de tipagem entre:
   *
   * QuoteForm
   * QuoteItems
   * QuoteSummary
   */
  const [quote, setQuote] = useState<QuoteData>(() =>
    createEmptyQuote("222")
  );

  const [loaded, setLoaded] = useState(false);

  /*
   * Recupera orçamento salvo ao carregar.
   */
  useEffect(() => {
    const savedQuote = localStorage.getItem(
      "admg-orcamento"
    );

    if (savedQuote) {
      try {
        const parsedQuote: QuoteData =
          JSON.parse(savedQuote);

        setQuote(parsedQuote);

        /*
         * Garante que o contador também conheça
         * o número do orçamento recuperado.
         */
        const savedNumber = Number(
          parsedQuote.numero
        );

        const lastNumber = Number(
          localStorage.getItem(
            "admg-last-quote-number"
          ) || 0
        );

        if (
          !Number.isNaN(savedNumber) &&
          savedNumber > lastNumber
        ) {
          localStorage.setItem(
            "admg-last-quote-number",
            String(savedNumber)
          );
        }
      } catch {
        const numero =
          getNextQuoteNumber();

        setQuote(
          createEmptyQuote(numero)
        );
      }
    } else {
      /*
       * Primeiro acesso.
       *
       * Se nenhum orçamento existir,
       * começa no número 222.
       */
      const lastNumber =
        localStorage.getItem(
          "admg-last-quote-number"
        );

      if (!lastNumber) {
        localStorage.setItem(
          "admg-last-quote-number",
          "222"
        );

        setQuote(
          createEmptyQuote("222")
        );
      } else {
        /*
         * Se já existe contador mas não existe
         * orçamento em edição, cria o próximo.
         */
        const numero =
          getNextQuoteNumber();

        setQuote(
          createEmptyQuote(numero)
        );
      }
    }

    setLoaded(true);
  }, []);

  /*
   * Salvamento automático.
   */
  useEffect(() => {
    if (!loaded) {
      return;
    }

    localStorage.setItem(
      "admg-orcamento",
      JSON.stringify(quote)
    );
  }, [quote, loaded]);

  /*
   * Novo orçamento.
   */
  const novoOrcamento = () => {
    const confirmacao = window.confirm(
      "Deseja iniciar um novo orçamento? Os dados atuais serão apagados deste formulário."
    );

    if (!confirmacao) {
      return;
    }

    const numero =
      getNextQuoteNumber();

    const novo =
      createEmptyQuote(numero);

    setQuote(novo);

    localStorage.setItem(
      "admg-orcamento",
      JSON.stringify(novo)
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * Evita mostrar os dados iniciais antes
   * de recuperar o localStorage.
   */
  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-sm text-zinc-500">
            Carregando orçamento...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* HEADER MOBILE */}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
              ADMG Empreiteira
            </p>

            <h1 className="mt-1 text-lg font-semibold">
              Orçamento #{quote.numero}
            </h1>
          </div>

          <button
            type="button"
            onClick={novoOrcamento}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gold transition active:scale-95"
            aria-label="Novo orçamento"
          >
            <FilePlus2 size={20} />
          </button>
        </div>
      </header>

      {/* CONTEÚDO */}

      <div className="mx-auto w-full max-w-5xl px-3 py-5 sm:px-4 md:px-6">
        <div className="mb-6 px-1">
          <h2 className="text-2xl font-semibold">
            Gerador de orçamento
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Preencha os dados do cliente e os
            serviços para gerar uma proposta
            padronizada em PDF.
          </p>
        </div>

        <div className="space-y-5">
          <QuoteForm
            quote={quote}
            setQuote={setQuote}
          />

          <QuoteItems
            quote={quote}
            setQuote={setQuote}
          />

          <QuoteSummary
            quote={quote}
            setQuote={setQuote}
          />

          <button
            type="button"
            onClick={novoOrcamento}
            className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-medium text-zinc-300 transition active:scale-[0.98]"
          >
            <FilePlus2 size={18} />

            Criar novo orçamento
          </button>
        </div>
      </div>
    </main>
  );
}