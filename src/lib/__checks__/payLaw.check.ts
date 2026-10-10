/**
 * Pay law maths — ELE-2062 / ELE-2063.
 *
 *   node scripts/check-pay-law.mjs
 *
 * Every figure here is either a gov.uk worked example or the worked example
 * posted on the Linear tickets, so the app and the comment cannot drift.
 */
import {
  FALLBACK_RATES as R,
  accrualForPeriod,
  accrueOverPeriods,
  apprenticeFunding,
  apprenticeRateEnds,
  averageWeeklyHoursBefore,
  sspAverageWeeklyEarnings,
  type PayrollExtras,
  checkPay,
  fitNoteState,
  isoWeekOf,
  minimumWageOn,
  referenceAverage,
  rolledUpHolidayPay,
  sspForPeriod,
  sspWeekly,
  youngScheduleWarnings,
  youngWorkerFlags,
} from '../payLaw';
import { afterEarlierRuns, wageCheck } from '../../services/payRun';

let failures = 0;
const eq = (name: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(
    `${ok ? '  PASS' : '  FAIL'}  ${name}${ok ? '' : `  — got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`}`
  );
  if (!ok) failures += 1;
};

console.log('Holiday accrual (WTR reg 15B)');
eq('gov.uk Jill: 68 hours → 8 hours', accrualForPeriod(68), 8);
eq('37.5 hours → 4.526 → 5 (31.6 min rounds up)', accrualForPeriod(37.5), 5);
eq('22 hours → 2.655 → 3', accrualForPeriod(22), 3);
eq('41.25 hours → 4.979 → 5', accrualForPeriod(41.25), 5);
eq('4 hours → 0.483 → 0 (29 min drops)', accrualForPeriod(4), 0);
eq('0 hours → 0', accrualForPeriod(0), 0);

// The ticket's worked example: four weekly pay periods of approved timesheets.
const ticket = accrueOverPeriods(
  [
    { date: '2026-09-07', hours: 8 },
    { date: '2026-09-08', hours: 9.5 },
    { date: '2026-09-09', hours: 10 },
    { date: '2026-09-10', hours: 10 }, // week of 7 Sep: 37.5h
    { date: '2026-09-15', hours: 11 },
    { date: '2026-09-17', hours: 11 }, // week of 14 Sep: 22h
    { date: '2026-09-21', hours: 8.25 },
    { date: '2026-09-22', hours: 8.25 },
    { date: '2026-09-23', hours: 8.25 },
    { date: '2026-09-24', hours: 8.25 },
    { date: '2026-09-25', hours: 8.25 }, // week of 21 Sep: 41.25h
    // week of 28 Sep: nothing
    { date: '2026-10-05', hours: 6 }, // week of 5 Oct: still running on 7 Oct
  ],
  isoWeekOf,
  '2026-10-07'
);
eq('ticket example: accrued in finished weeks = 5 + 3 + 5 = 13 hours', ticket.accruedHours, 13);
eq('ticket example: week still running would add 1 (6h → 0.724 → 1)', ticket.accruingNow, 1);
eq('ticket example: hours worked', ticket.workedHours, 106.75);

console.log('Rolled-up holiday pay (reg 16A)');
eq('gov.uk Mark: £460 → £55.52', rolledUpHolidayPay(460), 55.52);
eq(
  '35h × £10.42 = £364.70 → £44.02 (gov.uk rounds a middle step to show £44.06)',
  rolledUpHolidayPay(364.7),
  44.02
);

console.log('52-week reference period');
const weeks = Array.from({ length: 60 }, (_, i) => {
  const d = new Date(Date.UTC(2025, 7, 4 + 7 * i)); // Mondays from 4 Aug 2025
  const weekStart = d.toISOString().slice(0, 10);
  return { weekStart, pay: i % 10 === 3 ? 0 : 400 + (i % 3) * 50, hours: 30 + (i % 3) * 5 };
});
const avg = referenceAverage(weeks, '2026-10-05');
eq('reference: 52 paid weeks used (zero weeks skipped)', avg?.weeksUsed, 52);
eq('reference: not short', avg?.short, false);
eq(
  'reference: short when only 3 paid weeks',
  referenceAverage(weeks.slice(0, 3), '2026-10-05')?.short,
  true
);

console.log('SSP (s.157, day one from 6 Apr 2026)');
eq('AWE £500 → 80% £400 → flat £123.25', sspWeekly(R, 500, '2026-10-01')?.weekly, 123.25);
eq('AWE £120 → 80% = £96.00', sspWeekly(R, 120, '2026-10-01')?.weekly, 96);
const ssp = sspForPeriod({
  rates: R,
  sickStart: '2026-09-30', // Wednesday
  sickEnd: '2026-10-09', // Friday the week after
  periodStart: '2026-10-05',
  periodEnd: '2026-10-11',
  awe: 500,
  daysPerWeek: 5,
});
eq('SSP: Wed 30 Sep to Fri 9 Oct, week of 5 Oct = 5 qualifying days', ssp.days, 5);
eq('SSP: daily £123.25 / 5 = £24.65', ssp.dailyRate, 24.65);
eq('SSP: week pay = £123.25', ssp.pay, 123.25);
eq('SSP: 3 days already in the week before (day one, no waiting days)', ssp.daysBefore, 3);
const sspFirst = sspForPeriod({
  rates: R,
  sickStart: '2026-09-30',
  sickEnd: '2026-10-09',
  periodStart: '2026-09-28',
  periodEnd: '2026-10-04',
  awe: 500,
});
eq(
  'SSP: first week pays from day one, Wed to Fri = 3 days = £73.95',
  [sspFirst.days, sspFirst.pay],
  [3, 73.95]
);
eq(
  'fit note needed after 7 days in a row',
  fitNoteState('2026-09-30', '2026-10-09', false, '2026-10-10'),
  'needed'
);
eq(
  'fit note not needed for 7 days',
  fitNoteState('2026-10-01', '2026-10-07', false, '2026-10-10'),
  'not_needed'
);

console.log('National Minimum Wage');
eq(
  '17 in year 2 of an apprenticeship → apprentice £8.00',
  minimumWageOn(R, '2009-03-01', '2025-09-01', '2026-10-10'),
  { band: 'nmw_apprentice', rate: 8 }
);
eq('20 in year 2 → 18 to 20 £10.85', minimumWageOn(R, '2006-03-01', '2025-09-01', '2026-10-10'), {
  band: 'nmw_18_20',
  rate: 10.85,
});
eq('20 in year 1 → apprentice £8.00', minimumWageOn(R, '2006-03-01', '2026-01-01', '2026-10-10'), {
  band: 'nmw_apprentice',
  rate: 8,
});
eq('22, no apprenticeship → £12.71', minimumWageOn(R, '2004-03-01', null, '2026-10-10'), {
  band: 'nmw_21_plus',
  rate: 12.71,
});
eq(
  'before April uprating → 2025 rate £10.00',
  minimumWageOn(R, '2007-03-01', '2025-01-01', '2026-03-31'),
  { band: 'nmw_18_20', rate: 10 }
);
eq('no date of birth, year 2 → unknown', minimumWageOn(R, null, '2025-01-01', '2026-10-10'), null);
eq(
  'rate ends at the later of 19th birthday and first anniversary',
  apprenticeRateEnds('2007-11-20', '2025-09-01'),
  '2026-11-20'
);
eq(
  'rate ends at first anniversary when already 19',
  apprenticeRateEnds('2004-01-01', '2026-01-05'),
  '2027-01-05'
);
const pc = checkPay(R, 11, '2005-10-22', null, '2026-10-10');
eq('pay rise due when turning 21 inside 30 days', pc.riseDue?.on, '2026-10-22');
eq('below minimum now', checkPay(R, 9, '2006-03-01', '2024-01-01', '2026-10-10').belowNow, true);

console.log('Young workers (reg 5A, 12(4))');
const flags = youngWorkerFlags(
  [
    { id: 'a', employeeId: 'y', date: '2026-10-05', hours: 9, breakMins: 30 },
    { id: 'b', employeeId: 'y', date: '2026-10-06', hours: 5, breakMins: 15 },
    { id: 'c', employeeId: 'y', date: '2026-10-07', hours: 8, breakMins: 30 },
    { id: 'd', employeeId: 'y', date: '2026-10-08', hours: 8, breakMins: 30 },
    { id: 'e', employeeId: 'y', date: '2026-10-09', hours: 8, breakMins: 30 },
    { id: 'f', employeeId: 'z', date: '2026-10-05', hours: 12, breakMins: 0 },
  ],
  new Map([['y', '2027-02-01']])
);
eq('9h day flagged', flags.get('a')?.includes('Under 18: 9h day'), true);
eq('short break flagged', flags.get('b')?.includes('Under 18: break under 30 min'), true);
eq('8h day in a 38h week not flagged', flags.get('c'), undefined);
eq('adult not flagged', flags.has('f'), false);
const wk = youngWorkerFlags(
  [0, 1, 2, 3, 4].map((i) => ({
    id: `w${i}`,
    employeeId: 'y',
    date: `2026-10-0${5 + i}`,
    hours: 8.5,
    breakMins: 30,
  })),
  new Map([['y', '2027-02-01']])
);
eq('42.5h week flagged', wk.get('w4')?.includes('Under 18: 42.5h week'), true);
eq(
  'diary: a second 4h booking on an 8h day warns',
  youngScheduleWarnings({
    adultFrom: '2027-02-01',
    bookedByDay: new Map([['2026-10-12', 8]]),
    start: '2026-10-12',
    end: '2026-10-12',
    hoursPerDay: 4,
  }),
  ['Mon 12 Oct over 8 hours']
);
eq(
  'diary: six 8h days in a week warns',
  youngScheduleWarnings({
    adultFrom: '2027-02-01',
    bookedByDay: new Map(),
    start: '2026-10-12',
    end: '2026-10-17',
    hoursPerDay: 8,
  }),
  ['48 hours in the week of 12 Oct']
);
eq(
  'diary: adult gets nothing',
  youngScheduleWarnings({
    adultFrom: '2026-01-01',
    bookedByDay: new Map(),
    start: '2026-10-12',
    end: '2026-10-17',
    hoursPerDay: 10,
  }),
  []
);

console.log('Apprentice funding');
const f = apprenticeFunding({
  dob: '2009-05-01',
  apprenticeshipStart: '2026-10-05',
  joinDate: '2026-09-01',
  today: '2026-10-10',
});
eq(
  '17 starting 5 Oct 2026, joined 34 days before → £2,000 eligible',
  f.find((x) => x.id === 'hiring_payment')?.status,
  'eligible'
);
eq('→ £1,000 incentive eligible', f.find((x) => x.id === 'incentive')?.status, 'eligible');
eq('→ training paid in full', f.find((x) => x.id === 'training_cost')?.status, 'eligible');
const f2 = apprenticeFunding({
  dob: '2009-05-01',
  apprenticeshipStart: '2026-09-01',
  joinDate: '2026-08-01',
  today: '2026-10-10',
});
eq(
  'start before 1 Oct 2026 → no hiring payment',
  f2.find((x) => x.id === 'hiring_payment')?.status,
  'not_eligible'
);
const f3 = apprenticeFunding({
  dob: '2009-05-01',
  apprenticeshipStart: '2026-10-05',
  joinDate: '2026-05-01',
  today: '2026-10-10',
});
eq(
  'employed 157 days before → no hiring payment',
  f3.find((x) => x.id === 'hiring_payment')?.status,
  'not_eligible'
);
const f4 = apprenticeFunding({
  dob: '2005-05-01',
  apprenticeshipStart: '2026-10-05',
  joinDate: '2026-10-01',
  today: '2026-10-10',
});
eq(
  '21 → incentive only with EHCP / care leaver',
  f4.find((x) => x.id === 'incentive')?.status,
  'check'
);

/* ── Review fixes, 10 Oct 2026 ─────────────────────────────────────────── */

// Weekdays (Mon–Fri) between two dates, `hours` each.
const weekdays = (from: string, to: string, hours: number) => {
  const out: Array<{ date: string; hours: number }> = [];
  for (
    let d = new Date(`${from}T12:00:00Z`);
    d.toISOString().slice(0, 10) <= to;
    d.setUTCDate(d.getUTCDate() + 1)
  ) {
    const dow = d.getUTCDay();
    if (dow !== 0 && dow !== 6) out.push({ date: d.toISOString().slice(0, 10), hours });
  }
  return out;
};
const ot = { multiplier: 1.5, threshold: 8 };
const calendarMonthOf = (date: string) => {
  const [y, m] = date.split('-').map(Number);
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const mm = String(m).padStart(2, '0');
  return { start: `${y}-${mm}-01`, end: `${y}-${mm}-${String(last).padStart(2, '0')}` };
};

console.log('M5: a second pay run pays holiday approved after the first');
const fullPeriod: PayrollExtras = {
  holidayDays: 3,
  holidayHours: 24,
  holidayPay: 360,
  accruedHours: null,
  rolledUpPay: null,
  sspDays: 0,
  sspPay: null,
  sspWeekly: null,
  estimate: false,
  notes: [],
  basis: 'fixed',
  records: [
    {
      kind: 'holiday_pay',
      period_start: '2026-10-01',
      period_end: '2026-10-31',
      days: 3,
      hours: 24,
      amount: 360,
      basis: 'fixed',
      method: '3 day(s) × £120.00',
      is_estimate: false,
    },
  ],
};
const win = { start: '2026-10-01', end: '2026-10-31' };
// Run 1 paid 2 days (£240); a third day was approved after it.
const run2 = afterEarlierRuns(
  fullPeriod,
  {
    records: [
      {
        kind: 'holiday_pay',
        period_start: win.start,
        period_end: win.end,
        days: 2,
        hours: 16,
        amount: 240,
      },
    ],
    sspDays: 0,
  },
  win
);
eq('second run: 3 days − 2 paid = 1 day', run2?.holidayDays, 1);
eq('second run: 24h − 16h = 8h', run2?.holidayHours, 8);
eq('second run: £360 − £240 = £120 (was £0 before the fix)', run2?.holidayPay, 120);
eq(
  'second run: holiday record line carries the £120 day',
  run2?.records.map((r) => [r.kind, r.days, r.amount]),
  [['holiday_pay', 1, 120]]
);
const run2Legacy = afterEarlierRuns(
  fullPeriod,
  {
    records: [
      { kind: 'holiday_pay', period_start: win.start, period_end: win.end, hours: 16, amount: 240 },
    ],
    sspDays: 0,
  },
  win
);
eq(
  'second run, earlier line without days: £240 of £360 = 2 days, 1 left',
  run2Legacy?.holidayDays,
  1
);
const run3 = afterEarlierRuns(
  fullPeriod,
  {
    records: [
      {
        kind: 'holiday_pay',
        period_start: win.start,
        period_end: win.end,
        days: 3,
        hours: 24,
        amount: 360,
      },
    ],
    sspDays: 0,
  },
  win
);
eq('nothing new approved: no holiday pay again', [run3?.holidayDays, run3?.holidayPay], [0, null]);

console.log('M6: SSP average weekly earnings (SSP (General) Regs 1982 reg 19)');
const aweWeekly = sspAverageWeeklyEarnings({
  entries: weekdays('2026-06-01', '2026-10-13', 8),
  payType: 'hourly',
  hourlyRate: 12.71,
  annualSalary: null,
  overtime: ot,
  periodOf: isoWeekOf, // Monday–Sunday, paid on the Sunday
  sickStart: '2026-10-14',
  employedFrom: '2026-01-05',
});
// Last payday before Wed 14 Oct = Sun 11 Oct; last payday 8+ weeks before = Sun 16 Aug.
// Paid after 16 Aug up to 11 Oct = 8 weeks × 40h × £12.71 = £4,067.20 over 56 days.
eq('weekly, 40h at £12.71: £4,067.20 ÷ 56 × 7 = £508.40', aweWeekly.awe, 508.4);
eq(
  'weekly: SSP is the flat £123.25 (80% = £406.72)',
  sspWeekly(R, aweWeekly.awe ?? 0, '2026-10-14')?.weekly,
  123.25
);
const aweNew = sspAverageWeeklyEarnings({
  entries: weekdays('2026-09-21', '2026-10-13', 4),
  payType: 'hourly',
  hourlyRate: 12.71,
  annualSalary: null,
  overtime: ot,
  periodOf: isoWeekOf,
  sickStart: '2026-10-14',
  employedFrom: '2026-09-21',
});
// Started Mon 21 Sep, 20h a week: paid 27 Sep, 4 Oct, 11 Oct = £762.60 for 21 days.
eq(
  'new starter (3 weeks): £762.60 ÷ 21 × 7 = £254.20',
  [aweNew.basis, aweNew.awe],
  ['new_starter', 254.2]
);
eq(
  'new starter: SSP £123.25 (the old ÷ 8 weeks gave £95.33 → £76.26)',
  sspWeekly(R, aweNew.awe ?? 0, '2026-10-14')?.weekly,
  123.25
);
const aweMonthly = sspAverageWeeklyEarnings({
  entries: weekdays('2026-06-01', '2026-10-13', 8),
  payType: 'hourly',
  hourlyRate: 12.71,
  annualSalary: null,
  overtime: ot,
  periodOf: calendarMonthOf, // calendar months, paid on the last day
  sickStart: '2026-10-14',
  employedFrom: '2026-01-05',
});
// Paydays 30 Sep (last before) and 31 Jul (last 8+ weeks before): Aug + Sep.
// (21 + 22 weekdays) × 8h × £12.71 = £4,372.24 ÷ 2 × 12 ÷ 52 = £504.49.
eq('monthly: Aug + Sep £4,372.24 ÷ 2 × 12 ÷ 52 = £504.49', aweMonthly.awe, 504.49);
eq(
  'no payday yet: null, enter their contracted weekly pay',
  sspAverageWeeklyEarnings({
    entries: weekdays('2026-10-12', '2026-10-13', 8),
    payType: 'hourly',
    hourlyRate: 12.71,
    annualSalary: null,
    overtime: ot,
    periodOf: isoWeekOf,
    sickStart: '2026-10-14',
    employedFrom: '2026-10-12',
  }).basis,
  'no_payday'
);
eq(
  'salaried £30,000: £576.92 a week',
  sspAverageWeeklyEarnings({
    entries: [],
    payType: 'annual',
    hourlyRate: null,
    annualSalary: 30000,
    overtime: ot,
    periodOf: isoWeekOf,
    sickStart: '2026-10-14',
  }).awe,
  576.92
);
eq(
  'SSP: 80% applies below £154.06 a week (AWE £150 → £120.00)',
  sspWeekly(R, 150, '2026-10-14')?.weekly,
  120
);

console.log('M9: holiday builds up while off sick (WTR reg 15C)');
const sickHistory = weekdays('2025-09-01', '2026-10-02', 4); // 20h a week
eq(
  'average week before Mon 5 Oct: 20h over 52 weeks',
  averageWeeklyHoursBefore(
    sickHistory,
    [{ start: '2026-10-05', end: '2026-10-16' }],
    '2026-10-05',
    '2025-09-01'
  ),
  { hours: 20, weeksUsed: 52 }
);
const sickAcc = accrueOverPeriods(sickHistory, isoWeekOf, '2026-10-20', undefined, {
  leave: [{ start: '2026-10-05', end: '2026-10-16' }],
  employedFrom: '2025-09-01',
});
const offWeeks = sickAcc.periods.filter((x) => x.start >= '2026-10-05');
eq(
  'two weeks off sick: 12.07% × 20h = 2.414h a week → 2h each (was 0 before the fix)',
  offWeeks.map((x) => [x.start, x.leaveWeeks, x.accrued]),
  [
    ['2026-10-05', 1, 2],
    ['2026-10-12', 1, 2],
  ]
);
const partWeek = accrueOverPeriods(
  [
    ...weekdays('2025-09-01', '2026-10-02', 4),
    { date: '2026-10-08', hours: 4 },
    { date: '2026-10-09', hours: 4 },
  ],
  isoWeekOf,
  '2026-10-20',
  undefined,
  { leave: [{ start: '2026-10-05', end: '2026-10-07' }], employedFrom: '2025-09-01' }
);
const pw = partWeek.periods.find((x) => x.start === '2026-10-05');
eq(
  'off Mon–Wed, worked Thu–Fri 8h: 0.966h + 2.414 × 3 ÷ 5 = 1.448h → 2.414h → 2h',
  [pw?.leaveWeeks, pw?.leaveAccrual, pw?.accrued],
  [0.6, 1.448, 2]
);
eq(
  'employed 10 weeks at 30h: relevant period is the 10 weeks',
  averageWeeklyHoursBefore(weekdays('2026-07-27', '2026-10-02', 6), [], '2026-10-05', '2026-07-27'),
  { hours: 30, weeksUsed: 10 }
);
eq(
  'a week with sick leave in it is skipped and an earlier week used',
  averageWeeklyHoursBefore(
    weekdays('2025-01-06', '2026-10-02', 4).filter(
      (e) => e.date < '2026-09-07' || e.date > '2026-09-13'
    ),
    [
      { start: '2026-09-07', end: '2026-09-11' },
      { start: '2026-10-05', end: '2026-10-09' },
    ],
    '2026-10-05',
    '2025-01-06'
  ),
  { hours: 20, weeksUsed: 52 }
);

console.log(
  'L15: minimum wage from the first day of the pay reference period (NMW Regs 2015 reg 4B)'
);
const oct = { start: '2026-10-01', end: '2026-10-31' };
const bday = wageCheck(
  R,
  { payType: 'hourly', rate: 11, totalHours: 8, dates: ['2026-10-20'] },
  { dateOfBirth: '2005-10-15', apprenticeshipStart: null, annualSalary: null, teamRole: null },
  oct
);
eq(
  '21 on 15 Oct, £11.00, monthly period from 1 Oct: 18 to 20 £10.85 applies all October',
  [bday.status, bday.minimum?.band, bday.minimum?.rate],
  ['ok', 'nmw_18_20', 10.85]
);
eq(
  'per-day rule would have said 21+ £12.71 on 20 Oct',
  minimumWageOn(R, '2005-10-15', null, '2026-10-20')?.rate,
  12.71
);
const ended = wageCheck(
  R,
  { payType: 'hourly', rate: 9, totalHours: 8, dates: ['2026-10-20'] },
  {
    dateOfBirth: '2000-01-01',
    apprenticeshipStart: '2026-01-05',
    apprenticeshipEnd: '2026-09-30',
    annualSalary: null,
    teamRole: 'Apprentice',
  },
  oct
);
eq(
  '26, apprenticeship from 5 Jan 2026 ended 30 Sep, £9.00: below 21+ £12.71',
  [ended.status, ended.minimum?.band],
  ['below', 'nmw_21_plus']
);
eq(
  'same, still an apprentice in year one: apprentice £8.00',
  minimumWageOn(R, '2000-01-01', '2026-01-05', '2026-10-01')?.band,
  'nmw_apprentice'
);
eq(
  'apprentice rate ends the day after the apprenticeship ends',
  apprenticeRateEnds('2000-01-01', '2026-01-05', '2026-09-30'),
  '2026-10-01'
);
eq(
  '17, apprenticeship ended: under-18 band, not apprentice',
  minimumWageOn(R, '2009-03-01', '2025-09-01', '2026-10-01', '2026-06-30')?.band,
  'nmw_under_18'
);

if (failures) {
  console.log(`\n${failures} failed`);
  process.exit(1);
}
console.log('\nAll pay-law checks pass');
