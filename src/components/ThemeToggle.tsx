
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'theme1' | 'theme2';
  setTheme: (theme: 'theme1' | 'theme2') => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        variant="outline" 
        size="icon"
        className={`rounded-full ${
          theme === 'theme1' 
            ? 'bg-theme1-primary text-white border-theme1-accent' 
            : 'bg-theme2-primary text-white border-theme2-accent'
        } transition-all duration-300`}
        onClick={() => setTheme(theme === 'theme1' ? 'theme2' : 'theme1')}
      >
        {theme === 'theme1' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default ThemeToggle;
