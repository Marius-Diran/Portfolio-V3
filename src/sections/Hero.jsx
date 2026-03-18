import {
  ArrowRight,
  ChevronDown,
  Download,
  Github,
  Linkedin,
  Twitter,
  TwitterIcon,
  X,
} from "lucide-react";
import Button from "../components/Buttons";
import AnimatedBorderButton from "../components/AnimatedBorderButton";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const skills = [
  "HTML",
  "CSS",
  "Tailwind CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "LLM Engineering",
  "Github",
  "AWS",
  "Vercel",
  "Figma",
  "Git",
];

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden z-10 ${isVisible ? "visible" : "invisible"}`}
      ref={ref}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/Hero-bg.png"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0f1418]/20 via-[#0f1418]/80 to-[#0f1418]" />
      </div>

      {/* Red Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            className="absolute w-2 h-2 rounded-full opacity-60"
            style={{
              backgroundColor: "#E63946",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slow-drift ${20 + Math.random() * 30}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
            key={i}
          />
        ))}
      </div>

      {/* Contents */}
      <div className="container mx-auto pt-40 px-6 text-white relative">
        <div
          className={`flex max-sm:flex-col gap-8 items-center scroll-fade-in ${isVisible ? "visible" : ""}`}
        >
          {/* Left Column - Text Content */}
          <div className="space-y-8 flex-1">
            <span className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full glass text-[#F87171] animate-fadeIn animation-delay-200">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Software Engineer • Problem Solver
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse max-sm:hidden" />
            </span>

            {/* HeadLine */}
            <div className="space-y-4">
              <h1 className="text-7xl font-bold leading-tight animate-fadeIn animation-delay-400 max-sm:text-5xl">
                Building{" "}
                <span className="text-[#F87171] glow-text">Intelligent</span>
                <br />
                systems with
                <br />
                <span className="font-serif italic font-normal text-white">
                  precision and purpose.
                </span>
              </h1>
              <p className="text-lg text-gray-400 animate-fadeIn animation-delay-800 max-sm:text-base">
                Hi, I'm Marius Odediran — a Software Engineer specializing in
                React and Node.js. I'm dedicated to building intelligent systems
                through LLM engineering and creating seamless user experiences.
                I'm passionate about solving complex problems with elegant,
                scalable solutions.
              </p>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fadeIn animation-delay-1200">
              <Button size="lg">
                Contact Me <ArrowRight className="w-5 h-5" />
              </Button>
              <AnimatedBorderButton>
                Download CV
                <Download />
              </AnimatedBorderButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 animate-fadeIn animation-delay-1200">
              <span className="text-gray-300 text-sm">Follow Me: </span>
              {[
                { icon: Github, href: "https://github.com/Marius-Diran" },
                { icon: Twitter, href: "https://x.com/Marius_Odediran" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/marius-odediran-94795b235/",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  className="p-2 rounded-full glass hover:bg-red-500/60 hover:text-red-400 transition-all duration-300 max-sm:active:bg-red-500/60 max-sm:active:text-red-400"
                >
                  {<social.icon className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex-1 relative animate-fadeIn animation-delay-300">
            <div className="relative max-w-md mx-auto">
              <div
                className="absolute inset-0
              rounded-3xl bg-linear-to-br
              from-red-400/30 via-transparent
              to-red-400/10 blur-2xl animate-pulse"
              />
              <div className="relative glass rounded-3xl glow-border p-3">
                <img
                  src="/Profile-Photo.png"
                  alt="Marius Odediran"
                  className="w-full aspect-4/5 object-cover rounded-2xl"
                />

                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-2 glass rounded-xl px-3 py-1 flex items-center gap-2 animate-float animate-fadeIn animation-delay-500">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">
                    Available for Work
                  </span>
                </div>

                {/* Stat Badge */}
                <div className="absolute -top-4 -left-4 glass rounded-xl px-3 py-2 animate-float animation-delay-500">
                  <div className="text-red-500 font-bold text-2xl">2+</div>
                  <div className="text-sm text-gray-300">Years Exp.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="text-white mt-20 animate-fadeIn animation-delay-600">
          <p className="text-gray-300 text-sm text-center mb-6">
            Technologies I Work With
          </p>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee">
              {[...skills, ...skills].map((skill, idx) => (
                <div
                  key={idx}
                  className="shrink-0 px-8 py-4 max-sm:px-4 max-sm:py-2"
                >
                  <span className="text-gray-400/70 font-semibold max-sm:text-sm">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-6 animate-fadeIn animation-delay-800">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span>Scroll</span>
            <ChevronDown className="w-7 h-7 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
