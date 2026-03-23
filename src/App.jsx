import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Footer from "./layout/Footer";
import CV from "./pages/Cv";
import Chat from "./pages/Chat";

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
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;
