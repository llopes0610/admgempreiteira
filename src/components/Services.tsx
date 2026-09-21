import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="servicos" className="py-24">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">
            Nossos serviços
          </p>

          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
            Da estrutura ao acabamento.
          </h2>

          <p className="mt-5 leading-7 text-zinc-400">
            Serviços para reformas, manutenção e transformação de ambientes
            residenciais e comerciais.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/servicos/${service.slug}`}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] transition hover:-translate-y-1 hover:border-gold/40"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/50 text-2xl backdrop-blur">
                  {service.icon}
                </div>
              </div>

              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold">{service.title}</h3>

                  <ArrowUpRight className="shrink-0 text-zinc-600 transition group-hover:text-gold" />
                </div>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {service.description}
                </p>

                <span className="mt-6 inline-block text-sm font-medium text-gold">
                  Conhecer serviço
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}