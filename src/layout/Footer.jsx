import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import logo from "../assets/M-New.png";

const socialLinks = [
  { icon: Github, href: "https://github.com/Marius-Diran", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/marius-odediran-94795b235/",
    label: "LinkedIn",
  },
  { icon: Twitter, href: "https://x.com/Marius_Odediran", label: "Twitter" },
];

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-28 glass py-8 rounded-lg">
      <div className="container mx-auto px-6">
        <div className="flex max-sm:flex-col items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="max-sm:items-center text-left">
            <div className="w-18 max-sm:mx-auto">
              <a
                href="#"
                className="w-14 hover:rotate-360 transition-transform duration-300"
              >
                <img src={logo} alt="Logo" className="w-full" />
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              © {currentYear} Marius Odediran. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-gray-400 hover:text-[#F87171] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2 rounded-full text-white glass hover:bg-red-500/60 hover:text-red-400 transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
