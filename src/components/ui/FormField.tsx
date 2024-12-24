import React from 'react';
import { cn } from '../../utils/cn';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormField({ 
  label, 
  error, 
  className, 
  id,
  ...props 
}: FormFieldProps) {
  return (
    <div className="w-full">
      <label 
        htmlFor={id} 
        className="block text-sm font-medium text-text-primary mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "w-full rounded-lg border bg-card text-text-primary",
          "px-3 py-2 transition-colors text-sm",
          "focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none",
          "placeholder:text-text-secondary/60",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "dark:bg-secondary dark:text-text-primary dark:border-border/50",
          "dark:focus:border-primary dark:focus:ring-primary",
          error && "border-danger focus:border-danger focus:ring-danger",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}