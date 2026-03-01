import { useState } from "react"
import Button from "../components/Buttons"
import { Menu, X } from "lucide-react"

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
]

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <header className=" text-white p-4 fixed w-full top-0 z-10">
            <nav className="container items-center flex justify-between">
                <a href="#" className="w-14 hover:rotate-360 transition-transform duration-600"><img src="/src/assets/m.png" alt="Logo" className="w-full"/></a>

                <div className="mx-auto glass rounded-4xl px-6 py-3 hidden items-center md:flex">
                    {navLinks.map((link, index) => (
                        <a href={link.href} key={index} className="mx-4 text-gray-300 hover:text-[#E85D5D]">{link.label}</a>
                    ))}
                </div>

                {/* CTA Button */}
                <Button size="sm" className="md:block hidden">Contact Me</Button>

                {/* Mobile Nav Button */}
                <button className="block md:hidden hover:cursor-pointer" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>
            
            {isMobileMenuOpen && <div className="mx-auto glass px-6 py-3 flex flex-col md:hidden mt-5">
                {navLinks.map((link, index) => (
                    <a href={link.href} key={index} className="mx-4 my-1.5 text-gray-300 hover:text-[#E85D5D]">{link.label}</a>
                ))}

                <Button size="sm" className="block md:hidden mt-4">Contact Me</Button>                
            </div>}
        </header>
    )
}

export default Navbar