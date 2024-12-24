import { useState, useEffect, useCallback } from 'react';
import { Contact, ContactFormData } from '../../../types/contacts';
import { contactService } from '../../../services/contactService';
import { toast } from 'react-hot-toast';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingContactId, setDeletingContactId] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    try {
      const data = await contactService.fetchContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      // Don't show error toast for initial load with no contacts
      if (contacts.length > 0) {
        toast.error('Failed to fetch contacts');
      }
    } finally {
      setIsLoading(false);
    }
  }, [contacts.length]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleCreate = async (formData: ContactFormData) => {
    try {
      await contactService.createContact(formData);
      await fetchContacts();
      toast.success('Contact added successfully');
    } catch (error) {
      console.error('Error creating contact:', error);
      toast.error('Failed to create contact');
      throw error;
    }
  };

  const handleUpdate = async (formData: ContactFormData) => {
    if (!editingContact?.id) return;

    try {
      await contactService.updateContact(editingContact.id, formData);
      await fetchContacts();
      setEditingContact(null);
      toast.success('Contact updated successfully');
    } catch (error) {
      console.error('Error updating contact:', error);
      toast.error('Failed to update contact');
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await contactService.deleteContact(id);
      await fetchContacts();
      toast.success('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact');
    } finally {
      setDeletingContactId(null);
    }
  };

  return {
    contacts,
    isLoading,
    editingContact,
    deletingContactId,
    setEditingContact,
    setDeletingContactId,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}