import React from 'react';
import { BookOpenCheck } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const containerSizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`relative bg-primary/10 rounded-xl ${containerSizeClasses[size]} group`}>
        <BookOpenCheck 
          className={`${sizeClasses[size]} text-primary transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`} 
        />
        <div className="absolute inset-0 bg-primary/5 rounded-xl transform transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3" />
      </div>
      <span className={`font-bold ${size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl'} text-text-primary`}>
        jBook
      </span>
    </div>
  );
}