import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  SendIcon,
} from "lucide-react";
import Button from "../components/Buttons";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useState } from "react";
import emailjs from "@emailjs/browser";

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
  const { ref, isVisible } = useScrollAnimation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  const submitHandle = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables.",
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey,
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error: ", err);
      setSubmitStatus({
        type: "error",
        message:
          "Failed to send message. Please try again later or contact me directly via email.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="mt-60 relative text-white container mx-auto px-6"
      ref={ref}
    >
      <div
        className={`space-y-10 scroll-fade-in ${isVisible ? "visible" : ""}`}
      >
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
          <div
            className="glass-border-red p-8 rounded-2xl animate-fadeIn"
            style={{ animationDelay: "400ms" }}
          >
            <form className="space-y-6" onSubmit={submitHandle}>
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
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
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
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />

                <Button
                  className="w-full mt-6"
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <SendIcon className="w-5 h-5" />
                    </>
                  )}
                </Button>

                {submitStatus.type && (
                  <div
                    className={`flex items-center gap-3
                    p-4 rounded-xl mt-4 ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle className="w-5 h-5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0" />
                    )}
                    <p className="text-sm">{submitStatus.message}</p>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="animate-fadeIn" style={{ animationDelay: "600ms" }}>
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
                      <div className="text-lg max-sm:text-base">
                        {info.value}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 glass-border-red p-10 rounded-2xl space-y-2">
              <div className="flex items-center gap-3 font-medium">
                <span
                  className="w-3 h-3 bg-green-500 rounded-full"
                  style={{
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                />
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
