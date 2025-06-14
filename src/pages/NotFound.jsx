import { Home, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { StarBackground } from "@/components/StarBackground";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Effects */}
      <StarBackground />
      
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div className="container max-w-4xl mx-auto text-center z-10">
          <div className="space-y-6">
            <div className="flex justify-center mb-6">
              <AlertCircle className="h-24 w-24 text-primary opacity-0 animate-fade-in" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="opacity-0 animate-fade-in">Oops!</span>
              <span className="text-primary opacity-0 animate-fade-in-delay-1"> 404</span>
              <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2"> Error</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track to creating stellar web experiences.
            </p>

            <div className="pt-4 opacity-0 animate-fade-in-delay-4">
              <Link to="/" className="cosmic-button">
                <Home className="h-4 w-4 mr-2 inline-block" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};