import React, { memo } from 'react';
import { ContactCard } from './ContactCard';
import { Contact } from '../../../types/contacts';
import { Loader2, UserPlus } from 'lucide-react';
import { Button } from '../../../components/ui/Button';

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  onAddNew: () => void;
}

export const ContactList = memo(function ContactList({ 
  contacts, 
  onEdit, 
  onDelete,
  isLoading,
  onAddNew
}: ContactListProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i} 
            className="bg-card rounded-xl p-2 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-primary/5 p-1.5 rounded-full w-7 h-7" />
                <div>
                  <div className="h-4 w-24 bg-primary/5 rounded" />
                  <div className="h-3 w-20 bg-primary/5 rounded mt-1" />
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-7 h-7 bg-primary/5 rounded" />
                <div className="w-7 h-7 bg-primary/5 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">No contacts yet</h3>
        <p className="text-text-secondary mb-4">Start building your contact list</p>
        <Button onClick={onAddNew} className="inline-flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Add Your First Contact
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
});