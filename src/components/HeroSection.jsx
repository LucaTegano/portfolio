import { ArrowDown } from "lucide-react";
import { FlipWords } from "./ui/flip-words";
import SpaceButton from "../components/ui/SpaceButton";
export const HeroSection = () => {
  return (
    <div className="z-0 bg-gradient-to-r from-card via-about to-about-primary">
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> Hi, I'm</span>
            <span
              className="
                bg-gradient-to-r from-[#4285F4] via-[#9B6DFF] to-[#FF8D61]
                bg-clip-text text-transparent
                opacity-0 animate-fade-in-delay-1
              "
            >
              {" "}
              Luca Tegano
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3 font-bold leading-12">
            A Software Engineer Dedicated to Build <br/>
            <div><FlipWords 
            words={["Secure","Scalable","Efficient","Reliable"]}
            className="text-6xl lg:text-8xl font-black"/></div>
            Software
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <SpaceButton href="#projects"></SpaceButton>
          </div>
        </div>
      </div>

      <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-[bounce_0.75s_infinite]">
        <span className="text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-8 w-8 text-primary" />
      </div>
    </section>
    </div>
  );
};