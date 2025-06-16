import { ArrowUp, Linkedin, Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-card border-t border-border mt-12 text-sm text-muted-foreground">

      <div className="container mx-auto flex flex-col sm:flex-row sm:justify-center items-center gap-y-6 sm:gap-x-0 sm:relative">

        <div className="text-center sm:text-left order-1 sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2">
          &copy; {new Date().getFullYear()} Luca T. All rights reserved.
        </div>

        <div className="flex space-x-4 order-2 sm:order-none"> 
          <a
            href="https://www.linkedin.com/in/lucategano"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hover:text-primary transition-colors"
          >
            <Linkedin size={25} />
          </a>
          <a
            href="https://github.com/lucaTegano"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hover:text-primary transition-colors"
          >
            <Github size={25} />
          </a>
        </div>

        {/* Right: Scroll to Top */}
        {/* On sm screens, positioned absolutely. On mobile, it's a flex item. */}
        {/* Order classes ensure correct stacking on mobile: Scroll to top third. */}
        <div className="order-3 sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
          <a
            href="#hero"
            className="rounded-full text-primary transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp size={25} className="hover:bg-hover rounded-full" />
          </a>
        </div>
      </div>
    </footer>
  );
};