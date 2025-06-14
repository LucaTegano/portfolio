import ProfilePicture from '../assets/profile-picture.jpeg'

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center mb-12 md:mb-16">
          <div className="hidden sm:block space-y-2.5 mr-6">
            <div className="h-[3px] w-16 bg-primary"></div>
            <div className="h-[3px] w-24 bg-primary"></div>
            <div className="h-[3px] w-12 bg-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-about-text">
            About Me
          </h2>
        </div>

        {/* Main content card with gradient border effect */}
        <div className="relative p-[2px] bg-gradient-to-br from-primary via-[#D57FFF] to-primary rounded-2xl shadow-2xl shadow-primary/20">
          <div className="bg-about p-6 sm:p-8 md:p-12 rounded-[14px]">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Left: Image */}
              <div className="flex-shrink-0">
                {/* TODO: Replace src with your actual image path */}
                <img
                  src={ProfilePicture} // Placeholder - replace with your image e.g., /src/assets/images/luca.jpg
                  alt="Luca - Software Engineer"
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-primary/60 shadow-xl"
                />
              </div>

              {/* Right: Text Content */}
              <div className="text-left space-y-5 flex-1">
                <p className="text-base sm:text-lg  leading-relaxed">
                  Hello! I'm Luca, a passionate software engineer with a knack
                  for crafting elegant and efficient solutions. My journey in
                  tech started with a fascination for how websites came to life,
                  and it has grown into a full-blown passion for building
                  dynamic, user-centric applications.
                </p>
                <p className="text-base sm:text-lg  leading-relaxed">
                  I thrive in collaborative environments and enjoy tackling
                  complex challenges. When I'm not coding, you can find me
                  exploring new technologies, contributing to open-source
                  projects, or stargazing (hence the cosmic theme!).
                </p>
                <p className="text-base sm:text-lg leading-relaxed">
                  Let's build something amazing together!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                Get In Touch
              </a>

              <a
                href="/CVLUCA1.pdf" // Path to your CV file
                download="Luca_Tegano_CV.pdf" // Specify the download filename (optional)
                className="px-6 py-2 rounded-full border border-primary  hover:bg-primary/10 transition-colors duration-300"
              >
                Download CV
              </a>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};