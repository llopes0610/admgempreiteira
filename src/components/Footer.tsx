
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Instagram,
  MessageCircle,
  Phone,
  Hammer,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { services } from "@/data/services";

export default function Footer() {
  const whatsappUrl =
    "https://wa.me/5513981244417?text=" +
    encodeURIComponent(
      "Olá! Gostaria de solicitar um orçamento com a ADMG Empreiteira."
    );

  const instagramUrl = "https://www.instagram.com/admgempreiteira/";

  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080808] text-white">
      {/* Iluminação decorativa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[450px] w-[450px] rounded-full bg-white/[0.025] blur-[110px]"
      />

      <div className="container-site relative">
        {/* CTA superior */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-12 md:flex-row md:items-center md:justify-between lg:py-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
              Vamos começar seu projeto?
            </p>

            <h2 className="max-w-xl text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Sua obra merece uma equipe de confiança.
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-7 text-zinc-400">
              Da manutenção à reforma completa, temos a solução
              ideal para seu imóvel.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-200"
          >
            Solicitar orçamento
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

        {/* Conteúdo principal */}
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Marca */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex flex-col"
              aria-label="ADMG Empreiteira - Página inicial"
            >
              <span className="text-3xl font-black tracking-[0.12em] sm:text-4xl">
                ADMG<span className="text-zinc-500">.</span>
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.38em] text-zinc-400">
                Empreiteira
              </span>
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-zinc-400">
              Especialistas em construção, reformas, instalações
              e acabamentos. Transformamos espaços com qualidade,
              responsabilidade e atenção aos detalhes.
            </p>

            {/* Redes sociais */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da ADMG Empreiteira"
                title="Instagram"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                <Instagram
                  size={19}
                  className="transition-transform group-hover:scale-110"
                />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da ADMG Empreiteira"
                title="WhatsApp"
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400"
              >
                <MessageCircle
                  size={19}
                  className="transition-transform group-hover:scale-110"
                />
              </a>
            </div>
          </div>

          {/* Serviços */}
          <div className="lg:col-span-4">
            <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em]">
              <span className="h-5 w-[2px] bg-white" />
              Nossos serviços
            </h3>

            <nav
              aria-label="Navegação de serviços"
              className="mt-7 grid gap-4 sm:grid-cols-2"
            >
              {services.slice(0, 8).map((service) => (
                <Link
                  key={service.slug}
                  href={`/servicos/${service.slug}`}
                  className="group flex items-center gap-2 text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
                >
                  <ChevronRight
                    size={14}
                    className="shrink-0 text-zinc-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
                  />
                  <span>{service.title}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contato */}
          <div className="lg:col-span-3">
            <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.12em]">
              <span className="h-5 w-[2px] bg-white" />
              Fale conosco
            </h3>

            <div className="mt-7 space-y-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-zinc-300 transition-colors group-hover:bg-white/10 group-hover:text-white">
                  <Phone size={18} />
                </span>

                <span>
                  <span className="block text-xs text-zinc-500">
                    WhatsApp / Orçamentos
                  </span>
                  <span className="mt-1 block text-sm font-medium text-zinc-200 transition-colors group-hover:text-white">
                    (13) 98124-4417
                  </span>
                </span>
              </a>

              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-zinc-300 transition-colors group-hover:bg-white/10 group-hover:text-white">
                  <Instagram size={18} />
                </span>

                <span>
                  <span className="block text-xs text-zinc-500">
                    Acompanhe nossos projetos
                  </span>
                  <span className="mt-1 block text-sm font-medium text-zinc-200 transition-colors group-hover:text-white">
                    @admgempreiteira
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-zinc-300">
                  <MapPin size={18} />
                </span>

                <div>
                  <span className="block text-xs text-zinc-500">
                    Região de atendimento
                  </span>
                  <span className="mt-1 block text-sm font-medium text-zinc-200">
                    Baixada Santista e região
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="flex flex-col gap-5 border-t border-white/10 py-7 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-zinc-500">
            © {year} ADMG Empreiteira. Todos os direitos reservados.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <span className="flex items-center gap-2 text-xs text-zinc-500">
              <Hammer size={14} className="text-zinc-400" />
              Construindo com responsabilidade.
            </span>

            <Link
              href="/"
              className="group flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-white"
            >
              Voltar ao início
              <ArrowRight
                size={13}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:rotate-[-45deg]"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
