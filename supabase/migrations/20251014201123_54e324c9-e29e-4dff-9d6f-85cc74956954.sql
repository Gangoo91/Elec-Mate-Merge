-- Create public storage bucket for invoice PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('invoice-pdfs', 'invoice-pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- RLS: Users can upload PDFs for their own invoices
CREATE POLICY "Users can upload invoice PDFs"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'invoice-pdfs' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- RLS: Public read access (anyone with URL can download)
CREATE POLICY "Public read access to invoice PDFs"
ON storage.objects
FOR SELECT
USING (bucket_id = 'invoice-pdfs');

-- RLS: Users can update/replace their own PDFs
CREATE POLICY "Users can update own invoice PDFs"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'invoice-pdfs'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- RLS: Users can delete their own PDFs
CREATE POLICY "Users can delete own invoice PDFs"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'invoice-pdfs'
  AND auth.uid()::text = (storage.foldername(name))[1]
);