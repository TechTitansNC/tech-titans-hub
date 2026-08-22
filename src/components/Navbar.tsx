import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  {
    label: "Our Team",
    subLinks: [
      { to: "/teamftc", label: "2026-2027 Biobuzz" },
      { to: "/team", label: "2025-2026 Unearthed" },
    ],
  },
  { to: "/news", label: "News" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/survey", label: "Survey" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">Tech Titans</span>
          <span className="text-sm text-blue-400">#32795</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            if (link.subLinks) {
              const isSubActive = link.subLinks.some(
                (sub) => sub.to !== "#" && location.pathname === sub.to
              );

              return (
                <div
                  key={link.label}
                  className="relative py-2"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 transition-colors ${
                      isSubActive ? "text-blue-400" : "text-gray-300 hover:text-blue-400"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Desktop Submenu */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-1 w-48 rounded-md bg-gray-800 border border-gray-700 shadow-lg py-2 z-50"
                      >
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.to}
                            onClick={(e) => {
                              if (sub.to === "#") e.preventDefault();
                            }}
                            className={`block px-4 py-2 transition-colors ${
                              sub.to !== "#" && location.pathname === sub.to
                                ? "text-blue-400 bg-gray-700/50"
                                : "text-gray-300 hover:text-blue-400 hover:bg-gray-700/50"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors ${
                  location.pathname === link.to
                    ? "text-blue-400"
                    : "text-gray-300 hover:text-blue-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-t border-gray-800 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-3 text-sm font-medium">
              {navLinks.map((link) => {
                if (link.subLinks) {
                  return (
                    <div key={link.label} className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => setMobileSubmenuOpen(!mobileSubmenuOpen)}
                        className="flex items-center justify-between w-full text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            mobileSubmenuOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {mobileSubmenuOpen && (
                        <div className="pl-4 flex flex-col gap-2 border-l border-gray-700 mt-1">
                          {link.subLinks.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.to}
                              onClick={(e) => {
                                if (sub.to === "#") {
                                  e.preventDefault();
                                } else {
                                  setMobileOpen(false);
                                }
                              }}
                              className={`transition-colors ${
                                sub.to !== "#" && location.pathname === sub.to
                                  ? "text-blue-400"
                                  : "text-gray-400 hover:text-blue-400"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`transition-colors ${
                      location.pathname === link.to
                        ? "text-blue-400"
                        : "text-gray-300 hover:text-blue-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
