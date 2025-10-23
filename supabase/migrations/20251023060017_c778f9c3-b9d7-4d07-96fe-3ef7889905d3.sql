-- Add partner_type column and new fields to partner_applications table
ALTER TABLE partner_applications 
ADD COLUMN partner_type TEXT NOT NULL DEFAULT 'individual',
ADD COLUMN proprietor_name TEXT,
ADD COLUMN firm_name TEXT,
ADD COLUMN firm_gst_number TEXT,
ADD COLUMN firm_pan_number TEXT,
ADD COLUMN firm_office_address TEXT,
ADD COLUMN partner_details JSONB DEFAULT '[]'::jsonb,
ADD COLUMN company_name TEXT,
ADD COLUMN company_gst_number TEXT,
ADD COLUMN company_office_address TEXT,
ADD COLUMN director_details JSONB DEFAULT '[]'::jsonb,
ADD COLUMN trust_name TEXT,
ADD COLUMN trust_gst_number TEXT,
ADD COLUMN trust_pan_number TEXT,
ADD COLUMN trust_office_address TEXT,
ADD COLUMN trustee_details JSONB DEFAULT '[]'::jsonb;

-- Add check constraint for partner_type
ALTER TABLE partner_applications
ADD CONSTRAINT partner_type_check 
CHECK (partner_type IN ('individual', 'proprietorship', 'partnership', 'private_public_ltd', 'trust_society'));

-- Make certain existing fields nullable since they're not required for all partner types
ALTER TABLE partner_applications
ALTER COLUMN business_name DROP NOT NULL,
ALTER COLUMN aadhar_number DROP NOT NULL,
ALTER COLUMN passport_photo_url DROP NOT NULL,
ALTER COLUMN company_pan_number DROP NOT NULL,
ALTER COLUMN company_document_type DROP NOT NULL,
ALTER COLUMN company_document_url DROP NOT NULL,
ALTER COLUMN gst_registration_url DROP NOT NULL;