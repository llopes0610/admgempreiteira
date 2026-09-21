import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-end overflow-hidden pt-20"
    >
      <Image
        src="/images/hero/hero-principal.webp"
        alt="Projeto executado pela ADMG Empreiteira"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/30" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(196,154,90,.16),transparent_35%)]" />

      <div className="container-site relative z-10 pb-24 pt-36 md:pb-32">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          Construção • Reforma • Acabamento
        </p>

        <h1 className="max-w-5xl text-5xl font-semibold leading-[0.95] md:text-7xl lg:text-8xl">
          Transformamos
          <span className="text-gradient"> projetos em realidade.</span>
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
          Soluções completas para reformas, construção, instalações e
          acabamentos residenciais e comerciais.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#contato"
            className="rounded-full bg-gold px-7 py-4 text-center font-semibold text-black transition hover:scale-[1.03]"
          >
            Solicitar orçamento
          </Link>

          <Link
            href="#servicos"
            className="rounded-full border border-white/20 bg-black/20 px-7 py-4 text-center font-semibold backdrop-blur-sm transition hover:bg-white/10"
          >
            Conhecer serviços
          </Link>
        </div>
      </div>
    </section>
  );
}