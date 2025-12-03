import OpenYardImage from "../assets/projects/OpenYard.png";

const projects = [
  {
    id: 1,
    title: "Unicode",
    description:
      "WebApp to help students practice programming problems aligned with university exam formats, featuring in-app code execution.",
    image: "/linkedin-banner.png", // Use the image from public folder
    tags: ["Next.js", "Typescript", "AWS", "Firebase"],
    demoUrl: "https://unicodemaster.it",
    githubUrl: "",
  },
  {
    id: 2,
    title: "SpaceCal",
    description: "Social media app tailored for university students",
    image: "",
    tags: ["React Native", "TypeScript", "Node.js", "AWS"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    id: 3,
    title: "OpenYard",
    description:
      "The social media app's website to attract users and businesses (I made the business section)",
    image: OpenYardImage,
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://www.openyard.it/",
    githubUrl: "https://github.com/LucaTegano/open-yard-web/",
  },
];

export const useProjects = () => {
  return {
    projects,
  };
};
