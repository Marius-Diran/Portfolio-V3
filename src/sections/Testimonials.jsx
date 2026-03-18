import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { h1 } from "motion/react-client";

const testimonials = [
  {
    quote:
      "Marius is one of the most talented engineers I've worked with. His attention to detail and ability to translate complex requirements into elegant solutions is remarkable.",
    author: "Sarah Chen",
    role: "CTO, Tech Innovators Inc.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    quote:
      "Working with Pedro was a game-changer for our project. He delivered ahead of schedule with code quality that set a new standard for our team.",
    author: "Michael Rodriguez",
    role: "Product Manager, Digital Solutions",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    quote:
      "Pedro's expertise in React and TypeScript helped us rebuild our entire frontend in record time. His architectural decisions continue to pay dividends.",
    author: "Emily Watson",
    role: "Engineering Lead, StartUp Labs",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    quote:
      "Not only is Pedro technically brilliant, but he's also a fantastic communicator and team player. He elevated everyone around him.",
    author: "David Kim",
    role: "CEO, Innovation Hub",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="testimonials"
      className="text-white mt-60 px-6 overflow-hidden"
      ref={ref}
    >
      <div className={`container mx-auto ${isVisible ? "visible" : ""}`}>
        <div className="space-y-5">
          <h2 className="text-[#F87171] text-center font-semibold">
            What people say
          </h2>
          <h1 className="text-center text-[#F87171] text-5xl font-bold">
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
            <div className="glass-border-red glow-border rounded-3xl p-12 max-sm:p-8 animate-fadeIn animation-delay-300">
              <div className="absolute -top-5 left-8 w-10 h-10 glass-red rounded-full flex items-center justify-center">
                <Quote />
              </div>

              <blockquote className="text-xl leading-relaxed font-medium mb-8">
                "{testimonials[0].quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <img
                  src={testimonials[0].avatar}
                  alt={testimonials[0].author}
                  className="object-cover w-14 h-14 ring-2 ring-[#f87171] rounded-full"
                />
                <div>
                  <h2 className="font-semibold">{testimonials[0].author}</h2>
                  <p className="text-gray-400 text-sm">
                    {testimonials[0].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Nav */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button className="glass-dark rounded-full p-3">
              <ChevronLeft />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  className={`w-2 h-2 transition-all duration-300 ${idx === 0 ? "glass-red w-8 rounded-full" : "glass-dark rounded-full"}`}
                />
              ))}
            </div>

            <button className="glass-dark rounded-full p-3">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
