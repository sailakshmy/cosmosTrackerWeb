"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/neo", label: "Near Earth Objects" },
];

const NavBar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="cosmos-navbar" aria-label="Primary navigation">
      <div className="cosmos-navbar-inner">
        <Link
          href="/"
          className="cosmos-navbar-brand"
          onClick={closeMenu}
          aria-label="Cosmos Tracker home"
        >
          <span>Cosmos Tracker</span>
        </Link>

        <button
          type="button"
          className="cosmos-navbar-toggle"
          aria-controls="cosmos-navbar-menu"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={toggleMenu}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              d={
                isMenuOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"
              }
            />
          </svg>
        </button>

        <div
          className={`cosmos-navbar-menu ${isMenuOpen ? "is-open" : ""}`}
          id="cosmos-navbar-menu"
        >
          <ul className="cosmos-navbar-list">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`cosmos-navbar-link ${
                      isActive ? "is-active" : ""
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
