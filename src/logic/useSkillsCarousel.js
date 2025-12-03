import { useState, useMemo, useRef, useEffect } from "react";

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
  Java: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg",
  },
  "C++": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  },
  Python: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg",
  },
  JavaScript: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  TypeScript: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  React: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg",
  },
  "Next.js": { logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg" },
  "Tailwind CSS": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  "Three.js": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original-wordmark.svg",
  },
  "Node.js": {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
  },
  Docker: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg",
  },
  Firebase: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
  },
  MongoDB: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  PostgreSQL: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  },
  Git: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg",
  },
  AWS: {
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  Lambda: { logo: "https://cdn.worldvectorlogo.com/logos/aws-lambda.svg" },
  "API Gateway": {
    logo: "https://cdn.worldvectorlogo.com/logos/aws-api-gateway.svg",
  },
  CloudWatch: {
    logo: "https://cdn.worldvectorlogo.com/logos/aws-cloudwatch.svg",
  },
};

export const categoryTitles = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend & DevOps",
  cloud: "Cloud",
};

export const useSkillsCarousel = () => {
  const [viewMode, setViewMode] = useState("carousel");
  const [containerHeight, setContainerHeight] = useState("144px"); // Initial height for carousel (h-36)
  const carouselRef = useRef(null);
  const gridRef = useRef(null);

  // Combine skills with their logo data and memoize
  const allSkills = useMemo(
    () =>
      skills.map((skill) => ({
        ...skill,
        ...(logoMap[skill.name] || {}),
      })),
    []
  );

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
  const extendedSkills = useMemo(
    () => [...allSkills, ...allSkills],
    [allSkills]
  );

  useEffect(() => {
    // When the view mode changes, calculate the height of the target content
    // and set the container's height to smoothly animate the transition.
    const timer = setTimeout(() => {
      let targetHeight;
      if (viewMode === "carousel" && carouselRef.current) {
        targetHeight = carouselRef.current.scrollHeight;
      } else if (viewMode === "grid" && gridRef.current) {
        targetHeight = gridRef.current.scrollHeight;
      }
      if (targetHeight) {
        setContainerHeight(`${targetHeight}px`);
      }
    }, 50); // Small delay to allow content to render before measuring
    return () => clearTimeout(timer);
  }, [viewMode]);

  return {
    viewMode,
    setViewMode,
    containerHeight,
    carouselRef,
    gridRef,
    extendedSkills,
    categorizedSkills,
  };
};
