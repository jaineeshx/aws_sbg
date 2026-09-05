import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import Manifesto from "@/components/Manifesto";

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
