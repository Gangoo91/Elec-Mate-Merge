-- Daily metric snapshots for the admin overview.
--
-- The dashboard had no time axis: every figure was a snapshot of now, so
-- "£4,053 MRR" could not say whether that was up or down. Stripe and
-- RevenueCat both hold the history, but reconstructing it means walking every
-- subscription (Stripe) or a charts call (RevenueCat) on every load. One row a
-- day, written by the two admin stats edge functions as they run, is enough
-- for a 90-day line and 30-day sparklines. The seed below is that history
-- rebuilt once from Stripe subscription start/end dates and paid invoices,
-- and from RevenueCat's MRR, actives, trials and churn charts, on 2026-09-02.
--
-- *_churned_paid = subscriptions that paid at least one real invoice and then
-- ended that day. Trial leavers are NOT in it — that is the whole point.

create table if not exists public.admin_metric_daily (
  day date primary key,
  stripe_mrr numeric(10,2),
  rc_mrr numeric(10,2),
  stripe_paying integer,
  rc_paying integer,
  stripe_trialing integer,
  rc_trialing integer,
  stripe_churned_paid integer,
  rc_churned_paid integer,
  updated_at timestamptz not null default now()
);

alter table public.admin_metric_daily enable row level security;
-- Admins read; only the service role (edge functions) writes.
drop policy if exists "admin_metric_daily_admin_read" on public.admin_metric_daily;
create policy "admin_metric_daily_admin_read" on public.admin_metric_daily
  for select to authenticated
  using (exists (select 1 from profiles where id = auth.uid() and admin_role is not null));

insert into public.admin_metric_daily
  (day, stripe_mrr, rc_mrr, stripe_paying, rc_paying, stripe_trialing, rc_trialing, stripe_churned_paid, rc_churned_paid)
values
('2026-06-04',1885.01,595.68,245,null,null,null,null,null),
('2026-06-05',1898.0,601.66,246,null,null,null,null,null),
('2026-06-06',1895.0,593.66,246,null,null,null,null,null),
('2026-06-07',1898.0,600.65,246,null,null,null,null,null),
('2026-06-08',1906.99,622.63,247,null,null,null,null,null),
('2026-06-09',1918.97,652.62,249,null,null,null,null,null),
('2026-06-10',1928.97,652.62,249,null,null,null,null,null),
('2026-06-11',1966.93,645.62,253,null,null,null,null,null),
('2026-06-12',1950.95,630.62,251,null,null,null,null,null),
('2026-06-13',1976.93,637.61,253,null,null,null,null,null),
('2026-06-14',1976.93,607.62,253,null,null,null,null,null),
('2026-06-15',1972.94,607.62,252,null,null,null,null,null),
('2026-06-16',2005.91,607.62,255,null,null,null,null,null),
('2026-06-17',2001.92,637.61,254,null,null,null,null,null),
('2026-06-18',2001.92,630.62,254,null,null,null,null,null),
('2026-06-19',2001.92,644.6,254,null,null,null,null,null),
('2026-06-20',2030.89,674.58,257,null,null,null,null,null),
('2026-06-21',2052.87,629.61,259,null,null,null,null,null),
('2026-06-22',2094.84,644.6,262,null,null,null,null,null),
('2026-06-23',2113.82,651.59,264,null,null,null,null,null),
('2026-06-24',2100.83,643.59,263,null,null,null,null,null),
('2026-06-25',2100.83,643.59,263,null,null,null,null,null),
('2026-06-26',2113.82,628.6,264,null,null,null,null,null),
('2026-06-27',2139.8,643.6,266,null,null,null,null,null),
('2026-06-28',2126.82,695.56,264,null,null,null,null,null),
('2026-06-29',2120.83,702.54,263,null,null,null,null,null),
('2026-06-30',2120.83,694.55,263,null,null,null,null,null),
('2026-07-01',2124.82,687.56,264,null,null,null,null,null),
('2026-07-02',2096.85,665.57,261,null,null,null,null,null),
('2026-07-03',2121.82,672.55,264,null,null,null,null,null),
('2026-07-04',2119.82,672.55,264,null,null,null,null,null),
('2026-07-05',2132.81,701.52,265,null,null,null,null,null),
('2026-07-06',2153.79,693.52,267,null,null,null,null,null),
('2026-07-07',2193.77,686.53,269,null,null,null,null,null),
('2026-07-08',2129.84,691.53,262,null,null,null,null,null),
('2026-07-09',2129.84,669.55,262,null,null,null,null,null),
('2026-07-10',2129.84,676.53,262,null,null,null,null,null),
('2026-07-11',2156.83,696.52,263,null,null,null,null,null),
('2026-07-12',2140.85,689.54,261,null,null,null,null,null),
('2026-07-13',2145.84,743.49,262,null,null,null,null,null),
('2026-07-14',2144.84,736.49,262,null,null,null,null,null),
('2026-07-15',2172.82,758.46,264,null,null,null,null,null),
('2026-07-16',2176.82,792.43,264,null,null,null,null,null),
('2026-07-17',2176.82,777.43,264,null,null,null,null,null),
('2026-07-18',2172.83,798.46,263,null,null,null,null,null),
('2026-07-19',2214.79,784.49,267,null,null,null,null,null),
('2026-07-20',2272.74,804.47,272,null,null,null,null,null),
('2026-07-21',2264.76,804.47,270,null,null,null,null,null),
('2026-07-22',2257.77,819.46,269,null,null,null,null,null),
('2026-07-23',2257.77,831.08,269,null,null,null,null,null),
('2026-07-24',2263.78,846.06,268,null,null,null,null,null),
('2026-07-25',2239.79,831.07,267,null,null,null,null,null),
('2026-07-26',2280.75,816.08,271,null,null,null,null,null),
('2026-07-27',2313.75,816.07,271,null,null,null,null,null),
('2026-07-28',2340.74,841.13,272,null,null,null,null,null),
('2026-07-29',2380.72,855.12,274,null,null,null,null,null),
('2026-07-30',2397.71,855.12,275,null,null,null,null,null),
('2026-07-31',2394.71,862.11,275,null,null,null,null,null),
('2026-08-01',2404.71,897.09,275,null,null,null,null,null),
('2026-08-02',2414.7,931.05,276,null,null,null,null,null),
('2026-08-03',2438.69,953.04,277,84,18,17,null,1),
('2026-08-04',2465.67,953.04,279,84,16,23,0,0),
('2026-08-05',2505.67,931.07,279,82,14,23,3,3),
('2026-08-06',2565.64,944.06,282,82,12,26,1,2),
('2026-08-07',2605.62,924.08,284,81,11,25,0,1),
('2026-08-08',2625.61,931.07,285,82,12,24,0,1),
('2026-08-09',2622.61,938.05,285,83,12,28,1,0),
('2026-08-10',2596.61,931.06,285,82,14,30,1,1),
('2026-08-11',2596.61,1005.02,285,87,16,29,1,0),
('2026-08-12',2596.61,1012,285,88,18,29,0,0),
('2026-08-13',2603.6,1052.6,286,92,20,24,0,2),
('2026-08-14',2590.6,1087.58,286,94,21,26,1,0),
('2026-08-15',2583.61,1087.59,285,94,21,27,2,1),
('2026-08-16',2633.59,1127.57,287,96,22,24,1,0),
('2026-08-17',2654.56,1119.57,290,96,24,22,0,2),
('2026-08-18',2701.53,1191.61,293,101,25,18,0,0),
('2026-08-19',2671.54,1178.42,292,100,27,18,1,3),
('2026-08-20',2720.52,1170.44,294,100,22,16,2,1),
('2026-08-21',2726.53,1177.43,293,101,25,16,2,0),
('2026-08-22',2736.52,1177.43,294,101,28,14,0,0),
('2026-08-23',2753.51,1157.82,295,100,26,16,1,1),
('2026-08-24',2792.47,1164.8,299,101,30,19,0,0),
('2026-08-25',2800.45,1164.8,301,101,31,22,1,0),
('2026-08-26',2793.44,1164.81,302,101,30,28,3,0),
('2026-08-27',2763.46,1164.81,300,101,34,38,2,0),
('2026-08-28',2776.46,1114.76,300,98,31,40,1,3),
('2026-08-29',2767.44,1134.75,302,99,29,46,2,0),
('2026-08-30',2810.42,1132.75,304,98,33,43,0,2),
('2026-08-31',2856.37,1166.71,309,101,27,44,0,0),
('2026-09-01',2883.35,1165.7,311,102,28,41,1,1),
('2026-09-02',2893.34,1185.73,312,103,28,41,2,1)
on conflict (day) do nothing;
