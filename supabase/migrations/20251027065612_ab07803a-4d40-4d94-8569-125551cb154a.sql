-- Add new columns for partner application enhancements
ALTER TABLE partner_applications
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS bank_account_type text,
ADD COLUMN IF NOT EXISTS proprietor_pan_number text;