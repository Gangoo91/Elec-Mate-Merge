-- ELE-226 — cert re-inspection reminders. ~30 days before a certificate's
-- re-inspection is due, nudge the electrician to rebook (recurring revenue).
-- Runs on the unified spine (bell + push), deduped 30 days per cert.

insert into public.notification_types (type, category, push, importance) values
  ('cert_reinspection', 'certificates_compliance', true, 1)
on conflict (type) do update set category = excluded.category, push = excluded.push,
  importance = excluded.importance, updated_at = now();

create or replace function public.notify_cert_reinspections()
returns void language plpgsql security definer set search_path to 'public'
as $function$
declare r record;
begin
  for r in
    select rp.user_id, rp.report_type, rp.report_id, rp.id::text as ref,
      coalesce(nullif(btrim(rp.installation_address), ''), nullif(btrim(rp.client_name), ''), 'A client') as loc,
      rp.next_inspection_due
    from public.reports rp
    where rp.deleted_at is null
      and rp.user_id is not null
      and rp.next_inspection_due is not null
      and rp.next_inspection_due >= current_date
      and rp.next_inspection_due <= current_date + 30
      and not exists (
        select 1 from public.user_notifications n
        where n.user_id = rp.user_id and n.type = 'cert_reinspection'
          and n.metadata->>'ref_id' = rp.id::text
          and n.created_at > now() - interval '30 days')
  loop
    perform public.notify_user(
      r.user_id, 'cert_reinspection',
      public.notif_cert_label(r.report_type) || ' re-inspection due soon',
      r.loc || ' — due ' || to_char(r.next_inspection_due, 'DD Mon YYYY')
        || '. Rebook now to keep them covered and win the repeat work.',
      jsonb_build_object('route', '/electrician', 'ref_id', r.ref, 'report_id', r.report_id));
  end loop;
end;
$function$;

-- Daily at 08:25 UTC. Rollback: select cron.unschedule('daily-cert-reinspection-reminders');
select cron.schedule('daily-cert-reinspection-reminders', '25 8 * * *',
  $$select public.notify_cert_reinspections();$$);
