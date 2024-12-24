import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Button } from './ui/Button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={toggleTheme}
      className="flex items-center gap-1"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      data-testid="theme-toggle"
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </Button>
  );
}