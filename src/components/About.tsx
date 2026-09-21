export default function About() {
  return (
    <section id="empresa" className="border-y border-white/10 bg-surface py-24">
      <div className="container-site grid gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gold">
            Quem somos
          </p>
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
            Soluções completas para sua obra.
          </h2>
        </div>

        <div className="space-y-5 text-lg leading-8 text-zinc-400">
          <p>
            Atuamos com construção, reformas, manutenção e acabamentos,
            reunindo diferentes especialidades em um único atendimento.
          </p>
          <p>
            Nosso objetivo é entregar execução cuidadosa, comunicação clara e
            soluções adequadas para cada ambiente residencial ou comercial.
          </p>
        </div>
      </div>
    </section>
  );
}
