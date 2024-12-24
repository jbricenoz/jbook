import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-card rounded-xl shadow-sm border border-border px-3",
        "dark:shadow-none dark:border-border/50",
        "animate-scale-in",
        className
      )}
    >
      {children}
    </div>
  );
}