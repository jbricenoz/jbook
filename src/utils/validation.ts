import { z } from 'zod';

export const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export const contactSchema = z.object({
  first_name: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'First name can only contain letters and spaces'),
  last_name: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Last name can only contain letters and spaces'),
  phone_number: z.string()
    .regex(phoneRegex, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits'),
});