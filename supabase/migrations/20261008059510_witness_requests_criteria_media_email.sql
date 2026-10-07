-- ELE-1869: witness statement by link, made to work in practice.
--
--   1. The learner picks which criteria the witness can speak to. The insert
--      guard keeps only criteria actually claimed on that evidence (a learner
--      cannot ask a witness to confirm something the evidence does not claim);
--      no list, or nothing valid, falls back to every claimed criterion, as before.
--   2. The witness page shows the criteria in plain words: get_witness_request
--      returns criteria_detail (code, unit title, criterion text) from the
--      learner's own qualification.
--   3. The witness page shows the evidence photos. The snapshot taken at request
--      time now records the files, so what the witness sees is fixed with the
--      evidence hash. Older requests fall back to the item's files. Only public
--      storage URLs on this project are returned (portfolio-evidence is a PUBLIC
--      bucket and stays public, so the stored URLs open as they are).
--   4. witness_phone (for "send by text") and emailed_at / email_count, written
--      only by the witness-request-mail edge function (service role), which
--      sends the link by email and rate-limits it.
begin;
set local lock_timeout = '5s';

alter table public.portfolio_witness_statements
  add column if not exists witness_phone text,
  add column if not exists emailed_at timestamptz,
  add column if not exists email_count integer not null default 0;

comment on column public.portfolio_witness_statements.witness_phone is
  'Optional mobile number the learner entered to text the link (ELE-1869). Never shown to the witness.';
comment on column public.portfolio_witness_statements.emailed_at is
  'Last time witness-request-mail emailed the link to witness_email (service role only).';
comment on column public.portfolio_witness_statements.email_count is
  'How many times the link was emailed; witness-request-mail caps it.';

-- Copied from the LIVE definition (7 Oct) and extended: criteria are checked
-- against the item's claims, and the snapshot carries the files.
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

-- Public-safe media for the witness page: images and videos from the snapshot
-- (or, for requests made before the snapshot carried files, the item now),
-- limited to this project's public storage URLs.
create or replace function public._witness_media(w public.portfolio_witness_statements)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with src as (
    select case when jsonb_typeof(w.evidence_snapshot->'files') = 'array' then w.evidence_snapshot->'files'
                else (select case when jsonb_typeof(pi.storage_urls) = 'array' then pi.storage_urls else '[]'::jsonb end
                        from public.portfolio_items pi
                       where pi.id = w.portfolio_item_id and pi.user_id = w.learner_id) end files
  )
  select coalesce(jsonb_agg(jsonb_build_object('url', f->>'url', 'name', coalesce(f->>'name', 'Photo'),
                                               'type', coalesce(f->>'type', ''))), '[]'::jsonb)
    from src, jsonb_array_elements(coalesce(src.files, '[]'::jsonb)) f
   where f->>'url' like 'https://jtwygbeceundfgnkirof.supabase.co/storage/v1/object/public/%'
     and (coalesce(f->>'type', '') ~ '^(image|video)/'
          or (coalesce(f->>'type', '') = '' and f->>'url' ~* '\.(jpe?g|png|webp|heic|gif|mp4|mov|webm)(\?|$)'));
$$;
revoke all on function public._witness_media(public.portfolio_witness_statements) from public, anon, authenticated;

-- The criteria in plain words, from the learner's own qualification.
create or replace function public._witness_criteria_detail(w public.portfolio_witness_statements)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_req text;
  v_out jsonb;
begin
  select q.requirement_code into v_req from public._resolve_qualification(w.learner_id, null) q limit 1;
  select coalesce(jsonb_agg(jsonb_build_object(
           'code', c.code, 'unit_code', c.u, 'ac_code', c.a,
           'unit_title', qr.unit_title, 'text', qr.ac_text) order by c.ord), '[]'::jsonb)
    into v_out
    from (select x code, ord,
                 (regexp_match(x, '^(.+?) AC (.+)$'))[1] u,
                 (regexp_match(x, '^(.+?) AC (.+)$'))[2] a
            from unnest(coalesce(w.criteria, '{}')) with ordinality t(x, ord)) c
    left join lateral (
      select r.unit_title, r.ac_text from public.qualification_requirements r
       where r.qualification_code = v_req and r.unit_code = c.u and r.ac_code = c.a
       limit 1) qr on true;
  return v_out;
end;
$$;
revoke all on function public._witness_criteria_detail(public.portfolio_witness_statements) from public, anon, authenticated;

-- Copied from the LIVE definition (7 Oct); adds criteria_detail, media and
-- the learner's first name. Same errors, same fields as before.
create or replace function public.get_witness_request(p_token text)
 returns jsonb
 language plpgsql
 stable security definer
 set search_path to 'public'
as $function$
declare w public.portfolio_witness_statements%rowtype; v_name text;
begin
  select * into w from public.portfolio_witness_statements where token = p_token;
  if w.id is null then return jsonb_build_object('error', 'not_found'); end if;
  if w.status = 'withdrawn' then return jsonb_build_object('error', 'withdrawn'); end if;
  if w.status = 'requested' and w.expires_at < now() then return jsonb_build_object('error', 'expired'); end if;
  select coalesce(full_name, 'An apprentice') into v_name from public.profiles where id = w.learner_id;
  return jsonb_build_object(
    'learner_name', v_name, 'status', w.status, 'criteria', w.criteria,
    'criteria_detail', public._witness_criteria_detail(w),
    'media', case when w.status = 'requested' then public._witness_media(w) else '[]'::jsonb end,
    'evidence', w.evidence_snapshot - 'files', 'signed_at', w.signed_at,
    'witness_name', case when w.status = 'signed' then w.witness_name end);
end; $function$;
grant execute on function public.get_witness_request(text) to anon, authenticated;

commit;
