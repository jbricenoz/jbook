/*
  # Fix contacts table structure

  1. Changes
    - Safely recreate contacts table
    - Preserve data with proper type handling
    - Maintain RLS policies
*/

DO $$ 
BEGIN
  -- Create temporary table with proper types
  CREATE TABLE contacts_temp (
    id uuid,
    user_id uuid,
    first_name text,
    last_name text,
    phone_number text,
    created_at timestamptz,
    updated_at timestamptz
  );

  -- Copy data with explicit type casting
  INSERT INTO contacts_temp 
  SELECT 
    id::uuid,
    user_id::uuid,
    first_name,
    last_name,
    phone_number,
    created_at,
    updated_at
  FROM contacts;

  -- Drop existing table and policies
  DROP TABLE contacts;

  -- Recreate table with proper structure
  CREATE TABLE contacts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone_number text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );

  -- Copy data back with proper types
  INSERT INTO contacts 
  SELECT 
    id,
    user_id,
    first_name,
    last_name,
    phone_number,
    created_at,
    updated_at
  FROM contacts_temp;

  -- Drop temporary table
  DROP TABLE contacts_temp;
END $$;

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