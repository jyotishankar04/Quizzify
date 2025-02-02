import { _footerData, _navLinks } from "../../constants/home.constants";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HomeNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#1a1a2e]/60 backdrop-blur-md sticky top-0 z-50 w-full border-b border-[#5e5e5ea4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-white animate__animated animate__fadeIn"
            >
              {_footerData.companyInfo.name}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {_navLinks.map((link) => (
              <a
                key={link.title}
                href={link.link}
                className="text-neutral-300 hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                {link.title}
              </a>
            ))}
            <Link
              to="/app"
              className="  btn btn-primary flex justify-center items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Try for free
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-neutral-300 hover:text-white p-2"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-[120%] opacity-0"
        } md:hidden absolute top-16 inset-x-0 transition-all transform duration-300 ease-in-out`}
      >
        <div className="bg-[#1a1a2e]/70 backdrop-blur-md border-t border-[#5e5e5ea4] px-2 pt-2 pb-3 space-y-1">
          {_navLinks.map((link) => (
            <a
              key={link.title}
              href={link.link}
              className="block text-neutral-300 hover:text-white hover:bg-neutral-700/50 px-3 py-2 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.title}
            </a>
          ))}

          <Link
            to="/app"
            className="block text-neutral-300 hover:text-white hover:bg-neutral-700/50 px-3 py-2 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Try for free
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
