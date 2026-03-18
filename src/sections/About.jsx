import { Code2, Lightbulb, Rocket, User } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const highLights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "I write clean, maintainable code that follows best practices and design patterns.",
  },
  {
    icon: Rocket,
    title: "Fast Development",
    description:
      "I build applications quickly without compromising on quality or user experience.",
  },
  {
    icon: User,
    title: "User-Centered Design",
    description:
      "I create applications that prioritize the needs and experiences of users.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description:
      "I develop creative and effective solutions to complex problems.",
  },
];

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="container mt-26 mx-auto px-6" ref={ref}>
      <div
        className={`flex items-center gap-20 max-sm:flex-col scroll-fade-in ${isVisible ? "visible" : ""}`}
      >
        {/* Left column - About me text */}
        <div className="space-y-8 flex-1">
          <p className="text-lg font-bold mb-4 text-[#F87171]">About Me</p>
          <h1 className="text-4xl font-bold leading-snug text-white animate-fadeIn animation-delay-200">
            <span className="text-[#F87171]">
              Building intelligent products,{" "}
            </span>
            <span className="font-serif italic font-normal">
              one component at a time.
            </span>
          </h1>
          <div className="space-y-4 text-gray-400 animate-fadeIn animation-delay-400">
            <p>
              I'm a software engineer with 2+ years of professional experience
              designing and developing digital products. I'm passionate about
              writing clean, maintainable code and translating complex
              requirements into elegant solutions that deliver real value.
            </p>
            <p>
              I specialize in React, Next.js, and TypeScript for frontend
              development, with strong expertise in Node.js and Python for
              backend systems. I'm actively developing skills in LLM engineering
              to build more intelligent and responsive applications. I focus on
              creating architectures that scale, perform efficiently, and solve
              meaningful problems.
            </p>
            <p>
              I'm committed to continuous professional growth through exploring
              emerging technologies, contributing to open-source projects, and
              collaborating with experienced developers. I believe that great
              engineering requires curiosity, attention to detail, and a
              willingness to learn from others.
            </p>
          </div>

          <div className="p-6 glass rounded-lg glow-border animate-fadeIn animation-delay-600">
            <p className="text-white text-lg font-medium italic">
              “My goal is to create intelligent systems that are easy to use,
              not just powerful to build. Good engineering should be
              invisible—users should feel delighted, not overwhelmed”
            </p>
          </div>
        </div>

        {/* Right column - Highlights */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
            {highLights.map((item, idx) => {
              return (
                <div
                  className="glass p-6 rounded-2xl space-y-4 animate-fadeIn"
                  key={idx}
                  style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                >
                  <div className="glass-red rounded-xl w-12 h-12 flex items-center justify-center">
                    <item.icon className="text-red-500 w-6 h-6" />
                  </div>
                  <h2 className="text-white font-semibold">{item.title}</h2>
                  <p className="text-gray-400/80 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
