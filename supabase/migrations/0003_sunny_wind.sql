/*
  # Fix contacts table and policies

  1. Changes
    - Drop and recreate contacts table with proper constraints
    - Add proper indexes for performance
    - Update RLS policies
  
  2. Security
    - Enable RLS
    - Add policies for CRUD operations
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS contacts;

-- Create contacts table with proper constraints
CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  first_name text NOT NULL CHECK (char_length(first_name) >= 2 AND char_length(first_name) <= 50),
  last_name text NOT NULL CHECK (char_length(last_name) >= 2 AND char_length(last_name) <= 50),
  phone_number text NOT NULL CHECK (char_length(phone_number) >= 10 AND char_length(phone_number) <= 15),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX contacts_user_id_idx ON contacts(user_id);
CREATE INDEX contacts_created_at_idx ON contacts(created_at DESC);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create their own contacts"
ON contacts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own contacts"
ON contacts FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts"
ON contacts FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts"
ON contacts FOR DELETE
TO authenticated
USING (auth.uid() = user_id);