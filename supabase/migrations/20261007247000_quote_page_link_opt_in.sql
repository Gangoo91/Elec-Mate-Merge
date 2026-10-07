-- ELE-1989 follow-up: the quote-page link on invoice and quote emails goes to
-- REAL customers of every firm with a live page, so it is the firm's choice:
-- off until the owner switches it on in Quote page settings.
alter table public.company_profiles alter column lead_page_on_documents set default false;
update public.company_profiles set lead_page_on_documents = false where lead_page_on_documents is distinct from false;
