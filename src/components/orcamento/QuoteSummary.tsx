"use client";

import type {
  Dispatch,
  SetStateAction,
} from "react";

import type { QuoteData } from "@/types/quote";

import PdfDownloadButton from "./PdfDownloadButton";

type Props = {
  quote: QuoteData;
  setQuote: Dispatch<SetStateAction<QuoteData>>;
};

export default function QuoteSummary({
  quote,
  setQuote,
}: Props) {
  const subtotal = quote.itens.reduce(
    (total, item) => {
      return (
        total +
        Number(item.quantidade || 0) *
          Number(item.valorUnitario || 0)
      );
    },
    0
  );

  const desconto = Number(
    quote.desconto || 0
  );

  const total = Math.max(
    0,
    subtotal - desconto
  );

  const currency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <section className="rounded-3xl border border-white/10 bg-surface p-6 md:p-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-gold">
          Fechamento
        </p>

        <h2 className="mt-2 text-2xl font-semibold">
          Resumo do orçamento
        </h2>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {/* SUBTOTAL */}

        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <p className="text-sm text-zinc-500">
            Subtotal
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {currency(subtotal)}
          </p>
        </div>

        {/* DESCONTO */}

        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <label
            htmlFor="desconto"
            className="text-sm text-zinc-500"
          >
            Desconto
          </label>

          <div className="mt-2 flex items-center gap-2">
            <span className="text-zinc-500">
              R$
            </span>

            <input
              id="desconto"
              type="number"
              min="0"
              step="0.01"
              value={quote.desconto}
              onChange={(event) =>
                setQuote((prev) => ({
                  ...prev,
                  desconto: Number(
                    event.target.value
                  ),
                }))
              }
              className="w-full bg-transparent text-2xl font-semibold outline-none"
            />
          </div>
        </div>

        {/* TOTAL */}

        <div className="rounded-2xl border border-gold/30 bg-gold/10 p-5">
          <p className="text-sm text-gold">
            Total do orçamento
          </p>

          <p className="mt-2 text-3xl font-semibold">
            {currency(total)}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <PdfDownloadButton quote={quote} />
      </div>
    </section>
  );
}