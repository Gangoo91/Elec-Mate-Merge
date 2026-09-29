-- ELE-1592 — the certificate-number backstop.
--
-- One certificate number per business, enforced by the database. The client
-- recovery branch in reportCloud.createReport already handles the violation
-- (error message contains this index name → allocate a fresh number and
-- insert again), so the copy path self-heals into a renumber instead of a
-- second row. Until now the branch was dead code: there was no index of any
-- kind on reports.certificate_number.
--
-- Why the created_at cutoff: six groups of already-issued certificates share
-- a number within one account (13 rows, checked by hand 28 Sep 2026 — every
-- one is a different client or address with its own PDF, none is a duplicate
-- to delete, and the printed number cannot be rewritten on an issued
-- document). The index therefore governs rows created from today; history is
-- left as it is. Amendment versions get a distinct "-V2" number and NULL
-- numbers (fire alarm log books) never collide, so neither is affected.

create unique index if not exists uniq_reports_user_cert_active
  on public.reports (user_id, certificate_number)
  where deleted_at is null
    and certificate_number is not null
    and created_at >= '2026-09-28 00:00:00+00';
