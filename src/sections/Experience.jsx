import { useScrollAnimation } from "../hooks/useScrollAnimation";

const experiences = [
  {
    period: "2025 - Present",
    role: "Junior Software Engineer",
    company: "Covalent",
    description:
      "Contributed to the development of a blockchain data indexing platform, implementing features and optimizing performance using React, Node.js, and MongoDB.",
    technologies: ["React", "Node.js", "MongoDB"],
    current: true,
  },
  {
    period: "2024",
    role: "Cloud Engineer",
    company: "Akure Tech Hub",
    description:
      "Designed and implemented cloud infrastructure solutions, ensuring scalability, security, and high availability for client applications.",
    technologies: ["AWS", "Docker", "Kubernetes"],
    current: false,
  },
  {
    period: "2021 - 2021",
    role: "Embedded systems engineer",
    company: "STEMcafe - CCHub",
    description:
      "Designed and developed embedded systems for IoT applications, focusing on efficient hardware-software integration and real-time data processing.",
    technologies: ["C", "C++", "Arduino"],
    current: false,
  },
  {
    period: "2021",
    role: "Freelance Developer",
    company: "Self-Employed",
    description:
      "Building custom web applications and tools for clients across various industries.",
    technologies: ["HTML", "CSS", "JavaScript", "WordPress"],
    current: false,
  },
];

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="experience"
      className="mt-60 container mx-auto px-6 relative overflow-hidden"
      ref={ref}
    >
      <div
        className={`space-y-10 scroll-fade-in ${isVisible ? "visible" : ""}`}
      >
        <div className="space-y-3">
          <h2 className="text-[#F87171] font-medium text-lg max-sm:text-base animate-fadeIn" style={{ animationDelay: '100ms' }} uppercase>
            Career Journey
          </h2>
          <h1 className="text-[#F87171] text-5xl font-semibold max-sm:text-4xl animate-fadeIn" style={{ animationDelay: '200ms' }}>
            Experience that{" "}
            <span className="text-white font-serif font-medium">
              defines me.
            </span>
          </h1>
          <p className="text-gray-500 w-[50%] max-sm:w-full animate-fadeIn" style={{ animationDelay: '300ms' }}>
            A timeline of my professional growth, from curious beginner to
            senior engineer leading teams and building products at scale.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative text-white">
          <div className="glass-red absolute left-1/2 max-sm:left-0 top-0 bottom-0 w-[0.3%] shadow-[0_0_25px_rgba(248, 23, 23, 0.8)]" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              return (
                <div
                  key={idx}
                  className="relative animate-fadeIn"
                  style={{ animationDelay: `${300 + (idx + 1) * 100}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 max-sm:left-0 w-3 h-3 top-0 bg-[#F87171] rounded-full z-10 -translate-x-[35%] max-sm:-translate-x-[40%] ring-3 ring-[#0f1418]">
                    {exp.current && (
                      <span className="absolute inset-0 rounded-full bg-[#F87171] opacity-75" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                    )}
                  </div>
                  {/* Timeline Contents */}
                  <div
                    className={`flex w-full max-sm:pl-4 max-sm:text-start ${idx % 2 === 0 ? "justify-start text-end pr-12 max-sm:pr-0" : "justify-end text-start pl-12 max-sm:pl-0"}`}
                  >
                    <div className="glass-border-red rounded-lg p-5 w-1/2 max-sm:w-full">
                      <span className="text-[#f87171] text-sm font-medium">
                        {exp.period}
                      </span>
                      <h3 className="text-xl font-semibold mt-2">{exp.role}</h3>
                      <p className="text-gray-400">{exp.company}</p>
                      <p className="text-sm text-gray-400 mt-4">
                        {exp.description}
                      </p>
                      <div
                        className={`flex flex-wrap gap-2 mt-4 max-sm:justify-start ${idx % 2 === 0 ? "justify-end" : "justify-start"}`}
                      >
                        {exp.technologies.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="text-white text-xs glass-dark font-medium px-2 py-1 rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
