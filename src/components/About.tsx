import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface AboutProps {
  theme: 'theme1' | 'theme2';
}

const About: React.FC<AboutProps> = ({ theme }) => {
  const [previewOpen, setPreviewOpen] = React.useState(false);

  const skills = [
    "HTML & CSS", "JavaScript", "React", "Three.js", "WebGL",
    "Tailwind CSS", "UI/UX Design", "Node.js", "TypeScript", "Animation"
  ];

  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="container mx-auto">
        <h2 className={`text-4xl font-bold mb-12 text-center ${
          theme === 'theme1' ? 'text-theme1-accent' : 'text-theme2-accent'
        }`}>
          About Me
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`rounded-2xl overflow-hidden ${
            theme === 'theme1' ? 'border-2 border-theme1-accent/30' : 'border-2 border-theme2-accent/30'
          }`}>
            <img 
              src="/image.jpg" 
              alt="Developer" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h3 className={`text-2xl font-bold mb-4 ${
              theme === 'theme1' ? 'text-theme1-secondary' : 'text-theme2-secondary'
            }`}>
              Creative Developer with a Passion for Interactive Experiences
            </h3>
            
            <p className="text-white/80 mb-6">
              I'm a frontend developer specializing in creating immersive digital experiences that combine beautiful design with cutting-edge technology. With expertise in 3D web animation and interactive user interfaces, I build websites that stand out and engage users.
            </p>
            
            <p className="text-white/80 mb-8">
              My journey in web development began over 5 years ago, and I've since worked with various clients from startups to larger enterprises, helping them bring their visions to life with engaging web experiences.
            </p>
            
            <div className="mb-8">
              <h4 className={`text-xl font-medium mb-4 ${
                theme === 'theme1' ? 'text-theme1-secondary' : 'text-theme2-secondary'
              }`}>
                My Skills
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className={`px-4 py-2 rounded-full ${
                      theme === 'theme1' 
                        ? 'bg-theme1-primary/20 text-theme1-secondary' 
                        : 'bg-theme2-primary/20 text-theme2-secondary'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4">
              <a
                href="/resume.pdf"
                download
                className={`inline-block rounded-full px-6 py-3 text-white font-semibold cursor-pointer ${
                  theme === 'theme1' 
                    ? 'bg-theme1-primary hover:bg-theme1-accent' 
                    : 'bg-theme2-primary hover:bg-theme2-accent'
                }`}
              >
                Download Resume
              </a>
              <button
                onClick={() => setPreviewOpen(true)}
                className={`rounded-full px-6 py-3 font-semibold ${
                  theme === 'theme1' 
                    ? 'bg-theme1-accent hover:bg-theme1-accent/90 text-white' 
                    : 'bg-theme2-accent hover:bg-theme2-accent/90 text-white'
                }`}
              >
                View Resume
              </button>
            </div>
          </div>
        </div>

        {previewOpen && (
          <div className="fixed top-0 right-0 h-full w-[360px] bg-gray-900 bg-opacity-95 shadow-lg rounded-l-3xl p-4 z-50 flex flex-col">
            <button
              onClick={() => setPreviewOpen(false)}
              className="self-end mb-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
              aria-label="Close Preview"
            >
              ✕
            </button>
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gray-200 shadow-lg">
              <iframe
                src="https://resume-xi-henna.vercel.app/"
                className="absolute top-0 left-0 w-full h-full border-0 rounded-3xl"
                title="Resume Preview"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
