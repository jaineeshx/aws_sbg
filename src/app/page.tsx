import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Stats from "@/components/Stats";
import Events from "@/components/Events";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import Blog from "@/components/Blog";
import Join from "@/components/Join";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Stats />
        <Events />
        <Projects />
        <Team />
        <Blog />
        <Join />
      </main>
      <Footer />
    </>
  );
}
