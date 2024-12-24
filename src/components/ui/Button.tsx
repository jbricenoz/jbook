import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-xl font-medium transition-all active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'bg-primary text-white hover:bg-primary-light focus:ring-primary/50': variant === 'primary',
          'bg-secondary text-text-primary hover:bg-gray-100 focus:ring-gray-200': variant === 'secondary',
          'bg-danger text-white hover:bg-danger-light focus:ring-danger/50': variant === 'danger',
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}