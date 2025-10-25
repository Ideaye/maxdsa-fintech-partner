-- Add Kirana Stores fields to partner_applications table
ALTER TABLE partner_applications
ADD COLUMN IF NOT EXISTS retail_shop_name TEXT,
ADD COLUMN IF NOT EXISTS retail_shop_address TEXT,
ADD COLUMN IF NOT EXISTS residence_address TEXT,
ADD COLUMN IF NOT EXISTS geo_location TEXT,
ADD COLUMN IF NOT EXISTS nature_of_retail_shop TEXT,
ADD COLUMN IF NOT EXISTS nature_of_shop_ownership TEXT,
ADD COLUMN IF NOT EXISTS nature_of_residence_ownership TEXT,
ADD COLUMN IF NOT EXISTS shop_size TEXT,
ADD COLUMN IF NOT EXISTS daily_turnover_range TEXT,
ADD COLUMN IF NOT EXISTS daily_walkins_range TEXT,
ADD COLUMN IF NOT EXISTS udyam_number TEXT,
ADD COLUMN IF NOT EXISTS retail_shop_photo_url TEXT,
ADD COLUMN IF NOT EXISTS bank_statement_url TEXT,
ADD COLUMN IF NOT EXISTS itr_documents_url TEXT,
ADD COLUMN IF NOT EXISTS co_applicant_name TEXT,
ADD COLUMN IF NOT EXISTS co_applicant_dob DATE,
ADD COLUMN IF NOT EXISTS co_applicant_contact TEXT,
ADD COLUMN IF NOT EXISTS customer_dob DATE,
ADD COLUMN IF NOT EXISTS existing_loans JSONB DEFAULT '[]'::jsonb;

-- Update partner_type check constraint to include kirana_stores
ALTER TABLE partner_applications 
DROP CONSTRAINT IF EXISTS partner_applications_partner_type_check;

ALTER TABLE partner_applications
ADD CONSTRAINT partner_applications_partner_type_check 
CHECK (partner_type IN ('individual', 'proprietorship', 'partnership', 'private_public_ltd', 'trust_society', 'kirana_stores'));