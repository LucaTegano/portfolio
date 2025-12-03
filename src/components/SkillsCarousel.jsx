import React, { useState, useMemo, useRef, useEffect } from "react";
import { useSkillsCarousel, categoryTitles } from "../logic/useSkillsCarousel";

const CarouselView = ({ extendedSkills }) => (
  <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_25%,white_75%,transparent)]">
    <div
      className="
        flex w-max
        
        /* 1. Apply the base, continuous animation */
        animate-scroll
        
        /* 2. On hover, simply PAUSE the animation. It will stop in its tracks. */
        group-hover:[animation-play-state:paused]
      "
    >
      {/* This part remains the same */}
      {extendedSkills.map((skill, index) => (
        <div
          key={`${skill.name}-${index}`}
          className="flex-shrink-0 w-52 h-36 flex items-center justify-center mx-6"
          title={skill.name}
        >
          {skill.logo && (
            <img
              src={skill.logo}
              alt={`${skill.name} logo`}
              className={`max-w-full max-h-24 object-contain transition-transform duration-300 group-hover:scale-110 ${
                skill.invertOnDark ? "dark:invert" : ""
              }`}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

const GridView = ({ categorizedSkills }) => (
  <div className="w-full space-y-12">
    {Object.entries(categorizedSkills).map(([category, skillsInCategory]) => (
      <div key={category}>
        <h3 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400">
          {categoryTitles[category] || category}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {skillsInCategory.map((skill) => (
            <div
              key={skill.name}
              className="bg-card p-4 rounded-xl flex flex-col items-center justify-center aspect-square transition-all duration-300 hover:bg-hover hover:scale-105"
              title={skill.name}
            >
              {skill.logo && (
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  className={`h-16 w-16 sm:h-20 sm:w-20 object-contain ${
                    skill.invertOnDark ? "dark:invert" : ""
                  }`}
                />
              )}
              <p className="mt-4 text-sm font-medium text-muted-foreground text-center">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const SkillsCarousel = () => {
  const {
    viewMode,
    setViewMode,
    containerHeight,
    carouselRef,
    gridRef,
    extendedSkills,
    categorizedSkills,
  } = useSkillsCarousel();

  return (
    <div
      className="bg-background antialiased text-foreground font-sans"
      id="skills"
    >
      <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 py-8 relative">
          <div className="text-center mb-8">
            <span
              className="text-5xl font-bold tracking-tight animate-fade-in
                bg-gradient-to-r from-[#4285F4] via-[#9B6DFF] to-[#FF8D61]
                bg-clip-text text-transparent
                opacity-0 animate-fade-in-delay-1
              "
            >
              Tech Stack
            </span>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of the programming languages, frameworks, and
              technologies I work with.
            </p>
          </div>

          <button
            onClick={() =>
              setViewMode((prev) => (prev === "carousel" ? "grid" : "carousel"))
            }
            className="absolute top-0 right-4 bg-secondary/70 hover:bg-secondary text-foreground rounded-full p-3 transition-colors duration-300 z-20"
            aria-label="Toggle view"
            title={
              viewMode === "carousel"
                ? "Switch to Grid View"
                : "Switch to Carousel View"
            }
          >
            <i
              className={`bi ${
                viewMode === "carousel" ? "bi-grid-fill" : "bi-collection-fill"
              } text-xl`}
            ></i>
          </button>

          <div
            className="relative transition-all duration-700 ease-in-out"
            style={{ height: containerHeight }}
          >
            <div
              className={`absolute w-full transition-opacity duration-500 ease-in-out ${
                viewMode === "carousel"
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div ref={carouselRef}>
                <CarouselView extendedSkills={extendedSkills} />
              </div>
            </div>
            <div
              className={`absolute w-full transition-opacity duration-500 ease-in-out ${
                viewMode === "grid"
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div ref={gridRef}>
                <GridView categorizedSkills={categorizedSkills} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsCarousel;
