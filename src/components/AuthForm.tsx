import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { authService } from '../services/authService';
import { Button } from './ui/Button';
import { FormField } from './ui/FormField';
import { getAuthErrorMessage } from '../utils/errors';

interface AuthFormProps {
  onSuccess?: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        await authService.signUp(formData.email, formData.password);
        toast.success('Account created! Please sign in to continue');
        setIsSignUp(false);
        setFormData({ email: '', password: '' });
      } else {
        await authService.signIn(formData.email, formData.password);
        toast.success('Welcome back!');
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
          disabled={isLoading}
          autoComplete="email"
          placeholder="Enter your email"
        />
        <FormField
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          required
          disabled={isLoading}
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
          placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
          minLength={6}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
        </Button>
      </form>
      <button
        onClick={() => {
          setIsSignUp(!isSignUp);
          setFormData({ email: '', password: '' });
        }}
        className="mt-4 text-sm text-text-secondary hover:text-primary transition-colors"
      >
        {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
      </button>
    </div>
  );
}