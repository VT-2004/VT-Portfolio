
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  theme: 'theme1' | 'theme2';
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
  const [activeSection, setActiveSection] = useState('home');

  // Function to handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100; // offset for better UX

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full ${theme === 'theme1' ? 'bg-opacity-20 bg-theme1-primary' : 'bg-opacity-20 bg-theme2-primary'} backdrop-blur-sm fixed top-0 left-0 z-40 transition-colors duration-300`}>
      <div className="container flex justify-between items-center p-4">
        <a href="#" className={`text-2xl font-bold ${theme === 'theme1' ? 'text-theme1-accent' : 'text-theme2-accent'}`}>
          Portfolio
        </a>
        <nav>
          <ul className="flex space-x-6">
            {['Home', 'Projects', 'About', 'Contact'].map((item) => {
              const sectionId = item.toLowerCase();
              const isActive = activeSection === sectionId;
              
              return (
                <li key={item}>
                  <a 
                    href={`#${sectionId}`} 
                    className={`font-medium hover:opacity-80 transition-all ${
                      theme === 'theme1' ? 'text-white' : 'text-white'
                    } ${isActive ? 
                      `border-b-2 ${theme === 'theme1' ? 'border-theme1-accent' : 'border-theme2-accent'}` : 
                      ''
                    }`}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
