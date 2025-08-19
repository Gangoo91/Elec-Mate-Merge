-- Fix the function security issue by setting search_path
CREATE OR REPLACE FUNCTION generate_content_hash(title text, source_url text, content text)
RETURNS text 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN encode(digest(title || COALESCE(source_url, '') || COALESCE(content, ''), 'sha256'), 'hex');
END;
$$;