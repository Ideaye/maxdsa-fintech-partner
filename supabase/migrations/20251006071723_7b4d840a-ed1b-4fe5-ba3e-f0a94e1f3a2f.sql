-- Keep aadhar_number column as it's still needed
-- This migration adds the missing aadhar_number back if it was dropped
-- Note: If aadhar_number already exists, this will fail gracefully

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'partner_applications' 
    AND column_name = 'aadhar_number'
  ) THEN
    ALTER TABLE public.partner_applications
      ADD COLUMN aadhar_number text NOT NULL DEFAULT '';
  END IF;
END $$;