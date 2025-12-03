import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContactForm } from "../logic/useContactForm";

export const ContactSection = () => {
  const { isSubmitting, handleSubmit } = useContactForm();
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="space-y-8 max-w-lg mx-auto">
          <h3 className="text-2xl font-semibold mb-6"> Contact Information</h3>

          <div className="space-y-6 justify-center ml:10 md:ml-20">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />{" "}
              </div>
              <div>
                <h4 className="font-medium"> Email</h4>
                <a
                  href="mailto:lucapaolo2005@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  lucapaolo2005@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />{" "}
              </div>
              <div>
                <h4 className="font-medium"> Phone</h4>
                <a
                  href="tel:+393895004751"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +39 3895004751
                </a>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />{" "}
              </div>
              <div>
                <h4 className="font-medium"> Location</h4>
                <a className="text-muted-foreground hover:text-primary transition-colors">
                  Cosenza,Italy
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <h4 className="font-medium mb-4"> Connect With Me</h4>
            <div className="flex space-x-4 justify-center">
              <a
                href="https://www.linkedin.com/in/lucategano"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <Linkedin />
              </a>
              <a
                href="https://github.com/lucaTegano"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <Github />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
