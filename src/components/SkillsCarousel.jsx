import React, { useState, useMemo, useRef, useEffect } from 'react';

// New skill data structure
const skills = [
  // Languages
  { name: "Java", category: "languages" },
  { name: "C++", category: "languages" },
  { name: "Python", category: "languages" },
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  
  // Frontend Frameworks & Libraries
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Three.js", category: "frontend" },
  
  // Backend & DevOps
  { name: "Node.js", category: "backend" },
  { name: "Docker", category: "backend" },
  { name: "Firebase", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Git", category: "backend" },
  
  // Cloud
  { name: "AWS", category: "cloud" },
  { name: "Lambda", category: "cloud" },
  { name: "API Gateway", category: "cloud" },
  { name: "CloudWatch", category: "cloud" },
];

// Centralized map for logos to make it easier to manage
const logoMap = {
  "Java": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg' },
  "C++": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
  "Python": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg' },
  "JavaScript": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  "TypeScript": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  "React": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg' },
  "Next.js": { logo: 'https://cdn.worldvectorlogo.com/logos/next-js.svg', },
  "Tailwind CSS": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  "Three.js": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original-wordmark.svg',  },
  "Node.js": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg' },
  "Docker": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg' },
  "Firebase": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
  "MongoDB": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  "PostgreSQL": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  "Git": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg' },
  "AWS": { logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',  },
  "Lambda": { logo: 'https://cdn.worldvectorlogo.com/logos/aws-lambda.svg' },
  "API Gateway": { logo: 'https://cdn.worldvectorlogo.com/logos/aws-api-gateway.svg', },
  "CloudWatch": { logo: 'https://cdn.worldvectorlogo.com/logos/aws-cloudwatch.svg' },
};

const categoryTitles = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend & DevOps",
  cloud: "Cloud"
};

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
              className={`max-w-full max-h-24 object-contain transition-transform duration-300 group-hover:scale-110 ${skill.invertOnDark ? 'dark:invert' : ''}`}
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
                  className={`h-16 w-16 sm:h-20 sm:w-20 object-contain ${skill.invertOnDark ? 'dark:invert' : ''}`}
                />
              )}
               <p className="mt-4 text-sm font-medium text-muted-foreground text-center">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const SkillsCarousel = () => {
  const [viewMode, setViewMode] = useState('carousel');
  const [containerHeight, setContainerHeight] = useState('144px'); // Initial height for carousel (h-36)
  const carouselRef = useRef(null);
  const gridRef = useRef(null);

  // Combine skills with their logo data and memoize
  const allSkills = useMemo(() => skills.map(skill => ({
    ...skill,
    ...(logoMap[skill.name] || {})
  })), []);
  
  // Group skills by category for the grid view
  const categorizedSkills = useMemo(() => {
    return allSkills.reduce((acc, skill) => {
      const { category } = skill;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});
  }, [allSkills]);

  // Duplicate the flattened array for a seamless looping effect in the carousel
  const extendedSkills = useMemo(() => [...allSkills, ...allSkills], [allSkills]);

  useEffect(() => {
    // When the view mode changes, calculate the height of the target content
    // and set the container's height to smoothly animate the transition.
    const timer = setTimeout(() => {
        let targetHeight;
        if (viewMode === 'carousel' && carouselRef.current) {
            targetHeight = carouselRef.current.scrollHeight;
        } else if (viewMode === 'grid' && gridRef.current) {
            targetHeight = gridRef.current.scrollHeight;
        }
        if (targetHeight) {
            setContainerHeight(`${targetHeight}px`);
        }
    }, 50); // Small delay to allow content to render before measuring
    return () => clearTimeout(timer);
  }, [viewMode]);

  return (
    <div className="bg-background antialiased text-foreground font-sans" id="skills">
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
              A showcase of the programming languages, frameworks, and technologies I work with.
            </p>
          </div>
          
          <button
            onClick={() => setViewMode(prev => prev === 'carousel' ? 'grid' : 'carousel')}
            className="absolute top-0 right-4 bg-secondary/70 hover:bg-secondary text-foreground rounded-full p-3 transition-colors duration-300 z-20"
            aria-label="Toggle view"
            title={viewMode === 'carousel' ? 'Switch to Grid View' : 'Switch to Carousel View'}
          >
            <i className={`bi ${viewMode === 'carousel' ? 'bi-grid-fill' : 'bi-collection-fill'} text-xl`}></i>
          </button>

          <div
            className="relative transition-all duration-700 ease-in-out"
            style={{ height: containerHeight }}
          >
            <div
                className={`absolute w-full transition-opacity duration-500 ease-in-out ${viewMode === 'carousel' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div ref={carouselRef}>
                    <CarouselView extendedSkills={extendedSkills} />
                </div>
            </div>
            <div
                className={`absolute w-full transition-opacity duration-500 ease-in-out ${viewMode === 'grid' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
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
