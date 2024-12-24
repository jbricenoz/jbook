import { supabase } from '../lib/supabase';
import { Contact, ContactFormData } from '../types/contacts';
import { sampleContacts } from '../data/sampleContacts';

export const contactService = {
  async fetchContacts(): Promise<Contact[]> {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', session.session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
    
    return data || [];
  },

  async createContact(contact: ContactFormData): Promise<void> {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('contacts')
      .insert([{
        ...contact,
        user_id: session.session.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  async updateContact(id: string, contact: ContactFormData): Promise<void> {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('contacts')
      .update({
        ...contact,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', session.session.user.id);

    if (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },

  async deleteContact(id: string): Promise<void> {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)
      .eq('user_id', session.session.user.id);

    if (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
};