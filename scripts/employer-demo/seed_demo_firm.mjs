#!/usr/bin/env node
/**
 * Demo firm for the Employer Hub prospectus (10 Oct 2026, Andrew: "build a demo firm").
 *
 *   node scripts/employer-demo/seed_demo_firm.mjs             seed if nothing is seeded yet
 *   node scripts/employer-demo/seed_demo_firm.mjs --reset     delete the demo firm, then seed again (re-dated to today)
 *   node scripts/employer-demo/seed_demo_firm.mjs --delete    delete the demo firm and its accounts, and stop
 *   add --dry-run to run it all and roll back, --sql-only to print the SQL instead of running it.
 *
 * Ridgeway Electrical Ltd is fictional. Every person, customer, address and
 * figure in it is made up:
 *   - the owner and team are fixture accounts (founder+employerdemo-*@elec-mate.com),
 *     free access, no subscription, hidden from leaderboards, every marketing
 *     sequence marked as sent so nothing is ever mailed to them;
 *   - the two apprentices are the College Hub demo's fixture learners (Aisha
 *     Rahman, Kieran Doyle at Northgate Technical College), linked by roster
 *     row only, so the firm sees their college progress like a real firm would;
 *   - customers have NO email and NO phone, so the review-request, job-done,
 *     reminder and chase crons have nobody to contact;
 *   - phone numbers shown for staff are Ofcom's drama range (07700 900xxx);
 *   - every row is owned by the demo owner (user_id / employer_id) or one of
 *     its roster rows, so --delete removes exactly the firm and nothing else.
 *
 * Triggers are off for the data load (session_replication_role = replica,
 * inside the transaction), so no push, email, webhook, seat sync or founder
 * alert fires. Before COMMIT the run checks nothing was queued over HTTP.
 *
 * Runs through the Supabase CLI (`db query --linked`). Passwords for the
 * accounts used for screenshots are written to e2e/employer-demo.local
 * (gitignored).
 */
import { execFileSync } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'jtwygbeceundfgnkirof';
const args = new Set(process.argv.slice(2));
const MODE = args.has('--delete') ? 'delete' : args.has('--reset') ? 'reset' : 'seed';
const SQL_ONLY = args.has('--sql-only');
const DRY = args.has('--dry-run');

/* ───────────────────────────── ids ───────────────────────────── */
const id = (g, n) => `ed000000-2026-4000-80${g}-${n.toString(16).padStart(12, '0')}`;
const OWNER = id('00', 1);
const FIRM = 'Ridgeway Electrical Ltd';
const q = (v) =>
  v === null || v === undefined
    ? 'null'
    : typeof v === 'object'
      ? `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`
      : `'${String(v).replace(/'/g, "''")}'`;

// Accounts that sign in (owner + the team who have joined)
const credFile = path.join(root, 'e2e/employer-demo.local');
const creds = fs.existsSync(credFile) ? JSON.parse(fs.readFileSync(credFile, 'utf8')) : {};
const password = creds.password || randomBytes(12).toString('base64url');

const TEAM = [
  { n: 1, name: 'Sam Whitaker', ini: 'SW', role: 'Approved Electrician', team: 'Supervisor', rate: 24, qs: true, acct: 'sam', join: -900 },
  { n: 2, name: 'Liam Brennan', ini: 'LB', role: 'Electrician', team: 'Electrician', rate: 21, acct: 'liam', join: -620 },
  { n: 3, name: 'Priya Desai', ini: 'PD', role: 'Electrician', team: 'Electrician', rate: 21, acct: 'priya', join: -410 },
  { n: 4, name: 'Tom Ashworth', ini: 'TA', role: 'Electrician', team: 'Electrician', rate: 20, acct: 'tom', join: -300 },
  { n: 5, name: 'Gary Fenton', ini: 'GF', role: "Electrician's mate", team: 'Operative', rate: 14, acct: 'gary', join: -540 },
  { n: 6, name: 'Chloe Barnes', ini: 'CB', role: 'Office manager', team: 'Project Manager', rate: 16, acct: 'chloe', join: -700 },
  // College Hub demo fixture learners (Northgate Technical College)
  { n: 7, name: 'Aisha Rahman', ini: 'AR', role: 'Apprentice', team: 'Apprentice', rate: 9.2, uid: 'fc000000-1852-4000-8001-00000000000d', join: -400 },
  { n: 8, name: 'Kieran Doyle', ini: 'KD', role: 'Apprentice', team: 'Apprentice', rate: 7.55, uid: 'fc000000-1852-4000-8001-000000000006', join: -40 },
  // Invited, not joined yet
  { n: 9, name: 'Josh Kerr', ini: 'JK', role: 'Electrician', team: 'Electrician', rate: 20, invited: true, join: -3 },
];
for (const t of TEAM) {
  t.id = id('01', t.n);
  if (t.acct) {
    t.uid = id('02', t.n);
    t.email = `founder+employerdemo-${t.acct}@elec-mate.com`;
  }
  t.phone = `07700 900${String(100 + t.n * 7).padStart(3, '0')}`;
}
const tm = (ini) => TEAM.find((t) => t.ini === ini);
const ACCOUNTS = [
  { uid: OWNER, email: 'founder+employerdemo@elec-mate.com', name: 'Dan Mercer', owner: true },
  ...TEAM.filter((t) => t.acct).map((t) => ({ uid: t.uid, email: t.email, name: t.name })),
];

/* Leeds and around: a real area, invented house numbers */
const CUSTOMERS = [
  ['Mr & Mrs Holroyd', null, '14 Moorland Road, Leeds', 'LS6 1AL', 53.8183, -1.5631],
  ['Mrs J Oyelaran', null, '3 Grange Avenue, Roundhay, Leeds', 'LS8 2PD', 53.8346, -1.4987],
  ['Kirkgate Dental Practice', 'Kirkgate Dental Practice', '61 Kirkgate, Leeds', 'LS2 7DJ', 53.7966, -1.5401],
  ['Mr P Lindqvist', null, '22 Otley Old Road, Cookridge, Leeds', 'LS16 6HH', 53.8615, -1.6105],
  ['Northern Lettings Ltd', 'Northern Lettings Ltd', '9 Park Square East, Leeds', 'LS1 2NE', 53.7988, -1.5536],
  ['Ms R Achebe', null, '41 Wetherby Road, Leeds', 'LS8 2JU', 53.8312, -1.5055],
  ['Calder Storage Ltd', 'Calder Storage Ltd', 'Unit 4, Leeds Valley Park, Leeds', 'LS10 1AB', 53.7539, -1.5266],
  ['Mr D Okafor', null, '7 Rein Road, Morley', 'LS27 0HZ', 53.7442, -1.5996],
  ['The Corner Larder', 'The Corner Larder', '118 Harrogate Road, Chapel Allerton, Leeds', 'LS7 4NZ', 53.8287, -1.5371],
  ['Harewood Court Management Co', 'Harewood Court Management Co', 'Harewood Court, Leeds', 'LS17 8PN', 53.8604, -1.5245],
  ['Mrs A Fairbairn', null, '5 Church Lane, Adel, Leeds', 'LS16 8DE', 53.8551, -1.5838],
  ['Mr T Ng', null, '30 Victoria Road, Headingley, Leeds', 'LS6 1DL', 53.8155, -1.5735],
].map(([name, company, address, postcode, lat, lng], i) => ({ id: id('03', i + 1), name, company, address, postcode, lat, lng }));
const cust = (name) => CUSTOMERS.find((c) => c.name.startsWith(name));

// [title, customer, status, stage, startOffset, endOffset, value, type, crew [ini...], hours/day, progress, quotedHours]
const JOBS = [
  ['Full rewire, 3-bed semi', 'Mr & Mrs Holroyd', 'Active', 'In Progress', -4, 6, 6850, 'Rewire', ['SW', 'AR', 'GF'], 8, 45, 160],
  ['Consumer unit upgrade and EICR', 'Mrs J Oyelaran', 'Active', 'Scheduled', 2, 2, 1240, 'Consumer unit', ['LB'], 8, 0, 8],
  ['7 kW EV charger install', 'Ms R Achebe', 'Pending', 'Confirmed', 5, 5, 1095, 'EV charging', ['PD'], 7, 0, 6],
  ['Periodic inspection, three floors', 'Kirkgate Dental Practice', 'Active', 'In Progress', -1, 3, 2400, 'EICR', ['TA', 'KD'], 8, 40, 30],
  ['Kitchen extension, first fix', 'Mr P Lindqvist', 'Active', 'In Progress', -2, 4, 3200, 'Extension', ['LB', 'GF'], 8, 35, 40],
  ['Landlord EICRs, six flats', 'Northern Lettings Ltd', 'Active', 'Scheduled', 3, 4, 1080, 'EICR', ['PD'], 8, 0, 14],
  ['Solar PV and battery, 6 kWp', 'Mr D Okafor', 'Pending', 'Quoted', 12, 14, 9400, 'Solar PV', ['SW', 'PD'], 8, 0, 40],
  ['Warehouse LED lighting upgrade', 'Calder Storage Ltd', 'Active', 'In Progress', -6, 8, 5600, 'Lighting', ['TA', 'KD'], 8, 55, 90],
  ['Tripping RCD, fault find', 'Mrs A Fairbairn', 'Completed', 'Complete', -9, -9, 180, 'Fault finding', ['LB'], 3, 100, 2],
  ['Shop fit-out, second fix', 'The Corner Larder', 'Active', 'Testing', -12, 1, 7900, 'Commercial fit-out', ['SW', 'AR'], 8, 85, 120],
  ['Garden office supply', 'Mr T Ng', 'Completed', 'Complete', -20, -18, 1650, 'New circuit', ['TA'], 8, 100, 20],
  ['Fire alarm service, 42 flats', 'Harewood Court Management Co', 'Pending', 'Confirmed', 8, 8, 640, 'Fire alarm', ['PD'], 6, 0, 6],
].map(([title, customer, status, stage, s, e, value, type, crew, hpd, progress, qh], i) => {
  const c = cust(customer);
  // A short hop from the customer's postcode so pins sit on the street, not the centroid
  return { id: id('04', i + 1), title, c, status, stage, s, e, value, type, crew, hpd, progress, qh };
});

/* ───────────────────────────── sql ───────────────────────────── */
const out = [];
const sql = (s) => out.push(s.trim().endsWith(';') ? s : `${s};`);

sql('begin');
sql(`create or replace function pg_temp.d(n int) returns date language sql as $$ select ((now() at time zone 'Europe/London')::date + n) $$`);
sql(`create or replace function pg_temp.ts(n int, hm text) returns timestamptz language sql as $$ select (((now() at time zone 'Europe/London')::date + n) + hm::time) at time zone 'Europe/London' $$`);

// Delete: everything the firm owns, then its accounts
const ROSTER = `(select id from public.employer_employees where employer_id = '${OWNER}')`;
const JOBSQ = `(select id from public.employer_jobs where user_id = '${OWNER}')`;
function deleteFirm() {
  sql(`set local session_replication_role = replica`);
  for (const t of ['employer_timesheets', 'employer_worker_locations', 'employer_leave_requests', 'employer_expense_claims', 'employee_holiday_allowances', 'employer_seats']) {
    sql(`delete from public.${t} where employee_id in ${ROSTER}`);
  }
  sql(`delete from public.employer_job_assignments where job_id in ${JOBSQ}`);
  sql(`delete from public.employer_job_comments where job_id in ${JOBSQ}`);
  sql(`delete from public.calendar_events where user_id = '${OWNER}'`);
  sql(`delete from public.enquiries where user_id = '${OWNER}'`);
  sql(`delete from public.quotes where user_id = '${OWNER}'`);
  sql(`delete from public.employer_jobs where user_id = '${OWNER}'`);
  sql(`delete from public.customers where user_id = '${OWNER}'`);
  sql(`delete from public.employer_employees where employer_id = '${OWNER}'`);
  sql(`delete from public.company_profiles where user_id = '${OWNER}'`);
  sql(`set local session_replication_role = origin`);
  // Cascades clean anything the app made for these accounts while they were used
  sql(`delete from auth.users where email like 'founder+employerdemo%@elec-mate.com'`);
}

if (MODE === 'delete' || MODE === 'reset') deleteFirm();
if (MODE === 'seed') {
  sql(`do $$ begin if exists (select 1 from public.employer_employees where employer_id = '${OWNER}') then
    raise exception 'ALREADY_SEEDED: Ridgeway Electrical is already seeded. Use --reset to rebuild it.'; end if; end $$`);
}

if (MODE !== 'delete') {
  /* accounts */
  for (const a of ACCOUNTS) {
    sql(`insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, confirmation_token, recovery_token,
      email_change_token_new, email_change, email_change_token_current, phone_change, phone_change_token, reauthentication_token,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at, is_sso_user, is_anonymous)
    values ('00000000-0000-0000-0000-000000000000', '${a.uid}', 'authenticated', 'authenticated', ${q(a.email)},
      extensions.crypt(${q(password)}, extensions.gen_salt('bf')), now(), '', '', '', '', '', '', '', '',
      '{"provider":"email","providers":["email"]}'::jsonb,
      ${q({ full_name: a.name, email_verified: true, created_via: 'admin_bulk', fixture: 'employer-demo' })}, now() - interval '400 days', now(), false, false)`);
    sql(`insert into auth.identities (provider_id, user_id, identity_data, provider, created_at, updated_at)
    values ('${a.uid}', '${a.uid}', jsonb_build_object('sub', '${a.uid}', 'email', ${q(a.email)}, 'email_verified', true), 'email', now(), now())`);
  }

  // From here on, no trigger fires: no push, email, webhook, seat sync or founder alert
  sql(`set local session_replication_role = replica`);

  for (const a of ACCOUNTS) {
    sql(`insert into public.profiles (id) values ('${a.uid}') on conflict (id) do nothing`);
    sql(`update public.profiles set full_name = ${q(a.name)}, role = ${q(a.owner ? 'employer' : 'electrician')},
      subscription_tier = ${q(a.owner ? 'employer' : null)}, onboarding_completed = true,
      free_access_granted = true, free_access_reason = 'Employer Hub demo firm (Ridgeway Electrical): fictional fixture account',
      subscribed = false, leaderboard_visible = false, leaderboard_excluded = true, created_via = 'admin_bulk',
      employer_seat_cap = ${a.owner ? 20 : 'null'}, setup_banner_dismissed = true,
      incomplete_signup_sent_at = now(), incomplete_signup_v2_sent_at = now(), incomplete_signup_v3_sent_at = now(),
      incomplete_signup_v10_sent_at = now(), incomplete_signup_v11_sent_at = now(), incomplete_signup_v11_nudge_sent_at = now(),
      reengage_email_sent_at = now(), reengage_email_2_sent_at = now(), reengage_email_3_sent_at = now(),
      winback_offer_sent_at = now(), apprentice_campaign_sent_at = now(), apprentice_campaign_type = 'fixture'
     where id = '${a.uid}'`);
  }

  /* the firm */
  sql(`insert into public.company_profiles (user_id, company_name, company_address, company_postcode, company_phone, company_email,
      company_registration, vat_number, primary_color, currency, locale, payment_terms, hourly_rate, day_rate,
      registration_scheme, registration_number, insurance_provider, insurance_coverage, office_lat, office_lng, office_address,
      quote_validity_days, deposit_percentage, overhead_percentage, profit_margin, default_vat_registered, default_break_minutes,
      mileage_rate_pence, pay_frequency, pay_period_anchor, payday_offset_days, working_day_hours, review_request_enabled, owner_is_qs, qs_approval_required)
    values ('${OWNER}', ${q(FIRM)}, 'Unit 7, Hunslet Trading Estate, Leeds', 'LS10 1QX', '0113 496 0241', 'office@ridgeway-electrical.example',
      '15550123', 'GB 123 4567 89', '#FFD600', 'GBP', 'en-GB', '14 days', 48, 360,
      'NICEIC Approved Contractor', 'D-000000', 'Example Insurance', 'Public liability £5m, employers'' liability £10m', 53.7826, -1.5367,
      'Unit 7, Hunslet Trading Estate, Leeds LS10 1QX', 30, 25, 12, 18, true, 30, 45, 'weekly', pg_temp.d(-12), 5, 8, false, false, true)`);

  /* team */
  for (const t of TEAM) {
    sql(`insert into public.employer_employees (id, employer_id, name, role, team_role, status, phone, email, avatar_initials, hourly_rate,
        join_date, user_id, is_principal_qs, pay_type, claimed_at, supervisor_employee_id, created_at)
      values ('${t.id}', '${OWNER}', ${q(t.name)}, ${q(t.role)}, ${q(t.team)}, 'Active', ${q(t.phone)}, ${q(t.invited ? null : t.email ?? null)},
        ${q(t.ini)}, ${t.rate}, pg_temp.d(${t.join}), ${t.invited ? 'null' : q(t.uid)}, ${t.qs ? 'true' : 'false'},
        ${q(t.team === 'Project Manager' ? 'salary' : 'hourly')}, ${t.invited ? 'null' : `pg_temp.ts(${t.join}, '09:00')`},
        ${t.team === 'Apprentice' ? q(tm('SW').id) : 'null'}, pg_temp.ts(${t.join}, '09:00'))`);
    if (!t.invited) {
      sql(`insert into public.employer_seats (employer_id, employee_id, user_id, status)
        values ('${OWNER}', '${t.id}', ${q(t.uid)}, 'active') on conflict do nothing`);
    }
  }
  sql(`insert into public.employee_holiday_allowances (user_id, employee_id, year, total_days, days_per_week)
    select '${OWNER}', id, extract(year from now())::int, 28, 5 from public.employer_employees where employer_id = '${OWNER}' on conflict do nothing`);

  /* customers: no email, no phone, on purpose */
  for (const c of CUSTOMERS) {
    sql(`insert into public.customers (id, user_id, name, company_name, address, postcode, latitude, longitude, status, notes, created_at, client_notifications_enabled, campaign_opted_out_at)
      values ('${c.id}', '${OWNER}', ${q(c.name)}, ${q(c.company)}, ${q(c.address)}, ${q(c.postcode)}, ${c.lat}, ${c.lng}, 'active',
        'Demo customer (fictional). No contact details on purpose.', now() - interval '200 days', false, now())`);
  }

  /* jobs, crews, diary */
  JOBS.forEach((j, i) => {
    const jitter = ((i * 37) % 9) / 10000;
    sql(`insert into public.employer_jobs (id, user_id, title, client, location, lat, lng, status, board_stage, progress, start_date, end_date,
        workers_count, value, description, customer_id, job_type, quoted_hours, site_contact_name, access_notes, created_at, completed_at, position)
      values ('${j.id}', '${OWNER}', ${q(j.title)}, ${q(j.c.name)}, ${q(`${j.c.address}, ${j.c.postcode}`)}, ${j.c.lat + jitter}, ${j.c.lng - jitter},
        ${q(j.status)}, ${q(j.stage)}, ${j.progress}, pg_temp.d(${j.s}), pg_temp.d(${j.e}), ${j.crew.length}, ${j.value},
        ${q(`${j.type} for ${j.c.name}. Demo job (fictional).`)}, '${j.c.id}', ${q(j.type)}, ${j.qh},
        ${q(j.c.company ? 'Site manager' : j.c.name)}, ${q(i % 3 === 0 ? 'Key safe by the side door. Park on the drive.' : null)},
        pg_temp.ts(${j.s - 14}, '10:00'), ${j.status === 'Completed' ? `pg_temp.ts(${j.e}, '16:00')` : 'null'}, ${i})`);
    j.crew.forEach((ini, k) => {
      sql(`insert into public.employer_job_assignments (job_id, employee_id, start_date, end_date, role_on_job, status, assigned_by, start_time, hours_per_day, seen_at)
        values ('${j.id}', '${tm(ini).id}', pg_temp.d(${j.s}), pg_temp.d(${j.e}), ${q(k === 0 ? 'Lead' : 'Crew')}, 'assigned', 'Chloe Barnes', '08:00', ${j.hpd}, now() - interval '2 days')`);
    });
  });

  /* where everyone is right now */
  const WHERE = [
    ['SW', 'On Site', 0, 6], ['AR', 'On Site', 0, 6], ['GF', 'On Site', 0, 12],
    ['TA', 'On Site', 7, 3], ['KD', 'On Site', 7, 3],
    ['LB', 'En Route', 4, 2], ['PD', 'Office', null, 25], ['CB', 'Office', null, 40],
  ];
  for (const [ini, status, jobIdx, mins] of WHERE) {
    const j = jobIdx === null ? null : JOBS[jobIdx];
    const lat = j ? j.c.lat : status === 'Office' ? 53.7826 : null;
    const lng = j ? j.c.lng : status === 'Office' ? -1.5367 : null;
    const enRoute = status === 'En Route';
    sql(`insert into public.employer_worker_locations (employee_id, job_id, lat, lng, accuracy, status, checked_in_at, last_updated, source)
      values ('${tm(ini).id}', ${j ? q(j.id) : 'null'}, ${enRoute ? 53.8051 : lat}, ${enRoute ? -1.5702 : lng}, 12, ${q(status)},
        ${status === 'On Site' ? `now() - interval '${mins + 120} minutes'` : 'null'}, now() - interval '${mins} minutes', 'self')`);
  }

  /* timesheets: the last two weeks, approved; this week waiting */
  const sheetCrew = ['SW', 'LB', 'PD', 'TA', 'GF', 'AR', 'KD'];
  for (let day = -13; day <= -1; day++) {
    sheetCrew.forEach((ini, k) => {
      const job = JOBS.find((j) => j.crew.includes(ini) && j.s <= day && j.e >= day) || JOBS[(k * 3) % JOBS.length];
      const thisWeek = day > -6;
      sql(`insert into public.employer_timesheets (employee_id, job_id, date, clock_in, clock_out, break_minutes, total_hours, status, approved_by, approved_at,
          clock_in_lat, clock_in_lng, clock_in_location_status, clock_out_lat, clock_out_lng, clock_out_location_status)
        select '${tm(ini).id}', '${job.id}', pg_temp.d(${day}), pg_temp.ts(${day}, '07:${String(45 + (k % 3) * 5).padStart(2, '0')}'),
          pg_temp.ts(${day}, '16:${String(15 + (k % 4) * 5).padStart(2, '0')}'), 30, ${(8.5 - 0.5 + ((k % 4) * 5 - (k % 3) * 5) / 60).toFixed(2)},
          ${q(thisWeek && k % 2 === 0 ? 'Pending' : 'Approved')}, ${thisWeek && k % 2 === 0 ? 'null' : q('Chloe Barnes')},
          ${thisWeek && k % 2 === 0 ? 'null' : `pg_temp.ts(${day + 1}, '09:30')`},
          ${job.c.lat}, ${job.c.lng}, 'captured', ${job.c.lat}, ${job.c.lng}, 'captured'
        where extract(isodow from pg_temp.d(${day})) between 1 and 5`);
    });
  }

  /* leave */
  sql(`insert into public.employer_leave_requests (employee_id, employee_name, type, start_date, end_date, total_days, status, reason, created_at)
    values ('${tm('LB').id}', 'Liam Brennan', 'annual', pg_temp.d(17), pg_temp.d(21), 5, 'pending', 'Family holiday', now() - interval '1 day'),
           ('${tm('GF').id}', 'Gary Fenton', 'annual', pg_temp.d(9), pg_temp.d(9), 1, 'approved', 'Appointment', now() - interval '8 days'),
           ('${tm('PD').id}', 'Priya Desai', 'training', pg_temp.d(24), pg_temp.d(25), 2, 'approved', '18th Edition update course', now() - interval '12 days')`);

  /* expenses */
  sql(`insert into public.employer_expense_claims (employee_id, job_id, category, description, amount, status, submitted_date)
    values ('${tm('SW').id}', '${JOBS[0].id}', 'Materials', 'Clips and grommets, wholesaler counter', 18.40, 'Pending', pg_temp.d(-1)),
           ('${tm('TA').id}', '${JOBS[7].id}', 'Parking', 'Calder Storage, two days', 12.00, 'Approved', pg_temp.d(-4)),
           ('${tm('LB').id}', '${JOBS[4].id}', 'Tools', 'Replacement hole saw', 26.99, 'Pending', pg_temp.d(-2))`);

  /* quotes and invoices: six months of work for the money chart */
  const lines = (desc, amount) => [
    { id: 'l1', description: desc, category: 'labour', quantity: 1, unit: 'job', unitPrice: Math.round(amount * 0.55), totalPrice: Math.round(amount * 0.55) },
    { id: 'l2', description: 'Materials', category: 'materials', quantity: 1, unit: 'lot', unitPrice: Math.round(amount * 0.45), totalPrice: Math.round(amount * 0.45) },
  ];
  const settings = { vatRegistered: true, vatRate: 20, labourRate: 48, paymentTerms: '14 days', validForDays: 30 };
  let qn = 140;
  const quote = ({ c, title, net, status, acc, inv, invOffset, paidOffset, dueDays = 14, jobId = null, created }) => {
    qn += 1;
    const vat = Math.round(net * 0.2 * 100) / 100;
    const total = net + vat;
    const qid = id('05', qn);
    sql(`insert into public.quotes (id, user_id, quote_number, client_data, items, settings, subtotal, vat_amount, total, status, acceptance_status, accepted_at,
        expiry_date, customer_id, job_details, employer_job_id, created_at, updated_at, first_sent_at,
        invoice_raised, invoice_number, invoice_status, invoice_date, invoice_due_date, invoice_paid_at, total_paid, created_by_user_id)
      values ('${qid}', '${OWNER}', 'Q-2026-${qn}', ${q({ name: c.name, address: c.address, postcode: c.postcode, customerId: c.id })}, ${q(lines(title, net))}, ${q(settings)},
        ${net}, ${vat}, ${total}, ${q(status)}, ${q(acc)}, ${acc === 'accepted' ? `pg_temp.ts(${created + 2}, '18:20')` : 'null'},
        pg_temp.ts(${created + 30}, '23:59'), '${c.id}', ${q({ title, location: c.address })}, ${jobId ? q(jobId) : 'null'},
        pg_temp.ts(${created}, '11:00'), now(), ${status === 'draft' ? 'null' : `pg_temp.ts(${created}, '11:05')`},
        ${inv ? 'true' : 'false'}, ${inv ? q(`INV-2026-${qn}`) : 'null'}, ${inv ? q(inv) : 'null'},
        ${inv ? `pg_temp.ts(${invOffset}, '17:00')` : 'null'}, ${inv ? `pg_temp.ts(${invOffset + dueDays}, '17:00')` : 'null'},
        ${paidOffset !== undefined ? `pg_temp.ts(${paidOffset}, '10:00')` : 'null'}, ${paidOffset !== undefined ? total : 0}, '${OWNER}')`);
  };
  // Invoiced work over the last six months (paid, a few still owed, one overdue)
  const past = [
    [-170, 2850], [-162, 640], [-150, 4200], [-141, 1180], [-133, 3650], [-121, 980], [-112, 5400], [-104, 1450],
    [-96, 2300], [-88, 6100], [-79, 870], [-71, 3900], [-63, 1620], [-55, 4750], [-47, 2100], [-40, 7200],
    [-33, 1340], [-26, 3300], [-19, 5850], [-16, 2650], [-14, 3980], [-12, 2480], [-11, 1720], [-9, 4200], [-8, 1650], [-7, 3600], [-6, 2900], [-5, 180], [-3, 4800],
  ];
  past.forEach(([off, net], k) => {
    const c = CUSTOMERS[k % CUSTOMERS.length];
    const owed = off > -13 && ![-11, -9, -7].includes(off);
    const overdue = off === -40;
    quote({
      c, title: ['Rewire', 'EICR', 'Consumer unit upgrade', 'Lighting upgrade', 'EV charger', 'New circuits'][k % 6], net,
      status: 'approved', acc: 'accepted', created: off - 10,
      inv: owed || overdue ? (overdue ? 'overdue' : 'sent') : 'paid', invOffset: off,
      paidOffset: owed || overdue ? undefined : Math.min(off + 6 + (k % 9), -1),
    });
  });
  // Open quotes and accepted work not yet invoiced
  quote({ c: cust('Mr D Okafor'), title: 'Solar PV and battery, 6 kWp', net: 9400, status: 'sent', acc: 'pending', created: -6, jobId: JOBS[6].id });
  quote({ c: cust('Harewood'), title: 'Fire alarm service, 42 flats', net: 640, status: 'approved', acc: 'accepted', created: -9, jobId: JOBS[11].id });
  quote({ c: cust('Ms R Achebe'), title: '7 kW EV charger install', net: 1095, status: 'approved', acc: 'accepted', created: -11, jobId: JOBS[2].id });
  quote({ c: cust('Mrs A Fairbairn'), title: 'Kitchen lighting and sockets', net: 1380, status: 'sent', acc: 'pending', created: -3 });
  quote({ c: cust('Kirkgate'), title: 'Emergency lighting upgrade', net: 2950, status: 'sent', acc: 'pending', created: -2 });
  quote({ c: cust('The Corner Larder'), title: 'Shop fit-out, second fix', net: 7900, status: 'approved', acc: 'accepted', created: -30, jobId: JOBS[9].id });

  /* enquiries: new leads in the front door */
  const ENQ = [
    ['email', 'Rachel Simmonds', 'LS12 3AB', 'Sockets keep tripping in the kitchen since the weekend. Can someone look this week?', 'Fault finding', 'soon', 'domestic', 90],
    ['quote_page', 'Owen Tranter', 'LS18 4DD', 'Looking for a quote to add an EV charger on the drive, Tesla Model 3.', 'EV charging', 'flexible', 'domestic', 300],
    ['checkatrade', 'M. Hussain', 'LS9 7QF', 'Landlord certificate needed for a two-bed flat before new tenants on the 1st.', 'EICR', 'soon', 'landlord', 1300],
    ['website', 'Becca Lowe', 'LS28 5TT', 'Garden room going in next month, need a supply run from the house, about 15 m.', 'New circuit', 'flexible', 'domestic', 2900],
  ];
  ENQ.forEach(([source, name, postcode, text, type, urgency, cat, mins], k) => {
    sql(`insert into public.enquiries (id, user_id, source, status, name, postcode, job_description, job_type, urgency, summary, confidence, received_at, work_category, contact_hidden, is_test, created_at)
      values ('${id('06', k + 1)}', '${OWNER}', ${q(source)}, 'new', ${q(name)}, ${q(postcode)}, ${q(text)}, ${q(type)}, ${q(urgency)},
        ${q(text.split('.')[0])}, 0.92, now() - interval '${mins} minutes', ${q(cat)}, ${source === 'checkatrade' ? 'true' : 'false'}, false, now() - interval '${mins} minutes')`);
  });

  /* progress notes from site */
  [[0, 'SW', 'First fix complete upstairs. Back boxes in, cables pulled to the board position.', 26],
   [7, 'TA', 'Bays 1 to 4 done and tested. Starting bay 5 tomorrow.', 70],
   [9, 'SW', 'Second fix finished. Testing booked for tomorrow morning.', 200]].forEach(([j, ini, text, mins]) => {
    sql(`insert into public.employer_job_comments (job_id, author_name, author_employee_id, author_user_id, content, comment_type, created_at)
      values ('${JOBS[j].id}', ${q(tm(ini).name)}, '${tm(ini).id}', ${q(tm(ini).uid)}, ${q(text)}, 'progress', now() - interval '${mins} minutes')`);
  });

  sql(`set local session_replication_role = origin`);
}

/* safety: nothing queued to reach anyone */
sql(`do $$
declare v_http int;
  v_epoch bigint := pg_current_xact_id()::text::bigint - (pg_current_xact_id()::text::bigint % 4294967296);
begin
  select count(*) into v_http from net.http_request_queue h
   where pg_xact_status((v_epoch + h.xmin::text::bigint)::text::xid8) = 'in progress';
  if v_http > 0 then raise exception 'SAFETY: this run would make % HTTP calls. Rolled back.', v_http; end if;
end $$`);
sql(`select jsonb_build_object('mode', '${MODE}',
  'team', (select count(*) from public.employer_employees where employer_id = '${OWNER}'),
  'jobs', (select count(*) from public.employer_jobs where user_id = '${OWNER}'),
  'customers', (select count(*) from public.customers where user_id = '${OWNER}'),
  'quotes', (select count(*) from public.quotes where user_id = '${OWNER}'),
  'timesheets', (select count(*) from public.employer_timesheets where employee_id in ${ROSTER}),
  'enquiries', (select count(*) from public.enquiries where user_id = '${OWNER}')) as summary`);
sql(DRY ? 'rollback' : 'commit');

const text = out.join('\n');
if (SQL_ONLY) {
  console.log(text);
  process.exit(0);
}
const file = path.join(os.tmpdir(), `employer-demo-${Date.now()}.sql`);
fs.writeFileSync(file, text);
try {
  const stdout = execFileSync('npx', ['--yes', 'supabase', 'db', 'query', '--linked', '--project-ref', PROJECT_REF, '-o', 'json', '-f', file], {
    cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024,
  });
  console.log(stdout.slice(-1500));
  if (MODE !== 'delete' && !DRY) {
    fs.writeFileSync(credFile, JSON.stringify({ note: 'Employer Hub demo firm (fictional). Not committed.', owner_email: ACCOUNTS[0].email, worker_email: tm('SW').email, password }, null, 2));
    console.log(`Sign-in details written to ${path.relative(root, credFile)}`);
  }
} catch (e) {
  console.error(`${e.stdout || ''}${e.stderr || ''}`.slice(0, 4000));
  console.error(`SQL kept at ${file}`);
  process.exit(1);
}
