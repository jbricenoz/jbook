export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ContactFormData {
  first_name: string;
  last_name: string;
  phone_number: string;
}