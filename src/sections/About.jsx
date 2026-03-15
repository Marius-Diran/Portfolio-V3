import { Code2, Lightbulb, Rocket, User } from "lucide-react";

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
  return (
    <section id="about" className="container mt-26 mx-auto">
      <div className="flex">
        {/* Left column - About me text */}
        <div>
          <p className="text-lg font-bold mb-4 text-[#F87171]">About Me</p>
          <h1 className="text-4xl font-bold leading-snug text-white">
            <span className="text-[#F87171]">
              Building intelligent products,{" "}
            </span>
            <span className="font-serif italic">one component at a time.</span>
          </h1>
          <p className="text-md text-gray-400">
            I'm a software engineer with 5+ years of experience building
            intelligent, user-focused digital products. My passion for solving
            real problems through elegant code has driven me from curious web
            developer to full-stack engineer.
          </p>
          <p className="text-md text-gray-400">
            I specialize in React, Next.js, and TypeScript, with expertise
            spanning Node.js, Python, and Machine Learning. I believe great
            engineering is invisible—users only see the result, not the
            complexity behind it.
          </p>
          <p className="text-md text-gray-400">
            Beyond writing code, I'm committed to continuous learning,
            contributing to open-source, and sharing knowledge with the
            developer community. Every project is an opportunity to build
            something meaningful.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
