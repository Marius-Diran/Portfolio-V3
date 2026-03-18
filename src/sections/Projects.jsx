import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { motion } from "motion/react";
import AnimatedBorderButton from "../components/AnimatedBorderButton";

const projects = [
  {
    title: "Milo - AI-Assistant",
    description:
      "An intelligent assistant that helps users manage their tasks, schedule, and information using natural language processing and machine learning.",
    tags: ["React", "Tailwind CSS", "Node.js", "LLMs"],
    image: "/Milo-Preview.png",
    link: "https://milo-beryl.vercel.app/",
    github: "https://github.com/Marius-Diran/Milo",
  },
  {
    title: "Heartnote - AI-Powered Love Letter Generator",
    description:
      "An AI-powered tool that generates personalized love letters based on user input, using natural language processing and machine learning to create heartfelt messages.",
    tags: ["React", "Tailwind CSS", "Node.js", "LLMs"],
    image: "/AI-Val-writer.png",
    link: "https://val-project-olive.vercel.app/",
    github: "https://github.com/Marius-Diran/Val-Project",
  },
  {
    title: "Weather App",
    description:
      "A simple yet elegant weather application that provides real-time forecasts and detailed information for any location.",
    tags: ["Html", "Tailwind CSS", "JavaScript", "OpenWeather API"],
    image: "/Weather-Preview.png",
    link: "https://mariusweatherappv1.netlify.app/",
    github: "https://github.com/Marius-Diran/Weather-App",
  },
  {
    title: "Easybank Landing Page",
    description:
      "Take your financial life online. Your Easybank account will be a one-stop-shop for spending, saving, budgeting, investing, and much more.",
    tags: ["Html", "Tailwind CSS", "JavaScript"],
    image: "/Bookmark-Preview.png",
    link: "https://taupe-pithivier-e7e77b.netlify.app/",
    github: "https://github.com/Marius-Diran/Easy-bank-landing-page",
  },
];

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="projects"
      className="container mt-60 mx-auto px-6 overflow-hidden"
      ref={ref}
    >
      <div
        className={`space-y-10 scroll-fade-in ${isVisible ? "visible" : ""}`}
      >
        <div className="text-center">
          <p className="text-[#F87171] font-bold text-lg">Featured Work</p>
          <h1 className="text-[#F87171] text-5xl font-bold mt-2 leading-tight animate-fadeIn animation-delay-200">
            Projects that{" "}
            <span className="text-white font-normal font-serif italic">
              make an impact.
            </span>
          </h1>
          <p className="text-gray-400">
            A selection of my recent work, from complex web applications to
            innovative tools that solve real-world problems.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
          {projects.map((project, idx) => {
            return (
              <div
                key={idx}
                className="glass rounded-2xl overflow-hidden animate-fadeIn animation-delay-400"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 2 }}
                  className="relative overflow-hidden aspect-video rounded-2xl transition-all duration-300"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#141a1f] via-[#141a1f]/50 to-transparent opacity-60" />
                  {/* Overlay Links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <a
                      className="glass-red p-2 rounded-full transition-all text-white hover:text-[#F87171] max-sm:hidden"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ArrowUpRight />
                    </a>
                    <a
                      className="glass-red p-2 rounded-full transition-all text-white hover:text-[#F87171] max-sm:hidden"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github />
                    </a>
                  </div>
                </motion.div>

                {/* Contents */}
                <div className="space-y-4 p-6 mt-6">
                  <div className="flex items-start justify-between text-white font-semibold hover:text-[#F87171] transition-colors duration-300">
                    <h2>{project.title}</h2>
                    <a
                      className="hover:cursor-pointer glass p-1 rounded-full"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ArrowUpRight />
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagidx) => {
                      return (
                        <span
                          key={tagidx}
                          className="text-gray-400 glass-dark rounded-full px-4 py-1.5 text-xs mr-2 hover:bg-[#e85d5d]/40 hover:text-[#F87171] max-sm:active:bg-[#e85d5d] max-sm:active:text-[#F87171] transition-all duration-300"
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center p-4">
          <AnimatedBorderButton>
            <a href="">View Projects</a>
            <ArrowUpRight />
          </AnimatedBorderButton>
        </div>
      </div>
    </section>
  );
};

export default Projects;
