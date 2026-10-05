import Link from "next/link";
import { services } from "@/data/services";

export default function Footer() {
  const whatsappUrl =
    "https://wa.me/5513996208112?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20com%20a%20ADMG%20Empreiteira.";

  const instagramUrl = "https://www.instagram.com/admgempreiteira/";

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
                className="transition-colors hover:text-white"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold">Contato</p>

          <div className="mt-4 space-y-2 text-sm text-zinc-500">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-colors hover:text-white"
            >
              WhatsApp: (13) 99620-8112
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-colors hover:text-white"
            >
              Instagram: @admgempreiteira
            </a>
          </div>
        </div>
      </div>

      <div className="container-site mt-12 border-t border-white/10 pt-7 text-xs text-zinc-600">
        © 2026 ADMG Empreiteira. Todos os direitos reservados.
      </div>
    </footer>
  );
}