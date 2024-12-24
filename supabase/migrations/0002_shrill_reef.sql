/*
  # Fix contacts table RLS policies

  1. Changes
    - Drop existing policies
    - Create new policies with proper user_id checks
    - Ensure RLS is enabled
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can create their own contacts" ON contacts;
DROP POLICY IF EXISTS "Users can view their own contacts" ON contacts;
DROP POLICY IF EXISTS "Users can update their own contacts" ON contacts;
DROP POLICY IF EXISTS "Users can delete their own contacts" ON contacts;

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create new policies
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