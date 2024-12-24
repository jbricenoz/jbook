import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { authService } from '../services/authService';
import { toast } from 'react-hot-toast';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authService.signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  }, []);

  return { user, loading, signOut };
}