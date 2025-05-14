
import React, { useState } from 'react';
import ItachiBackground from '@/components/ItachiBackground';
import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [theme, setTheme] = useState<'theme1' | 'theme2'>('theme1');

  const handleThemeChange = (newTheme: 'theme1' | 'theme2') => {
    setTheme(newTheme);
  };

  return (
    <div className={`min-h-screen ${theme === 'theme1' ? 'bg-gradient-to-br from-[#1A1F2C] to-[#2C1F47]' : 'bg-gradient-to-br from-[#2D1B1B] to-[#422E10]'} text-white transition-colors duration-500`}>
      <ItachiBackground />
      <ThemeToggle theme={theme} setTheme={handleThemeChange} />
      <Header theme={theme} />
      <Hero theme={theme} />
      <Projects theme={theme} />
      <About theme={theme} />
      <Contact theme={theme} />
      <Footer theme={theme} />
      <Toaster />
    </div>
  );
};

export default Index;
