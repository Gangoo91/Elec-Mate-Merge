-- Removing a manager now revokes the row (remove_co_admin), keeping their past
-- uploads readable to the firm. Drop the direct-delete policies so nothing can
-- skip that.
drop policy if exists "Employer removes own co-admins" on public.employer_admins;
drop policy if exists "Co-admin leaves" on public.employer_admins;
