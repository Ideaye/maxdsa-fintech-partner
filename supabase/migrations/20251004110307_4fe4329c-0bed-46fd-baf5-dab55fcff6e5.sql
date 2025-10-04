-- Add RLS policies for partner-documents storage bucket to restrict access to admins only
-- This ensures that identity documents can only be accessed by authorized personnel

-- Policy to allow admins to view/download documents
CREATE POLICY "Only admins can view partner documents"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'partner-documents' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Policy to allow authenticated users to upload their own documents during application
-- Documents are uploaded to a path structure that includes timestamp for organization
CREATE POLICY "Authenticated users can upload partner documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'partner-documents'
  AND auth.uid() IS NOT NULL
);

-- Policy to allow admins to delete documents if needed
CREATE POLICY "Only admins can delete partner documents"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'partner-documents'
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Policy to prevent updates to documents (immutability for audit trail)
CREATE POLICY "No one can update partner documents"
ON storage.objects
FOR UPDATE
USING (false);