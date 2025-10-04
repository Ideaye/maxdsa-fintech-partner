-- Create storage bucket for partner documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('partner-documents', 'partner-documents', false);

-- Create storage policies for partner documents
CREATE POLICY "Anyone can upload partner documents"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'partner-documents');

CREATE POLICY "Users can view their own documents"
ON storage.objects
FOR SELECT
USING (bucket_id = 'partner-documents');

CREATE POLICY "Admins can view all partner documents"
ON storage.objects
FOR SELECT
USING (bucket_id = 'partner-documents' AND has_role(auth.uid(), 'admin'::app_role));

-- Update partner_applications table structure
ALTER TABLE public.partner_applications
  DROP COLUMN IF EXISTS years_in_business,
  DROP COLUMN IF EXISTS monthly_lead_capacity,
  DROP COLUMN IF EXISTS regions_of_operation,
  DROP COLUMN IF EXISTS partnership_type,
  DROP COLUMN IF EXISTS additional_information;

ALTER TABLE public.partner_applications
  ADD COLUMN pan_number TEXT NOT NULL DEFAULT '',
  ADD COLUMN aadhar_number TEXT NOT NULL DEFAULT '',
  ADD COLUMN passport_photo_url TEXT NOT NULL DEFAULT '',
  ADD COLUMN company_pan_number TEXT NOT NULL DEFAULT '',
  ADD COLUMN company_document_type TEXT NOT NULL DEFAULT '',
  ADD COLUMN company_document_url TEXT NOT NULL DEFAULT '',
  ADD COLUMN gst_registration_url TEXT NOT NULL DEFAULT '',
  ADD COLUMN bank_document_type TEXT NOT NULL DEFAULT '',
  ADD COLUMN bank_document_url TEXT NOT NULL DEFAULT '',
  ADD COLUMN bank_account_number TEXT NOT NULL DEFAULT '',
  ADD COLUMN bank_ifsc_code TEXT NOT NULL DEFAULT '',
  ADD COLUMN bank_name TEXT NOT NULL DEFAULT '',
  ADD COLUMN bank_branch TEXT,
  ADD COLUMN reference_name TEXT,
  ADD COLUMN reference_phone TEXT,
  ADD COLUMN reference_email TEXT;

-- Remove defaults after adding columns (for future inserts)
ALTER TABLE public.partner_applications
  ALTER COLUMN pan_number DROP DEFAULT,
  ALTER COLUMN aadhar_number DROP DEFAULT,
  ALTER COLUMN passport_photo_url DROP DEFAULT,
  ALTER COLUMN company_pan_number DROP DEFAULT,
  ALTER COLUMN company_document_type DROP DEFAULT,
  ALTER COLUMN company_document_url DROP DEFAULT,
  ALTER COLUMN gst_registration_url DROP DEFAULT,
  ALTER COLUMN bank_document_type DROP DEFAULT,
  ALTER COLUMN bank_document_url DROP DEFAULT,
  ALTER COLUMN bank_account_number DROP DEFAULT,
  ALTER COLUMN bank_ifsc_code DROP DEFAULT,
  ALTER COLUMN bank_name DROP DEFAULT;