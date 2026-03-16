import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { motion } from "motion/react";

const projects = [
  {
    title: "Milo - AI-Powered Personal Assistant",
    description:
      "An intelligent assistant that helps users manage their tasks, schedule, and information using natural language processing and machine learning.",
    tags: ["React", "Tailwind CSS", "Node.js", "Machine Learning"],
    image: "/Milo-Preview.png",
    link: "https://milo-beryl.vercel.app/",
    github: "https://github.com/Marius-Diran/Milo",
  },
  {
    title: "Heartnote - AI-Powered Love Letter Generator",
    description:
      "An AI-powered tool that generates personalized love letters based on user input, using natural language processing and machine learning to create heartfelt messages.",
    tags: ["React", "Tailwind CSS", "Node.js", "Machine Learning"],
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
    <section id="projects" className="container mt-60 mx-auto px-6" ref={ref}>
      <div className="space-y-20">
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
                  whileTap={{ scale: 0.9 }}
                  className="relative overflow-hidden aspect-video"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
