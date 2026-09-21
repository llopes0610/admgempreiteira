import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { services } from "@/data/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28">
        <section className="container-site py-20">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gold">
            Serviços
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold md:text-6xl">
            {service.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            {service.description}
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {service.items.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
