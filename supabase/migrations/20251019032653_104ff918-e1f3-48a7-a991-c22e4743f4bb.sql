-- Drop the restrictive INSERT policy for authenticated users only
DROP POLICY IF EXISTS "Authenticated users can submit their own applications" ON public.partner_applications;

-- Drop the policy that prevents anonymous access to SELECT
DROP POLICY IF EXISTS "Prevent anonymous access to partner applications" ON public.partner_applications;

-- Create a new policy to allow anyone (including anonymous users) to submit applications
CREATE POLICY "Anyone can submit partner applications"
ON public.partner_applications
FOR INSERT
TO public
WITH CHECK (true);

-- Keep the existing policies for viewing and updating (authenticated users only)
-- Users can only view their own applications or admins can view all
-- This policy already exists: "Users can view their own applications"

-- Update policy already exists: "Users can update their own applications"
-- Delete policy already exists: "Only admins can delete applications"