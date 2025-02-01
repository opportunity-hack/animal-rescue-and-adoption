import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import newrrLogo from "../assets/newrr.svg";

interface NavbarProps {
  links: { name: string; href: string; onClick?: () => void }[];
  title: string;
  color?: string;
  onClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ links, title, color, onClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop.current) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = (href: string, onClick?: () => void) => {
    if (onClick) {
      onClick();
    } else {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        ref={navbarRef}
        style={{ backgroundColor: color || "#FFFFFF" }}
        className={`text-[#101010] transition-transform duration-300 ${
          isNavbarVisible
            ? "transform translate-y-0"
            : "transform -translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 sm:h-20 px-4 md:px-16">
          <div
            className="flex items-center"
            onClick={onClick}
            style={{ cursor: "pointer" }}
          >
            <img
              src={newrrLogo}
              alt="NEWRR logo"
              className="w-10 h-10 sm:w-12 sm:h-12 mr-2 sm:mr-3"
            />
            <Link
              to="/"
              className="font-['Montserrat'] font-bold text-xl sm:text-2xl md:text-3xl"
            >
              <span className="block md:hidden">NEWRR</span>
              <span className="hidden md:block">{title}</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href, link.onClick);
                }}
                className="hover:text-gray-700"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#101010] focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="#101010"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        ref={menuRef}
        className={`fixed h-screen right-0 max-w-xs w-full bg-[#FFFFFF] text-[#101010] z-60 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-center items-center`}
      >
        <div className="flex flex-col space-y-8 p-4 items-center">
          <ul className="space-y-8 text-center">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href, link.onClick);
                  }}
                  className="hover:text-gray-700"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
