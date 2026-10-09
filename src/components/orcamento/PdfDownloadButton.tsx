"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import type { QuoteData } from "@/types/quote";

type Props = {
  quote: QuoteData;
};

const currency = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

function formatDate(date: string) {
  if (!date) return "—";

  const [year, month, day] = date.split("-");

  if (!year || !month || !day) {
    return date;
  }

  return `${day}/${month}/${year}`;
}

async function imageToDataUrl(path: string): Promise<string | null> {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      return null;
    }

    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = reject;

      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export default function PdfDownloadButton({ quote }: Props) {
  const [generating, setGenerating] = useState(false);

  const generatePDF = async () => {
    if (generating) return;

    setGenerating(true);

    try {
      /*
       * Importamos somente quando o usuário clicar.
       * Isso evita que o Next.js tente processar a biblioteca
       * durante a renderização da página.
       */
      const [{ default: jsPDF }, { default: autoTable }] =
        await Promise.all([
          import("jspdf"),
          import("jspdf-autotable"),
        ]);

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const marginX = 18;

      const subtotal = quote.itens.reduce((total, item) => {
        return (
          total +
          Number(item.quantidade || 0) *
            Number(item.valorUnitario || 0)
        );
      }, 0);

      const desconto = Number(quote.desconto || 0);

      const total = Math.max(0, subtotal - desconto);

      /*
       * CORES ADMG
       */
      const gold = {
        r: 196,
        g: 154,
        b: 90,
      };

      const dark = {
        r: 20,
        g: 20,
        b: 20,
      };

      const gray = {
        r: 100,
        g: 100,
        b: 100,
      };

      /*
       * CABEÇALHO
       */
      doc.setFillColor(dark.r, dark.g, dark.b);
      doc.rect(0, 0, pageWidth, 46, "F");

      /*
       * LOGO
       *
       * Coloque o arquivo em:
       * public/logos/admg-logo.png
       */
      const logo = await imageToDataUrl(
        "/logos/admg-logo.png"
      );

      if (logo) {
        try {
          doc.addImage(
            logo,
            "PNG",
            marginX,
            9,
            34,
            22
          );
        } catch {
          // Se o PNG tiver alguma incompatibilidade,
          // o PDF continua sendo gerado sem o logo.
        }
      }

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);

      doc.text(
        "ADMG EMPREITEIRA",
        pageWidth - marginX,
        18,
        {
          align: "right",
        }
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);

      doc.setTextColor(205, 205, 205);

      doc.text(
        "Projetos que constroem confiança.",
        pageWidth - marginX,
        25,
        {
          align: "right",
        }
      );

      doc.setTextColor(
        gold.r,
        gold.g,
        gold.b
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);

      doc.text(
        `ORÇAMENTO Nº ${quote.numero || "—"}`,
        pageWidth - marginX,
        36,
        {
          align: "right",
        }
      );

      /*
       * INFORMAÇÕES SUPERIORES
       */

      let y = 59;

      doc.setTextColor(
        gold.r,
        gold.g,
        gold.b
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);

      doc.text("DADOS DO CLIENTE", marginX, y);

      y += 7;

      doc.setTextColor(35, 35, 35);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      doc.text(
        `Cliente: ${quote.cliente || "—"}`,
        marginX,
        y
      );

      doc.text(
        `Data: ${formatDate(quote.data)}`,
        pageWidth - marginX,
        y,
        {
          align: "right",
        }
      );

      y += 6;

      doc.text(
        `Telefone: ${quote.telefone || "—"}`,
        marginX,
        y
      );

      doc.text(
        `Validade: ${quote.validade || "—"}`,
        pageWidth - marginX,
        y,
        {
          align: "right",
        }
      );

      y += 6;

      const endereco = [
        quote.endereco,
        quote.cidade,
      ]
        .filter(Boolean)
        .join(" - ");

      doc.text(
        `Local da obra: ${endereco || "—"}`,
        marginX,
        y
      );

      /*
       * DESCRIÇÃO DA OBRA
       */

      y += 14;

      doc.setTextColor(
        gold.r,
        gold.g,
        gold.b
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);

      doc.text("DESCRIÇÃO DO SERVIÇO", marginX, y);

      y += 7;

      doc.setTextColor(55, 55, 55);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);

      const descricao = doc.splitTextToSize(
        quote.descricaoObra ||
          "Serviços conforme itens apresentados neste orçamento.",
        pageWidth - marginX * 2
      );

      doc.text(descricao, marginX, y);

      y += descricao.length * 5 + 6;

      /*
       * TABELA
       */

      const tableRows = quote.itens.map(
        (item, index) => {
          const itemTotal =
            Number(item.quantidade || 0) *
            Number(item.valorUnitario || 0);

          return [
            String(index + 1),
            item.descricao || "—",
            `${item.quantidade} ${item.unidade}`,
            currency(
              Number(item.valorUnitario || 0)
            ),
            currency(itemTotal),
          ];
        }
      );

      autoTable(doc, {
        startY: y,

        head: [
          [
            "#",
            "Descrição",
            "Qtd.",
            "Valor unit.",
            "Total",
          ],
        ],

        body: tableRows,

        margin: {
          left: marginX,
          right: marginX,
        },

        styles: {
          font: "helvetica",
          fontSize: 8.5,
          cellPadding: 3.5,
          valign: "middle",
          lineColor: [230, 230, 230],
          lineWidth: 0.2,
        },

        headStyles: {
          fillColor: [
            dark.r,
            dark.g,
            dark.b,
          ],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },

        columnStyles: {
          0: {
            cellWidth: 10,
            halign: "center",
          },

          1: {
            cellWidth: "auto",
          },

          2: {
            cellWidth: 22,
            halign: "center",
          },

          3: {
            cellWidth: 30,
            halign: "right",
          },

          4: {
            cellWidth: 30,
            halign: "right",
          },
        },

        alternateRowStyles: {
          fillColor: [248, 248, 248],
        },
      });

      /*
       * Descobre onde a tabela terminou.
       */

      const finalY =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (doc as any).lastAutoTable?.finalY ??
        y + 20;

      y = finalY + 10;

      /*
       * RESUMO FINANCEIRO
       */

      const boxWidth = 72;
      const boxX =
        pageWidth - marginX - boxWidth;

      const hasDiscount = desconto > 0;

      const boxHeight = hasDiscount ? 32 : 22;

      if (y + boxHeight > pageHeight - 50) {
        doc.addPage();
        y = 25;
      }

      doc.setFillColor(245, 245, 245);

      doc.roundedRect(
        boxX,
        y,
        boxWidth,
        boxHeight,
        2,
        2,
        "F"
      );

      doc.setTextColor(gray.r, gray.g, gray.b);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);

      let summaryY = y + 7;

      if (hasDiscount) {
        doc.text("Subtotal", boxX + 5, summaryY);

        doc.text(
          currency(subtotal),
          boxX + boxWidth - 5,
          summaryY,
          {
            align: "right",
          }
        );

        summaryY += 7;

        doc.text("Desconto", boxX + 5, summaryY);

        doc.text(
          `- ${currency(desconto)}`,
          boxX + boxWidth - 5,
          summaryY,
          {
            align: "right",
          }
        );

        summaryY += 9;
      }

      doc.setTextColor(
        gold.r,
        gold.g,
        gold.b
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.text("TOTAL", boxX + 5, summaryY);

      doc.text(
        currency(total),
        boxX + boxWidth - 5,
        summaryY,
        {
          align: "right",
        }
      );

      y += boxHeight + 13;

      /*
       * CONDIÇÕES
       */

      if (y > pageHeight - 75) {
        doc.addPage();
        y = 25;
      }

      doc.setTextColor(
        gold.r,
        gold.g,
        gold.b
      );

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);

      doc.text("CONDIÇÕES DA PROPOSTA", marginX, y);

      y += 7;

      doc.setTextColor(55, 55, 55);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);

      doc.text(
        `Prazo de execução: ${
          quote.prazoExecucao || "A definir"
        }`,
        marginX,
        y
      );

      y += 6;

      doc.text(
        `Validade da proposta: ${
          quote.validade || "15 dias"
        }`,
        marginX,
        y
      );

      y += 6;

      const pagamento = doc.splitTextToSize(
        `Forma de pagamento: ${
          quote.formaPagamento || "A combinar"
        }`,
        pageWidth - marginX * 2
      );

      doc.text(pagamento, marginX, y);

      y += pagamento.length * 5 + 8;

      /*
       * OBSERVAÇÕES
       */

      if (quote.observacoes) {
        doc.setTextColor(
          gold.r,
          gold.g,
          gold.b
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);

        doc.text("OBSERVAÇÕES", marginX, y);

        y += 7;

        doc.setTextColor(55, 55, 55);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

        const observations =
          doc.splitTextToSize(
            quote.observacoes,
            pageWidth - marginX * 2
          );

        doc.text(observations, marginX, y);
      }

      /*
       * RODAPÉ EM TODAS AS PÁGINAS
       */

      const numberOfPages =
        doc.getNumberOfPages();

      for (
        let page = 1;
        page <= numberOfPages;
        page++
      ) {
        doc.setPage(page);

        doc.setDrawColor(
          gold.r,
          gold.g,
          gold.b
        );

        doc.line(
          marginX,
          pageHeight - 20,
          pageWidth - marginX,
          pageHeight - 20
        );

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);

        doc.setTextColor(110, 110, 110);

        doc.text(
          "ADMG Empreiteira • Projetos que constroem confiança.",
          marginX,
          pageHeight - 13
        );

        doc.text(
          `Página ${page} de ${numberOfPages}`,
          pageWidth - marginX,
          pageHeight - 13,
          {
            align: "right",
          }
        );
      }

      /*
       * DOWNLOAD
       */

      const number =
        quote.numero
          ?.trim()
          .replace(/[^a-zA-Z0-9-_]/g, "-") ||
        "novo";

      doc.save(
        `orcamento-admg-${number}.pdf`
      );
    } catch (error) {
      console.error(
        "Erro ao gerar PDF:",
        error
      );

      alert(
        "Não foi possível gerar o PDF. Verifique o console para mais detalhes."
      );
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={generatePDF}
      disabled={generating}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-4 font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Download size={19} />

      {generating
        ? "Gerando PDF..."
        : "Gerar PDF"}
    </button>
  );
}