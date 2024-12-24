import React from 'react';
import { MainLayout } from './layouts/MainLayout';
import { ContactsView } from './features/contacts/ContactsView';
import { AuthForm } from './components/AuthForm';
import { useAuth } from './hooks/useAuth';
import { ThemeToggle } from './components/ThemeToggle';
import { Logo } from './components/Logo';
import './styles/animations.css';
import './styles/theme.css';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-text-secondary">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <ThemeToggle />
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="flex justify-center mb-8 animate-fade-in">
            <Logo size="lg" />
          </div>
          <AuthForm onSuccess={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
      <ContactsView />
    </MainLayout>
  );
}