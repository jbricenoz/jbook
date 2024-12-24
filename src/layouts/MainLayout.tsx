import React from 'react';
import { Header } from './Header';
import { Toaster } from 'react-hot-toast';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'dark:bg-secondary dark:text-text-primary',
        }} 
      />
      <Header />
      <main className="max-w-lg mx-auto px-4 py-4">
        {children}
      </main>
    </div>
  );
}