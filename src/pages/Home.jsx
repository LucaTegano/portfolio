import { useState } from "react";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import FloatingNav from "../components/FloatingNav";
import SkillsCarousel from "../components/SkillsCarousel";

export const Home = () => {
  const [showStars, setShowStars] = useState(true);

  const toggleStars = () => {
    setShowStars((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Effects */}
      <StarBackground show={showStars} />

      {/* Navbar */}
      <FloatingNav toggleStars={toggleStars} />
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsCarousel />
        <ProjectsSection />
        <ContactSection />
      
        {/* <Footer/> */}
      </main>
    </div>
  );
};