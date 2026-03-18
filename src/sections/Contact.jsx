import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  SendIcon,
} from "lucide-react";
import Button from "../components/Buttons";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "themariusodediran@gmail.com",
    href: "mailto:themariusodediran@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 903 659 5403",
    href: "tel:+2349036595403",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lagos, Nigeria",
    href: "#",
  },
];

const Contact = () => {
  return (
    <section className="mt-60 relative text-white container mx-auto px-6">
      <div className="relative">
        <div className="space-y-4 text-center">
          <h2 className="text-[#F87171] font-semibold uppercase">
            Get in Touch
          </h2>
          <h1 className="text-[#F87171] text-5xl font-bold animate-fadeIn animation-delay-400">
            Let's build{" "}
            <span className="text-white font-serif font-medium italic">
              something great.
            </span>
          </h1>
          <p className="text-gray-400">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's discuss how we can
            <br />
            work together.
          </p>
        </div>

        <div className="mt-16 flex gap-12 mx-auto w-5xl max-sm:w-full max-sm:flex-col">
          {/* Contact Form */}
          <div className="glass-border-red p-8 rounded-2xl animate-fadeIn animation-delay-600">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your Name..."
                  className="w-full glass-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F87171] autofill:shadow-[inset_0_0_0px_1000px_rgba(0,0,0,0.3)] autofill:text-white transistion-all"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full glass-dark px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F87171] autofill:shadow-[inset_0_0_0px_1000px_rgba(0,0,0,0.3)] autofill:text-white transistion-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  rows={5}
                  id="message"
                  required
                  placeholder="Your Message..."
                  className="w-full glass-dark px-4 py-3 rounded-xl focus:outline-none focus:bg-transparent focus:border-[#F87171] focus:ring-1 focus:ring-[#F87171] autofill:shadow-[inset_0_0_0px_1000px_rgba(0,0,0,0.5)] autofill:text-white resize-none"
                />

                <Button className="w-full mt-6" type="submit" size="lg">
                  Send Message
                  <SendIcon />
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="animate-fadeIn animation-delay-800">
            <div className="space-y-4 max-sm:space-y-2 glass-border-red p-10 max-sm:p-2 rounded-2xl">
              {contactInfo.map((info, idx) => {
                return (
                  <a
                    key={idx}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-lg p-4 border border-transparent transition-all duration-300 hover:bg-white/5 hover:border-white/20 hover:backdrop-blur-xl hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_0_0_1px_rgba(248,113,113,0.15),0_12px_24px_rgba(0,0,0,0.32)]"
                  >
                    <div className="glass-red p-2 rounded-lg flex items-center">
                      <info.icon className="w-6 h-6 text-[#F87171]" />
                    </div>

                    <div>
                      <div className="text-sm text-gray-400">{info.label}</div>
                      <div className="text-lg">{info.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-20 glass-border-red p-10 rounded-2xl space-y-2">
              <div className="flex items-center gap-3 font-medium">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span>Currently Available</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                I'm currently open to new opportunities and exciting projects.
                <br />
                Whether you need a full-time engineer or a freelance
                <br />
                consultant, let's talk!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
