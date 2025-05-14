import React from 'react';
import { Twitter, Github, Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
  theme: 'theme1' | 'theme2';
}

const socialLinks = {
  Twitter: 'https://x.com/TalawarVik70120',
  GitHub: 'https://github.com/VT-2004',
  LinkedIn: 'https://www.linkedin.com/in/vikas-talawar-407a61257/',
  Instagram: 'https://www.instagram.com/vikas_2004_07/',
};

const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer className={`py-10 px-6 relative ${
      theme === 'theme1' ? 'bg-theme1-primary/30' : 'bg-theme2-primary/30'
    } backdrop-blur-sm`}>
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <a href="#" className={`text-2xl font-bold ${
            theme === 'theme1' ? 'text-theme1-accent' : 'text-theme2-accent'
          }`}>
            Portfolio
          </a>
          <p className="mt-2 text-white/80">
            Creating interactive digital experiences
          </p>
        </div>
        
        <div className="flex space-x-6 relative z-10">
          {Object.entries(socialLinks).map(([social, url]) => {
            let IconComponent;
            switch (social) {
              case 'Twitter':
                IconComponent = Twitter;
                break;
              case 'GitHub':
                IconComponent = Github;
                break;
              case 'LinkedIn':
                IconComponent = Linkedin;
                break;
              case 'Instagram':
                IconComponent = Instagram;
                break;
              default:
                IconComponent = null;
            }
            return (
              <a
                key={social}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social}
                className={`text-white hover:opacity-80 transition-opacity ${
                  theme === 'theme1' ? 'text-theme1-secondary' : 'text-theme2-secondary'
                }`}
              >
                {IconComponent && <IconComponent size={28} />}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
