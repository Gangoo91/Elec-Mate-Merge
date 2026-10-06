-- Second review of the 6 Oct Employer Hub fixes.
--  1. Removing a manager DELETED their employer_admins row, so photos they had
--     uploaded under their own folder became unreadable to the firm
--     (visual_upload_owner_in_firm needs a link). Removal now revokes the row
--     (everything that grants access already checks status = 'active'; the
--     unique index already ignores revoked rows, so re-inviting still works).
--  2. incident_actions_keep_done compared the office device's clock with the
--     server's. A reopen is now recognised by reopened_at CHANGING, not by time.
--  3. 'resolved' incidents count as closed for the worker's actions, as they
--     already do in the hub (isIncidentClosed).
--  4. get_employer_bridged_quotes also returns the quote's full settings, so
--     the hub can show CIS / grant / deposit the way the Electrical Hub does,
--     and Duplicate keeps payment terms, discount and the rest.

-- 1 ----------------------------------------------------------------------
create or replace function public.remove_co_admin(p_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row public.employer_admins%rowtype;
begin
  select * into v_row from public.employer_admins
   where id = p_id
     and (employer_id = auth.uid() or user_id = auth.uid())
     and status <> 'revoked'
   for update;
  if not found then
    raise exception 'That manager is no longer on your list';
  end if;
  update public.employer_admins set status = 'revoked', updated_at = now() where id = p_id;
  return jsonb_build_object('ok', true);
end;
$$;
revoke execute on function public.remove_co_admin(uuid) from public, anon;
grant execute on function public.remove_co_admin(uuid) to authenticated;

create or replace function public.visual_upload_owner_in_firm(p_name text, p_firm uuid)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_owner uuid;
begin
  begin
    v_owner := ((storage.foldername(p_name))[1])::uuid;
  exception when others then
    return false;
  end;
  if v_owner is null or p_firm is null then
    return false;
  end if;
  -- Any status: a photo stays readable after its uploader leaves the firm.
  return v_owner = p_firm
      or exists (select 1 from public.employer_admins a
                  where a.employer_id = p_firm and a.user_id = v_owner and a.status in ('active', 'revoked'))
      or exists (select 1 from public.employer_employees e
                  where e.employer_id = p_firm and e.user_id = v_owner);
end;
$$;

-- 2 ----------------------------------------------------------------------
create or replace function public.incident_actions_keep_done()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if NEW.corrective_actions is null or OLD.corrective_actions is null
     or NEW.corrective_actions = OLD.corrective_actions then
    return NEW;
  end if;
  -- Kept unless this save carries a NEW reopen marker for that action. A stale
  -- save still carries the old marker (or none), so it can't undo a Done.
  select coalesce(jsonb_agg(
           case when n->>'done_at' is null and o.done is not null
                 and (n->>'reopened_at') is not distinct from (o.done->>'reopened_at')
                then n || jsonb_build_object('done_at', o.done->'done_at', 'done_note', o.done->'done_note')
                else n end
           order by ord), '[]'::jsonb)
    into NEW.corrective_actions
    from jsonb_array_elements(NEW.corrective_actions) with ordinality as x(n, ord)
    left join lateral (
      select oa as done from jsonb_array_elements(OLD.corrective_actions) oa
       where oa->>'id' = n->>'id' and oa->>'done_at' is not null
       limit 1
    ) o on true;
  return NEW;
end;
$$;

-- 3 ----------------------------------------------------------------------
do $$
declare v_def text;
begin
  v_def := pg_get_functiondef('public.get_my_incident_actions()'::regprocedure);
  v_def := replace(v_def, $q$where lower(coalesce(i.status, '')) <> 'closed'$q$,
                          $q$where lower(coalesce(i.status, '')) not in ('closed', 'resolved')$q$);
  if v_def !~ 'not in \(''closed'', ''resolved''\)' then raise exception 'get_my_incident_actions not patched'; end if;
  execute v_def;

  v_def := pg_get_functiondef('public.complete_my_incident_action(uuid,text,text)'::regprocedure);
  v_def := replace(v_def, $q$if lower(coalesce(v_row.status, '')) = 'closed' then$q$,
                          $q$if lower(coalesce(v_row.status, '')) in ('closed', 'resolved') then$q$);
  if v_def !~ 'in \(''closed'', ''resolved''\) then' then raise exception 'complete_my_incident_action not patched'; end if;
  execute v_def;
end $$;

-- 4 ----------------------------------------------------------------------
drop function if exists public.get_employer_bridged_quotes();
create function public.get_employer_bridged_quotes()
returns table(id uuid, quote_number text, client text, client_address text, client_email text, client_phone text,
              job_title text, description text, value numeric, status text, sent_date timestamptz,
              valid_until timestamptz, job_id uuid, created_by text, line_items jsonb, notes text,
              subtotal numeric, vat_amount numeric, created_at timestamptz, updated_at timestamptz, source text,
              acceptance_status text, accepted_at timestamptz, accepted_by_name text, signature_url text,
              public_token text, invoice_raised boolean,
              vat_rate numeric, reverse_charge boolean, cis_enabled boolean, cis_rate numeric,
              settings jsonb)
language sql
stable
security definer
set search_path = public
as $function$
  select
    q.id, q.quote_number,
    coalesce(nullif(q.client_data->>'name', ''), 'Client'),
    q.client_data->>'address', q.client_data->>'email', q.client_data->>'phone',
    nullif(q.job_details->>'title', ''),
    q.notes, coalesce(q.total, 0),
    case
      when q.acceptance_status in ('accepted', 'accepted_pending_deposit') then 'Approved'
      when q.acceptance_status in ('rejected', 'declined') or q.status = 'rejected' then 'Rejected'
      else initcap(coalesce(q.status, 'draft'))
    end,
    q.first_sent_at, q.expiry_date, q.employer_job_id, 'Electrical Hub'::text,
    coalesce(q.items, '[]'::jsonb), q.notes, q.subtotal, q.vat_amount,
    q.created_at, q.updated_at, 'electrical_hub'::text,
    q.acceptance_status, q.accepted_at, q.accepted_by_name,
    q.signature_url, q.public_token::text, coalesce(q.invoice_raised, false),
    case when lower(coalesce(q.settings->>'vatRegistered', 'true')) = 'false' then 0
         when q.settings->>'vatRate' ~ '^\d+(\.\d+)?$' then (q.settings->>'vatRate')::numeric
         else 20 end,
    lower(coalesce(q.settings->>'reverseCharge', 'false')) = 'true',
    lower(coalesce(q.settings->>'cisEnabled', 'false')) = 'true',
    case when q.settings->>'cisRate' ~ '^\d+(\.\d+)?$' then (q.settings->>'cisRate')::numeric end,
    coalesce(q.settings, '{}'::jsonb)
  from public.quotes q
  where q.user_id in (select public.my_employer_scope())
    and q.deleted_at is null
    and coalesce(q.invoice_raised, false) = false
  order by q.created_at desc;
$function$;
revoke execute on function public.get_employer_bridged_quotes() from public, anon;
grant execute on function public.get_employer_bridged_quotes() to authenticated;
