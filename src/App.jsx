import Navbar from "./layout/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";

const App = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Hero />
        <About />
      </main>
    </div>
  );
};

export default App;
