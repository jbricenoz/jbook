import React from 'react';
import { Pencil, Trash2, User } from 'lucide-react';
import { Contact } from '../../../types/contacts';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow animate-slide-in py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-primary/10 p-1.5 rounded-full">
            <User className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-primary">
              {contact.first_name} {contact.last_name}
            </h3>
            <p className="text-xs text-text-secondary">{contact.phone_number}</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(contact)}
            className="p-1 hover:bg-primary/10"
            aria-label="Edit contact"
          >
            <Pencil className="w-3.5 h-3.5 text-text-primary" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onDelete(contact.id)}
            className="p-1 hover:bg-danger/10"
            aria-label="Delete contact"
          >
            <Trash2 className="w-3.5 h-3.5 text-danger hover:text-danger-dark" />
          </Button>
        </div>
      </div>
    </Card>
  );
}