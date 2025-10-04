-- Make the SELECT policy more explicit and defensive
-- Drop the existing policy and recreate with clearer naming
DROP POLICY IF EXISTS "Admins can view all applications" ON partner_applications;

-- Create an explicit SELECT policy that clearly restricts access to admins only
-- This policy explicitly denies access to anyone who is not an admin
CREATE POLICY "Only authenticated admins can view applications"
ON partner_applications
FOR SELECT
USING (
  auth.uid() IS NOT NULL 
  AND has_role(auth.uid(), 'admin'::app_role)
);