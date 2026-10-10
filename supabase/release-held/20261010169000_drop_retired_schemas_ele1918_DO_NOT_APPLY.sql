-- ELE-1918 — THE DROP. NOT APPLIED. For Andrew to apply after checking.
--
-- Kept in supabase/release-held/ so a routine `db push` never picks it up. Move it into migrations/ and apply by hand once:
--   1. 20261010161000_retire_duplicate_schemas_ele1918.sql has been live for a while with no errors in Sentry,
--   2. this query still returns zero rows written since that date:
--        select 'ucm', count(*) from unit_coverage_matrix where updated_at > '2026-10-10'
--        union all select 'signoff', count(*) from college_ac_signoff_proposals where updated_at > '2026-10-10'
--        union all select 'conv', count(*) from college_conversations where updated_at > '2026-10-10';
--   3. a backup of the four unit_coverage_matrix rows has been taken if anyone wants them.
--
-- college_messages hangs off college_conversations (conversation_id) and is
-- equally dead (no conversation can be created), so it is dropped with it,
-- together with the edge function notify-college-message (retired in code on
-- 10 Oct 2026; delete it with `npx supabase functions delete notify-college-message`).

begin;

drop function if exists public.propose_ac_signoff(uuid, uuid, text, text, text, uuid, numeric);
drop function if exists public.decide_ac_signoff(uuid, text, text);
drop function if exists public.college_portfolio_summaries();

drop table if exists public.college_ac_signoff_proposals;
drop table if exists public.unit_coverage_matrix;
drop table if exists public.evidence_ksb_mapping;

drop trigger if exists trg_college_messages_after_insert on public.college_messages;
drop table if exists public.college_messages;
drop table if exists public.college_conversations;
drop function if exists public.tg_college_messages_after_insert();
drop function if exists public.update_college_conv_on_message();

-- portfolio_evidence_files was never created; nothing to drop.

commit;
