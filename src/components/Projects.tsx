import Image from "next/image";

const projects = [
  {
    title: "Reforma residencial",
    description:
      "Transformação completa de ambiente residencial, incluindo preparação, acabamento e adequações.",
    image: "/projects/06-reforma-casa-residencial/depois-01.webp",
    category: "Reforma completa",
  },
  {
    title: "Banheiro moderno",
    description:
      "Execução de acabamento, revestimentos e adequações para criação de um ambiente moderno e funcional.",
    image: "/projects/01-banheiro-moderno/depois-01.webp",
    category: "Revestimentos e acabamento",
  },
  {
    title: "Revestimento marmorizado",
    description:
      "Aplicação de revestimento com acabamento sofisticado e alto padrão visual.",
    image: "/projects/05-revestimento-marmorizado/depois-01.webp",
    category: "Pisos e revestimentos",
  },
  {
    title: "Construção em alvenaria",
    description:
      "Execução estrutural, levantamento de paredes e desenvolvimento das etapas da obra.",
    image: "/projects/10-construcao-alvenaria/durante-01.webp",
    category: "Construção",
  },
  {
    title: "Piso e área externa",
    description:
      "Preparação, impermeabilização e acabamento de piso em área externa.",
    image: "/projects/11-impermeabilizacao-piso-externo/depois-01.webp",
    category: "Área externa",
  },
  {
    title: "Reforma comercial",
    description:
      "Adequação de ambiente com drywall, acabamento e preparação para utilização comercial.",
    image: "/projects/09-reforma-comercial-drywall/durante-01.webp",
    category: "Drywall e reforma",
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="bg-surface py-24">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">
            Projetos
          </p>

          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
            Trabalhos que transformam ambientes.
          </h2>

          <p className="mt-5 leading-7 text-zinc-400">
            Conheça alguns dos serviços e projetos executados pela ADMG
            Empreiteira.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-background"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <span className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs font-medium text-white backdrop-blur">
                  {project.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">{project.title}</h3>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}