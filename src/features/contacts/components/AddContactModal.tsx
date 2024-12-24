import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { ContactForm } from './ContactForm';
import { Contact, ContactFormData } from '../../../types/contacts';

interface AddContactModalProps {
  show: boolean;
  onClose: () => void;
  editingContact: Contact | null;
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export function AddContactModal({ show, onClose, editingContact, onSubmit }: AddContactModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-xl shadow-lg animate-scale-in">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-base font-medium text-text-primary">
            {editingContact ? 'Edit Contact' : 'Add New Contact'}
          </h2>
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            className="p-1.5"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4">
          <ContactForm
            onSubmit={async (data) => {
              await onSubmit(data);
              onClose();
            }}
            initialData={editingContact || undefined}
            isEditing={!!editingContact}
          />
        </div>
      </div>
    </div>
  );
}