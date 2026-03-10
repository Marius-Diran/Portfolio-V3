import {
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  TwitterIcon,
  X,
} from "lucide-react";
import Button from "../components/Buttons";
import AnimatedBorderButton from "../components/AnimatedBorderButton";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/Hero-bg.png"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-40"
        />
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
      <div className="container mx-auto pt-30 text-white relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-wide px-4 py-2 rounded-full glass text-[#F87171] animate-fadeIn animation-delay-200">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Software Engineer × LLM Engineer • Problem Solver
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </span>

            {/* HeadLine */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight animate-fadeIn animation-delay-400">
                Building{" "}
                <span className="text-[#F87171] glow-text">Intelligent</span>
                <br />
                systems with
                <br />
                <span className="font-serif italic font-normal text-white">
                  precision and purpose
                </span>
              </h1>
              <p className="text-lg text-gray-300 animate-fadeIn animation-delay-800">
                Hi, I'm Marius Odediran — a Software/LLM Engineer specializing
                in React, Node.js, and Machine Learning. I love creating
                innovative solutions that bridge the gap between technology and
                user experience.
              </p>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fadeIn animation-delay-1200">
              <Button size="lg">
                Contact Me <ArrowRight className="w-5 h-5" />
              </Button>
              <AnimatedBorderButton>Download CV</AnimatedBorderButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 animate-fadeIn animation-delay-1200">
              <span className="text-gray-300 text-sm">Follow: </span>
              {[
                { icon: Github, href: "https://github.com/MariusOdediran" },
                { icon: Twitter, href: "https://x.com/Marius_Odediran" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/marius-odediran-94795b235/",
                },
              ].map((social, idx) => (
                <a key={idx} href={social.href}>
                  {<social.icon />}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
