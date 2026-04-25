import { useEffect, useState } from "react";
import Button from "../components/Buttons";
import AiButton from "../components/Aibutton";
import { Bot, Menu, X } from "lucide-react";
import logo from "../assets/M-New.png";
import { Link } from "react-router-dom";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollThreshold = 50;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMobileMenu = () => {
    setIsMobileMenuVisible(true);
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
      return;
    }

    openMobileMenu();
  };

  const handleMobileMenuAnimationEnd = () => {
    if (!isMobileMenuOpen) {
      setIsMobileMenuVisible(false);
    }
  };

  return (
    <header
      className={`text-white p-4 fixed w-full top-0 z-50 transition-colors duration-300 ${isScrolled ? "glass-dark" : "bg-transparent"}`}
    >
      <nav className="container items-center flex justify-between">
        <a
          href="#"
          className="w-14 hover:rotate-360 transition-transform duration-300"
          onClick={closeMobileMenu}
        >
          <img src={logo} alt="Logo" className="w-full" />
        </a>

        <div className="mx-auto glass rounded-4xl px-6 py-3 max-sm:hidden items-center flex">
          {navLinks.map((link, index) => (
            <a
              href={link.href}
              key={index}
              className="mx-4 text-gray-300 hover:text-[#E85D5D]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex gap-5 items-center max-sm:hidden">
          <a href="#contact">
            <Button size="sm">Contact Me</Button>
          </a>

          <Link to="/chat">
            <AiButton size="sm" className="px-5">
              <Bot />
            </AiButton>
          </Link>
        </div>

        {/* Mobile Nav Button */}
        <button
          className="block md:hidden hover:cursor-pointer"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMobileMenuVisible && (
        <div
          className={`mx-auto glass px-6 py-3 flex flex-col md:hidden mt-5 ${isMobileMenuOpen ? "animate-fadeIn" : "animate-fadeOut"}`}
          onAnimationEnd={handleMobileMenuAnimationEnd}
        >
          {navLinks.map((link, index) => (
            <a
              href={link.href}
              key={index}
              className="mx-4 my-1.5 text-gray-300 hover:text-[#E85D5D]"
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}

          <div className="flex flex-col gap-3 mt-4">
            <a href="#contact">
              <Button size="sm" onClick={closeMobileMenu}>
                Contact Me
              </Button>
            </a>

            <Link to="/chat" onClick={closeMobileMenu}>
              <AiButton size="sm" className="px-11">
                <Bot />
              </AiButton>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
