import { supabase } from '../lib/supabase';

export const authService = {
  async signUp(email: string, password: string) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    
    if (error) throw error;
  },

  async signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};