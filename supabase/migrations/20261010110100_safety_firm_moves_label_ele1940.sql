-- ELE-1940: label the new table (schema_map) and the new circuit_design_jobs
-- columns. Comments only.
comment on table public.safety_firm_moves is
  '[EMPLOYER HUB] Log of "Move to firm" for RAMS a firm owner or admin made as their own (ELE-1940). Scope: moved_by = the person who moved it; read own only, written only by rams_move_to_firm / rams_move_back_to_personal. Used by: Employer Hub RAMS register (Move back). Rule: never written by the client; a row is what Move back may undo.';
comment on column public.circuit_design_jobs.employer_id is
  'ELE-1943: the firm a design belongs to (owner profiles.id). Set only by design_file_with_firm; read by firm/crew only through definer functions, never by RLS.';
comment on column public.circuit_design_jobs.employer_job_id is
  'ELE-1943: the firm job a design is for (employer_jobs.id). Set only by design_file_with_firm.';
