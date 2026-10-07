-- ELE-1893 + ELE-1875: submit evidence for assessment with the learner's
-- declaration and e-signature, bound to the hashes of what was signed.
--
-- submit_portfolio_evidence() is the one way a learner sends evidence:
--   * every item must be theirs and carry at least one claimed criterion
--   * "Send again" after a referral is a NEW submission (the audit keeps both)
--   * the learner signs "this is my own work" (typed name + drawn signature);
--     the signature row stores each item's content_hash and file SHA-256s and a
--     bundle_hash over all of it, so a later change to any file is provable
--   * one transaction: submission, its items, the declaration
-- portfolio_signatures had no label, let any user insert any role's signature
-- for themselves, and hid declarations from assessors; all three are fixed.

-- 1. Signatures: bound hashes, label, policies ------------------------------
alter table public.portfolio_signatures add column if not exists signed_hashes jsonb;
alter table public.portfolio_signatures add column if not exists bundle_hash text;

comment on table public.portfolio_signatures is
  '[PORTFOLIO — OWNED BY THE APPRENTICE] Signatures on a submission: the learner''s declaration (typed name + drawn signature, bound to signed_hashes / bundle_hash of the items signed) and assessor / IQA / employer sign-offs. Scope: submission_id → portfolio_submissions (owner = apprentice). Used by: Submit for assessment (evidence detail), assessor workspace, sign-off chain, evidence / EPAO export pack. Rule: learner declarations are written only by submit_portfolio_evidence(); signatures are never edited or deleted.';

-- One declaration per send: a resubmission is a new submission, but keep the
-- old uniqueness for the assessor-side signature types.
alter table public.portfolio_signatures drop constraint if exists unique_signature;
create unique index if not exists portfolio_signatures_one_per_role
  on public.portfolio_signatures (submission_id, signer_role, signature_type)
  where signature_type <> 'declaration';

drop policy if exists "Users can create own signatures" on public.portfolio_signatures;
drop policy if exists "Assessing staff sign submissions" on public.portfolio_signatures;
create policy "Assessing staff sign submissions" on public.portfolio_signatures
  for insert to authenticated with check (
    signer_id = auth.uid()
    and signer_role in ('assessor', 'iqa', 'eqa', 'employer')
    and signature_type <> 'declaration'
    and exists (select 1 from public.portfolio_submissions s
                 where s.id = submission_id and s.user_id <> auth.uid()
                   and public._can_assess(s.user_id)));
drop policy if exists "Assessing staff read signatures" on public.portfolio_signatures;
create policy "Assessing staff read signatures" on public.portfolio_signatures
  for select to authenticated using (
    exists (select 1 from public.portfolio_submissions s
             where s.id = submission_id and public._can_assess(s.user_id)));

create or replace function public._portfolio_signatures_immutable()
returns trigger language plpgsql set search_path to 'public' as $$
begin
  if current_user in ('authenticated', 'anon') then
    raise exception 'a signature is never edited or deleted' using errcode = '42501';
  end if;
  return coalesce(new, old);
end; $$;
drop trigger if exists trg_portfolio_signatures_immutable on public.portfolio_signatures;
create trigger trg_portfolio_signatures_immutable before update or delete on public.portfolio_signatures
  for each row execute function public._portfolio_signatures_immutable();

-- 2. Submit -----------------------------------------------------------------
create or replace function public.submit_portfolio_evidence(
  p_item_ids uuid[],
  p_typed_name text,
  p_signature_image text,
  p_declaration_text text,
  p_note text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare
  v_uid uuid := auth.uid();
  v_items uuid[];
  v_bad uuid;
  v_sub uuid;
  v_qual uuid;
  v_hashes jsonb;
  v_at timestamptz := now();
  v_bundle text;
  v_ip inet;
  v_ua text;
  v_sig uuid;
begin
  if v_uid is null then raise exception 'sign in first' using errcode = '42501'; end if;
  select array_agg(distinct x) into v_items from unnest(coalesce(p_item_ids, '{}')) x;
  if coalesce(array_length(v_items, 1), 0) = 0 then
    raise exception 'choose the evidence to send' using errcode = '22023';
  end if;
  if array_length(v_items, 1) > 50 then
    raise exception 'send at most 50 items at once' using errcode = '22023';
  end if;
  if coalesce(trim(p_typed_name), '') = '' or coalesce(p_signature_image, '') = ''
     or coalesce(trim(p_declaration_text), '') = '' then
    raise exception 'type your name, sign and accept the declaration' using errcode = '22023';
  end if;
  if length(p_signature_image) > 400000 then
    raise exception 'signature image too large' using errcode = '22023';
  end if;

  select x into v_bad from unnest(v_items) x
   where not exists (select 1 from public.portfolio_items i where i.id = x and i.user_id = v_uid) limit 1;
  if v_bad is not null then
    raise exception 'you can only send your own evidence' using errcode = '42501';
  end if;
  select x into v_bad from unnest(v_items) x
   where not exists (select 1 from public.portfolio_item_criteria c
                      where c.portfolio_item_id = x and c.source in ('learner', 'assessor')) limit 1;
  if v_bad is not null then
    raise exception 'claim the criteria each piece of evidence covers before you send it' using errcode = 'P0001';
  end if;
  -- Already with the assessor and nothing decided since: no need to send again.
  select si.portfolio_item_id into v_bad
    from public.portfolio_submission_items si
    join public.portfolio_submissions ps on ps.id = si.submission_id
   where si.portfolio_item_id = any (v_items)
     and coalesce(ps.status, 'submitted') in ('submitted', 'resubmitted', 'under_review')
     and not exists (
       select 1 from public.portfolio_assessment_decisions d
         join public.portfolio_item_criteria c
           on c.portfolio_item_id = si.portfolio_item_id and c.unit_code = d.unit_code and c.ac_code = d.ac_code
        where d.learner_id = v_uid and d.decided_at > coalesce(ps.submitted_at, ps.created_at))
   limit 1;
  if v_bad is not null then
    raise exception 'that evidence is already with your assessor' using errcode = 'P0001';
  end if;

  select qualification_id into v_qual from public._resolve_qualification(v_uid, null);

  insert into public.portfolio_submissions (user_id, status, submitted_at, submission_notes, qualification_id, submission_count)
  values (v_uid, 'submitted', v_at, nullif(left(trim(coalesce(p_note, '')), 2000), ''), v_qual, 1)
  returning id into v_sub;

  insert into public.portfolio_submission_items (submission_id, portfolio_item_id)
  select v_sub, x from unnest(v_items) x
  on conflict do nothing;

  -- What was signed: each item's content hash, its files' SHA-256 and the criteria claimed.
  select jsonb_agg(jsonb_build_object(
           'item_id', i.id,
           'title', i.title,
           'content_hash', i.content_hash,
           'files', coalesce((select jsonb_agg(jsonb_build_object('name', f->>'name', 'sha256', f->>'sha256'))
                                from jsonb_array_elements(case when jsonb_typeof(i.storage_urls) = 'array'
                                                               then i.storage_urls else '[]'::jsonb end) f), '[]'::jsonb),
           'criteria', coalesce((select jsonb_agg(c.unit_code || ' AC ' || c.ac_code order by c.unit_code, c.ac_code)
                                   from public.portfolio_item_criteria c
                                  where c.portfolio_item_id = i.id and c.source in ('learner', 'assessor')), '[]'::jsonb))
         order by i.id)
    into v_hashes
    from public.portfolio_items i where i.id = any (v_items);

  v_bundle := encode(extensions.digest(concat_ws('|', v_sub, v_uid, trim(p_typed_name), trim(p_declaration_text),
                                                 v_hashes::text, v_at), 'sha256'), 'hex');
  begin
    v_ip := nullif(trim(split_part(current_setting('request.headers', true)::jsonb->>'x-forwarded-for', ',', 1)), '')::inet;
  exception when others then v_ip := null; end;
  begin
    v_ua := left(current_setting('request.headers', true)::jsonb->>'user-agent', 300);
  exception when others then v_ua := null; end;

  insert into public.portfolio_signatures
    (submission_id, signer_id, signer_role, signature_type, signature_text, signature_image,
     declaration_text, ip_address, user_agent, signed_at, signed_hashes, bundle_hash)
  values (v_sub, v_uid, 'student', 'declaration', left(trim(p_typed_name), 120), p_signature_image,
          left(trim(p_declaration_text), 4000), v_ip, v_ua, v_at, v_hashes, v_bundle)
  returning id into v_sig;

  return jsonb_build_object('submission_id', v_sub, 'signature_id', v_sig, 'bundle_hash', v_bundle,
                            'items', array_length(v_items, 1));
end; $$;
revoke all on function public.submit_portfolio_evidence(uuid[], text, text, text, text) from public, anon;
grant execute on function public.submit_portfolio_evidence(uuid[], text, text, text, text) to authenticated;

-- 3. State: evidence sent again after "needs more" reads as Submitted ------
create or replace function public.get_portfolio_ac_state(p_user_id uuid default null)
returns table (
  unit_code text, unit_title text, lo_number int, lo_text text, ac_code text, ac_text text,
  state text, evidence_item_ids uuid[], decision_id uuid, decision_feedback text,
  decided_at timestamptz, assessor_name text, iqa_verdict text, qualification_code text,
  assessor_id uuid, iqa_feedback text, decision_method text, suggested_item_ids uuid[])
language plpgsql stable security definer set search_path to 'public' as $$
declare
  v_user uuid := coalesce(p_user_id, auth.uid());
  r record;
begin
  if v_user is null or not (v_user = auth.uid() or public._can_assess(v_user)) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  select * into r from public._resolve_qualification(v_user, null);
  if r.requirement_code is null then return; end if;

  return query
  with ev as (
    select c.portfolio_item_id item_id, c.unit_code u, c.ac_code a, c.source
      from public.portfolio_item_criteria c
     where c.learner_id = v_user
       and (c.qualification_code is null or c.qualification_code = r.requirement_code)
  ),
  open_items as (
    select si.portfolio_item_id, max(coalesce(ps.submitted_at, ps.created_at)) sent_at
      from public.portfolio_submission_items si
      join public.portfolio_submissions ps on ps.id = si.submission_id
     where ps.user_id = v_user and coalesce(ps.status, 'submitted') in ('submitted', 'resubmitted', 'under_review')
     group by si.portfolio_item_id
  ),
  cur as (
    select distinct on (d.unit_code, d.ac_code) d.*
      from public.portfolio_assessment_decisions d
     where d.learner_id = v_user and d.qualification_code = r.requirement_code and d.superseded_at is null
     order by d.unit_code, d.ac_code, d.decided_at desc
  )
  select qr.unit_code, qr.unit_title, qr.lo_number, qr.lo_text, qr.ac_code, qr.ac_text,
    case
      when cur.decision = 'passed' and cur.iqa_verdict = 'confirmed' then 'iqa_confirmed'
      when cur.decision = 'passed' and cur.iqa_verdict = 'not_confirmed' then 'iqa_rejected'
      when cur.decision in ('referred', 'not_yet')
           and exists (select 1 from ev join open_items o on o.portfolio_item_id = ev.item_id
                        where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source <> 'ai_suggested'
                          and o.sent_at > cur.decided_at) then 'submitted'
      when cur.decision is not null then cur.decision
      when exists (select 1 from ev join open_items o on o.portfolio_item_id = ev.item_id
                    where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source <> 'ai_suggested') then 'submitted'
      when exists (select 1 from ev where ev.u = qr.unit_code and ev.a = qr.ac_code
                    and ev.source <> 'ai_suggested') then 'claimed'
      when exists (select 1 from ev where ev.u = qr.unit_code and ev.a = qr.ac_code) then 'suggested'
      else 'not_started'
    end,
    coalesce((select array_agg(distinct ev.item_id) from ev
               where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source <> 'ai_suggested'), '{}'),
    cur.id, cur.feedback, cur.decided_at, cur.assessor_name, cur.iqa_verdict, r.requirement_code,
    cur.assessor_id, cur.iqa_feedback, cur.method,
    coalesce((select array_agg(distinct ev.item_id) from ev
               where ev.u = qr.unit_code and ev.a = qr.ac_code and ev.source = 'ai_suggested'), '{}')
  from public.qualification_requirements qr
  left join cur on cur.unit_code = qr.unit_code and cur.ac_code = qr.ac_code
  where qr.qualification_code = r.requirement_code
  order by qr.unit_code, qr.lo_number, qr.ac_code;
end; $$;
revoke all on function public.get_portfolio_ac_state(uuid) from public, anon;
grant execute on function public.get_portfolio_ac_state(uuid) to authenticated;
