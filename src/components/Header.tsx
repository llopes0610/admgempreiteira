"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Início", href: "/#inicio" },
  { label: "Empresa", href: "/#empresa" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Contato", href: "/#contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/55 backdrop-blur-xl">
      <div className="container-site flex h-20 items-center justify-between">
        <Link href="/#inicio" className="text-xl font-black tracking-[0.18em]">
          ADMG EMPREITEIRA
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-300 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/#contato"
            className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.03]"
          >
            Solicitar orçamento
          </Link>
        </nav>

        <button
          className="lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Abrir menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-background lg:hidden">
          <nav className="container-site flex flex-col gap-2 py-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-4 text-zinc-200 hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}