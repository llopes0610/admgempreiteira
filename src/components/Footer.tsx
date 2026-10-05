import Link from "next/link";
import { services } from "@/data/services";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-16">
      <div className="container-site grid gap-10 lg:grid-cols-3">
        <div>
          <p className="text-xl font-black tracking-[0.18em]">EMPREITEIRA</p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">
            Construção, reformas, instalações e acabamentos para ambientes
            residenciais e comerciais.
          </p>
        </div>

        <div>
          <p className="font-semibold">Serviços</p>
          <div className="mt-4 grid gap-2 text-sm text-zinc-500">
            {services.slice(0, 6).map((service) => (
              <Link
                key={service.slug}
                href={`/servicos/${service.slug}`}
                className="hover:text-white"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold">Contato</p>
          <div className="mt-4 space-y-2 text-sm text-zinc-500">
            <p>WhatsApp: (13) 99620-8112</p>
            <p>Instagram: @admgempreiteira</p>
          </div>
        </div>
      </div>

      <div className="container-site mt-12 border-t border-white/10 pt-7 text-xs text-zinc-600">
        © 2026 ADMG Empreiteira. Todos os direitos reservados.
      </div>
    </footer>
  );
}
