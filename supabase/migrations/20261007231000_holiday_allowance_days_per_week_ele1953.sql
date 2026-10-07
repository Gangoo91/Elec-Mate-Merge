-- ELE-1953: holiday allowances set per person, with the statutory minimum as
-- the starting point and pro-rata for part-time.
--
-- UK statutory holiday is 5.6 weeks a year, capped at 28 days. A full-time
-- (5-day) worker gets 28; a 3-day worker gets 5.6 x 3 = 16.8 days. The office
-- editor works that out from the days a person works each week, so it needs to
-- remember that figure. total_days stays the allowance itself (whole days, the
-- statutory figure rounded UP so it is never below the legal minimum).

alter table public.employee_holiday_allowances
  add column if not exists days_per_week numeric(2,1)
    check (days_per_week is null or (days_per_week >= 0.5 and days_per_week <= 7));

comment on column public.employee_holiday_allowances.days_per_week is
  'ELE-1953: days a week this person works, used for the pro-rata statutory minimum (5.6 x days, max 28). Null = not recorded.';
