import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const testimonials = [
  {
    quote:
      "Marius is one of the most talented engineers I've worked with. His attention to detail and ability to translate complex requirements into elegant solutions is remarkable.",
    author: "Daniel Odediran",
    role: "CEO, Covalent.",
    avatar: "/DAN.jpg",
  },
  {
    quote:
      "Working with Marius was a game-changer for our project. He delivered ahead of schedule with code quality that set a new standard for our team.",
    author: "Michael Rodriguez",
    role: "Product Manager, Akure Tech Hub.",
    avatar: "/ATH.jpg",
  },
  {
    quote:
      "At CCHub, Marius developed a strong foundation in embedded systems and Arduino. His ability to connect hardware concepts with software logic demonstrates the kind of full-stack thinking that makes a great engineer.",
    author: "Adebukunola Omotoso",
    role: "STEM Educator, STEMcafe.",
    avatar: "/Adebukunola.jpg",
  },
  {
    quote:
      "Marius built us a landing page that transformed our agency overnight. Immediate spike in qualified leads, and every prospect praises the professionalism. He captured exactly what we needed.",
    author: "Emily Watson",
    role: "CEO, Agency Owner",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setActiveIdx(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section
      id="testimonials"
      className="text-white mt-60 px-6 overflow-hidden"
      ref={ref}
    >
      <div
        className={`container mx-auto scroll-fade-in ${isVisible ? "visible" : ""}`}
      >
        <div className="space-y-5">
          <h2 className="text-[#F87171] text-center font-semibold animate-fadeIn animation-delay-200 uppercase">
            What people say
          </h2>
          <h1 className="text-center text-[#F87171] text-5xl font-bold animate-fadeIn animation-delay-400">
            Kind words from{" "}
            <span className="text-white font-serif font-medium italic">
              amazing people
            </span>
          </h1>
        </div>

        {/* Testimonial Items */}
        <div className="w-1/2 mx-auto max-sm:w-full mt-20">
          <div className="relative">
            {/* Main Testimonial */}
            <div className="glass-border-red glow-border rounded-3xl p-12 max-sm:p-8 animate-fadeIn animation-delay-600">
              <div className="absolute -top-5 left-8 w-10 h-10 glass-red rounded-full flex items-center justify-center">
                <Quote />
              </div>

              <blockquote className="text-xl leading-relaxed font-medium mb-8">
                "{testimonials[activeIdx].quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <img
                  src={testimonials[activeIdx].avatar}
                  alt={testimonials[activeIdx].author}
                  className="object-cover w-14 h-14 ring-2 ring-[#f87171] rounded-full"
                />
                <div>
                  <h2 className="font-semibold">
                    {testimonials[activeIdx].author}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {testimonials[activeIdx].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Nav */}
          <div className="flex items-center justify-center gap-4 mt-8 animate-fadeIn animation-delay-800">
            <button className="glass-dark rounded-full p-3" onClick={previous}>
              <ChevronLeft />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-2 h-2 transition-all duration-300 ${idx === activeIdx ? "glass-red w-8 rounded-full" : "glass-dark rounded-full"}`}
                />
              ))}
            </div>

            <button className="glass-dark rounded-full p-3" onClick={next}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
