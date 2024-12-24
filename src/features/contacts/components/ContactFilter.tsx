import React from 'react';
import { Search } from 'lucide-react';
import { FormField } from '../../../components/ui/FormField';

interface ContactFilterProps {
  filter: string;
  onFilterChange: (value: string) => void;
}

export function ContactFilter({ filter, onFilterChange }: ContactFilterProps) {
  return (
    <div className="relative flex-1">
      <FormField
        type="text"
        placeholder="Search contacts..."
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="pl-9 py-2 text-sm"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
    </div>
  );
}