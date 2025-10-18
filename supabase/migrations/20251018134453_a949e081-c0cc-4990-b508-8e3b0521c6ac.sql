-- Add explicit protection against anonymous users reading partner applications

-- Create a policy that prevents any anonymous (non-authenticated) access
CREATE POLICY "Prevent anonymous access to partner applications"
ON public.partner_applications
FOR SELECT
TO anon
USING (false);

-- Ensure the authenticated policy is comprehensive
-- (This was already created in previous migration, but adding comment for clarity)
-- Users can only see their own applications or admins can see all