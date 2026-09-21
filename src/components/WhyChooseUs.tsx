const items = [
  "Atendimento personalizado",
  "Diversos serviços em um único lugar",
  "Qualidade nos acabamentos",
  "Comunicação durante a execução",
  "Orçamentos claros",
  "Soluções residenciais e comerciais",
];

export default function WhyChooseUs() {
  return (
    <section className="border-y border-white/10 bg-surface py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gold">
            Diferenciais
          </p>
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
            Por que escolher nossa empresa?
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-background p-6"
            >
              <p className="font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
