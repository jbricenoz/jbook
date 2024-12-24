/*
  # Create contacts table for phone book

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `phone_number` (text)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `contacts` table
    - Add policies for CRUD operations
*/

CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone_number text NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting contacts
CREATE POLICY "Users can create their own contacts"
  ON contacts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy for selecting contacts
CREATE POLICY "Users can view their own contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for updating contacts
CREATE POLICY "Users can update their own contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policy for deleting contacts
CREATE POLICY "Users can delete their own contacts"
  ON contacts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);