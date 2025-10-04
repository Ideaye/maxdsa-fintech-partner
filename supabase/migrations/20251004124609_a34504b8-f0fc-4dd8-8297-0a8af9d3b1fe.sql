-- Create a public bucket for website assets if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-assets', 'website-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Public read access to website assets" ON storage.objects;

-- Set up storage policies for public read access to website assets
CREATE POLICY "Public read access to website assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'website-assets');