-- ELE-2048: record AI use on every piece of evidence.
--
-- Ofqual advice note (27 Apr 2026, https://dera.ioe.ac.uk/id/eprint/42104/):
-- authenticity declarations; detection is evidence, never the sole determinant.
-- JCQ "AI Use in Assessments" (Apr 2025): name the AI tool and the date, keep the
-- question and the generated content in a form that cannot be edited, explain
-- briefly how it was used; unacknowledged AI use is malpractice.
--
-- Verified before building: the capture sheet's voice-to-STAR draft and the
-- capture assistant filled the title, description and reflective account, and
-- nothing on portfolio_items said so (only metadata.assistant when the
-- assistant ran, with an exact-match "used" flag).
--
--   portfolio_items.ai_assisted  true when AI wrote words that are still in the item
--   portfolio_items.ai_use       the record: tools (name, model, date, what was sent,
--                                what came back) and, per field, the AI text and
--                                how much of the final text came from it
--
-- The capture sheet sends the record as metadata.ai_use; a trigger moves it to
-- the columns (so every create path, including the offline outbox, is covered).
-- For the learner the record is sticky: ai_assisted never goes back to false and
-- ai_use is never removed; a new record keeps the earlier one under "earlier".
-- Staff cannot change it. submit_portfolio_evidence binds ai_assisted into the
-- signed hashes and requires "How I used AI:" in the declaration when any item
-- sent is AI-assisted.

alter table public.portfolio_items add column if not exists ai_assisted boolean not null default false;
alter table public.portfolio_items add column if not exists ai_use jsonb;
comment on column public.portfolio_items.ai_assisted is
  'ELE-2048: AI drafted words that are still in this evidence (title, description or reflective account). Set from the capture record; for the learner it never goes back to false. Shown to assessor and IQA, bound into the signed declaration, in the export pack.';
comment on column public.portfolio_items.ai_use is
  'ELE-2048: the AI-use record (JCQ Apr 2025): tools used with model, date, what was sent and what came back, and per field the AI text and the share of the final text that came from it. Written by the capture sheet via metadata.ai_use; never removed by the learner.';

create or replace function public._portfolio_items_ai_use()
returns trigger
language plpgsql
set search_path to 'public'
as $$
declare
  v_in jsonb;
  v_learner boolean := current_user in ('authenticated', 'anon');
begin
  if jsonb_typeof(new.metadata) = 'object' and jsonb_typeof(new.metadata->'ai_use') = 'object' then
    v_in := new.metadata->'ai_use';
  end if;
  if jsonb_typeof(new.metadata) = 'object' then
    new.metadata := new.metadata - 'ai_use';
  end if;
  -- Keep the record a sensible size (the output snapshots are text).
  if v_in is not null and length(v_in::text) > 120000 then
    raise exception 'AI-use record too large' using errcode = '22023';
  end if;

  if tg_op = 'INSERT' then
    if v_in is not null then
      new.ai_use := v_in || jsonb_build_object('received_at', now());
      new.ai_assisted := coalesce(new.ai_assisted, false) or coalesce((v_in->>'assisted')::boolean, false);
    end if;
    return new;
  end if;

  -- UPDATE
  if v_in is not null then
    if old.ai_use is not null and (old.ai_use - 'received_at' - 'earlier') is distinct from (v_in - 'received_at' - 'earlier') then
      new.ai_use := v_in || jsonb_build_object(
        'received_at', now(),
        'earlier', coalesce(old.ai_use->'earlier', '[]'::jsonb) || jsonb_build_array(old.ai_use - 'earlier'));
    else
      new.ai_use := coalesce(old.ai_use, v_in || jsonb_build_object('received_at', now()));
    end if;
    new.ai_assisted := coalesce(old.ai_assisted, false) or coalesce((v_in->>'assisted')::boolean, false);
  elsif v_learner then
    -- No new record: the learner (or anyone through the API) cannot clear or rewrite it.
    new.ai_use := old.ai_use;
    new.ai_assisted := old.ai_assisted;
  end if;
  if v_learner then
    new.ai_assisted := coalesce(new.ai_assisted, false) or coalesce(old.ai_assisted, false);
  end if;
  return new;
end; $$;

-- "a1_" sorts before trg_portfolio_items_hash, so metadata.ai_use is moved out
-- before the content hash is computed.
drop trigger if exists a1_portfolio_items_ai_use on public.portfolio_items;
create trigger a1_portfolio_items_ai_use before insert or update on public.portfolio_items
  for each row execute function public._portfolio_items_ai_use();

-- Staff guard: identical to the live definition, plus the AI-use record.
create or replace function public._portfolio_items_staff_guard()
 returns trigger
 language plpgsql
 set search_path to 'public'
as $function$
begin
  if current_user not in ('authenticated', 'anon') or new.user_id = auth.uid()
     or public._is_platform_admin() then
    return new;
  end if;
  if new.user_id is distinct from old.user_id
  or new.title is distinct from old.title
  or new.description is distinct from old.description
  or new.file_url is distinct from old.file_url
  or new.storage_urls is distinct from old.storage_urls
  or new.reflection_notes is distinct from old.reflection_notes
  or new.self_assessment is distinct from old.self_assessment
  or new.date_completed is distinct from old.date_completed
  or new.time_spent is distinct from old.time_spent
  or new.ai_assisted is distinct from old.ai_assisted
  or new.ai_use is distinct from old.ai_use then
    raise exception 'staff can assess evidence but not change what the learner wrote'
      using errcode = '42501';
  end if;
  return new;
end; $function$;

-- Submit: identical to the live definition apart from the two ELE-2048 parts.
CREATE OR REPLACE FUNCTION public.submit_portfolio_evidence(p_item_ids uuid[], p_typed_name text, p_signature_image text, p_declaration_text text, p_note text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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

  -- ELE-2048 (JCQ AI Use in Assessments, Apr 2025): AI use must be acknowledged
  -- with a brief explanation of how it was used, in the signed declaration.
  if exists (select 1 from public.portfolio_items i where i.id = any (v_items) and coalesce(i.ai_assisted, false))
     and position('How I used AI:' in p_declaration_text) = 0 then
    raise exception 'say how you used AI on this evidence before you sign' using errcode = 'P0001';
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
           -- ELE-2048: whether AI drafted any of this item's words, bound into what is signed.
           'ai_assisted', coalesce(i.ai_assisted, false),
           'ai_fields', coalesce((select jsonb_agg(f->>'field' order by f->>'field')
                                    from jsonb_array_elements(case when jsonb_typeof(i.ai_use->'fields') = 'array'
                                                                   then i.ai_use->'fields' else '[]'::jsonb end) f), '[]'::jsonb),
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
end; $function$;

revoke all on function public.submit_portfolio_evidence(uuid[], text, text, text, text) from public, anon;
grant execute on function public.submit_portfolio_evidence(uuid[], text, text, text, text) to authenticated;
