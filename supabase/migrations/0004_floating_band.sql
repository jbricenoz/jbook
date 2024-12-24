/*
  # Rollback contacts table changes

  1. Changes
    - Restore original contacts table structure
    - Preserve existing data
    - Re-enable RLS policies
*/

-- Create temporary table to store existing data
CREATE TABLE contacts_temp AS SELECT * FROM contacts;

-- Drop existing table and policies
DROP TABLE contacts;

-- Recreate original table structure
CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone_number text NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Copy data back
INSERT INTO contacts 
SELECT * FROM contacts_temp;

-- Drop temporary table
DROP TABLE contacts_temp;

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