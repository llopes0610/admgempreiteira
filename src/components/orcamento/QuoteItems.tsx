"use client";

import {
  Plus,
  Trash2,
} from "lucide-react";

import type {
  Dispatch,
  SetStateAction,
} from "react";

import type {
  QuoteData,
  QuoteItem,
} from "@/types/quote";

type Props = {
  quote: QuoteData;
  setQuote: Dispatch<
    SetStateAction<QuoteData>
  >;
};

function createItem(): QuoteItem {
  return {
    id: crypto.randomUUID(),

    descricao: "",

    // Internamente permanece 0,
    // porém o input ficará vazio.
    quantidade: 0,

    unidade: "un",

    valorUnitario: 0,
  };
}

function currency(value: number) {
  return value.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );
}

export default function QuoteItems({
  quote,
  setQuote,
}: Props) {
  const addItem = () => {
    setQuote((prev) => ({
      ...prev,

      itens: [
        ...prev.itens,
        createItem(),
      ],
    }));
  };

  const removeItem = (
    id: string
  ) => {
    setQuote((prev) => ({
      ...prev,

      itens: prev.itens.filter(
        (item) => item.id !== id
      ),
    }));
  };

  const updateItem = (
    id: string,
    field: keyof QuoteItem,
    value: string | number
  ) => {
    setQuote((prev) => ({
      ...prev,

      itens: prev.itens.map(
        (item) =>
          item.id === id
            ? {
                ...item,
                [field]: value,
              }
            : item
      ),
    }));
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-surface">
      {/* CABEÇALHO */}

      <div className="p-5 sm:p-6">
        <h2 className="text-2xl font-semibold">
          Serviços
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          Adicione todos os itens que deverão
          aparecer no orçamento.
        </p>

        <button
          type="button"
          onClick={addItem}
          className="mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gold px-5 py-4 font-semibold text-black transition active:scale-[0.98]"
        >
          <Plus size={20} />

          Adicionar item
        </button>
      </div>

      {/* ITENS */}

      <div className="space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
        {quote.itens.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
            <p className="text-sm text-zinc-500">
              Nenhum serviço adicionado.
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              Toque em &quot;Adicionar
              item&quot; para começar.
            </p>
          </div>
        )}

        {quote.itens.map(
          (item, index) => {
            const total =
              Number(
                item.quantidade || 0
              ) *
              Number(
                item.valorUnitario || 0
              );

            return (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-black/20 p-5"
              >
                {/* HEADER ITEM */}

                <div className="mb-6 flex items-center justify-between">
                  <p className="font-semibold">
                    Item {index + 1}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      removeItem(item.id)
                    }
                    aria-label={`Excluir item ${
                      index + 1
                    }`}
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-red-400 transition active:bg-red-500/10"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="space-y-5">
                  {/* DESCRIÇÃO */}

                  <div>
                    <label className="mb-2 block text-xs font-medium text-zinc-400">
                      Descrição
                    </label>

                    <input
                      type="text"
                      value={
                        item.descricao
                      }
                      onChange={(event) =>
                        updateItem(
                          item.id,
                          "descricao",
                          event.target.value
                        )
                      }
                      placeholder="Ex.: Pintura interna"
                      autoComplete="off"
                      className="min-h-14 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-base text-white outline-none transition placeholder:text-zinc-700 focus:border-gold"
                    />
                  </div>

                  {/* QUANTIDADE */}

                  <div>
                    <label className="mb-2 block text-xs font-medium text-zinc-400">
                      Quantidade
                    </label>

                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="0.01"
                      value={
                        item.quantidade === 0
                          ? ""
                          : item.quantidade
                      }
                      onChange={(
                        event
                      ) => {
                        const value =
                          event.target
                            .value;

                        updateItem(
                          item.id,
                          "quantidade",
                          value === ""
                            ? 0
                            : Number(value)
                        );
                      }}
                      placeholder="Ex.: 5"
                      className="min-h-14 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-base text-white outline-none transition placeholder:text-zinc-700 focus:border-gold"
                    />
                  </div>

                  {/* UNIDADE */}

                  <div>
                    <label className="mb-2 block text-xs font-medium text-zinc-400">
                      Unidade
                    </label>

                    <select
                      value={
                        item.unidade
                      }
                      onChange={(event) =>
                        updateItem(
                          item.id,
                          "unidade",
                          event.target.value
                        )
                      }
                      className="min-h-14 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-base text-white outline-none transition focus:border-gold"
                    >
                      <option value="un">
                        Unidade
                      </option>

                      <option value="m²">
                        Metro quadrado (m²)
                      </option>

                      <option value="m">
                        Metro (m)
                      </option>

                      <option value="h">
                        Hora
                      </option>

                      <option value="dia">
                        Dia
                      </option>

                      <option value="vb">
                        Verba
                      </option>

                      <option value="serviço">
                        Serviço
                      </option>
                    </select>
                  </div>

                  {/* VALOR UNITÁRIO */}

                  <div>
                    <label className="mb-2 block text-xs font-medium text-zinc-400">
                      Valor unitário
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                        R$
                      </span>

                      <input
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.01"
                        value={
                          item.valorUnitario ===
                          0
                            ? ""
                            : item.valorUnitario
                        }
                        onChange={(
                          event
                        ) => {
                          const value =
                            event.target
                              .value;

                          updateItem(
                            item.id,
                            "valorUnitario",
                            value === ""
                              ? 0
                              : Number(
                                  value
                                )
                          );
                        }}
                        placeholder="0,00"
                        className="min-h-14 w-full rounded-2xl border border-white/10 bg-black/30 py-3 pl-12 pr-4 text-base text-white outline-none transition placeholder:text-zinc-700 focus:border-gold"
                      />
                    </div>
                  </div>

                  {/* TOTAL */}

                  <div>
                    <p className="mb-2 text-xs font-medium text-zinc-400">
                      Total
                    </p>

                    <div className="flex min-h-16 items-center rounded-2xl border border-gold/20 bg-gold/[0.06] px-4">
                      <p className="text-xl font-semibold text-white">
                        {currency(total)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}