-- Add new mandatory location fields to kirana_store_loans table
ALTER TABLE kirana_store_loans
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS pincode TEXT;

-- Make PAN, Aadhar, and Udyam optional (ensure they are nullable)
ALTER TABLE kirana_store_loans
ALTER COLUMN pan_number DROP NOT NULL,
ALTER COLUMN aadhar_number DROP NOT NULL,
ALTER COLUMN udyam_number DROP NOT NULL;

-- Add comments for documentation
COMMENT ON COLUMN kirana_store_loans.state IS 'State of the applicant - mandatory field';
COMMENT ON COLUMN kirana_store_loans.city IS 'City of the applicant - mandatory field';
COMMENT ON COLUMN kirana_store_loans.pincode IS 'Pincode of the applicant - mandatory 6-digit field';
COMMENT ON COLUMN kirana_store_loans.pan_number IS 'PAN number - optional field';
COMMENT ON COLUMN kirana_store_loans.aadhar_number IS 'Aadhar number - optional field';
COMMENT ON COLUMN kirana_store_loans.udyam_number IS 'Udyam registration number - optional field';