const steps = [
  ["01", "Contato", "Entendemos sua necessidade e o serviço desejado."],
  ["02", "Avaliação", "Analisamos o ambiente e os requisitos do projeto."],
  ["03", "Orçamento", "Apresentamos a proposta para execução dos serviços."],
  ["04", "Execução", "Realizamos o trabalho conforme o escopo definido."],
  ["05", "Entrega", "Finalizamos e conferimos os serviços executados."],
];

export default function Process() {
  return (
    <section className="py-24">
      <div className="container-site">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">
          Como trabalhamos
        </p>
        <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
          Um processo simples e transparente.
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {steps.map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-2xl border border-white/10 p-6"
            >
              <span className="text-sm text-gold">{number}</span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
