-- Fix security issue: Require authentication for partner applications

-- Step 1: Add user_id column as nullable first
ALTER TABLE public.partner_applications 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 2: Drop the insecure policy that allows anyone to submit
DROP POLICY IF EXISTS "Anyone can submit partner applications" ON public.partner_applications;

-- Step 3: Create secure policy: Only authenticated users can insert their own applications
-- For INSERT, user_id must match the authenticated user
CREATE POLICY "Authenticated users can submit their own applications"
ON public.partner_applications
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Step 4: Update SELECT policy - users can view their own applications, admins can view all
DROP POLICY IF EXISTS "Only authenticated admins can view applications" ON public.partner_applications;

CREATE POLICY "Users can view their own applications"
ON public.partner_applications
FOR SELECT
TO authenticated
USING (
  (user_id IS NOT NULL AND auth.uid() = user_id) 
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Step 5: Update the UPDATE policy to allow users to update their own applications
DROP POLICY IF EXISTS "Only admins can update applications" ON public.partner_applications;

CREATE POLICY "Users can update their own applications"
ON public.partner_applications
FOR UPDATE
TO authenticated
USING (
  (user_id IS NOT NULL AND auth.uid() = user_id) 
  OR has_role(auth.uid(), 'admin'::app_role)
)
WITH CHECK (
  (user_id IS NOT NULL AND auth.uid() = user_id) 
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Step 6: Keep DELETE restricted to admins only
-- (existing policy is fine)