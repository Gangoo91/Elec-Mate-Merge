-- Copy polish found by the rolled-back producer test (20261007340000 audit):
--  * a team message that needs acknowledging read "Please read and acknowledge.
--    gate code changes…" (the office's text started lower case after a full stop)
--  * dates read "06 Oct" in the office bell but "6 Oct" in the worker's; use
--    the unpadded form everywhere.

create or replace function pg_temp.patch_fn(p_sig text, p_pairs text[])
returns void language plpgsql as $$
declare
  d text := pg_get_functiondef(p_sig::regprocedure);
  i int;
begin
  for i in 1 .. array_length(p_pairs, 1) by 2 loop
    if position(p_pairs[i] in d) = 0 then
      raise exception 'patch_fn %: pair % not found', p_sig, (i + 1) / 2;
    end if;
    d := replace(d, p_pairs[i], p_pairs[i + 1]);
  end loop;
  execute d;
end $$;

select pg_temp.patch_fn('public.trg_notify_communication()', array[
  $q$      || coalesce(left(regexp_replace(v_c.content, '\s+', ' ', 'g'), 140), 'New message from the office'),$q$,
  $q$      || coalesce(public._notif_cap(left(btrim(regexp_replace(v_c.content, '\s+', ' ', 'g')), 140)), 'New message from the office'),$q$
]);

select pg_temp.patch_fn('public.trg_notify_timesheet_submission()', array[
  $q$' hours for ' || to_char(new.date, 'DD Mon'),$q$,
  $q$' hours for ' || to_char(new.date, 'FMDD Mon'),$q$
]);

select pg_temp.patch_fn('public.trg_notify_leave_request()', array[
  $q$' day(s) from ' || to_char(new.start_date, 'DD Mon'),$q$,
  $q$' day(s) from ' || to_char(new.start_date, 'FMDD Mon'),$q$
]);

select pg_temp.patch_fn('public.notify_otj_supervisors()', array[
  $q$to_char(NEW.activity_date, 'DD Mon') || ' · tap to confirm'$q$,
  $q$to_char(NEW.activity_date, 'FMDD Mon') || ' · tap to confirm'$q$
]);

drop function pg_temp.patch_fn(text, text[]);
