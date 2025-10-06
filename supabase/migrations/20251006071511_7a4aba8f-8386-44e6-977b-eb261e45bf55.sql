-- Add new fields and remove old ones from partner_applications table
ALTER TABLE public.partner_applications
  DROP COLUMN pan_number,
  DROP COLUMN business_type,
  ADD COLUMN pan_card_url text NOT NULL DEFAULT '',
  ADD COLUMN aadhar_card_url text NOT NULL DEFAULT '',
  ADD COLUMN correspondence_address text NOT NULL DEFAULT '',
  ADD COLUMN city text NOT NULL DEFAULT '',
  ADD COLUMN state text NOT NULL DEFAULT '',
  ADD COLUMN pincode text NOT NULL DEFAULT '',
  ADD COLUMN additional_documents jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN reference_2_name text NOT NULL DEFAULT '',
  ADD COLUMN reference_2_phone text NOT NULL DEFAULT '',
  DROP COLUMN reference_email;