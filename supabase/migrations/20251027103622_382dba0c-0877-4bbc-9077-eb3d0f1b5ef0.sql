-- Add advisor_name column to kirana_store_loans table
ALTER TABLE kirana_store_loans
ADD COLUMN IF NOT EXISTS advisor_name TEXT;