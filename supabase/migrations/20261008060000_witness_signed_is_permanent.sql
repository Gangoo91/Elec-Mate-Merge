-- ELE-1869: a signed witness statement is permanent, and the witness's
-- "I confirm I observed this" is recorded on the server, inside the hash.
--
-- 1. The learner's policy "Learner manages own witness requests" is FOR ALL,
--    and _witness_owner_guard runs on INSERT and UPDATE only, so a learner
--    could DELETE a statement their supervisor had signed. Deleting is now
--    allowed only for a request nobody has signed.
-- 2. sign_witness_statement takes p_confirmed. False is refused; true is
--    stored in witness_confirmed and folded into statement_hash. It defaults
--    to null so a page still calling with six arguments keeps working until
--    the new page is live.

create or replace function public._witness_no_delete_signed()
returns trigger
language plpgsql
set search_path to 'public'
as $$
begin
  if current_user not in ('authenticated', 'anon') then return old; end if;
  if old.status = 'signed' then
    raise exception 'a signed witness statement is part of the record and cannot be deleted'
      using errcode = '42501';
  end if;
  return old;
end; $$;

drop trigger if exists trg_witness_no_delete_signed on public.portfolio_witness_statements;
create trigger trg_witness_no_delete_signed
  before delete on public.portfolio_witness_statements
  for each row execute function public._witness_no_delete_signed();

alter table public.portfolio_witness_statements
  add column if not exists witness_confirmed boolean;

drop function if exists public.sign_witness_statement(text, text, text, text, text, text);

create or replace function public.sign_witness_statement(
  p_token text,
  p_name text,
  p_role text,
  p_company text,
  p_statement text,
  p_signature text,
  p_confirmed boolean default null
)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare w public.portfolio_witness_statements%rowtype; v_hash text; v_ip text;
begin
  if coalesce(trim(p_name), '') = '' or coalesce(trim(p_statement), '') = '' or coalesce(p_signature, '') = '' then
    return jsonb_build_object('error', 'name_statement_and_signature_required');
  end if;
  if p_confirmed is false then
    return jsonb_build_object('error', 'confirmation_required');
  end if;
  select * into w from public.portfolio_witness_statements where token = p_token for update;
  if w.id is null then return jsonb_build_object('error', 'not_found'); end if;
  if w.status <> 'requested' then return jsonb_build_object('error', 'already_' || w.status); end if;
  if w.expires_at < now() then return jsonb_build_object('error', 'expired'); end if;
  if length(p_signature) > 400000 then return jsonb_build_object('error', 'signature_too_large'); end if;
  begin
    v_ip := left(current_setting('request.headers', true)::jsonb->>'x-forwarded-for', 60);
  exception when others then v_ip := null; end;
  v_hash := encode(extensions.digest(concat_ws('|', w.id, trim(p_name), coalesce(p_role, ''), coalesce(p_company, ''),
                                    trim(p_statement), coalesce(w.evidence_hash, ''), now(),
                                    case when p_confirmed then 'confirmed_observed' end), 'sha256'), 'hex');
  update public.portfolio_witness_statements
     set witness_name = left(trim(p_name), 120), witness_role = left(p_role, 120),
         witness_company = left(p_company, 160), statement = left(trim(p_statement), 6000),
         signature_data = p_signature, status = 'signed', signed_at = now(), statement_hash = v_hash,
         signer_ip = v_ip, witness_confirmed = p_confirmed
   where id = w.id;
  return jsonb_build_object('success', true, 'statement_hash', v_hash);
end; $$;

revoke all on function public.sign_witness_statement(text, text, text, text, text, text, boolean) from public;
grant execute on function public.sign_witness_statement(text, text, text, text, text, text, boolean) to anon, authenticated, service_role;
