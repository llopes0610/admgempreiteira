import { MessageCircle } from "lucide-react";

const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5513981244417";

const message = encodeURIComponent(
  "Olá! Encontrei vocês pelo site e gostaria de solicitar um orçamento."
);

export default function ContactCTA() {
  return (
    <section id="contato" className="py-28">
      <div className="container-site rounded-[2rem] border border-gold/30 bg-[radial-gradient(circle_at_top_right,rgba(196,154,90,.18),transparent_35%)] p-8 shadow-premium md:p-14">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">
          Solicite um orçamento
        </p>
        <h2 className="mt-4 max-w-4xl text-4xl font-semibold md:text-6xl">
          Tem um projeto em mente?
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
          Fale conosco e conte o que você precisa. Nossa equipe poderá avaliar
          seu projeto e orientar os próximos passos.
        </p>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 font-semibold text-black"
        >
          <MessageCircle size={20} />
          Falar pelo WhatsApp
        </a>
      </div>
    </section>
  );
}
