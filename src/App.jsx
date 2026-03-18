import Navbar from "./layout/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";

const App = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Testimonials />
      </main>
    </div>
  );
};

export default App;
