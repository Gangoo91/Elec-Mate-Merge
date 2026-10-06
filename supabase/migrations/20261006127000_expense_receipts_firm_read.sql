-- ELE-1949 step 1 (additive): let a firm read the receipt files attached to its
-- own team's expense claims. Until now only the uploader (storage owner) could
-- read an object; that worked only because the bucket is PUBLIC. This policy is
-- what lets the bucket go private without the office losing sight of receipts.
-- Step 2 (after the signed-URL client code ships): set the bucket private.
create policy "Firm reads its team's expense receipts"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'expense-receipts'
    and exists (
      select 1
        from public.employer_expense_claims c
        join public.employer_employees e on e.id = c.employee_id
       where e.employer_id in (select public.my_employer_scope())
         and c.receipt_url like '%/expense-receipts/' || storage.objects.name
    )
  );
