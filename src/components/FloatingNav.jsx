import React, { useState, useRef } from "react";
import { ThemeToggle } from "./ThemeToggle";
import "./FloatingNav.css";

const navItems = [
  { icon: <i className="bi bi-house-door text-foreground"></i>, href: "#hero", label: "Home" },
  { icon: <i className="bi bi-person text-foreground"></i>, href: "#about", label: "About" },
  { icon: <i className="bi bi-gear text-foreground"></i>, href: "#skills", label: "Skills" },
  { icon: <i className="bi bi-github text-foreground"></i>, href: "https://github.com/LucaTegano/", label: "GitHub" },
  { icon: <i className="bi bi-linkedin text-foreground"></i>, href: "https://www.linkedin.com/in/lucategano/", label: "LinkedIn" },
  { icon: <i className="bi bi-stars text-foreground"></i>, href: "#projects", label: "Projects" },
  { icon: <i className="bi bi-lightbulb text-foreground"></i>, href: "/showcase", label: "Showcase" },
  { icon: <ThemeToggle /> },
];

const FloatingNav = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navRef = useRef(null);
  const animationFrameRef = useRef(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // --- NEW FEATURE START ---

  const handleMouseMove = (event) => {
    if (!navRef.current) return;

    // Cancel previous animation frame to avoid performance issues
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const navElement = navRef.current;
      const rect = navElement.getBoundingClientRect();
      const mouseX = event.clientX;
      
      // Calculate mouse position relative to the nav center (-1 to 1)
      const navCenter = rect.left + rect.width / 2;
      const mouseOffset = (mouseX - navCenter) / (rect.width / 2);
      
      const MAX_TRANSLATE = 8; // Max pixels an icon can move

      const navItemsElements = navElement.querySelectorAll(".nav-item");

      navItemsElements.forEach((item, index) => {
        // Calculate each item's position relative to the nav center (-1 to 1)
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const itemOffset = (itemCenter - navCenter) / (rect.width / 2);

        // The formula pushes icons away from the mouse's side of the center
        const translateX = -mouseOffset * MAX_TRANSLATE * (1 - Math.abs(itemOffset));
        
        item.style.transform = `translateX(${translateX}px)`;
      });
    });
  };

  const handleNavMouseLeave = () => {
    // Also call the original mouse leave to reset the spread effect
    handleMouseLeave();

    if (!navRef.current) return;

    // Cancel any pending animation frame
    if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Reset all icon positions
    const navItemsElements = navRef.current.querySelectorAll(".nav-item");
    navItemsElements.forEach(item => {
        item.style.transform = 'translateX(0px)';
    });
  };

  // --- NEW FEATURE END ---

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
      // Attach new event handlers to the main nav container
      onMouseMove={handleMouseMove}
      onMouseLeave={handleNavMouseLeave}
    >
      <div className="nav-content">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`nav-item ${hoveredIndex === index ? "active" : ""}`}
            // Individual hover still needed for the spread effect
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