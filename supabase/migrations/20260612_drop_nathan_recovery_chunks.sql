-- Housekeeping: _nathan_recovery_chunks was a one-off experiment leftover
-- (RLS-disabled, 0 rows, 0 inbound FKs, 0 code references — verified). On the
-- storage-hardening backlog to remove. No rollback (nothing to preserve).
drop table if exists public._nathan_recovery_chunks;
