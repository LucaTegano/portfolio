import { ArrowRight, ExternalLink, Github } from "lucide-react";
import UniCodeImage from "../assets/projects/UniCode.png"; 
import OpenYardImage from "../assets/projects/OpenYard.png"; 
const projects = [
  {
    id: 1,
    title: "Unicode",
    description: "WebApp to help students practice programming problems aligned with university exam formats, featuring in-app code execution.",
    image: UniCodeImage, // Use the imported image
    tags: ["Next.js","Typescript", "AWS", "Firebase"],
    demoUrl: "https://unicodemaster.netlify.app",
    githubUrl: "",
  },
  {
    id: 2,
    title: "SpaceCal",
    description:
      "Social media app tailored for university students",
    image: "",
    tags: ["React Native", "TypeScript", "Node.js","AWS"],
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

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-8xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              {/* Container for the image: fixed height, white background, and centers content */}
              <div className="h-40 w-full overflow-hidden bg-white flex items-center justify-center">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    // Use max dimensions to prevent upscaling, object-contain for aspect ratio
                    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  // Placeholder for projects without an image
                  <span className="text-xs text-muted-foreground">Image not available</span>
                )}
              </div>
 
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                   {project.demoUrl && <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>}

                    {project.githubUrl && <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/lucaTegano"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};