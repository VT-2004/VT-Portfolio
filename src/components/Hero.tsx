import React from 'react';
import { Button } from "@/components/ui/button";

interface HeroProps {
  theme: 'theme1' | 'theme2';
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className={`max-w-3xl text-center z-10 transition-all duration-500`}>
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 animate-float-slow ${
          theme === 'theme1' ? 'text-theme1-primary' : 'text-theme2-primary'
        }`}>
          Hello, I'm <span className="block mt-2">vikas, Creative Developer</span>
        </h1>
        
        <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto ${
          theme === 'theme1' ? 'text-white' : 'text-white'
        }`}>
          I create beautiful digital experiences with a focus on interactivity and animation. Click on the bubbles to see them burst!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            className={`rounded-full text-white ${
              theme === 'theme1' 
                ? 'bg-theme1-primary hover:bg-theme1-accent' 
                : 'bg-theme2-primary hover:bg-theme2-accent'
            }`}
            onClick={() => scrollToSection('projects')}
          >
            View My Work
          </Button>
          <Button 
            size="lg"
            className={`rounded-full text-white ${
              theme === 'theme1' 
                ? 'bg-theme1-primary hover:bg-theme1-accent' 
                : 'bg-theme2-primary hover:bg-theme2-accent'
            }`}
            onClick={() => scrollToSection('contact')}
          >
            Contact Me
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
