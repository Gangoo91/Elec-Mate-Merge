-- Expert witness competence and no-conflict confirmation (10 Oct 2026).
--
-- C&G 5357 handbook: an expert witness must be occupationally competent in the
-- area they speak to and have no conflict of interest. Until now a witness gave
-- only name, role and company. The witness now confirms, in their own words:
--   * witness_competence   what makes them competent (qualification, card, role)
--   * witness_card_number  an optional card number (ECS / JIB etc.)
--   * witness_years_in_trade  years in the trade (optional)
--   * witness_no_conflict  their confirmation that they are not a relative or
--                          partner of the apprentice and do not stand to gain
--                          from the result
-- All nullable. Statements signed before this show "Competence not confirmed"
-- to staff. Additive only: new columns, the insert guard nulls them, and
-- sign_witness_statement takes four new optional parameters. The fingerprint
-- formula is unchanged for a signature without them (concat_ws skips nulls).
begin;
set local lock_timeout = '5s';

alter table public.portfolio_witness_statements
  add column if not exists witness_competence text,
  add column if not exists witness_card_number text,
  add column if not exists witness_years_in_trade smallint,
  add column if not exists witness_no_conflict boolean;

comment on column public.portfolio_witness_statements.witness_competence is
  'The witness''s own account of their occupational competence (qualification, card type, role). Written only by sign_witness_statement.';
comment on column public.portfolio_witness_statements.witness_card_number is
  'Optional card number (ECS / JIB or similar) the witness gave. Written only by sign_witness_statement.';
comment on column public.portfolio_witness_statements.witness_years_in_trade is
  'Years in the trade, as the witness gave it (0-70). Written only by sign_witness_statement.';
comment on column public.portfolio_witness_statements.witness_no_conflict is
  'The witness confirmed they are not a relative or partner of the apprentice and do not stand to gain from the result. Null = signed before this was asked.';

-- Copied from the LIVE definition (10 Oct) and extended: the new columns are
-- nulled on insert like the other witness-only fields.
create or replace function public._witness_owner_guard()
 returns trigger
 language plpgsql
 set search_path to 'public'
as $function$
declare
  v_claimed text[];
  v_pick text[];
begin
  if current_user not in ('authenticated', 'anon') then return new; end if;
  if tg_op = 'INSERT' then
    new.status := 'requested';
    new.witness_name := null; new.witness_role := null; new.witness_company := null;
    new.statement := null; new.signature_data := null; new.signed_at := null;
    new.statement_hash := null; new.signer_ip := null;
    new.emailed_at := null; new.email_count := 0;
    new.witness_confirmed := null;
    new.witness_competence := null; new.witness_card_number := null;
    new.witness_years_in_trade := null; new.witness_no_conflict := null;
    new.witness_phone := nullif(left(regexp_replace(coalesce(new.witness_phone, ''), '[^0-9+ ]', '', 'g'), 20), '');
    if new.portfolio_item_id is not null then
      select coalesce(array_agg(c.unit_code || ' AC ' || c.ac_code order by c.unit_code, c.ac_code), '{}')
        into v_claimed
        from public.portfolio_item_criteria c
       where c.portfolio_item_id = new.portfolio_item_id and c.learner_id = new.learner_id
         and c.source <> 'ai_suggested';
      if new.criteria is not null and cardinality(new.criteria) > 0 then
        select array_agg(x order by x) into v_pick
          from (select distinct unnest(new.criteria) x) s
         where x = any (v_claimed);
      end if;
      new.criteria := case when cardinality(v_pick) > 0 then v_pick
                           when cardinality(v_claimed) > 0 then v_claimed
                           else new.criteria end;
      select jsonb_build_object('title', title, 'description', description,
                                'criteria', assessment_criteria_met, 'captured_at', created_at,
                                'files', coalesce((
                                  select jsonb_agg(jsonb_build_object('url', f->>'url', 'name', f->>'name',
                                                                      'type', f->>'type', 'sha256', f->>'sha256'))
                                    from jsonb_array_elements(case when jsonb_typeof(storage_urls) = 'array'
                                                                   then storage_urls else '[]'::jsonb end) f
                                   where f->>'url' is not null), '[]'::jsonb))
        into new.evidence_snapshot
        from public.portfolio_items where id = new.portfolio_item_id and user_id = new.learner_id;
      new.evidence_hash := encode(extensions.digest(coalesce(new.evidence_snapshot::text, ''), 'sha256'), 'hex');
    end if;
    return new;
  end if;
  if (to_jsonb(new) - 'status') is distinct from (to_jsonb(old) - 'status')
     or new.status not in ('withdrawn', old.status)
     or (new.status = 'withdrawn' and old.status = 'signed') then
    raise exception 'a witness statement is signed by the witness; you can only withdraw an unsigned request'
      using errcode = '42501';
  end if;
  return new;
end; $function$;

-- The old 7-argument version is replaced by one with four more optional
-- arguments (same name, so PostgREST resolves both old and new callers).
drop function if exists public.sign_witness_statement(text, text, text, text, text, text, boolean);

create or replace function public.sign_witness_statement(
  p_token text, p_name text, p_role text, p_company text, p_statement text, p_signature text,
  p_confirmed boolean default null,
  p_competence text default null,
  p_card_number text default null,
  p_years_in_trade integer default null,
  p_no_conflict boolean default null)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  w public.portfolio_witness_statements%rowtype;
  v_hash text; v_ip text;
  v_now timestamptz := now();
  v_name text := left(trim(coalesce(p_name, '')), 120);
  v_role text := nullif(left(trim(coalesce(p_role, '')), 120), '');
  v_company text := nullif(left(trim(coalesce(p_company, '')), 160), '');
  v_statement text := left(trim(coalesce(p_statement, '')), 6000);
  v_comp text := nullif(left(trim(coalesce(p_competence, '')), 300), '');
  v_card text := nullif(left(regexp_replace(trim(coalesce(p_card_number, '')), '\s+', ' ', 'g'), 40), '');
  v_years smallint := case when p_years_in_trade between 0 and 70 then p_years_in_trade end;
begin
  if v_name = '' or v_statement = '' or coalesce(p_signature, '') = '' then
    return jsonb_build_object('error', 'name_statement_and_signature_required');
  end if;
  if p_confirmed is false then
    return jsonb_build_object('error', 'confirmation_required');
  end if;
  -- A witness who cannot confirm no conflict cannot sign as a witness.
  if p_no_conflict is false then
    return jsonb_build_object('error', 'no_conflict_required');
  end if;
  -- The current page always sends both; an older cached page sends neither.
  if p_no_conflict is true and v_comp is null then
    return jsonb_build_object('error', 'competence_required');
  end if;
  select * into w from public.portfolio_witness_statements where token = p_token for update;
  if w.id is null then return jsonb_build_object('error', 'not_found'); end if;
  if w.status <> 'requested' then return jsonb_build_object('error', 'already_' || w.status); end if;
  if w.expires_at < v_now then return jsonb_build_object('error', 'expired'); end if;
  if length(p_signature) > 400000 then return jsonb_build_object('error', 'signature_too_large'); end if;
  begin
    v_ip := left(current_setting('request.headers', true)::jsonb->>'x-forwarded-for', 60);
  exception when others then v_ip := null; end;
  -- Over exactly what is stored, with the time in UTC ISO form, so the
  -- fingerprint can be recomputed from the row. The competence fields are
  -- appended only when given (concat_ws skips nulls), so older signatures
  -- recompute exactly as before.
  v_hash := encode(extensions.digest(concat_ws('|', w.id, v_name, coalesce(v_role, ''), coalesce(v_company, ''),
                                    v_statement, coalesce(w.evidence_hash, ''),
                                    to_char(v_now at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"'),
                                    case when p_confirmed then 'confirmed_observed' end,
                                    case when v_comp is not null then 'competence:' || v_comp end,
                                    case when v_card is not null then 'card:' || v_card end,
                                    case when v_years is not null then 'years:' || v_years end,
                                    case when p_no_conflict then 'no_conflict' end), 'sha256'), 'hex');
  update public.portfolio_witness_statements
     set witness_name = v_name, witness_role = v_role, witness_company = v_company,
         statement = v_statement, signature_data = p_signature, status = 'signed',
         signed_at = v_now, statement_hash = v_hash, signer_ip = v_ip, witness_confirmed = p_confirmed,
         witness_competence = v_comp, witness_card_number = v_card,
         witness_years_in_trade = v_years, witness_no_conflict = p_no_conflict
   where id = w.id;
  return jsonb_build_object('success', true, 'statement_hash', v_hash);
end; $function$;

grant execute on function public.sign_witness_statement(text, text, text, text, text, text, boolean, text, text, integer, boolean)
  to anon, authenticated;

comment on table public.portfolio_witness_statements is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] Witness statements signed from a token link with no account; evidence snapshot + hashes; the witness confirms their competence (witness_competence, card, years) and no conflict of interest (witness_no_conflict). Scope: learner_id = apprentice auth uid. Used by: College area (MyAssessmentCard, EvidenceDetailSheet), AcDecisionSheet, public /witness/:token, portfolio-export-pack. Rule: only sign_witness_statement() completes one; the learner may only withdraw an unsigned request.';

commit;
