import React, { useState, useRef } from "react";
import { ThemeToggle } from "./ThemeToggle";
import "./FloatingNav.css";

const navItems = [
  { icon: <i className="bi bi-house-door text-foreground"></i>, href: "#hero", label: "Home" },
  { icon: <i className="bi bi-person text-foreground"></i>, href: "#about", label: "About" },
  { icon: <i className="bi bi-gear text-foreground"></i>, href: "#skills", label: "Skills" },
  { icon: <i className="bi bi-github text-foreground"></i>, href: "https://github.com/LucaTegano/", label: "Contact" },
  { icon: <i className="bi bi-linkedin text-foreground"></i>, href: "https://www.linkedin.com/in/lucategano/", label: "Contact" },
  { icon: <i className="bi bi-stars text-foreground"></i>, href: "#projects", label: "Hide Stars" },
  { icon: <i className="bi bi-lightbulb text-foreground"></i>, href: "/showcase", label: "Showcase" },
  { icon: <ThemeToggle /> },
];

const FloatingNav = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navRef = useRef(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const getMargin = (index) => {
    if (hoveredIndex === null) return '0px';
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return '15px';
    if (distance === 1) return '10px';
    if (distance === 2) return '5px';
    return '0px';
  };

  return (
    <nav
      ref={navRef}
      className={`floating-nav ${hoveredIndex !== null ? 'hovered' : ''}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nav-content">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`nav-item ${hoveredIndex === index ? "active" : ""}`}
            onMouseEnter={() => handleMouseEnter(index)}
            style={{
              marginLeft: index > 0 ? getMargin(index) : '0',
              marginRight: index < navItems.length - 1 ? getMargin(index) : '0',
            }}
          >
            <div className="icon-container">{item.icon}</div>
            {item.label && <span className="tooltip">{item.label}</span>}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default FloatingNav;