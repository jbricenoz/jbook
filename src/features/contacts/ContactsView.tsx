import React, { useState } from 'react';
import { ContactList } from './components/ContactList';
import { ContactFilter } from './components/ContactFilter';
import { AddContactModal } from './components/AddContactModal';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { useContacts } from './hooks/useContacts';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function ContactsView() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState('');
  const {
    contacts,
    isLoading,
    editingContact,
    deletingContactId,
    setEditingContact,
    setDeletingContactId,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = useContacts();

  const filteredContacts = contacts.filter(contact => 
    `${contact.first_name} ${contact.last_name} ${contact.phone_number}`
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingContact(null);
    setShowAddForm(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <ContactFilter filter={filter} onFilterChange={setFilter} />
        {contacts.length > 0 && (
          <Button
            onClick={handleAddNew}
            size="sm"
            className="flex items-center gap-1 ml-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Contact</span>
          </Button>
        )}
      </div>
      
      <ContactList
        contacts={filteredContacts}
        onEdit={(contact) => {
          setEditingContact(contact);
          setShowAddForm(true);
        }}
        onDelete={(id) => setDeletingContactId(id)}
        isLoading={isLoading}
        onAddNew={handleAddNew}
      />

      <AddContactModal
        show={showAddForm}
        onClose={() => {
          setShowAddForm(false);
          setEditingContact(null);
        }}
        editingContact={editingContact}
        onSubmit={editingContact ? handleUpdate : handleCreate}
      />

      <ConfirmationModal
        show={!!deletingContactId}
        title="Delete Contact"
        message="Are you sure you want to delete this contact? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => deletingContactId && handleDelete(deletingContactId)}
        onCancel={() => setDeletingContactId(null)}
        variant="danger"
      />
    </>
  );
}