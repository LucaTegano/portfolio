import React from "react";
import { useFloatingNav } from "../logic/useFloatingNav";
import { ThemeToggle } from "./ThemeToggle";
import "./FloatingNav.css";

const FloatingNav = ({ toggleStars }) => {
  const {
    starsVisible,
    isDarkMode,
    hoveredIndex,
    navRef,
    handleToggleStars,
    handleMouseEnter,
    handleMouseMove,
    handleNavMouseLeave,
  } = useFloatingNav(toggleStars);

  const getMargin = (index) => {
    if (hoveredIndex === null) return "3px";
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return "10px";
    if (distance === 1) return "8px";
    if (distance === 2) return "2px";
    return "1px";
  };

  const navItems = [
    {
      icon: <i className="bi bi-house-door text-foreground"></i>,
      href: "#hero",
      label: "Home",
    },
    {
      icon: <i className="bi bi-person text-foreground"></i>,
      href: "#about",
      label: "About",
    },
    {
      icon: <i className="bi bi-gear text-foreground"></i>,
      href: "#skills",
      label: "Skills",
    },
    {
      icon: <i className="bi bi-github text-foreground"></i>,
      href: "https://github.com/LucaTegano/",
      label: "GitHub",
    },
    {
      icon: <i className="bi bi-linkedin text-foreground"></i>,
      href: "https://www.linkedin.com/in/lucategano/",
      label: "LinkedIn",
    },
    {
      icon: <i className="bi bi-stars text-foreground"></i>,
      onClick: handleToggleStars,
      label: starsVisible ? "Hide Stars" : "Show Stars",
      isButton: true,
      active: starsVisible,
    },
    //{ icon: <i className="bi bi-lightbulb text-foreground"></i>, href: "/showcase", label: "Showcase" },
    { icon: <ThemeToggle />, label: isDarkMode ? "Light mode" : "Dark mode" },
  ];

  return (
    <nav
      ref={navRef}
      className={`floating-nav ${hoveredIndex !== null ? "hovered" : ""}`}
      // Attach new event handlers to the main nav container
      onMouseMove={handleMouseMove}
      onMouseLeave={handleNavMouseLeave}
    >
      <div className="nav-content">
        {navItems.map((item, index) => {
          const commonProps = {
            key: index,
            className: `nav-item ${hoveredIndex === index ? "active" : ""} ${
              item.isButton && item.active ? "stars-active" : ""
            }`,
            onMouseEnter: () => handleMouseEnter(index),
            style: {
              marginLeft: index > 0 ? getMargin(index) : "0",
              marginRight: index < navItems.length - 1 ? getMargin(index) : "0",
            },
          };

          if (item.isButton) {
            return (
              <button {...commonProps} onClick={item.onClick}>
                <div className="icon-container">{item.icon}</div>
                {item.label && <span className="tooltip">{item.label}</span>}
              </button>
            );
          }

          return (
            <a {...commonProps} href={item.href}>
              <div className="icon-container">{item.icon}</div>
              {item.label && <span className="tooltip">{item.label}</span>}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default FloatingNav;
