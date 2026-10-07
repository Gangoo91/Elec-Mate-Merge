-- ELE-1825 — an admin manager can connect or reconnect the FIRM's accounting
-- package from the Employer Hub. The OAuth state row is written for the owner
-- (the tokens belong to the firm), so it records who started it and where the
-- callback should send them back to.
alter table public.accounting_oauth_states
  add column if not exists initiated_by uuid references auth.users(id) on delete cascade,
  add column if not exists return_to text;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'accounting_oauth_states_return_to_check') then
    alter table public.accounting_oauth_states
      add constraint accounting_oauth_states_return_to_check
      check (return_to is null or return_to in ('settings', 'employer'));
  end if;
end $$;

comment on column public.accounting_oauth_states.initiated_by is
  'ELE-1825: who started the connect (an admin manager connecting the firm owner''s account); null = the owner themselves.';
comment on column public.accounting_oauth_states.return_to is
  'ELE-1825: where the callback redirects: settings (Electrical Hub) or employer (Employer Hub, Finance > Accounting).';
