-- Allow public users to update quotes for acceptance (via valid token)
-- This enables the PublicQuoteView component to accept/reject quotes
-- The signature capture portal needs to update quotes when clients accept

CREATE POLICY "Public can accept quotes via valid token"
ON public.quotes
FOR UPDATE
USING (
  -- Must have a valid, active, non-expired token
  public_token IS NOT NULL
  AND public.can_access_quote_via_token(id, public_token)
)
WITH CHECK (
  -- Must still have valid token for the update
  public_token IS NOT NULL
  AND public.can_access_quote_via_token(id, public_token)
);
