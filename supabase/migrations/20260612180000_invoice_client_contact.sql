-- E4: client_email + client_phone on employer_invoices (sends previously
-- passed the client NAME as the email address — structurally impossible)
alter table public.employer_invoices
  add column if not exists client_email text,
  add column if not exists client_phone text;

-- (quote_status_vocabulary_fix): decide_employer_quote now writes
-- 'Client Accepted'/'Client Declined' — the app-wide vocabulary — so the
-- convert-to-invoice CTA actually appears after a client accepts.
