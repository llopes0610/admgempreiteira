import About from "@/components/About";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroVideo from "@/components/IntroVideo";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <IntroVideo />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <WhyChooseUs />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
