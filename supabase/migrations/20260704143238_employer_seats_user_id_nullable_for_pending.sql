-- Pending seats (invited, not yet accepted) have no user_id until acceptance.
-- Rollback: set NOT NULL again after clearing pending rows.
alter table public.employer_seats alter column user_id drop not null;
