import React, { useState } from 'react';
import { Contact, ContactFormData } from '../../../types/contacts';
import { Button } from '../../../components/ui/Button';
import { FormField } from '../../../components/ui/FormField';
import { contactSchema } from '../../../utils/validation';
import { toast } from 'react-hot-toast';
import { ZodError } from 'zod';

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  initialData?: Contact;
  isEditing?: boolean;
}

export function ContactForm({ onSubmit, initialData, isEditing }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    phone_number: initialData?.phone_number || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name: keyof ContactFormData, value: string) => {
    try {
      contactSchema.pick({ [name]: true }).parse({ [name]: value });
      setErrors(prev => ({ ...prev, [name]: '' }));
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors[0]?.message || '';
        setErrors(prev => ({ ...prev, [name]: message }));
      }
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof ContactFormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);
      await onSubmit(validatedData);
      setFormData({ first_name: '', last_name: '', phone_number: '' });
      setErrors({});
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error('Please fix the form errors');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <FormField
        label="First Name"
        id="first_name"
        name="first_name"
        type="text"
        value={formData.first_name}
        onChange={handleChange}
        error={errors.first_name}
        disabled={isSubmitting}
        placeholder="Enter first name"
      />
      <FormField
        label="Last Name"
        id="last_name"
        name="last_name"
        type="text"
        value={formData.last_name}
        onChange={handleChange}
        error={errors.last_name}
        disabled={isSubmitting}
        placeholder="Enter last name"
      />
      <FormField
        label="Phone Number"
        id="phone_number"
        name="phone_number"
        type="tel"
        value={formData.phone_number}
        onChange={handleChange}
        error={errors.phone_number}
        disabled={isSubmitting}
        placeholder="Enter phone number"
      />
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : isEditing ? 'Update Contact' : 'Add Contact'}
      </Button>
    </form>
  );
}