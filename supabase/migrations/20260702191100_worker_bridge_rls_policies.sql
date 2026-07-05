CREATE OR REPLACE FUNCTION public.my_employer_ids()
 RETURNS SETOF uuid
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select employer_id from employer_employees
   where user_id = auth.uid() and status ilike 'active';
$function$;
GRANT EXECUTE ON FUNCTION public.my_employer_ids() TO authenticated;

-- reported_by is TEXT (holds an employer_employees.id string) -> cast helper to text
CREATE POLICY "Worker reports incidents for their employer"
  ON public.employer_incidents FOR INSERT TO authenticated
  WITH CHECK (
    employer_id IN (SELECT public.my_employer_ids())
    AND reported_by IN (SELECT public.my_employee_ids()::text)
  );

CREATE POLICY "Worker reads own reported incidents"
  ON public.employer_incidents FOR SELECT TO authenticated
  USING (reported_by IN (SELECT public.my_employee_ids()::text));

CREATE POLICY "Worker views assigned tools"
  ON public.employer_company_tools FOR SELECT TO authenticated
  USING (assigned_to_employee_id IN (SELECT public.my_employee_ids()));

CREATE POLICY "Worker views own holiday allowance"
  ON public.employee_holiday_allowances FOR SELECT TO authenticated
  USING (employee_id IN (SELECT public.my_employee_ids()));
