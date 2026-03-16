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
              I'm a software engineer with 5+ years of experience building
              intelligent, user-focused digital products. My passion for solving
              real problems through elegant code has driven me from curious web
              developer to full-stack engineer.
            </p>
            <p>
              I specialize in React, Next.js, and TypeScript, with expertise
              spanning Node.js, Python, and Machine Learning. I believe great
              engineering is invisible—users only see the result, not the
              complexity behind it.
            </p>
            <p>
              Beyond writing code, I'm committed to continuous learning,
              contributing to open-source, and sharing knowledge with the
              developer community. Every project is an opportunity to build
              something meaningful.
            </p>
          </div>

          <div className="p-6 glass rounded-lg glow-border animate-fadeIn animation-delay-600">
            <p className="text-white text-lg font-medium italic">
              “My mission is to build digital products that are not only
              functional, but intelligent — experiences that feel seamless for
              users and powerful for developers.”
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
