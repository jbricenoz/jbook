import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { useAuth } from '../hooks/useAuth';
import { Logo } from '../components/Logo';

export function Header() {
  const { signOut } = useAuth();

  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
      <div className="max-w-lg mx-auto px-4 py-3 flex justify-between items-center">
        <Logo size="sm" />
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="secondary"
            size="sm"
            onClick={signOut}
            className="flex items-center gap-1"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}