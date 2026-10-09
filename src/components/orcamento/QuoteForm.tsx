"use client";

import type {
  Dispatch,
  SetStateAction,
} from "react";

import type { QuoteData } from "@/types/quote";

type Props = {
  quote: QuoteData;

  setQuote: Dispatch<
    SetStateAction<QuoteData>
  >;
};

export default function QuoteForm({
  quote,
  setQuote,
}: Props) {
  const updateField = (
    field: keyof QuoteData,
    value: string | number
  ) => {
    setQuote((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-surface p-5 sm:p-6">
      <h2 className="text-2xl font-semibold">
        Dados do orçamento
      </h2>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        Informe os dados do cliente e da
        execução do serviço.
      </p>

      <div className="mt-6 space-y-5">
        {/* NÚMERO + DATA */}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-400">
              Orçamento
            </label>

            <div className="flex min-h-14 items-center rounded-2xl border border-gold/20 bg-gold/[0.06] px-4">
              <span className="text-base font-semibold text-gold">
                #{quote.numero}
              </span>
            </div>
          </div>

          <Field
            label="Data"
            type="date"
            value={quote.data}
            onChange={(value) =>
              updateField(
                "data",
                value
              )
            }
          />
        </div>

        <Field
          label="Cliente"
          value={quote.cliente}
          onChange={(value) =>
            updateField(
              "cliente",
              value
            )
          }
          placeholder="Nome do cliente"
          autoComplete="name"
        />

        <Field
          label="Telefone"
          type="tel"
          inputMode="tel"
          value={quote.telefone}
          onChange={(value) =>
            updateField(
              "telefone",
              value
            )
          }
          placeholder="(13) 99999-9999"
          autoComplete="tel"
        />

        <Field
          label="Endereço da obra"
          value={quote.endereco}
          onChange={(value) =>
            updateField(
              "endereco",
              value
            )
          }
          placeholder="Rua, número, complemento"
        />

        <Field
          label="Cidade"
          value={quote.cidade}
          onChange={(value) =>
            updateField(
              "cidade",
              value
            )
          }
          placeholder="Ex.: Praia Grande - SP"
        />

        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Validade"
            value={quote.validade}
            onChange={(value) =>
              updateField(
                "validade",
                value
              )
            }
            placeholder="15 dias"
          />

          <Field
            label="Prazo"
            value={
              quote.prazoExecucao
            }
            onChange={(value) =>
              updateField(
                "prazoExecucao",
                value
              )
            }
            placeholder="15 dias"
          />
        </div>

        {/* DESCRIÇÃO */}

        <TextArea
          label="Descrição da obra"
          value={
            quote.descricaoObra
          }
          onChange={(value) =>
            updateField(
              "descricaoObra",
              value
            )
          }
          placeholder="Descreva resumidamente a obra ou serviço..."
          rows={4}
        />

        {/* PAGAMENTO */}

        <TextArea
          label="Forma de pagamento"
          value={
            quote.formaPagamento
          }
          onChange={(value) =>
            updateField(
              "formaPagamento",
              value
            )
          }
          placeholder="Ex.: 50% no início e 50% na conclusão."
          rows={3}
        />

        {/* OBSERVAÇÕES */}

        <TextArea
          label="Observações"
          value={quote.observacoes}
          onChange={(value) =>
            updateField(
              "observacoes",
              value
            )
          }
          placeholder="Informações adicionais para o cliente..."
          rows={4}
        />
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  value: string;

  placeholder?: string;

  type?: string;

  inputMode?:
    | "text"
    | "numeric"
    | "decimal"
    | "tel"
    | "email";

  autoComplete?: string;

  onChange: (
    value: string
  ) => void;
};

function Field({
  label,
  value,
  placeholder,
  type = "text",
  inputMode,
  autoComplete,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-zinc-400">
        {label}
      </label>

      <input
        type={type}
        inputMode={inputMode}
        autoComplete={
          autoComplete
        }
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="min-h-14 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-base text-white outline-none transition placeholder:text-zinc-700 focus:border-gold"
      />
    </div>
  );
}

type TextAreaProps = {
  label: string;
  value: string;

  placeholder?: string;

  rows?: number;

  onChange: (
    value: string
  ) => void;
};

function TextArea({
  label,
  value,
  placeholder,
  rows = 4,
  onChange,
}: TextAreaProps) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-zinc-400">
        {label}
      </label>

      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-4 text-base leading-6 text-white outline-none transition placeholder:text-zinc-700 focus:border-gold"
      />
    </div>
  );
}