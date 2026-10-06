-- ELE-1945: link the injured person to the roster when they are on it, so the
-- RIDDOR report carries their occupation (F2508 asks for it). injured_person
-- stays as free text for members of the public and other trades.
alter table public.employer_incidents
  add column if not exists injured_employee_id uuid references public.employer_employees(id) on delete set null;

comment on column public.employer_incidents.injured_employee_id is
  'Roster row of the injured person when they work for the firm. injured_person holds the name either way.';
