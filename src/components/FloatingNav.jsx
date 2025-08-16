import React, { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import "./FloatingNav.css";

const navItems = [
  { icon: <i className="bi bi-house-door-fill"></i>, href: "#hero", label: "Home" },
  { icon: <i className="bi bi-person-fill"></i>, href: "#about", label: "About" },
  { icon: <i className="bi bi-gear-fill"></i>, href: "#skills", label: "Skills" },
  { icon: <i className="bi bi-briefcase-fill"></i>, href: "#projects", label: "Projects" },
  { icon: <i className="bi bi-envelope-fill"></i>, href: "#contact", label: "Contact" },
  { icon: <i class="bi bi-github"></i>, href: "#contact", label: "Contact" },
  { icon: <i class="bi bi-linkedin"></i>, href: "#contact", label: "Contact" },
];

const FloatingNav = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <nav className="floating-nav">
      <div className="nav-content">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`nav-item ${activeIndex === index ? "active" : ""}`}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="icon-container">{item.icon}</div>
            <span className="tooltip">{item.label}</span>
          </a>
        ))}
        <div
          className={`nav-item ${activeIndex === navItems.length ? "active" : ""}`}
          onMouseEnter={() => setActiveIndex(navItems.length)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <div className="icon-container">
            <ThemeToggle />
          </div>
          <span className="tooltip">Theme</span>
        </div>
        {/*
        <a
          href="https://github.com/your-repo" // Replace with your GitHub repo
          target="_blank"
          rel="noopener noreferrer"
          className={`nav-item ${activeIndex === navItems.length + 1 ? "active" : ""}`}
          onMouseEnter={() => setActiveIndex(navItems.length + 1)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <div className="icon-container">
            <i className="bi bi-star-fill"></i>
          </div>
          <span className="tooltip">GitHub</span>
        </a>
        */}
      </div>
    </nav>
  );
};

export default FloatingNav;