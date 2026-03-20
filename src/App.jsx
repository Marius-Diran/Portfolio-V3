import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Footer from "./layout/Footer";
import CV from "./sections/Cv";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
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
                <Contact />
              </main>
              <footer>
                <Footer />
              </footer>
              <Analytics />
            </div>
          }
        />
        <Route path="/cv" element={<CV />} />
      </Routes>
    </Router>
  );
};

export default App;
