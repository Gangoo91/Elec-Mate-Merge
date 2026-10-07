#!/usr/bin/env node
/**
 * Demo college roster — ELE-1852 / ELE-1857 (P-ELE-13).
 *
 *   npm run college:seed-demo                 seed if nothing is seeded yet
 *   npm run college:seed-demo -- --reset      delete every seeded row, then seed again (re-dated to today)
 *   npm run college:seed-demo -- --delete     delete every seeded row and stop
 *   npm run college:seed-demo -- --dry-run    build everything in a transaction, report counts, roll back
 *   npm run college:seed-demo -- --purge      --delete, then remove the fixture accounts and restore
 *                                             the rows the seed relabelled (the six 2025 roll rows,
 *                                             the demo learner's cohort, the NTCY2DEMO join code)
 *   add --sql-only to print the SQL instead of running it.
 *
 * Northgate Technical College is the demo college, and it ALSO holds real
 * accounts (Andrew's two, James Eccleson). So:
 *   - every learner and staff member this creates is a fixture account
 *     (founder+collegedemo-*@elec-mate.com, "(fixture)" in the name, free
 *     access, no subscription, hidden from leaderboards, marketing markers set);
 *   - every row it writes is listed in public.demo_fixture_rows, and --reset
 *     deletes exactly those rows and nothing else;
 *   - notification triggers are switched off INSIDE the transaction (ALTER
 *     TABLE … DISABLE TRIGGER rolls back with it), and before COMMIT the script
 *     checks that nothing it did queued a push, an HTTP call or a bell
 *     notification for anyone who is not a fixture account. If anything would
 *     reach a real person, it raises and the whole run rolls back.
 *
 * Runs through the Supabase CLI's Management API path (`db query --linked`),
 * so it needs a logged-in CLI or SUPABASE_ACCESS_TOKEN. Content is
 * deterministic (seeded PRNG); dates are relative to today (Europe/London).
 */
import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'jtwygbeceundfgnkirof';
const args = new Set(process.argv.slice(2));
const MODE = args.has('--purge')
  ? 'purge'
  : args.has('--delete')
    ? 'delete'
    : args.has('--reset')
      ? 'reset'
      : 'seed';
const DRY = args.has('--dry-run');
const SQL_ONLY = args.has('--sql-only');

/* ───────────────────────────── fixed ids ───────────────────────────── */

const COLLEGE = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
const COLLEGE_NAME = 'Northgate Technical College';
const TUTOR = { uid: '447a7e47-12cc-4203-bbc0-365846eee998', staff: '6e0f9c41-fd52-4700-8a85-9f51151d89de', name: 'Demo Tutor (fixture)' };
const DEMO_LEARNER = { uid: '28a0fc81-3783-4c31-8e7e-1f52f778abb2', row: '3d756aaf-c37d-4aa8-bd24-8ced1b0b766f', assignment: 'bb28a10b-4a42-42e2-a82f-a797a7bd4329' };
const HELEN = { staff: '11111111-aaaa-4000-8000-000000000003', name: 'Helen Clarke' };
const COHORT_Y2 = 'cccc1111-1111-4000-8000-000000000001';
const INVITE_NTCY2DEMO = '9552861d-e27a-41be-8567-2459c4ac6ac4';
const QUAL = {
  '5357': { course: '22222222-bbbb-4000-8000-000000000001', qid: '8fba41dc-6af1-4b51-bb65-6baf391394f4', label: 'level-3' },
  '2357': { course: '22222222-bbbb-4000-8000-000000000002', qid: '1bdf0f01-963b-4bca-8d22-3699f781243a', label: 'level-3' },
};
// Deterministic ids for the persistent fixture rows, so links and screenshots survive a reset.
const fid = (group, n) => `fc000000-1852-4000-80${group}-${n.toString(16).padStart(12, '0')}`;
const COHORT_C = fid('02', 1);
const STAFF = {
  iqa: { uid: fid('03', 1), staff: fid('03', 101), name: 'Priya Nair (fixture)', email: 'founder+collegedemo-iqa@elec-mate.com', role: 'iqa' },
  assessor: { uid: fid('03', 2), staff: fid('03', 102), name: 'Owen Price (fixture)', email: 'founder+collegedemo-assessor@elec-mate.com', role: 'assessor' },
};
const EMPLOYERS = [
  { id: fid('04', 1), company: 'Hollis & Grant Electrical (fixture)', contact: 'Gary Holt' },
  { id: fid('04', 2), company: 'Brightwire Contracts (fixture)', contact: 'Dawn Pickering' },
  { id: fid('04', 3), company: 'Northfield Building Services (fixture)', contact: 'Steve Barker' },
];

/* ───────────────────────────── cohorts ───────────────────────────── */

const COHORTS = {
  A: { id: '33333333-cccc-4000-8000-000000000001', name: 'L2 Electrical 2025-A', qual: '5357', start: '2025-09-08', end: '2027-07-18', dow: 1, time: '09:30', room: 'Workshop 1', tutorStaff: TUTOR.staff, tutorName: TUTOR.name, actor: TUTOR.uid, assessor: TUTOR.uid, collegeHours: 6.5 },
  B: { id: '33333333-cccc-4000-8000-000000000002', name: 'L3 Electrotechnical 2025-A', qual: '2357', start: '2025-09-08', end: '2028-07-14', dow: 3, time: '13:00', room: 'Lab 2', tutorStaff: HELEN.staff, tutorName: HELEN.name, actor: STAFF.assessor.uid, assessor: STAFF.assessor.uid, collegeHours: 6 },
  C: { id: COHORT_C, name: 'L2 Electrical 2026-A (Sept intake)', qual: '5357', start: '2026-09-07', end: '2028-07-14', dow: 2, time: '10:00', room: 'Lab 1', tutorStaff: TUTOR.staff, tutorName: TUTOR.name, actor: TUTOR.uid, assessor: TUTOR.uid, collegeHours: 6.5 },
};

/* ───────────────────────────── roster ───────────────────────────── */
// persona → how the learner's six months read on the dashboard.
const PERSONA = {
  ahead: { otj: 1.1, absent: 0, late: 0.05, items: 8, app: 3 },
  steady: { otj: 1.09, absent: 0.04, late: 0.08, items: 6, app: 2 },
  slightly_behind: { otj: 0.86, absent: 0.08, late: 0.12, items: 5, app: 2 },
  behind_hours: { otj: 0.66, absent: 0.12, late: 0.15, items: 4, app: 1 },
  at_risk: { otj: 0.48, absent: 0.38, late: 0.2, items: 3, app: 0 },
  near_gateway: { otj: 1.08, absent: 0, late: 0.05, items: 12, app: 3 },
  new_good: { otj: 1.12, absent: 0, late: 0, items: 2, app: 3 },
  new: { otj: 0.92, absent: 0, late: 0.2, items: 1, app: 2 },
  new_slow: { otj: 0.62, absent: 0.3, late: 0.3, items: 1, app: 0 },
};

// adopted = the six fictional 2025 roll rows that came with the demo college (no account until now).
const LEARNERS = [
  { key: 'amy.watson', name: 'Amy Watson', cohort: 'A', persona: 'ahead', adopted: '44444444-dddd-4000-8000-000000000002', employer: 0 },
  { key: 'ryan.hughes', name: 'Ryan Hughes', cohort: 'A', persona: 'steady', adopted: '44444444-dddd-4000-8000-000000000001', employer: 1 },
  { key: 'tom.blackwell', name: 'Tom Blackwell', cohort: 'A', persona: 'at_risk', adopted: '44444444-dddd-4000-8000-000000000003', employer: 2 },
  { key: 'jordan.mills', name: 'Jordan Mills', cohort: 'A', persona: 'steady', employer: 0 },
  { key: 'ellie.shaw', name: 'Ellie Shaw', cohort: 'A', persona: 'ahead', employer: 0 },
  { key: 'kieran.doyle', name: 'Kieran Doyle', cohort: 'A', persona: 'behind_hours', employer: 1 },
  { key: 'harvey.patel', name: 'Harvey Patel', cohort: 'A', persona: 'slightly_behind', employer: 2 },
  { key: 'chloe.bennett', name: 'Chloe Bennett', cohort: 'A', persona: 'steady', employer: 1 },
  { key: 'katie.robinson', name: 'Katie Robinson', cohort: 'B', persona: 'ahead', adopted: '44444444-dddd-4000-8000-000000000006', employer: 2 },
  { key: 'lisa.fenwick', name: 'Lisa Fenwick', cohort: 'B', persona: 'steady', adopted: '44444444-dddd-4000-8000-000000000004', employer: 1 },
  { key: 'mark.stephenson', name: 'Mark Stephenson', cohort: 'B', persona: 'behind_hours', adopted: '44444444-dddd-4000-8000-000000000005', employer: 0 },
  { key: 'liam.oconnor', name: "Liam O'Connor", cohort: 'B', persona: 'steady', employer: 2 },
  // Transferred in with recognised prior learning: started a year earlier, gateway this winter.
  { key: 'aisha.rahman', name: 'Aisha Rahman', cohort: 'B', persona: 'near_gateway', employer: 0, start: '2024-09-09', end: '2026-12-18' },
  { key: 'callum.fraser', name: 'Callum Fraser', cohort: 'B', persona: 'at_risk', employer: 1 },
  { key: 'sophie.ward', name: 'Sophie Ward', cohort: 'B', persona: 'slightly_behind', employer: 2 },
  { key: 'dylan.evans', name: 'Dylan Evans', cohort: 'B', persona: 'steady', employer: 0 },
  { key: 'noah.williams', name: 'Noah Williams', cohort: 'C', persona: 'new_good', employer: 0 },
  { key: 'ruby.ahmed', name: 'Ruby Ahmed', cohort: 'C', persona: 'new_good', employer: 1 },
  { key: 'mason.wright', name: 'Mason Wright', cohort: 'C', persona: 'new_slow', employer: 2 },
  { key: 'isla.morgan', name: 'Isla Morgan', cohort: 'C', persona: 'new_good', employer: 2 },
  { key: 'ethan.brooks', name: 'Ethan Brooks', cohort: 'C', persona: 'new', employer: 1 },
  { key: 'zara.hussain', name: 'Zara Hussain', cohort: 'C', persona: 'new', employer: 0 },
  { key: 'josh.taylor', name: 'Josh Taylor', cohort: 'C', persona: 'new_slow', employer: 1 },
];
LEARNERS.forEach((l, i) => {
  l.uid = fid('01', i + 1);
  l.row = l.adopted || fid('05', i + 1);
  l.email = `founder+collegedemo-${l.key.replace(/[^a-z.]/g, '')}@elec-mate.com`;
  l.display = `${l.name} (fixture)`;
  l.c = COHORTS[l.cohort];
  l.p = PERSONA[l.persona];
  l.start = l.start || l.c.start;
  l.end = l.end || l.c.end;
  l.emp = EMPLOYERS[l.employer];
});

/* ───────────────────────────── helpers ───────────────────────────── */

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const hash = (s) => [...s].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7);
const rngFor = (s) => mulberry32(hash(s));
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

const londonToday = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
const D = (s) => new Date(`${s}T12:00:00Z`);
const ymd = (d) => d.toISOString().slice(0, 10);
const addDays = (s, n) => ymd(new Date(D(s).getTime() + n * 86400000));
const daysBetween = (a, b) => Math.round((D(b) - D(a)) / 86400000);
const mondayOf = (s) => addDays(s, -((D(s).getUTCDay() + 6) % 7));
const TODAY = londonToday;
const MONDAY = mondayOf(TODAY);
const ts = (date, time = '10:00') => `${date} ${time}:00 Europe/London`;
const minDate = (a, b) => (a < b ? a : b);
const maxDate = (a, b) => (a > b ? a : b);
const inBreak = (date, college) => {
  const md = date.slice(5);
  if (md >= '12-22' || md <= '01-03') return true; // Christmas
  if (college && md >= '07-21' && md <= '09-06') return true; // summer: college closed
  if (college && md >= '04-03' && md <= '04-17') return true; // Easter
  return false;
};

const q = (v) => {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'number') return Number.isFinite(v) ? String(v) : 'null';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (v && v.__raw) return v.__raw;
  if (Array.isArray(v)) return v.length ? `array[${v.map(q).join(',')}]` : `'{}'`;
  if (typeof v === 'object') return `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;
  return `'${String(v).replace(/'/g, "''")}'`;
};
const raw = (s) => ({ __raw: s });
const jb = (v) => `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;
const JSONB_COLS = new Set(['options', 'agreed_actions', 'storage_urls', 'metadata', 'answers', 'expected_answer', 'evidence_snapshot', 'learner_answer', 'outcomes', 'agenda', 'signatures', 'bs7671_citations']);
const qc = (col, v) => (JSONB_COLS.has(col) && v !== null && v !== undefined && !(v && v.__raw) ? jb(v) : q(v));
const out = [];
const sql = (s) => out.push(s);
const ledger = []; // [table, id]

/** INSERT rows (all with the same keys), chunked; ids recorded in the ledger. */
function insert(table, rows, { record = true, conflict = '' } = {}) {
  if (!rows.length) return;
  const cols = Object.keys(rows[0]);
  for (let i = 0; i < rows.length; i += 400) {
    const chunk = rows.slice(i, i + 400);
    sql(
      `insert into public.${table} (${cols.join(', ')}) values\n` +
        chunk.map((r) => `  (${cols.map((c) => qc(c, r[c])).join(', ')})`).join(',\n') +
        `${conflict ? `\n${conflict}` : ''};`
    );
  }
  if (record) for (const r of rows) ledger.push([table, r.id]);
}
const claims = (uid) =>
  sql(
    uid
      ? `select set_config('request.jwt.claims', '{"sub":"${uid}","role":"authenticated"}', true);`
      : `select set_config('request.jwt.claims', '', true);`
  );

/* ───────────────────────────── content ───────────────────────────── */

const UNIT_ACS = {
  '5357': {
    '102': ['1.1', '1.2', '1.3', '2.1', '2.2', '2.3', '2.4', '2.5', '3.1', '3.2', '3.3', '3.4', '3.5', '4.1'],
    '109': ['1.1', '1.2', '1.3', '1.4', '1.5', '2.1', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6', '4.1'],
    '113': ['1.1', '1.2', '1.3', '2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '3.4', '3.5', '3.6'],
    '118': ['1.1', '1.2', '2.1', '2.2', '2.3', '2.4', '2.5'],
  },
  '2357': {
    '311': ['1.1', '1.2', '1.3', '2.1', '2.2', '2.3', '2.4', '2.5', '3.1', '3.2', '3.3', '3.4', '3.5', '4.1'],
    '315': ['1.1', '1.2', '1.3', '2.1', '2.2', '3.1', '3.2', '3.3', '4.1', '4.2', '5.1', '5.2', '5.3', '6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '7.1', '7.2'],
    '316': ['1.1', '1.2', '1.3', '2.1', '2.2', '2.3', '3.1', '3.2', '3.3'],
    '317': ['1.1', '1.2', '1.3', '2.1', '2.2', '2.3', '3.1', '3.2', '3.3', '3.4', '3.5', '4.1', '4.2', '4.3', '4.4'],
  },
};

// Evidence library. type: photo | document | video | witness. obs = assessed by observation.
const EVIDENCE = {
  '5357': {
    '102a': { unit: '102', acs: ['1.1', '1.2', '1.3'], type: 'document', title: 'Risk assessment and method statement for a loft rewire', desc: 'Wrote the RAMS for rewiring the lighting in a loft conversion: access, working at height, dust, and isolating the existing circuits. Talked it through with my supervisor before we started.', cat: 'health-safety' },
    '102b': { unit: '102', acs: ['2.1', '2.2', '2.3'], type: 'photo', title: 'Safe isolation of a shower circuit before replacing the unit', desc: 'Identified the shower circuit, isolated at the consumer unit, locked off and tagged it, proved my two-pole tester on the proving unit, tested dead, then re-proved the tester.', cat: 'health-safety' },
    '102c': { unit: '102', acs: ['3.1', '3.2', '3.3'], type: 'document', title: 'Toolbox talk on stepladders and working at height', desc: 'Gave the Monday toolbox talk on stepladder checks and three points of contact. Recorded who attended and what we agreed.', cat: 'health-safety' },
    '118a': { unit: '118', acs: ['1.1', '1.2', '2.1', '2.2'], type: 'photo', title: 'Terminated sockets and switches on a kitchen first fix', desc: 'Stripped and terminated twin and earth into double sockets and the cooker switch, sleeved every cpc and checked each terminal was tight.', cat: 'practical-skills' },
    '118b': { unit: '118', acs: ['2.3', '2.4', '2.5'], type: 'photo', title: 'Made off an SWA gland and terminations at a garage sub-main', desc: 'Prepared the 4 mm² SWA, fitted the gland and banjo, earthed the armour and terminated the cores at the garage consumer unit.', cat: 'practical-skills' },
    '113a': { unit: '113', acs: ['1.1', '2.1', '2.2'], type: 'document', obs: true, title: 'Dead tests on a new ring final in an extension', desc: 'Carried out continuity of the ring conductors end to end, cross-connected for r1+r2, then insulation resistance at 500 V. Recorded the results on the schedule.', cat: 'testing' },
    '113b': { unit: '113', acs: ['3.1', '3.2', '3.3'], type: 'document', title: 'Live tests: Zs and RCD on the new circuits', desc: 'Measured Zs at the furthest point of each new circuit, compared with the maximum for the protective device, and tested the RCD. My supervisor checked my readings.', cat: 'testing' },
    '109a': { unit: '109', acs: ['1.1', '1.2', '3.1'], type: 'photo', title: 'Installed cable tray and containment in a commercial unit', desc: 'Set out and fixed 150 mm tray along the warehouse wall at the height on the drawing, with supports at the spacing in the manufacturer instructions.', cat: 'installation' },
    '109b': { unit: '109', acs: ['3.2', '3.3', '4.1'], type: 'photo', title: 'Fitted a new consumer unit with RCBOs (supervised)', desc: 'Changed the consumer unit for a 10-way board with RCBOs, labelled each circuit and tidied the tails. My supervisor witnessed the swap-over.', cat: 'installation' },
  },
  '2357': {
    '311a': { unit: '311', acs: ['1.1', '1.2', '1.3', '2.1'], type: 'document', title: 'Site induction and risk assessment for a school refurbishment', desc: 'Completed the site induction, read the asbestos register and wrote the risk assessment for our area of the classroom block.', cat: 'health-safety' },
    '311b': { unit: '311', acs: ['2.2', '2.3', '2.4', '2.5'], type: 'document', title: 'Permit to work and isolation on a three-phase board', desc: 'Worked under a permit to work to isolate a three-phase distribution board, locked off each way we were working on and proved dead with an approved tester.', cat: 'health-safety' },
    '311c': { unit: '311', acs: ['3.1', '3.2', '3.3', '3.4', '3.5', '4.1'], type: 'document', title: 'Manual handling and working at height plan for a tray install', desc: 'Planned the lifts for 3 m lengths of tray, booked the podium steps and agreed the exclusion zone with the site manager.', cat: 'health-safety' },
    '315a': { unit: '315', acs: ['1.1', '1.2', '1.3', '2.1', '2.2'], type: 'photo', title: 'Installed steel conduit runs in a plant room', desc: 'Measured, cut, threaded and set the conduit, with sets and saddles at even centres. Fitted the boxes ready for the isolators.', cat: 'installation' },
    '315b': { unit: '315', acs: ['3.1', '3.2', '3.3', '4.1', '4.2'], type: 'photo', title: 'Installed trunking and cable tray for a classroom block', desc: 'Fixed the dado trunking and the tray in the ceiling void, with fire barriers where the tray passed through the compartment wall.', cat: 'installation' },
    '315c': { unit: '315', acs: ['5.1', '5.2', '5.3', '6.1', '6.2', '6.3'], type: 'photo', title: 'Pulled in and dressed the cables back to the board', desc: 'Pulled in the singles and the SWA, kept the circuits grouped as on the drawing and dressed them into the board.', cat: 'installation' },
    '315d': { unit: '315', acs: ['6.4', '6.5', '6.6', '7.1', '7.2'], type: 'photo', title: 'Fixed the luminaires and made the final connections', desc: 'Hung the LED panels, made off the connections and labelled the circuits. Cleared the area and handed back to the site manager.', cat: 'installation' },
    '316a': { unit: '316', acs: ['1.1', '1.2', '1.3', '2.1'], type: 'photo', title: 'Terminated SWA and singles at a distribution board', desc: 'Glanded and terminated the SWA sub-main, then the singles for each way, torque-setting each terminal to the manufacturer figure.', cat: 'practical-skills' },
    '316b': { unit: '316', acs: ['2.2', '2.3', '3.1', '3.2', '3.3'], type: 'photo', title: 'Crimped and soldered connections on control wiring', desc: 'Made crimped ferrule terminations on the control panel and a soldered joint on the sensor tail, then checked continuity of each.', cat: 'practical-skills' },
    '317a': { unit: '317', acs: ['1.1', '1.2', '1.3', '2.1'], type: 'document', obs: true, title: 'Initial verification dead tests on a sub-main', desc: 'Planned the test sequence for the new sub-main, then carried out continuity and insulation resistance and recorded the readings.', cat: 'testing' },
    '317b': { unit: '317', acs: ['2.2', '2.3', '3.1', '3.2'], type: 'document', title: 'Filled in the schedule of test results for an EIC', desc: 'Completed the schedule of test results for the classroom block and checked every reading against the limits before my supervisor signed it.', cat: 'testing' },
    '318a': { unit: '318', acs: ['1.1', '1.2', '2.1'], type: 'document', title: 'Traced an intermittent fault on a motor starter', desc: 'Followed the fault-finding sequence on a starter that kept dropping out: checked the supply, the overload setting and found a loose control connection.', cat: 'fault-finding' },
  },
};
const ITEM_ORDER = {
  '5357': ['102a', '118a', '102b', '113a', '109a', '118b', '102c', '113b', '109b'],
  '2357': ['311a', '316a', '311b', '316b', '315a', '317a', '315b', '318a', '311c', '315c', '315d', '317b'],
};
// Per persona: how many of the items (in order) are passed, referred, waiting, draft.
const ITEM_PLAN = {
  ahead: { order5357: ['102a', '118a', '102b', '118b', '113a', '102c', '109a', '113b'], passed: 6, referred: 0, waiting: 2 },
  steady: { passed: 4, referred: 0, waiting: 1 },
  slightly_behind: { passed: 3, referred: 1, waiting: 1 },
  behind_hours: { passed: 2, referred: 1, waiting: 0 },
  at_risk: { passed: 1, referred: 1, waiting: 0 },
  near_gateway: { order2357: ['311a', '311b', '311c', '316a', '316b', '315a', '315b', '315c', '315d', '317a', '317b', '318a'], passed: 10, referred: 0, waiting: 2 },
  new_good: { passed: 0, referred: 0, waiting: 1 },
  new: { passed: 0, referred: 0, waiting: 0 },
  new_slow: { passed: 0, referred: 0, waiting: 0 },
};
ITEM_PLAN.ahead.order2357 = ['311a', '316a', '316b', '311b', '315a', '317a', '315b', '318a'];

const SITES = ['Kitchen extension, Harrogate Road', 'New-build estate plot 14, Bramley', 'Loft conversion, Chapel Allerton', 'Warehouse unit 6, Stourton', 'Primary school refurbishment, Armley', 'Dental surgery fit-out, Headingley'];

const OTJ_WORK = [
  ['practical', 'Supervised install: first fix on a domestic extension', 'Worked with my supervisor setting out and running cables for the first fix. Learned how to plan routes to avoid notching joists.'],
  ['shadowing', 'Shadowed the approved electrician on an EICR', 'Watched the full periodic inspection on a rented flat and helped record the observations and codes.'],
  ['manufacturer_training', 'Wholesaler session: RCBO selection and testing', 'Manufacturer rep went through Type A vs Type AC RCBOs and how to test them. Took notes on discrimination.'],
  ['mentoring', 'Mentoring with my supervisor: reading drawings', 'Went through the electrical drawings for the next job and the symbols for the containment and luminaires.'],
  ['revision', 'Revision: BS 7671 Part 6 for the Unit 113 mock', 'Worked through the inspection and testing chapter and the Study Centre questions on insulation resistance.'],
  ['assignment', 'Written assignment: cable selection for a cooker circuit', 'Calculated design current, chose the protective device and checked voltage drop for a 10 kW cooker.'],
  ['practical', 'Supervised fault finding on a tripping RCD', 'Helped split the circuits to find which one was tripping the RCD, then found water in an outside socket.'],
  ['industry_visit', 'Site visit: commercial switchroom', 'Toured the switchroom on a commercial job and learned how the sub-mains are labelled and isolated.'],
];
const COLLEGE_TOPICS = {
  '5357': ['Safe isolation and GS38 practical', 'Cable selection: current-carrying capacity', 'Voltage drop calculations', 'Ring final circuits: theory and testing', 'Earthing systems TN-S, TN-C-S, TT', 'Inspection and testing: continuity', 'Insulation resistance testing', 'Protective devices and discrimination', 'Fault diagnosis on lighting circuits', 'Consumer unit installation practical'],
  '2357': ['Three-phase distribution theory', 'Initial verification sequence', 'SWA termination practical', 'Motor control circuits', 'Fault diagnosis: motor starters', 'Containment systems: conduit and tray', 'Regulations: special locations', 'Design calculations for sub-mains'],
};

/* ─── quizzes ─── */
const mcq = (text, correct, wrong, ac, pts = 1) => ({ kind: 'multi_choice', text, correct, wrong, ac, pts });
const written = (kind, text, expected, guidance, ac, pts) => ({ kind, text, expected, guidance, ac, pts });
const QUIZZES = [
  {
    key: 'q113', cohort: 'A', creator: TUTOR.uid, kind: 'quiz', title: 'Unit 113 check: inspection and testing', topic: 'inspection and testing', difficulty: 'medium', qual: '5357',
    publishedAgo: 24, dueAgo: 17, passMark: 60, attempters: (l) => l.persona !== 'at_risk',
    questions: [
      mcq('What DC test voltage is used for an insulation resistance test on a 230 V final circuit?', '500 V', ['250 V', '1000 V', '230 V'], '113.2.2'),
      mcq('What is the minimum acceptable insulation resistance for a 230 V circuit tested at 500 V DC?', '1.0 MΩ', ['0.5 MΩ', '2.0 MΩ', '0.25 MΩ'], '113.2.2'),
      mcq('On a ring final circuit, which conductors does the end-to-end continuity test measure?', 'Line, neutral and cpc, each end to end', ['The cpc only', 'Line and neutral only', 'The main protective bonding only'], '113.2.1'),
      mcq('Which tests are carried out before the installation is energised?', 'Continuity, insulation resistance and polarity', ['Earth fault loop impedance and RCD tests', 'Prospective fault current and phase rotation', 'Functional tests of RCDs only'], '113.1.1'),
      mcq('During safe isolation, when do you prove your voltage indicator on a known source?', 'Before and after testing the circuit dead', ['Only before testing', 'Only after testing', 'Never, if it is a two-pole tester'], '113.1.1'),
      mcq('Socket-outlets rated up to 32 A for general use need additional protection by which device?', 'An RCD with a rated residual operating current not exceeding 30 mA', ['A 100 mA time-delayed RCD', 'A Type C circuit-breaker', 'A surge protective device'], '113.3.3'),
      written('short_answer', 'Explain why you re-prove your voltage indicator after confirming a circuit is dead.', 'If the tester failed during the test it would show dead on a live circuit. Re-proving it on a known source shows it was working, so the dead reading can be trusted.', 'Full marks: tester could have failed; re-proving confirms the dead reading is real. 1 mark for "to check the tester works" without linking it to the reading.', '113.1.1', 3),
    ],
  },
  {
    key: 'qfault', cohort: 'A', creator: TUTOR.uid, kind: 'assessment', title: 'Fault finding: written scenarios', topic: 'fault diagnosis', difficulty: 'hard', qual: '5357',
    publishedAgo: 6, dueAgo: 2, passMark: 60, attempters: (l) => ['ahead', 'steady', 'slightly_behind'].includes(l.persona),
    questions: [
      written('long_answer', 'A customer says the RCD trips as soon as the kitchen ring is switched on. Describe, step by step, how you would find the fault safely.', 'Safe isolation first; disconnect loads; insulation resistance tests on the ring (L-E, N-E, L-N); split the ring to find the faulty leg; inspect accessories (outside socket, damp, damaged cable); repair and retest before re-energising.', 'Look for: safe isolation, removing loads, IR testing, splitting the circuit, inspection, retest. 1 mark each up to 5.', '113.2.2', 5),
      written('long_answer', 'An insulation resistance test between line and earth on a lighting circuit reads 0.3 MΩ. What could cause this, and what would you check next?', 'Below 1.0 MΩ so it fails. Causes: damaged insulation, a nail through a cable, moisture in a fitting, equipment left connected. Next: disconnect luminaires/equipment, retest, split the circuit to locate, inspect.', '2 marks for identifying it as a fail with a cause, 3 for a sensible locate-and-check sequence.', '113.2.2', 5),
      mcq('A low insulation resistance reading between line and cpc most likely points to:', 'Damaged insulation or moisture in an accessory', ['A loose neutral at the consumer unit', 'An open-circuit ring final', 'Reversed polarity at a socket'], '113.2.2'),
      mcq('Which instrument measures the resistance of a ring final circuit\'s end-to-end conductors?', 'A low-resistance ohmmeter', ['An insulation resistance tester on 500 V', 'An RCD tester', 'A clamp meter'], '113.2.1'),
    ],
  },
  {
    key: 'qinduct', cohort: 'C', creator: TUTOR.uid, kind: 'quiz', title: 'Induction: safe isolation and site safety', topic: 'safe isolation', difficulty: 'easy', qual: '5357',
    publishedAgo: 9, dueAgo: -5, passMark: 70, attempters: (l) => ['new_good', 'new'].includes(l.persona),
    questions: [
      mcq('What is the first step of safe isolation?', 'Identify the circuit and the point of isolation', ['Remove the cover of the accessory', 'Test the circuit with a multimeter', 'Switch off the main switch for the whole building']),
      mcq('Why do you fit a lock and a warning notice at the point of isolation?', 'So nobody can switch the circuit back on while you work', ['To show the circuit has been tested', 'Because the circuit-breaker might trip', 'To record the time you started']),
      mcq('Which tester should you use to prove a circuit dead?', 'An approved two-pole voltage indicator', ['A neon screwdriver', 'A non-contact voltage pen on its own', 'A plug-in socket tester']),
      mcq('Who do you tell before isolating a circuit in an occupied building?', 'The person in control of the premises and anyone affected', ['Nobody, if the job is quick', 'Only your college tutor', 'The electricity supplier']),
      mcq('What do test probes need to reduce the risk of a flashover?', 'Finger guards and a minimal exposed tip', ['Long bare metal tips', 'Crocodile clips on both ends', 'Unfused leads']),
      mcq('When should you treat a circuit as live?', 'Until you have proved it dead', ['Only when the lights are on', 'Only when a load is connected', 'Only when the breaker is on']),
    ],
  },
  {
    key: 'q317', cohort: 'B', creator: STAFF.assessor.uid, kind: 'quiz', title: 'Unit 317: the initial verification sequence', topic: 'initial verification', difficulty: 'medium', qual: '2357',
    publishedAgo: 20, dueAgo: 13, passMark: 60, attempters: (l) => l.persona !== 'at_risk',
    questions: [
      mcq('Which test comes first in the initial verification sequence?', 'Continuity of protective conductors', ['Earth fault loop impedance', 'RCD operation', 'Phase sequence']),
      mcq('What is the minimum insulation resistance for a 400 V three-phase circuit tested at 500 V DC?', '1.0 MΩ', ['0.5 MΩ', '2.0 MΩ', '10 MΩ']),
      mcq('Why is insulation resistance measured with current-using equipment disconnected?', 'The equipment can be damaged and gives a false low reading', ['It makes the test faster', 'The test voltage is too low otherwise', 'Equipment raises the reading too high']),
      mcq('Which document records the results of testing a new installation?', 'An Electrical Installation Certificate with a schedule of test results', ['An Electrical Installation Condition Report', 'A Minor Electrical Installation Works Certificate only', 'A risk assessment']),
      mcq('Live tests such as earth fault loop impedance are carried out:', 'After the dead tests are satisfactory and the installation is energised', ['Before continuity testing', 'With the main switch off', 'Only on periodic inspections']),
      written('short_answer', 'Why must current-using equipment be disconnected before an insulation resistance test?', 'The test voltage can damage electronic equipment, and the equipment would give a false low reading.', '1 mark for damage, 1 for false reading, 1 for linking to the result being unreliable.', '317.2.2', 3),
    ],
  },
];

const WRITTEN_ANSWERS = {
  good: ['Because the tester could have broken while I was testing, so it would say dead when it is live. Proving it again on the proving unit shows it still works so I can trust that the circuit is dead.', 'Isolate and lock off, prove dead. Unplug everything on the ring. Do IR tests L-E N-E L-N at 500V. If N-E is low, split the ring at the middle socket and test each half. Found the half with the fault, inspect the sockets, the outside one is usually the problem with water. Fix, retest, then energise and test the RCD.', 'It is a fail because it is under 1 MΩ. Could be a nail through the cable or water in a light fitting, or a fitting left connected. I would disconnect the lamps and retest, then split the circuit to find which part is low and inspect that part.', 'Electronic equipment can be damaged by the 500 V and it would make the reading lower than it really is, so you could fail a good circuit.'],
  ok: ['To make sure the tester is working.', 'Turn it off and test each socket to see which one is faulty, then change it.', 'Probably water in a fitting. Retest it.', 'Because it can get damaged.'],
};

/* ─── goals, messages, notes ─── */
const GOALS = {
  hours: { category: 'academic', title: 'Log at least 10 hours of off-the-job training every week', desc: 'Record college days, training and study as you go, not at the end of the month.' },
  unit118: { category: 'skills', title: 'Finish the Unit 118 terminations evidence', desc: 'Two pieces of evidence covering every termination type, with photos.' },
  attend: { category: 'attendance', title: 'Attend every college day this half-term', desc: 'Let your tutor know before 9 am if you cannot make it.' },
  revise113: { category: 'academic', title: 'Revise insulation resistance testing before the Unit 113 mock', desc: 'Two Study Centre sessions on Part 6 and the Unit 113 quiz.' },
  witness: { category: 'employability', title: 'Ask your supervisor for a witness statement on the consumer unit job', desc: 'Send the request from the app so it is linked to the evidence.' },
  study: { category: 'academic', title: 'Use the Study Centre for two hours a week', desc: 'Flashcards on the bus count. It all goes into your off-the-job hours.' },
  induction: { category: 'skills', title: 'Complete your induction evidence: safe isolation', desc: 'Photograph your isolation kit and lock-off on site and upload it with a short description.' },
  wellbeing: { category: 'wellbeing', title: 'Check in with your tutor every Tuesday after the break', desc: 'Five minutes to talk about how things are going at work and at home.' },
};

/* ───────────────────────────── build ───────────────────────────── */

const fixtureUids = [...LEARNERS.map((l) => l.uid), STAFF.iqa.uid, STAFF.assessor.uid];
const learnerRows = LEARNERS.map((l) => l.row);
const uidList = (ids) => `array[${ids.map((x) => `'${x}'`).join(',')}]::uuid[]`;

sql(`-- Generated by scripts/college-demo/seed_demo_college.mjs (${MODE}${DRY ? ', dry run' : ''}) for ${TODAY}`);
sql('begin;');
sql("set local lock_timeout = '8s';");
sql("set local statement_timeout = '240s';");

// Ledger helper (session-local function).
sql(`create or replace function pg_temp.fx_record(p_table text, p_ids uuid[], p_kind text default 'seeded')
returns void language sql as $$
  insert into public.demo_fixture_rows (table_name, row_id, kind)
  select p_table, x, p_kind from unnest(p_ids) x
  on conflict (table_name, row_id) do nothing;
$$;`);

// 0. Refuse to run if any id we are about to write belongs to a real account.
sql(`do $$
declare v_bad text;
begin
  select string_agg(u.email, ', ') into v_bad from auth.users u
   where u.id = any (${uidList(fixtureUids)}) and u.email not like 'founder+collegedemo-%';
  if v_bad is not null then raise exception 'fixture id collides with a real account: %', v_bad; end if;
  select string_agg(s.name, ', ') into v_bad from public.college_students s
   where s.id = any (${uidList(learnerRows)}) and s.user_id is not null
     and s.user_id not in (select id from auth.users where email like 'founder+collegedemo-%');
  if v_bad is not null then raise exception 'a roll row we adopt is linked to a real account: %', v_bad; end if;
  if exists (select 1 from public.college_students s where s.id = any (${uidList(learnerRows)}) and s.college_id <> '${COLLEGE}') then
    raise exception 'a roll row we adopt is not at the demo college';
  end if;
end $$;`);

// 1. Notifications OFF for this transaction only (rolls back with it).
const QUIET = {
  college_otj_entries: ['trg_notify_employer_otj_submission', 'trg_notify_otj_supervisors', 'trg_notify_tutor_otj', 'trg_otj_resubmit_notify_tutor'],
  college_ilps: ['trg_notify_ilp_reviewed'],
  college_tripartite_reviews: ['trg_tripartite_notify_booking'],
  pastoral_notes: ['trg_notify_pastoral_concern', 'trg_notify_safeguarding'],
  portfolio_submissions: ['trg_notify_submission_reviewed', 'portfolio_submission_audit_trigger', 'portfolio_grade_sync_trigger', 'trg_pae_submissions'],
  student_messages: ['trg_notify_student_message'],
  tutor_quiz_attempts: ['trg_tutor_quiz_attempt_notify'],
  tutor_quizzes: ['trg_tutor_quiz_notify_set'],
  // The portfolio audit trail is append-only by design; fixture history is
  // not a real event, so it is not written there (and nothing to clean up).
  portfolio_items: ['trg_pae_items'],
  portfolio_item_criteria: ['trg_pae_criteria'],
  portfolio_submission_items: ['trg_pae_submission_items'],
  portfolio_assessment_decisions: ['trg_pae_decisions'],
  portfolio_witness_statements: ['trg_pae_witness'],
  college_observations: ['audit_college_obs'],
  staff_compliance_records: ['audit_scr'],
  college_iqa_sampling: ['audit_iqa_sampling'],
  college_iqa_samples: ['audit_iqa_samples'],
};
for (const [t, trgs] of Object.entries(QUIET)) for (const g of trgs) sql(`alter table public.${t} disable trigger ${g};`);

/* ─── 2. delete what an earlier run seeded ─── */
const DELETE_ORDER = [
  'student_messages', 'student_message_threads', 'tutor_quiz_answer_grades', 'tutor_quiz_attempts', 'tutor_quiz_questions', 'tutor_quizzes',
  'college_iqa_samples', 'college_iqa_sampling', 'college_tutor_observations', 'college_observations', 'staff_compliance_records', 'pastoral_notes',
  'college_review_actions', 'college_tripartite_reviews', 'portfolio_assessment_plans', 'portfolio_assessment_decisions', 'portfolio_witness_statements',
  'portfolio_submissions', 'portfolio_item_criteria', 'portfolio_items', 'learning_activity_log', 'time_entries', 'college_otj_entries',
  'college_attendance', 'college_lesson_plans', 'college_ilp_goals', 'college_student_assignments', 'user_notifications',
];
if (MODE !== 'seed') {
  claims(null);
  for (const t of DELETE_ORDER) {
    sql(`delete from public.${t} where id in (select row_id from public.demo_fixture_rows where table_name = '${t}' and kind = 'seeded');`);
  }
  sql(`delete from public.demo_fixture_rows where kind = 'seeded';`);
  // Derived state on fixture learners only: risk scores and criteria coverage are rebuilt below.
  sql(`delete from public.student_risk_scores where student_id = any (${uidList(learnerRows)});`);
  sql(`delete from public.student_ac_coverage where student_id = any (${uidList(learnerRows)});`);
  sql(`select public.seed_student_ac_coverage(x) from unnest(${uidList(learnerRows)}) x;`);
}

if (MODE === 'purge') {
  // Restore what we relabelled, then remove the fixture accounts and their persistent rows.
  sql(`update public.college_students s set name = r.restore->>'name', email = r.restore->>'email', user_id = null, employer_id = null
         from public.demo_fixture_rows r
        where r.table_name = 'college_students' and r.kind = 'adopted' and r.row_id = s.id and s.id <> '${DEMO_LEARNER.row}';`);
  sql(`update public.college_students set cohort_id = '${COHORT_Y2}' where id = '${DEMO_LEARNER.row}'
         and exists (select 1 from public.demo_fixture_rows where table_name = 'college_students' and row_id = '${DEMO_LEARNER.row}');`);
  sql(`update public.college_student_assignments set tutor_id = '115f9f42-33f1-4f5f-b8e2-0a8dc57991fe', cohort_id = '${COHORT_Y2}', cohort_name = 'Year 2 — Sept 2026 intake'
         where id = '${DEMO_LEARNER.assignment}' and exists (select 1 from public.demo_fixture_rows where table_name = 'college_student_assignments' and row_id = '${DEMO_LEARNER.assignment}');`);
  sql(`update public.college_invites set cohort_id = '${COHORT_Y2}' where id = '${INVITE_NTCY2DEMO}'
         and exists (select 1 from public.demo_fixture_rows where table_name = 'college_invites' and row_id = '${INVITE_NTCY2DEMO}');`);
  sql(`delete from public.college_students where id in (select row_id from public.demo_fixture_rows where table_name = 'college_students' and kind = 'account');`);
  sql(`delete from public.college_staff where id in (select row_id from public.demo_fixture_rows where table_name = 'college_staff' and kind = 'account');`);
  sql(`delete from public.college_cohorts where id in (select row_id from public.demo_fixture_rows where table_name = 'college_cohorts' and kind = 'account');`);
  sql(`delete from public.college_employers where id in (select row_id from public.demo_fixture_rows where table_name = 'college_employers' and kind = 'account');`);
  sql(`delete from auth.users where id in (select row_id from public.demo_fixture_rows where table_name = 'auth.users' and kind = 'account') and email like 'founder+collegedemo-%';`);
  sql(`delete from public.demo_fixture_rows;`);
}

const SEEDING = MODE === 'seed' || MODE === 'reset';
if (MODE === 'seed') {
  // Plain seed refuses to double up.
  sql(`do $$ begin if exists (select 1 from public.demo_fixture_rows where kind = 'seeded') then
    raise exception 'ALREADY_SEEDED: the demo roster is already seeded. Use --reset to rebuild it.'; end if; end $$;`);
}

if (SEEDING) {
  /* ─── 3. accounts (persistent) ─── */
  const accounts = [
    ...LEARNERS.map((l) => ({ uid: l.uid, email: l.email, name: l.display })),
    { uid: STAFF.iqa.uid, email: STAFF.iqa.email, name: STAFF.iqa.name },
    { uid: STAFF.assessor.uid, email: STAFF.assessor.email, name: STAFF.assessor.name },
  ];
  for (const a of accounts) {
    sql(`insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, confirmation_token, recovery_token,
      email_change_token_new, email_change, email_change_token_current, phone_change, phone_change_token, reauthentication_token,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at, is_sso_user, is_anonymous)
    select '00000000-0000-0000-0000-000000000000', '${a.uid}', 'authenticated', 'authenticated', ${q(a.email)},
      extensions.crypt(encode(extensions.gen_random_bytes(24), 'hex'), extensions.gen_salt('bf')), now(), '', '', '', '', '', '', '', '',
      '{"provider":"email","providers":["email"]}'::jsonb,
      ${q({ full_name: a.name, email_verified: true, created_via: 'admin_bulk', fixture: 'college-demo' })}, now(), now(), false, false
    where not exists (select 1 from auth.users where id = '${a.uid}');`);
    sql(`insert into auth.identities (provider_id, user_id, identity_data, provider, created_at, updated_at)
    select '${a.uid}', '${a.uid}', jsonb_build_object('sub', '${a.uid}', 'email', ${q(a.email)}, 'email_verified', true), 'email', now(), now()
    where not exists (select 1 from auth.identities where user_id = '${a.uid}' and provider = 'email');`);
  }
  sql(`select pg_temp.fx_record('auth.users', ${uidList(accounts.map((a) => a.uid))}, 'account');`);
  // Profiles: free access, hidden from leaderboards, every marketing sequence marked as sent.
  // Replica mode for these UPDATEs only: granting free access fires tg_employer_tier_seat_cleanup,
  // which POSTs to manage-employer-seats (Stripe seat sync) — meaningless for a fixture account.
  sql(`set local session_replication_role = replica;`);
  for (const a of accounts) {
    const isStaff = a.uid === STAFF.iqa.uid || a.uid === STAFF.assessor.uid;
    const l = LEARNERS.find((x) => x.uid === a.uid);
    sql(`update public.profiles set full_name = ${q(a.name)}, role = ${q(isStaff ? 'electrician' : 'apprentice')}, onboarding_completed = true,
      free_access_granted = true, free_access_reason = 'College Hub demo ${isStaff ? 'staff' : 'learner'}: fictional fixture account (ELE-1852)',
      subscribed = false, leaderboard_visible = false, created_via = 'admin_bulk',
      apprentice_course = ${q(isStaff ? null : 'level-3')}, apprentice_college = ${q(isStaff ? null : COLLEGE_NAME)},
      apprentice_year = ${l ? (l.cohort === 'C' ? 1 : 2) : 1},
      incomplete_signup_sent_at = coalesce(incomplete_signup_sent_at, now()), incomplete_signup_v2_sent_at = coalesce(incomplete_signup_v2_sent_at, now()),
      incomplete_signup_v3_sent_at = coalesce(incomplete_signup_v3_sent_at, now()), incomplete_signup_v10_sent_at = coalesce(incomplete_signup_v10_sent_at, now()),
      incomplete_signup_v11_sent_at = coalesce(incomplete_signup_v11_sent_at, now()), incomplete_signup_v11_nudge_sent_at = coalesce(incomplete_signup_v11_nudge_sent_at, now()),
      reengage_email_sent_at = coalesce(reengage_email_sent_at, now()), reengage_email_2_sent_at = coalesce(reengage_email_2_sent_at, now()),
      reengage_email_3_sent_at = coalesce(reengage_email_3_sent_at, now()), winback_offer_sent_at = coalesce(winback_offer_sent_at, now()),
      apprentice_campaign_sent_at = coalesce(apprentice_campaign_sent_at, now()), apprentice_campaign_type = coalesce(apprentice_campaign_type, 'fixture')
     where id = '${a.uid}';`);
  }
  sql(`set local session_replication_role = origin;`);

  // Fixture staff (persistent): Priya = IQA + designated safeguarding lead; Owen = assessor for the L3 cohort.
  for (const s of [STAFF.iqa, STAFF.assessor]) {
    sql(`insert into public.college_staff (id, college_id, user_id, name, email, role, department, status, teaching_qual, assessor_qual, iqa_qual, is_dsl, is_deputy_dsl)
    select '${s.staff}', '${COLLEGE}', '${s.uid}', ${q(s.name)}, ${q(s.email)}, '${s.role}', 'Electrotechnical', 'Active',
      ${q(s.role === 'iqa' ? 'Diploma in Education & Training' : 'Certificate in Education')}, 'TAQA Assessor', ${q(s.role === 'iqa' ? 'TAQA IQA (Level 4)' : null)},
      ${s.role === 'iqa'}, false
    where not exists (select 1 from public.college_staff where id = '${s.staff}');`);
  }
  sql(`select pg_temp.fx_record('college_staff', array['${STAFF.iqa.staff}','${STAFF.assessor.staff}']::uuid[], 'account');`);

  // Employers (persistent): no contact email and the weekly digest switched off, so nothing is ever mailed.
  for (const e of EMPLOYERS) {
    sql(`insert into public.college_employers (id, college_id, company_name, contact_name, contact_email, notes, weekly_digest_opt_out_at)
    select '${e.id}', '${COLLEGE}', ${q(e.company)}, ${q(e.contact + ' (fixture)')}, null, 'Demo fixture employer (ELE-1852). No email on purpose.', now()
    where not exists (select 1 from public.college_employers where id = '${e.id}');`);
  }
  sql(`select pg_temp.fx_record('college_employers', ${uidList(EMPLOYERS.map((e) => e.id))}, 'account');`);

  // Cohort C (persistent): the newer intake, led by the fixture tutor (ELE-1857).
  sql(`insert into public.college_cohorts (id, college_id, name, course_id, tutor_id, start_date, end_date, max_students, status, code, delivery_mode, meeting_day, meeting_time, room)
  select '${COHORT_C}', '${COLLEGE}', ${q(COHORTS.C.name)}, '${QUAL['5357'].course}', '${TUTOR.staff}', '${COHORTS.C.start}', '${COHORTS.C.end}', 16, 'Active',
    'L2E-26A', 'day_release', 'Wednesday', '10:00', ${q(COHORTS.C.room)}
  where not exists (select 1 from public.college_cohorts where id = '${COHORT_C}');`);
  sql(`select pg_temp.fx_record('college_cohorts', array['${COHORT_C}']::uuid[], 'account');`);
  // Cohort A is already the fixture tutor's; make sure.
  sql(`update public.college_cohorts set tutor_id = '${TUTOR.staff}' where id = '${COHORTS.A.id}' and tutor_id is distinct from '${TUTOR.staff}';`);

  // Adopt the six fictional 2025 roll rows: link a fixture account, label them "(fixture)".
  for (const l of LEARNERS.filter((x) => x.adopted)) {
    sql(`insert into public.demo_fixture_rows (table_name, row_id, kind, label, restore)
    select 'college_students', id, 'adopted', 'fictional 2025 roll row', jsonb_build_object('name', name, 'email', email)
      from public.college_students where id = '${l.row}' and user_id is null
    on conflict (table_name, row_id) do nothing;`);
    sql(`update public.college_students set name = ${q(l.display)}, email = ${q(l.email)}, user_id = '${l.uid}', employer_id = '${l.emp.id}'
      where id = '${l.row}';`);
  }
  // New fixture roll rows (persistent).
  for (const l of LEARNERS.filter((x) => !x.adopted)) {
    sql(`insert into public.college_students (id, college_id, user_id, name, email, cohort_id, course_id, employer_id, start_date, expected_end_date, status, delivery_model, weekly_contracted_hours)
    select '${l.row}', '${COLLEGE}', '${l.uid}', ${q(l.display)}, ${q(l.email)}, '${l.c.id}', '${QUAL[l.c.qual].course}', '${l.emp.id}',
      ${q(l.start === l.c.start ? null : l.start)}, ${q(l.end === l.c.end ? null : l.end)}, 'Active', 'day_release', 37.5
    where not exists (select 1 from public.college_students where id = '${l.row}');`);
  }
  sql(`select pg_temp.fx_record('college_students', ${uidList(LEARNERS.filter((x) => !x.adopted).map((l) => l.row))}, 'account');`);

  // ELE-1857: the fixture learner moves into the fixture tutor's cohort, so nothing it does notifies a real tutor.
  sql(`insert into public.demo_fixture_rows (table_name, row_id, kind, label, restore)
  select 'college_students', id, 'adopted', 'demo learner moved to the fixture tutor''s cohort', jsonb_build_object('cohort_id', cohort_id)
    from public.college_students where id = '${DEMO_LEARNER.row}'
  on conflict (table_name, row_id) do nothing;`);
  sql(`update public.college_students set cohort_id = '${COHORT_C}' where id = '${DEMO_LEARNER.row}';`);
  sql(`insert into public.demo_fixture_rows (table_name, row_id, kind, label, restore)
  select 'college_student_assignments', id, 'adopted', 'demo learner assignment points at the fixture tutor', jsonb_build_object('tutor_id', tutor_id, 'cohort_id', cohort_id, 'cohort_name', cohort_name)
    from public.college_student_assignments where id = '${DEMO_LEARNER.assignment}'
  on conflict (table_name, row_id) do nothing;`);
  sql(`update public.college_student_assignments set tutor_id = '${TUTOR.uid}', cohort_id = '${COHORT_C}', cohort_name = ${q(COHORTS.C.name)} where id = '${DEMO_LEARNER.assignment}';`);
  // The demo join code lands new joiners in the fixture cohort too (it pointed at a real tutor's cohort).
  sql(`insert into public.demo_fixture_rows (table_name, row_id, kind, label, restore)
  select 'college_invites', id, 'adopted', 'NTCY2DEMO points at the fixture cohort', jsonb_build_object('cohort_id', cohort_id)
    from public.college_invites where id = '${INVITE_NTCY2DEMO}'
  on conflict (table_name, row_id) do nothing;`);
  sql(`update public.college_invites set cohort_id = '${COHORT_C}' where id = '${INVITE_NTCY2DEMO}';`);

  // Assignments (seeded): tutor / assessor / IQA so "My learners" and _can_assess line up.
  insert(
    'college_student_assignments',
    LEARNERS.map((l) => ({
      id: randomUUID(),
      college_id: COLLEGE,
      college_name: COLLEGE_NAME,
      student_id: l.uid,
      tutor_id: l.cohort === 'B' ? null : TUTOR.uid,
      assessor_id: l.c.assessor,
      iqa_id: STAFF.iqa.uid,
      qualification_id: QUAL[l.c.qual].qid,
      cohort_id: l.c.id,
      cohort_name: l.c.name,
      academic_year: l.cohort === 'C' ? '2026/27' : '2025/26',
      start_date: l.start,
      expected_end_date: l.end,
      employer_id: null,
      employer_name: l.emp.company,
      status: 'active',
    }))
  );

  /* ─── 4. lessons + registers (last 8 weeks, this week, next 2) ─── */
  const lessonKey = (c, date) => `${c.id}|${date}|${c.time}`;
  const lessons = new Map();
  const lessonRows = [];
  for (const [ck, c] of Object.entries(COHORTS)) {
    const topics = COLLEGE_TOPICS[c.qual];
    for (let w = -8; w <= 2; w++) {
      const date = addDays(MONDAY, 7 * w + c.dow);
      if (date < c.start) continue;
      const title = `${topics[(w + 8 + (ck === 'C' ? 3 : 0)) % topics.length]}${ck === 'C' && w <= -3 ? ' (induction)' : ''}`;
      const row = {
        id: randomUUID(), college_id: COLLEGE, cohort_id: c.id, tutor_id: c.tutorStaff, title, scheduled_date: date,
        scheduled_start_time: c.time, duration_minutes: Math.round(c.collegeHours * 60) - 60, scheduled_room: c.room,
        status: date < TODAY ? 'delivered' : 'ready',
        objectives: `By the end of the session learners can explain and demonstrate: ${title.toLowerCase()}.`,
      };
      lessons.set(lessonKey(c, date), row);
      lessonRows.push(row);
    }
  }
  // Insert only where no lesson already sits in that slot (refresh_northgate_demo.sql adds some).
  for (const r of lessonRows) {
    sql(`with ins as (
      insert into public.college_lesson_plans (id, college_id, cohort_id, tutor_id, title, scheduled_date, scheduled_start_time, duration_minutes, scheduled_room, status, objectives)
      select ${q(r.id)}, ${q(r.college_id)}, ${q(r.cohort_id)}, ${q(r.tutor_id)}, ${q(r.title)}, ${q(r.scheduled_date)}, ${q(r.scheduled_start_time)}, ${r.duration_minutes}, ${q(r.scheduled_room)}, ${q(r.status)}, ${q(r.objectives)}
      where not exists (select 1 from public.college_lesson_plans lp where lp.cohort_id = ${q(r.cohort_id)} and lp.scheduled_date = ${q(r.scheduled_date)} and lp.scheduled_start_time = ${q(r.scheduled_start_time)})
      returning id)
    select pg_temp.fx_record('college_lesson_plans', array(select id from ins));`);
  }

  // Attendance: adopted learners' older fictional register rows are replaced by this one.
  sql(`delete from public.college_attendance where student_id = any (${uidList(LEARNERS.filter((l) => l.adopted).map((l) => l.row))});`);
  const absences = new Map(); // learner key → Set(date) absent
  for (const l of LEARNERS) {
    const r = rngFor(`att:${l.key}`);
    const set = new Set();
    absences.set(l.key, set);
    let n = 0;
    for (let w = -8; w <= 0; w++) {
      const date = addDays(MONDAY, 7 * w + l.c.dow);
      if (date >= TODAY || date < l.start) continue; // today's register is left for the tutor to take
      n++;
      let status = 'Present';
      const x = r();
      if (x < l.p.absent) status = r() < 0.25 ? 'Authorised' : 'Absent';
      else if (x < l.p.absent + l.p.late) status = 'Late';
      if (l.persona === 'at_risk' && n >= 5 && status === 'Present' && r() < 0.6) status = 'Absent'; // tailing off lately
      if (status === 'Absent' || status === 'Authorised') set.add(date);
      sql(`with ins as (
        insert into public.college_attendance (id, student_id, cohort_id, date, status, notes, recorded_by, lesson_plan_id, created_at)
        select gen_random_uuid(), '${l.row}', '${l.c.id}', '${date}', '${status}', ${q(status === 'Late' ? pick(r, ['Traffic on the ring road', 'Missed the 7:40 bus', 'Came from site']) : status === 'Authorised' ? 'Hospital appointment, told us in advance' : null)},
          '${l.c.actor}', (select id from public.college_lesson_plans lp where lp.cohort_id = '${l.c.id}' and lp.scheduled_date = '${date}' order by lp.scheduled_start_time limit 1), ${q(ts(date, '17:00'))}
        on conflict do nothing returning id)
      select pg_temp.fx_record('college_attendance', array(select id from ins));`);
    }
  }

  /* ─── 5. off-the-job hours ─── */
  const otj = [];
  for (const l of LEARNERS) {
    const r = rngFor(`otj:${l.key}`);
    const totalWeeks = daysBetween(l.start, l.end) / 7;
    const weekly = 1066 / totalWeeks;
    const topics = COLLEGE_TOPICS[l.c.qual];
    let w = 0;
    for (let mon = mondayOf(l.start); mon <= MONDAY; mon = addDays(mon, 7), w++) {
      const collegeDay = addDays(mon, l.c.dow);
      const target = weekly * l.p.otj * (0.85 + r() * 0.3);
      let hours = 0;
      const recent = daysBetween(mon, MONDAY) <= 7;
      const lastEight = daysBetween(mon, MONDAY) <= 56;
      const skipCollege = inBreak(collegeDay, true) || collegeDay >= TODAY || collegeDay < l.start ||
        (lastEight ? absences.get(l.key).has(collegeDay) : r() < l.p.absent * 0.8);
      if (!skipCollege) {
        hours += l.c.collegeHours;
        otj.push({
          id: randomUUID(), college_id: COLLEGE, student_id: l.uid, recorded_by: l.c.actor, recorded_by_name_snapshot: l.c.tutorName,
          activity_date: collegeDay, duration_minutes: Math.round(l.c.collegeHours * 60), activity_type: w % 3 === 2 ? 'practical' : 'theory',
          title: `College day: ${topics[w % topics.length]}`, description: 'Day release at Northgate. Register taken, session plan on file.',
          qualification_id: QUAL[l.c.qual].qid, unit_codes: null, source: 'college', source_kind: 'tutor_recorded', verification_status: 'verified',
          verified_by: l.c.actor, verified_at: ts(addDays(collegeDay, 1), '09:00'), in_working_hours: true, created_at: ts(collegeDay, '17:30'),
          verification_rationale: null, attested_by_name: null,
        });
      }
      let left = target - hours;
      let k = 0;
      while (left > 0.75 && k < 4) {
        const dur = Math.min(left, [1.5, 2, 2.5, 3, 3.5][Math.floor(r() * 5)]);
        const mins = Math.max(30, Math.round((dur * 60) / 30) * 30);
        const date = addDays(mon, [0, 2, 3, 4][Math.floor(r() * 4)] + (k === 3 ? 1 : 0));
        if (date > TODAY || date < l.start || inBreak(date, false)) break;
        const [type, title, desc] = OTJ_WORK[Math.floor(r() * OTJ_WORK.length)];
        let status = 'verified';
        let verifier = l.c.assessor;
        if (recent && date >= addDays(TODAY, -9)) status = 'pending';
        else if (r() < 0.14) {
          status = 'verified_by_employer';
          verifier = null;
        }
        otj.push({
          id: randomUUID(), college_id: COLLEGE, student_id: l.uid, recorded_by: l.uid, recorded_by_name_snapshot: l.display,
          activity_date: date, duration_minutes: mins, activity_type: type, title, description: desc,
          qualification_id: QUAL[l.c.qual].qid, unit_codes: null, source: 'apprentice', source_kind: 'apprentice_submitted', verification_status: status,
          verified_by: status === 'verified' ? verifier : null, verified_at: status === 'pending' ? null : ts(addDays(date, 3), '12:00'),
          in_working_hours: true, created_at: ts(addDays(date, 1), '19:00'), verification_rationale: null,
          attested_by_name: status === 'verified_by_employer' ? `${l.emp.contact} (fixture)` : null,
        });
        left -= mins / 60;
        k++;
      }
    }
    // One sent back, so the "rejected" path shows (not for brand-new learners).
    if (!l.cohort.startsWith('C') && ['behind_hours', 'at_risk', 'slightly_behind'].includes(l.persona)) {
      const date = addDays(TODAY, -16);
      otj.push({
        id: randomUUID(), college_id: COLLEGE, student_id: l.uid, recorded_by: l.uid, recorded_by_name_snapshot: l.display,
        activity_date: date, duration_minutes: 240, activity_type: 'practical', title: 'Second fix sockets on the Bramley job',
        description: 'Fitted the second fix for the kitchen and the lounge.', qualification_id: QUAL[l.c.qual].qid, unit_codes: null,
        source: 'apprentice', source_kind: 'apprentice_submitted', verification_status: 'rejected', verified_by: null, verified_at: ts(addDays(date, 2), '10:00'),
        in_working_hours: true, created_at: ts(addDays(date, 1), '20:00'),
        verification_rationale: 'This was your normal productive work for the customer. Off-the-job has to be new learning. Resubmit it with what you learned that was new to you.',
        attested_by_name: null,
      });
    }
  }
  insert('college_otj_entries', otj);

  // App learning (measured Study Centre time) for the last eight weeks + the activity feed.
  const te = [];
  const lal = [];
  const STUDY = [
    ['study_module', 'Module 3: Inspection and testing', 'apprentice/level3/module3'],
    ['flashcard_session', 'Flashcard Study Session', null],
    ['quiz_completed', 'Practice quiz: insulation resistance', 'quiz/ir'],
    ['study_module', 'Module 5: Earthing and bonding', 'apprentice/level3/module5'],
    ['video_watched', 'Video: safe isolation step by step', 'video/safe-isolation'],
  ];
  for (const l of LEARNERS) {
    const r = rngFor(`app:${l.key}`);
    const perWeek = l.p.app;
    for (let d = 1; d <= 56; d++) {
      const date = addDays(TODAY, -d);
      if (date < l.start) break;
      if (l.persona === 'at_risk' && d !== 41) continue;
      if (l.persona !== 'at_risk' && r() > perWeek / 7) continue;
      const [type, title, src] = STUDY[Math.floor(r() * STUDY.length)];
      const mins = 12 + Math.floor(r() * 40);
      te.push({ id: randomUUID(), user_id: l.uid, date, duration: mins, activity: `Study Centre: ${title}`, notes: 'Auto-tracked training time', is_automatic: true, created_at: ts(date, '20:15') });
      lal.push({ id: randomUUID(), user_id: l.uid, activity_type: type, source_id: src, source_title: title, xp_earned: 0, duration_minutes: mins, metadata: { measured: true, fixture: true }, counted_as_ojt: true, created_at: ts(date, '20:15') });
    }
  }
  insert('time_entries', te);
  insert('learning_activity_log', lal);

  /* ─── 6. portfolio: items, criteria, submissions, decisions, witness, plans ─── */
  const items = [];
  const subs = [];
  const subItems = [];
  const aiCriteria = [];
  const decisionsToMake = []; // {l, assessor, criteria[], decision, feedback, itemIds, subId, method, date}
  const learnerItems = new Map();
  for (const l of LEARNERS) {
    const plan = ITEM_PLAN[l.persona];
    const lib = EVIDENCE[l.c.qual];
    const order = plan[`order${l.c.qual}`] || ITEM_ORDER[l.c.qual];
    const n = Math.min(l.p.items, order.length);
    const keys = order.slice(0, n);
    const r = rngFor(`items:${l.key}`);
    const span = Math.max(14, daysBetween(l.start, TODAY) - 10);
    const created = keys.map((k, i) => {
      const e = lib[k];
      const isWaiting = i >= plan.passed + plan.referred && i < plan.passed + plan.referred + plan.waiting;
      const isDraft = i >= plan.passed + plan.referred + plan.waiting;
      const date = isWaiting ? addDays(TODAY, -(2 + i % 4)) : addDays(l.start, Math.round(((i + 1) / (n + 1)) * span));
      const refs = e.acs.map((a) => `${e.unit} AC ${a}`);
      const aiOnly = l.cohort === 'C' && isDraft;
      const item = {
        id: randomUUID(), user_id: l.uid, title: e.title, description: e.desc, category: e.cat,
        status: i < plan.passed ? 'reviewed' : isDraft ? 'draft' : 'completed',
        assessment_criteria_met: aiOnly ? [] : refs, evidence_count: e.type === 'document' ? 1 : 2,
        metadata: { evidenceType: e.type, workDate: date, siteRef: pick(r, SITES), role: 'Did this myself with my supervisor checking', fixture: true },
        storage_urls: [], tags: [], time_spent: 60 + Math.floor(r() * 120), date_completed: ts(date, '16:00'),
        created_at: ts(date, '18:30'), updated_at: ts(date, '18:30'), reflection_notes: i % 2 ? 'Next time I will plan the cable routes before I start, it would have saved an hour.' : null,
      };
      items.push(item);
      if (aiOnly) {
        e.acs.forEach((a, j) => aiCriteria.push({ id: randomUUID(), portfolio_item_id: item.id, learner_id: l.uid, qualification_code: l.c.qual, unit_code: e.unit, ac_code: a, source: 'ai_suggested', confidence: 70 + ((j * 7) % 25), ai_reason: 'The description shows this step being done on site.' }));
      }
      return { key: k, e, item, date, i, isWaiting, isDraft };
    });
    learnerItems.set(l.key, created);
    const passed = created.slice(0, plan.passed);
    const referred = created.slice(plan.passed, plan.passed + plan.referred);
    const waiting = created.slice(plan.passed + plan.referred, plan.passed + plan.referred + plan.waiting);
    if (passed.length) {
      const lastPassed = passed[passed.length - 1].date;
      const sub = {
        id: randomUUID(), user_id: l.uid, qualification_id: QUAL[l.c.qual].qid, status: 'signed_off', submitted_at: ts(addDays(lastPassed, 2), '19:00'),
        submission_notes: 'Evidence for my first units, as agreed at my review.', assessor_id: l.c.assessor, assigned_at: ts(addDays(lastPassed, 3), '09:00'),
        reviewed_at: ts(addDays(lastPassed, 9), '15:00'), reviewed_by: l.c.assessor, assessor_feedback: 'Clear, well-described evidence. Every criterion claimed is met.',
        grade: 'pass', signed_off_at: ts(addDays(lastPassed, 9), '15:05'), signed_off_by: l.c.assessor, submission_count: 1, last_feedback_at: ts(addDays(lastPassed, 9), '15:00'),
        feedback_source: 'assessor', created_at: ts(addDays(lastPassed, 2), '19:00'),
      };
      subs.push(sub);
      for (const p of passed) {
        subItems.push({ submission_id: sub.id, portfolio_item_id: p.item.id, added_at: sub.submitted_at });
        decisionsToMake.push({ l, criteria: p.e.acs.map((a) => ({ unit_code: p.e.unit, ac_code: a })), decision: 'passed', feedback: null, itemIds: [p.item.id], subId: sub.id, method: p.e.obs ? 'observation' : 'evidence_review', date: minDate(addDays(p.date, 10), addDays(TODAY, -3)) });
      }
    }
    for (const p of referred) {
      const sub = {
        id: randomUUID(), user_id: l.uid, qualification_id: QUAL[l.c.qual].qid, status: 'feedback_given', submitted_at: ts(addDays(p.date, 1), '20:00'),
        submission_notes: null, assessor_id: l.c.assessor, assigned_at: ts(addDays(p.date, 2), '09:00'), reviewed_at: ts(addDays(p.date, 6), '14:00'),
        reviewed_by: l.c.assessor, assessor_feedback: `Most of this is there. AC ${p.e.acs[p.e.acs.length - 1]} needs more: say what you checked and what the result was, and add a photo.`,
        grade: null, signed_off_at: null, signed_off_by: null, submission_count: 1, last_feedback_at: ts(addDays(p.date, 6), '14:00'),
        feedback_source: 'assessor', created_at: ts(addDays(p.date, 1), '20:00'),
      };
      subs.push(sub);
      subItems.push({ submission_id: sub.id, portfolio_item_id: p.item.id, added_at: sub.submitted_at });
      const date = minDate(addDays(p.date, 6), addDays(TODAY, -2));
      decisionsToMake.push({ l, criteria: p.e.acs.slice(0, -1).map((a) => ({ unit_code: p.e.unit, ac_code: a })), decision: 'passed', feedback: null, itemIds: [p.item.id], subId: sub.id, method: 'evidence_review', date });
      decisionsToMake.push({ l, criteria: [{ unit_code: p.e.unit, ac_code: p.e.acs[p.e.acs.length - 1] }], decision: 'referred', feedback: 'Say what you checked and what the result was, and add a photo of the finished work.', itemIds: [p.item.id], subId: sub.id, method: 'evidence_review', date });
    }
    if (waiting.length) {
      const last = waiting[waiting.length - 1].date;
      const sub = {
        id: randomUUID(), user_id: l.uid, qualification_id: QUAL[l.c.qual].qid, status: 'submitted', submitted_at: ts(addDays(last, 1), '20:30'),
        submission_notes: 'Ready for you to look at.', assessor_id: null, assigned_at: null, reviewed_at: null, reviewed_by: null, assessor_feedback: null,
        grade: null, signed_off_at: null, signed_off_by: null, submission_count: 1, last_feedback_at: null, feedback_source: 'assessor', created_at: ts(addDays(last, 1), '20:30'),
      };
      subs.push(sub);
      for (const p of waiting) subItems.push({ submission_id: sub.id, portfolio_item_id: p.item.id, added_at: sub.submitted_at });
    }
  }
  insert('portfolio_items', items);
  insert('portfolio_item_criteria', aiCriteria);
  insert('portfolio_submissions', subs);
  insert('portfolio_submission_items', subItems, { record: false }); // removed with their submission (cascade)

  // Decisions through the real RPC (assessor rules, qualification resolution), then dated to when they were made.
  for (const d of decisionsToMake) {
    claims(d.l.c.assessor);
    sql(`select public.record_ac_decisions('${d.l.uid}', ${jb(d.criteria)}, '${d.decision}', ${q(d.feedback)}, ${q(d.itemIds.length ? raw(`array[${d.itemIds.map((x) => `'${x}'`).join(',')}]::uuid[]`) : null)}, '${d.subId}', '${d.method}');`);
    sql(`with u as (
      update public.portfolio_assessment_decisions set decided_at = ${q(ts(d.date, '15:00'))}, created_at = ${q(ts(d.date, '15:00'))}
       where learner_id = '${d.l.uid}' and decided_at = now() returning id)
    select pg_temp.fx_record('portfolio_assessment_decisions', array(select id from u));`);
  }
  claims(null);
  // Supersession dates follow the backdated decisions; hashes recomputed exactly as _pad_before_insert does.
  sql(`update public.portfolio_assessment_decisions d set superseded_at = n.decided_at
         from public.portfolio_assessment_decisions n
        where d.superseded_by = n.id and d.learner_id = any (${uidList(LEARNERS.map((l) => l.uid))});`);
  sql(`update public.portfolio_assessment_decisions set content_hash = encode(extensions.digest(
         concat_ws('|', learner_id, qualification_code, unit_code, ac_code, decision, coalesce(feedback, ''), array_to_string(evidence_item_ids, ','), assessor_id, decided_at), 'sha256'), 'hex')
        where learner_id = any (${uidList(LEARNERS.map((l) => l.uid))});`);
  // Criteria the assessor tagged while deciding (trigger-made) are removed with their item (cascade).
  // IQA: Priya confirms about a third of the older cohort-A/B passes; one not confirmed, so the IQA loop shows.
  sql(`update public.portfolio_assessment_decisions d set iqa_verdict = 'confirmed', iqa_by = '${STAFF.iqa.uid}', iqa_at = d.decided_at + interval '9 days',
         iqa_feedback = 'Sampled: evidence sufficient and authentic, decision consistent with the standard.'
        where d.learner_id = any (${uidList(LEARNERS.filter((l) => l.cohort !== 'C').map((l) => l.uid))})
          and d.decision = 'passed' and d.superseded_at is null and d.decided_at < now() - interval '30 days'
          and (abs(hashtext(d.id::text)) % 3) = 0;`);
  sql(`update public.portfolio_assessment_decisions d set iqa_verdict = 'not_confirmed', iqa_by = '${STAFF.iqa.uid}', iqa_at = d.decided_at + interval '6 days',
         iqa_feedback = 'The photo does not show the terminations clearly. Ask for a close-up and re-assess this criterion.'
        where d.id = (select id from public.portfolio_assessment_decisions where learner_id = '${LEARNERS.find((l) => l.key === 'harvey.patel').uid}'
                        and decision = 'passed' and superseded_at is null and iqa_verdict is null order by decided_at limit 1);`);

  // Witness statements: one signed by a site supervisor, one waiting for the supervisor.
  const ellie = LEARNERS.find((l) => l.key === 'ellie.shaw');
  const ellie113 = learnerItems.get('ellie.shaw').find((x) => x.key === '113a');
  const jordan = LEARNERS.find((l) => l.key === 'jordan.mills');
  const jordanItem = learnerItems.get('jordan.mills').find((x) => x.key === '113a') || learnerItems.get('jordan.mills')[0];
  const wit = [
    {
      id: randomUUID(), learner_id: ellie.uid, portfolio_item_id: ellie113.item.id, token: randomUUID().replace(/-/g, ''), witness_email: null,
      witness_name: 'Gary Holt (fixture)', witness_role: 'Approved electrician, site supervisor', witness_company: EMPLOYERS[0].company,
      statement: 'I watched Ellie isolate the new ring final, prove it dead and carry out the continuity and insulation resistance tests herself. She recorded the readings on the schedule and the readings are hers.',
      criteria: ellie113.e.acs.map((a) => `${ellie113.e.unit} AC ${a}`), status: 'signed', expires_at: ts(addDays(ellie113.date, 30)), signed_at: ts(addDays(ellie113.date, 3), '17:20'),
      evidence_snapshot: { title: ellie113.item.title, description: ellie113.item.description, criteria: ellie113.item.assessment_criteria_met, captured_at: ellie113.item.created_at },
      created_at: ts(addDays(ellie113.date, 1), '19:00'),
    },
    {
      id: randomUUID(), learner_id: jordan.uid, portfolio_item_id: jordanItem.item.id, token: randomUUID().replace(/-/g, ''), witness_email: null,
      witness_name: null, witness_role: null, witness_company: null, statement: null,
      criteria: jordanItem.e.acs.map((a) => `${jordanItem.e.unit} AC ${a}`), status: 'requested', expires_at: ts(addDays(TODAY, 26)), signed_at: null,
      evidence_snapshot: { title: jordanItem.item.title, description: jordanItem.item.description, criteria: jordanItem.item.assessment_criteria_met, captured_at: jordanItem.item.created_at },
      created_at: ts(addDays(TODAY, -4), '18:00'),
    },
  ];
  insert('portfolio_witness_statements', wit);
  sql(`update public.portfolio_witness_statements set
         evidence_hash = encode(extensions.digest(coalesce(evidence_snapshot::text, ''), 'sha256'), 'hex'),
         statement_hash = case when statement is not null then encode(extensions.digest(statement, 'sha256'), 'hex') end
        where id in (${wit.map((w) => q(w.id)).join(',')});`);

  // Assessment plans through the real RPC; some made overdue afterwards.
  const PLANS = {
    '5357': [{ unit: '113', acs: ['3.4', '3.5', '3.6'], activity: 'Carry out the live tests on a domestic installation and record them on a schedule of test results', method: 'observation' }, { unit: '102', acs: ['4.1'], activity: 'Write up the near-miss from the Bramley job as a short report', method: 'product' }],
    '2357': [{ unit: '317', acs: ['3.3', '3.4', '3.5'], activity: 'Complete the live tests on the classroom block sub-main with your supervisor', method: 'observation' }, { unit: '311', acs: ['4.1'], activity: 'Write the risk assessment for the next phase of the school job', method: 'product' }],
    induction: [{ unit: '102', acs: ['2.1', '2.2'], activity: 'Photograph your isolation kit and lock-off on site and upload it with a short description', method: 'product' }],
  };
  const planCalls = [];
  for (const l of LEARNERS) {
    if (l.persona === 'new_slow') continue;
    const set = l.cohort === 'C' ? PLANS.induction : PLANS[l.c.qual];
    const overdue = ['at_risk', 'behind_hours'].includes(l.persona);
    set.forEach((p, i) => {
      if (l.cohort !== 'C' && i === 1 && !overdue && l.persona !== 'slightly_behind') return;
      planCalls.push({ l, p, due: overdue && i === 1 ? -8 : l.cohort === 'C' ? 9 : 12 + i * 7 });
    });
  }
  for (const pc of planCalls) {
    claims(pc.l.c.assessor);
    sql(`select public.set_assessment_plan_item('${pc.l.uid}', ${jb(pc.p.acs.map((a) => ({ unit_code: pc.p.unit, ac_code: a })))}, ${q(pc.p.activity)}, '${pc.p.method}', ${q(addDays(TODAY, Math.max(1, pc.due)))}, ${q(pc.due < 0 ? 'Agreed at the last review.' : null)});`);
    sql(`with u as (
      update public.portfolio_assessment_plans set created_at = ${q(ts(addDays(TODAY, pc.due < 0 ? -24 : -6), '11:00'))}, updated_at = ${q(ts(addDays(TODAY, pc.due < 0 ? -24 : -6), '11:00'))},
             notified_at = ${q(ts(addDays(TODAY, pc.due < 0 ? -24 : -6), '11:00'))}${pc.due < 0 ? `, due_date = '${addDays(TODAY, pc.due)}'` : ''}
       where learner_id = '${pc.l.uid}' and created_at = now() returning id)
    select pg_temp.fx_record('portfolio_assessment_plans', array(select id from u));`);
  }
  claims(null);

  /* ─── 7. quizzes ─── */
  const quizRows = [];
  const qRows = [];
  const attempts = [];
  const grades = [];
  for (const qz of QUIZZES) {
    const c = COHORTS[qz.cohort];
    const quizId = randomUUID();
    const r = rngFor(`quiz:${qz.key}`);
    quizRows.push({
      id: quizId, creator_id: qz.creator, title: qz.title, description: `${qz.title}. Set for ${c.name}.`, topic: qz.topic, difficulty: qz.difficulty,
      time_limit_minutes: 20, pass_mark: qz.passMark, is_published: true, cohort_id: c.id, qualification_code: qz.qual, due_date: addDays(TODAY, -qz.dueAgo),
      is_homework: true, source: 'manual', published_at: ts(addDays(TODAY, -qz.publishedAgo), '16:00'), kind: qz.kind,
      created_at: ts(addDays(TODAY, -qz.publishedAgo), '15:30'), updated_at: ts(addDays(TODAY, -qz.publishedAgo), '16:00'),
      instructions: qz.kind === 'assessment' ? 'Answer in full sentences. Your tutor marks the written answers.' : null,
    });
    const qs = qz.questions.map((x, i) => {
      const id = randomUUID();
      let options = null;
      let correctIndex = 0;
      if (x.kind === 'multi_choice') {
        correctIndex = (i * 3 + qz.key.length) % 4;
        options = [...x.wrong];
        options.splice(correctIndex, 0, x.correct);
      }
      qRows.push({
        id, quiz_id: quizId, question_text: x.text, options: options || [], correct_answer_index: correctIndex, explanation: x.kind === 'multi_choice' ? `The answer is: ${x.correct}.` : null,
        difficulty: qz.difficulty === 'mixed' ? 'medium' : qz.difficulty, ac_ref: x.ac || null, points: x.pts || 1, sort_order: i, question_kind: x.kind,
        expected_answer: x.expected ? { model_answer: x.expected } : {}, marking_guidance: x.guidance || null,
      });
      return { ...x, id, correctIndex };
    });
    const takers = LEARNERS.filter((l) => l.cohort === qz.cohort && qz.attempters(l));
    takers.forEach((l, ti) => {
      const lr = rngFor(`attempt:${qz.key}:${l.key}`);
      const strength = { ahead: 0.92, near_gateway: 0.9, steady: 0.78, new_good: 0.85, slightly_behind: 0.66, new: 0.7, behind_hours: 0.55, at_risk: 0.4, new_slow: 0.5 }[l.persona];
      const attemptId = randomUUID();
      const done = addDays(TODAY, -Math.max(1, qz.dueAgo + 1 + Math.floor(lr() * 4)));
      const answers = {};
      let score = 0;
      let total = 0;
      for (const x of qs) {
        total += x.pts || 1;
        if (x.kind === 'multi_choice') {
          const right = lr() < strength;
          const idx = right ? x.correctIndex : (x.correctIndex + 1 + Math.floor(lr() * 3)) % 4;
          answers[x.id] = { index: idx, kind: 'multi_choice' };
          if (right) score += x.pts || 1;
        } else {
          const good = lr() < strength;
          const pool = good ? WRITTEN_ANSWERS.good : WRITTEN_ANSWERS.ok;
          const text = pool[(qz.questions.indexOf(qz.questions.find((y) => y.text === x.text)) + (qz.key === 'q317' ? 3 : qz.key === 'qfault' ? 1 : 0)) % pool.length];
          answers[x.id] = { kind: x.kind, text };
          const ai = Math.max(0, Math.min(x.pts, Math.round(x.pts * (good ? 0.8 + lr() * 0.2 : 0.3 + lr() * 0.2))));
          // q113: most marked by the tutor already; qfault: waiting for the tutor (one not yet AI-marked); q317: Owen has marked most.
          const signed = qz.key === 'q113' ? ti % 3 !== 0 : qz.key === 'q317' ? ti % 4 !== 0 : false;
          const aiPending = qz.key === 'qfault' && ti === takers.length - 1;
          grades.push({
            id: randomUUID(), attempt_id: attemptId, question_id: x.id, learner_answer: { kind: x.kind, text },
            ai_score: aiPending ? null : ai, ai_rationale: aiPending ? null : good ? 'Covers the key points in the marking guidance in a sensible order.' : 'Partly right but misses the key reason in the guidance.',
            ai_strengths: aiPending ? null : good ? ['Correct sequence', 'Links the check to the result'] : ['Recognises the topic'],
            ai_areas: aiPending ? null : good ? [] : ['Explain why, not just what', 'Use the correct test names'],
            tutor_override_score: signed ? ai : null, tutor_override_rationale: signed ? 'Agree with the AI mark.' : null,
            tutor_override_by: signed ? qz.creator : null, tutor_override_at: signed ? ts(addDays(done, 2), '16:30') : null,
            created_at: ts(done, '20:05'),
          });
          score += signed ? ai : aiPending ? 0 : ai;
        }
      }
      attempts.push({
        id: attemptId, quiz_id: quizId, student_id: l.uid, score, total_points: total, started_at: ts(done, '19:40'), completed_at: ts(done, '20:02'),
        answers, time_taken_seconds: 900 + Math.floor(lr() * 600), created_at: ts(done, '19:40'),
      });
    });
  }
  insert('tutor_quizzes', quizRows);
  insert('tutor_quiz_questions', qRows);
  insert('tutor_quiz_attempts', attempts);
  insert('tutor_quiz_answer_grades', grades);

  /* ─── 8. ILPs + goals ─── */
  claims(TUTOR.uid); // the ILP goal guard lets college staff through
  const goals = [];
  for (const l of LEARNERS) {
    const r = rngFor(`ilp:${l.key}`);
    const review = { at_risk: -9, behind_hours: 6, slightly_behind: 13, steady: 24, ahead: 31, near_gateway: 18, new_good: 27, new: 27, new_slow: 20 }[l.persona];
    const focus = {
      at_risk: 'Get back to every college day and catch up on off-the-job hours',
      behind_hours: 'Log off-the-job hours every week and finish the Unit 113 evidence',
      slightly_behind: 'Keep the hours steady and close the referred criterion',
      steady: 'Finish the current unit evidence and start inspection and testing',
      ahead: 'Stretch: start fault diagnosis evidence early and mentor a new starter',
      near_gateway: 'Gateway preparation: last two units, AM2 booking and the gateway declaration',
      new_good: 'Settle in: induction evidence and the off-the-job routine',
      new: 'Settle in: induction evidence and the off-the-job routine',
      new_slow: 'Attendance and the induction evidence',
    }[l.persona];
    sql(`update public.college_ilps set tutor_id = ${q(l.cohort === 'B' ? null : TUTOR.uid)}, -- profiles id; Helen Clarke has no account tutor_name_snapshot = ${q(l.c.tutorName)}, headline_focus = ${q(focus)},
      headline_strengths = ${q(l.persona.startsWith('new') ? 'Keen on site, good feedback from the employer at induction.' : 'Practical work is neat and safe; supervisor feedback is positive.')},
      headline_areas = ${q(['at_risk', 'behind_hours', 'new_slow'].includes(l.persona) ? 'Attendance and logging hours as they happen.' : 'Written explanations: say why, not just what.')},
      support_strategies = 'Weekly check-in after college day. Hours reviewed at every progress review.',
      review_date = '${addDays(TODAY, review)}', last_reviewed = ${q(ts(addDays(TODAY, l.cohort === 'C' ? -20 : review - 84), '15:00'))},
      status = 'active', published_at = coalesce(published_at, ${q(ts(addDays(l.start, 14), '12:00'))}), updated_at = now()
     where student_id = '${l.row}' and is_current;`);
    const set = {
      at_risk: [['attend', 'overdue', -12], ['hours', 'in_progress', 9], ['wellbeing', 'in_progress', 14], ['unit118', 'not_started', -5]],
      behind_hours: [['hours', 'in_progress', 7], ['revise113', 'not_started', 16], ['unit118', 'completed', -20]],
      slightly_behind: [['hours', 'in_progress', 10], ['revise113', 'in_progress', 12], ['witness', 'not_started', 21]],
      steady: [['revise113', 'in_progress', 15], ['witness', 'completed', -9], ['study', 'in_progress', 30]],
      ahead: [['unit118', 'completed', -30], ['witness', 'completed', -12], ['revise113', 'completed', -4], ['study', 'in_progress', 28]],
      near_gateway: [['revise113', 'completed', -25], ['witness', 'completed', -14], ['study', 'in_progress', 20]],
      new_good: [['induction', 'in_progress', 9], ['study', 'not_started', 21]],
      new: [['induction', 'not_started', 9], ['hours', 'not_started', 21]],
      new_slow: [['attend', 'in_progress', 14], ['induction', 'not_started', 9]],
    }[l.persona];
    set.forEach(([gk, status, dueIn], i) => {
      const g = GOALS[gk];
      const ack = status !== 'not_started' || r() < 0.5;
      goals.push({
        id: randomUUID(), ilp: raw(`(select id from public.college_ilps where student_id = '${l.row}' and is_current limit 1)`), student_id: l.row, college_id: COLLEGE, position: i,
        category: g.category, priority: i === 0 ? 'high' : 'medium', source: 'tutor', title: g.title, description: g.desc,
        target_date: addDays(TODAY, dueIn), status, completed_at: status === 'completed' ? ts(addDays(TODAY, dueIn), '17:00') : null,
        completed_by: status === 'completed' ? l.uid : null, student_acknowledged: ack, student_acknowledged_at: ack ? ts(addDays(TODAY, -30), '19:00') : null,
        student_comment: status === 'in_progress' && i === 0 ? 'Working on it. Supervisor says I can do the testing on the next job.' : null,
        student_comment_at: status === 'in_progress' && i === 0 ? ts(addDays(TODAY, -6), '20:00') : null,
        created_by: l.cohort === 'B' ? STAFF.assessor.uid : TUTOR.uid, created_at: ts(addDays(TODAY, l.cohort === 'C' ? -20 : -45), '15:00'),
      });
    });
  }
  // college_ilp_goals.ilp_id comes from a subquery (the shell made by tg_create_ilp_shell).
  for (const g of goals) {
    const { ilp, ...rest } = g;
    const cols = ['ilp_id', ...Object.keys(rest)];
    sql(`insert into public.college_ilp_goals (${cols.join(', ')}) values (${[ilp.__raw, ...Object.entries(rest).map(([c, v]) => qc(c, v))].join(', ')});`);
    ledger.push(['college_ilp_goals', g.id]);
  }
  // Adopted learners' own (fictional) goals: re-dated, as refresh_northgate_demo.sql used to.
  sql(`update public.college_ilp_goals g set target_date = current_date + 7 * sub.rn::int
         from (select id, row_number() over (order by position, created_at) rn from public.college_ilp_goals
                where student_id = any (${uidList(LEARNERS.filter((l) => l.adopted).map((l) => l.row))}) and status not in ('completed','cancelled')
                  and id not in (${goals.map((g) => q(g.id)).join(',')})) sub
        where g.id = sub.id;`);
  claims(null);

  /* ─── 9. progress reviews (tripartite) ─── */
  const reviewSql = [];
  for (const l of LEARNERS) {
    const r = rngFor(`rev:${l.key}`);
    const tutorStaffId = l.c.tutorStaff;
    if (l.cohort !== 'C') {
      // Held review ~9 weeks ago, written up and signed off by the tutor; most learners have signed it.
      const held = addDays(TODAY, -(56 + Math.floor(r() * 21)));
      const id = randomUUID();
      reviewSql.push(`select set_config('app.tripartite_rpc', 'on', true);`);
      reviewSql.push(`insert into public.college_tripartite_reviews (id, college_id, student_id, tutor_staff_id, employer_id, employer_contact_name, employer_contact_email, scheduled_at, duration_minutes, location, mode, status, agenda, outcomes, employer_attendance, created_by, created_at, updated_at)
        values ('${id}', '${COLLEGE}', '${l.row}', '${tutorStaffId}', '${l.emp.id}', ${q(l.emp.contact + ' (fixture)')}, null, ${q(ts(held, '15:30'))}, 45, ${q(l.emp.company)}, 'in_person', 'scheduled', '[]'::jsonb,
          ${q({ summary: `${l.name} is ${['at_risk', 'behind_hours'].includes(l.persona) ? 'behind on off-the-job hours and has missed college days; we agreed a weekly plan with the employer.' : 'making good progress on site and at college; the employer is happy with the work.'}`, plan_change: 'none', progress: l.persona, otj_discussed: true })},
          'attended', '${TUTOR.uid}', ${q(ts(addDays(held, -14), '10:00'))}, ${q(ts(addDays(held, -14), '10:00'))});`);
      reviewSql.push(`select set_config('app.tripartite_rpc', 'off', true);`);
      ledger.push(['college_tripartite_reviews', id]);
      const a1 = randomUUID();
      const a2 = randomUUID();
      reviewSql.push(`insert into public.college_review_actions (id, review_id, college_id, student_id, action, owner_party, due_date, status, position, created_by, created_at) values
        ('${a1}', '${id}', '${COLLEGE}', '${l.row}', ${q(['at_risk', 'behind_hours'].includes(l.persona) ? 'Log off-the-job hours every Friday before leaving site' : 'Upload the evidence from the current job within a week')}, 'apprentice', '${addDays(held, 21)}', 'open', 0, '${TUTOR.uid}', ${q(ts(held, '16:20'))}),
        ('${a2}', '${id}', '${COLLEGE}', '${l.row}', 'Give the apprentice two hours a week for off-the-job training on site', 'employer', '${addDays(held, 14)}', 'open', 1, '${TUTOR.uid}', ${q(ts(held, '16:21'))});`);
      ledger.push(['college_review_actions', a1], ['college_review_actions', a2]);
      reviewSql.push(`select set_config('request.jwt.claims', '{"sub":"${TUTOR.uid}","role":"authenticated"}', true);`);
      reviewSql.push(`do $$ declare v jsonb; begin v := public.sign_off_tripartite_review('${id}', '${held}'); if v ? 'error' then raise exception 'sign-off refused for ${l.key}: %', v->>'error'; end if; end $$;`);
      if (l.persona !== 'at_risk') {
        reviewSql.push(`select set_config('request.jwt.claims', '{"sub":"${l.uid}","role":"authenticated"}', true);`);
        reviewSql.push(`select public.sign_tripartite_review_learner('${id}');`);
      }
      reviewSql.push(`select set_config('request.jwt.claims', '', true);`);
      reviewSql.push(`select set_config('app.tripartite_rpc', 'on', true);`);
      reviewSql.push(`update public.college_tripartite_reviews set completed_at = case when completed_at is not null then ${q(ts(addDays(held, 3), '19:00'))}::timestamptz end,
          signatures = signatures || jsonb_build_object('tutor_signed_at', ${q(ts(addDays(held, 1), '12:00'))}) ||
            case when signatures ? 'student_signed_at' then jsonb_build_object('student_signed_at', ${q(ts(addDays(held, 3), '19:00'))}) else '{}'::jsonb end,
          locked_at = ${q(ts(addDays(held, 1), '12:00'))}, updated_at = ${q(ts(addDays(held, 3), '19:00'))}
        where id = '${id}';`);
      reviewSql.push(`select set_config('app.tripartite_rpc', 'off', true);`);
    }
    // Next review: booked; two overdue (booked date passed, not held), one due this week.
    const nextIn = { at_risk: -6, behind_hours: -2, slightly_behind: 4, steady: 16 + Math.floor(r() * 20), ahead: 25, near_gateway: 9, new_good: 50, new: 55, new_slow: 45 }[l.persona];
    const id2 = randomUUID();
    reviewSql.push(`insert into public.college_tripartite_reviews (id, college_id, student_id, tutor_staff_id, employer_id, employer_contact_name, employer_contact_email, scheduled_at, duration_minutes, location, mode, status, agenda, outcomes, created_by, created_at, updated_at)
      values ('${id2}', '${COLLEGE}', '${l.row}', '${tutorStaffId}', '${l.emp.id}', ${q(l.emp.contact + ' (fixture)')}, null, ${q(ts(addDays(TODAY, nextIn), nextIn % 2 ? '09:00' : '14:00'))}, 45, ${q(l.emp.company)}, ${q(nextIn % 3 === 0 ? 'video' : 'in_person')}, 'scheduled', '[]'::jsonb, '{}'::jsonb,
        '${TUTOR.uid}', ${q(ts(addDays(TODAY, Math.min(-3, nextIn - 21)), '11:00'))}, ${q(ts(addDays(TODAY, Math.min(-3, nextIn - 21)), '11:00'))});`);
    ledger.push(['college_tripartite_reviews', id2]);
  }
  sql(`select set_config('app.tripartite_rpc', 'on', true);`);
  reviewSql.forEach(sql);
  sql(`select set_config('app.tripartite_rpc', 'off', true);`);
  claims(null);

  /* ─── 10. messages ─── */
  const THREADS = [
    { key: 'tom.blackwell', subject: 'Missed Tuesday', msgs: [['tutor', 'Hi Tom, we missed you on Tuesday again. Is everything alright? Give me a ring or reply here.', -8], ['student', "Sorry, car's off the road and the bus doesn't get in till 10. Trying to sort a lift with Steve from work.", -7], ['student', 'Can I catch up on the testing session somehow?', -1]], unreadTutor: 1 },
    { key: 'kieran.doyle', subject: 'Hours from the wholesaler training', msgs: [['student', 'Does the Hager training last Thursday count as off-the-job? It was 3 hours.', -2]], unreadTutor: 1 },
    { key: 'ellie.shaw', subject: 'Unit 118 signed off', msgs: [['tutor', 'Great work on the SWA terminations, Ellie. Unit 118 is complete. Start thinking about which job could cover the live tests.', -15], ['student', 'Thanks! The garage job next month should do it.', -15]], unreadTutor: 0 },
    { key: 'noah.williams', subject: 'Lock-off kit', msgs: [['student', 'Do I need my own lock-off kit for the induction evidence or can I use the company one?', 0]], unreadTutor: 1 },
    { key: 'jordan.mills', subject: 'Witness statement', msgs: [['tutor', 'Your supervisor has the witness request. Remind him when you see him Monday.', -4], ['student', 'Will do, thanks.', -4]], unreadTutor: 0 },
  ];
  const threads = [];
  const msgs = [];
  for (const t of THREADS) {
    const l = LEARNERS.find((x) => x.key === t.key);
    const id = randomUUID();
    const last = t.msgs[t.msgs.length - 1][2];
    threads.push({ id, student_id: l.row, college_id: COLLEGE, subject: t.subject, created_by: t.msgs[0][0] === 'tutor' ? TUTOR.staff : null, last_message_at: ts(addDays(TODAY, last), last === 0 ? '07:45' : '18:10'), unread_count_tutor: t.unreadTutor, unread_count_student: 0, created_at: ts(addDays(TODAY, t.msgs[0][2]), '18:00') });
    t.msgs.forEach(([kind, body, day], i) => {
      const isLast = i === t.msgs.length - 1;
      msgs.push({ id: randomUUID(), thread_id: id, sender_kind: kind, sender_id: kind === 'tutor' ? TUTOR.uid : l.uid, body, read_at: kind === 'student' && isLast && t.unreadTutor ? null : ts(addDays(TODAY, day), '20:00'), created_at: ts(addDays(TODAY, day), day === 0 ? '07:45' : `18:${10 + i}`) });
    });
  }
  insert('student_message_threads', threads);
  insert('student_messages', msgs);
  // The counter trigger bumped these as messages went in; set them to what the story says.
  for (const t of threads) sql(`update public.student_message_threads set unread_count_tutor = ${t.unread_count_tutor}, unread_count_student = 0, last_message_at = ${q(t.last_message_at)} where id = '${t.id}';`);

  /* ─── 11. pastoral + safeguarding (DSL = Priya, a fixture account) ─── */
  const L = (k) => LEARNERS.find((x) => x.key === k);
  const notes = [
    { id: randomUUID(), student_id: L('tom.blackwell').row, college_id: COLLEGE, author_id: TUTOR.staff, kind: 'concern', visibility: 'tutors', title: 'Attendance dropping', body: 'Third missed college day in five weeks. Says his car is off the road. Hours are well behind plan. Spoke to the employer about a lift share.', action_required: 'Call Tom and the employer together before next Tuesday', action_by_date: addDays(TODAY, 4), created_at: ts(addDays(TODAY, -8), '16:00') },
    { id: randomUUID(), student_id: L('tom.blackwell').row, college_id: COLLEGE, author_id: TUTOR.staff, kind: 'one_to_one', visibility: 'tutors', title: 'Catch-up call', body: 'Talked through a plan: lift with a colleague from Monday, two catch-up sessions in the workshop, hours logged every Friday.', action_required: null, action_by_date: null, created_at: ts(addDays(TODAY, -6), '12:30') },
    { id: randomUUID(), student_id: L('callum.fraser').row, college_id: COLLEGE, author_id: STAFF.assessor.staff, kind: 'safeguarding', visibility: 'safeguarding', title: 'Money worries affecting attendance', body: 'Callum said he has been skipping meals to pay for fuel and has missed college to take extra shifts. Passed to the DSL the same day.', action_required: 'DSL to meet Callum and look at the bursary and travel support', action_by_date: addDays(TODAY, 2), created_at: ts(addDays(TODAY, -3), '14:10'), acknowledged_at: ts(addDays(TODAY, -3), '15:40'), acknowledged_by: STAFF.iqa.uid },
    { id: randomUUID(), student_id: L('ellie.shaw').row, college_id: COLLEGE, author_id: TUTOR.staff, kind: 'praise', visibility: 'tutors', title: 'Unit 118 complete early', body: 'Employer says Ellie is the most careful apprentice they have had. Unit 118 complete two months ahead of plan.', action_required: null, action_by_date: null, created_at: ts(addDays(TODAY, -15), '17:00') },
    { id: randomUUID(), student_id: L('mason.wright').row, college_id: COLLEGE, author_id: TUTOR.staff, kind: 'note', visibility: 'tutors', title: 'Missed induction day', body: 'Mason missed the second induction day (dentist, told us after). Needs the safe isolation session repeated before he works on site.', action_required: 'Book Mason into the Thursday workshop catch-up', action_by_date: addDays(TODAY, 1), created_at: ts(addDays(TODAY, -13), '11:00') },
  ];
  for (const n of notes) {
    n.acknowledged_at = n.acknowledged_at || null;
    n.acknowledged_by = n.acknowledged_by || null;
  }
  insert('pastoral_notes', notes);

  /* ─── 12. staff compliance, observations, IQA ─── */
  const SCR = [];
  const staffList = [
    { staff: TUTOR.staff, name: TUTOR.name, codes: [['DBS_ENHANCED', -700, 395, 'valid'], ['RIGHT_TO_WORK', -900, null, 'valid'], ['REFERENCES', -900, null, 'valid'], ['SAFEGUARDING_L1', -345, 20, 'expiring'], ['PREVENT', -200, 165, 'valid'], ['TAQA_ASSESSOR', -1500, null, 'valid'], ['DET', -2000, null, 'valid']] },
    { staff: STAFF.iqa.staff, name: STAFF.iqa.name, codes: [['DBS_ENHANCED', -400, 695, 'valid'], ['RIGHT_TO_WORK', -1200, null, 'valid'], ['REFERENCES', -1200, null, 'valid'], ['SAFEGUARDING_L3_DSL', -300, 430, 'valid'], ['PREVENT', -100, 265, 'valid'], ['TAQA_IQA', -1800, null, 'valid']] },
    { staff: STAFF.assessor.staff, name: STAFF.assessor.name, codes: [['DBS_ENHANCED', -1060, 35, 'expiring'], ['RIGHT_TO_WORK', -1100, null, 'valid'], ['REFERENCES', -1100, null, 'valid'], ['SAFEGUARDING_L1', -380, -15, 'expired'], ['TAQA_ASSESSOR', -1000, null, 'valid']] },
  ];
  for (const s of staffList) {
    for (const [code, issued, expires, status] of s.codes) {
      SCR.push({ id: randomUUID(), college_staff_id: s.staff, requirement_code: code, issued_at: addDays(TODAY, issued), expires_at: expires === null ? null : addDays(TODAY, expires), reference_no: code.startsWith('DBS') ? `00${1700000000 + Math.abs(hash(s.name + code)) % 99999999}` : null, status, notes: 'Fixture record (ELE-1852).', verified_by: STAFF.iqa.uid, verified_at: ts(addDays(TODAY, issued + 2), '10:00'), college_id_snapshot: COLLEGE, staff_name_snapshot: s.name });
    }
  }
  for (const s of SCR) {
    sql(`with ins as (insert into public.staff_compliance_records (${Object.keys(s).join(', ')}) values (${Object.entries(s).map(([c, v]) => qc(c, v)).join(', ')})
      on conflict (college_staff_id, requirement_code) do nothing returning id)
    select pg_temp.fx_record('staff_compliance_records', array(select id from ins));`);
  }

  const obs = [];
  const OBS_PLAN = [
    ['amy.watson', '118', ['1.1', '1.2', '2.1'], 'passed', 'Terminations on a kitchen first fix', -40],
    ['ellie.shaw', '113', ['2.1', '2.2'], 'passed', 'Dead tests on the extension ring final', -26],
    ['harvey.patel', '118', ['2.3', '2.4'], 'partial', 'SWA gland and terminations', -19],
    ['tom.blackwell', '102', ['2.1', '2.2', '2.3'], 'referred', 'Safe isolation of a shower circuit', -33],
    ['jordan.mills', '102', ['2.1', '2.2', '2.3'], 'passed', 'Safe isolation before a socket change', -12],
    ['katie.robinson', '316', ['1.1', '1.2', '1.3'], 'passed', 'SWA terminations at the classroom DB', -37],
    ['aisha.rahman', '317', ['1.1', '1.2', '1.3'], 'passed', 'Initial verification dead tests', -21],
    ['liam.oconnor', '315', ['1.1', '1.2'], 'passed', 'Conduit bending and fixing', -9],
  ];
  for (const [k, unit, acs, outcome, title, day] of OBS_PLAN) {
    const l = L(k);
    const assessorStaff = l.cohort === 'B' ? STAFF.assessor : { staff: TUTOR.staff, name: TUTOR.name };
    obs.push({
      id: randomUUID(), college_id: COLLEGE, college_student_id: l.row, student_name_snapshot: l.display, college_staff_id: assessorStaff.staff, assessor_name_snapshot: assessorStaff.name,
      observed_at: addDays(TODAY, day), observed_time: '10:30', duration_minutes: 60, location: l.emp.company, location_type: 'employer_site', activity_title: title,
      activity_summary: `Observed ${l.name} on site: ${title.toLowerCase()}.`, qualification_code: l.c.qual, unit_code: unit, acs_evidenced: acs, ksbs_observed: [],
      outcome, grade: null, feedback_strengths: outcome === 'referred' ? 'Knew the sequence.' : 'Safe, methodical, explained each step clearly.',
      feedback_areas: outcome === 'passed' ? 'Keep the work area tidier.' : 'Did not re-prove the tester after testing dead. Must be done every time.',
      action_points: outcome === 'passed' ? [] : ['Repeat the safe isolation sequence with the tutor', 'Re-observe within four weeks'], follow_up_required: outcome !== 'passed',
      follow_up_date: outcome !== 'passed' ? addDays(TODAY, 10) : null, assessor_signed: true, assessor_signed_at: ts(addDays(TODAY, day), '12:00'),
      learner_acknowledged: day < -14, learner_acknowledged_at: day < -14 ? ts(addDays(TODAY, day + 2), '19:00') : null, created_by: l.cohort === 'B' ? STAFF.assessor.uid : TUTOR.uid,
      created_at: ts(addDays(TODAY, day), '12:00'),
    });
  }
  insert('college_observations', obs);

  const sampA = randomUUID();
  const sampB = randomUUID();
  insert('college_iqa_sampling', [
    { id: sampA, college_id: COLLEGE, assessor_id: TUTOR.staff, iqa_id: STAFF.iqa.staff, iqa_name_snapshot: STAFF.iqa.name, period_start: addDays(TODAY, -90), period_end: addDays(TODAY, 30), target_sample_percent: 20, qualification_code: '5357', unit_code: null, notes: 'Autumn term sampling plan for the L2 cohorts. Focus on safe isolation and terminations.', total_assessments: 24, created_at: ts(addDays(TODAY, -90), '09:00') },
    { id: sampB, college_id: COLLEGE, assessor_id: STAFF.assessor.staff, iqa_id: STAFF.iqa.staff, iqa_name_snapshot: STAFF.iqa.name, period_start: addDays(TODAY, -90), period_end: addDays(TODAY, 30), target_sample_percent: 25, qualification_code: '2357', unit_code: '317', notes: 'New assessor in post: higher sample rate this term.', total_assessments: 16, created_at: ts(addDays(TODAY, -90), '09:05') },
  ]);
  const verified = otj.filter((o) => o.verification_status === 'verified' && o.source_kind === 'apprentice_submitted');
  const samples = [
    { id: randomUUID(), sampling_plan_id: sampA, observation_id: obs[0].id, otj_id: null, iqa_id: STAFF.iqa.staff, iqa_name_snapshot: STAFF.iqa.name, sampled_at: ts(addDays(TODAY, -30), '14:00'), verdict: 'agree', comments: 'Decision safe. Good questioning recorded.' },
    { id: randomUUID(), sampling_plan_id: sampA, observation_id: obs[1].id, otj_id: null, iqa_id: STAFF.iqa.staff, iqa_name_snapshot: STAFF.iqa.name, sampled_at: ts(addDays(TODAY, -20), '14:00'), verdict: 'agree', comments: 'Clear evidence of each test step.' },
    { id: randomUUID(), sampling_plan_id: sampA, observation_id: obs[2].id, otj_id: null, iqa_id: STAFF.iqa.staff, iqa_name_snapshot: STAFF.iqa.name, sampled_at: ts(addDays(TODAY, -2), '09:00'), verdict: 'pending', comments: null },
    { id: randomUUID(), sampling_plan_id: sampB, observation_id: obs[6].id, otj_id: null, iqa_id: STAFF.iqa.staff, iqa_name_snapshot: STAFF.iqa.name, sampled_at: ts(addDays(TODAY, -15), '11:00'), verdict: 'agree', comments: 'Sequence correct; readings recorded.' },
    { id: randomUUID(), sampling_plan_id: sampA, observation_id: null, otj_id: verified.find((o) => o.student_id === L('kieran.doyle').uid)?.id, iqa_id: STAFF.iqa.staff, iqa_name_snapshot: STAFF.iqa.name, sampled_at: ts(addDays(TODAY, -12), '10:00'), verdict: 'refer', comments: 'Reads like productive work. Ask the learner what was new learning before counting it.' },
    { id: randomUUID(), sampling_plan_id: sampB, observation_id: null, otj_id: verified.find((o) => o.student_id === L('liam.oconnor').uid)?.id, iqa_id: STAFF.iqa.staff, iqa_name_snapshot: STAFF.iqa.name, sampled_at: ts(addDays(TODAY, -11), '10:00'), verdict: 'agree', comments: 'Genuine off-the-job learning, well described.' },
  ].filter((s) => s.observation_id || s.otj_id);
  insert('college_iqa_samples', samples);

  const deliveredA = lessonRows.find((x) => x.cohort_id === COHORTS.A.id && x.scheduled_date === addDays(MONDAY, -21 + COHORTS.A.dow));
  insert('college_tutor_observations', [
    {
      id: randomUUID(), college_id: COLLEGE, tutor_staff_id: TUTOR.staff, tutor_name_snapshot: TUTOR.name, observer_staff_id: STAFF.iqa.staff, observer_name_snapshot: STAFF.iqa.name,
      observer_role: 'IQA', observation_kind: 'peer', observed_at: addDays(MONDAY, -21 + COHORTS.A.dow), observed_time: '09:30', duration_minutes: 60,
      lesson_plan_id: raw(`(select id from public.college_lesson_plans where cohort_id = '${COHORTS.A.id}' and scheduled_date = '${addDays(MONDAY, -21 + COHORTS.A.dow)}' order by scheduled_start_time limit 1)`),
      cohort_id: COHORTS.A.id, location: COHORTS.A.room, focus_area: 'Checking learning in a practical session',
      strengths: 'Clear safety briefing; every learner proved their tester before starting; good use of questioning to check understanding.',
      areas_for_development: 'Two learners finished early and waited. Have an extension task ready.', agreed_actions: [{ action: 'Prepare an extension task for each practical', due: addDays(TODAY, 14) }],
      grade: 'good', tutor_acknowledged: true, tutor_acknowledged_at: ts(addDays(MONDAY, -19), '17:00'), tutor_response: 'Agreed. Will add a fault-finding board as the extension.',
      created_by: STAFF.iqa.uid, created_at: ts(addDays(MONDAY, -21 + COHORTS.A.dow), '12:00'),
    },
  ]);
  void deliveredA;

  /* ─── 13. learners' progress figure on the roll (the list reads it) ─── */
  for (const l of LEARNERS) {
    const pct = { ahead: 46, near_gateway: 81, steady: 34, slightly_behind: 27, behind_hours: 22, at_risk: 14, new_good: 5, new: 3, new_slow: 2 }[l.persona];
    sql(`update public.college_students set progress_percent = ${pct}, updated_at = now() where id = '${l.row}';`);
  }

  // Ledger for everything inserted with a JS id.
  const byTable = new Map();
  for (const [t, id] of ledger) {
    if (!byTable.has(t)) byTable.set(t, []);
    byTable.get(t).push(id);
  }
  for (const [t, ids] of byTable) {
    for (let i = 0; i < ids.length; i += 800) sql(`select pg_temp.fx_record('${t}', ${uidList(ids.slice(i, i + 800))});`);
  }
  // Bell rows the RPCs wrote for fixture learners/staff during this run: seeded too (removed on reset).
  sql(`select pg_temp.fx_record('user_notifications', array(select id from public.user_notifications where created_at = now() and user_id = any (${uidList([...fixtureUids, TUTOR.uid, DEMO_LEARNER.uid])})));`);
}

/* ─── 14. safety: nothing reached a real person, every seeded row is fixture-owned ─── */
sql(`do $$
declare
  v_real int; v_push int; v_http int; v_owner text;
  v_epoch bigint := pg_current_xact_id()::text::bigint - (pg_current_xact_id()::text::bigint % 4294967296);
begin
  -- Rows visible to us whose inserting transaction is still in progress can only be ours.
  select count(*) into v_real from public.user_notifications n join auth.users u on u.id = n.user_id
   where pg_xact_status((v_epoch + n.xmin::text::bigint)::text::xid8) = 'in progress' and u.email not like 'founder+collegedemo-%';
  select count(*) into v_push from public.push_notification_log p
   where pg_xact_status((v_epoch + p.xmin::text::bigint)::text::xid8) = 'in progress';
  select count(*) into v_http from net.http_request_queue h
   where pg_xact_status((v_epoch + h.xmin::text::bigint)::text::xid8) = 'in progress';
  if v_real > 0 or v_push > 0 or v_http > 0 then
    raise exception 'SAFETY: this run would notify someone (real-account bells %, pushes %, http calls %). Rolled back.', v_real, v_push, v_http;
  end if;
  with owned as (
    select 'college_otj_entries' t, o.student_id uid from public.college_otj_entries o join public.demo_fixture_rows r on r.table_name = 'college_otj_entries' and r.row_id = o.id
    union all select 'portfolio_items', i.user_id from public.portfolio_items i join public.demo_fixture_rows r on r.table_name = 'portfolio_items' and r.row_id = i.id
    union all select 'portfolio_submissions', s.user_id from public.portfolio_submissions s join public.demo_fixture_rows r on r.table_name = 'portfolio_submissions' and r.row_id = s.id
    union all select 'portfolio_assessment_decisions', d.learner_id from public.portfolio_assessment_decisions d join public.demo_fixture_rows r on r.table_name = 'portfolio_assessment_decisions' and r.row_id = d.id
    union all select 'portfolio_assessment_plans', p.learner_id from public.portfolio_assessment_plans p join public.demo_fixture_rows r on r.table_name = 'portfolio_assessment_plans' and r.row_id = p.id
    union all select 'portfolio_witness_statements', w.learner_id from public.portfolio_witness_statements w join public.demo_fixture_rows r on r.table_name = 'portfolio_witness_statements' and r.row_id = w.id
    union all select 'tutor_quiz_attempts', a.student_id from public.tutor_quiz_attempts a join public.demo_fixture_rows r on r.table_name = 'tutor_quiz_attempts' and r.row_id = a.id
    union all select 'time_entries', t.user_id from public.time_entries t join public.demo_fixture_rows r on r.table_name = 'time_entries' and r.row_id = t.id
    union all select 'learning_activity_log', t.user_id from public.learning_activity_log t join public.demo_fixture_rows r on r.table_name = 'learning_activity_log' and r.row_id = t.id
    union all select 'college_attendance', s.user_id from public.college_attendance a join public.college_students s on s.id = a.student_id join public.demo_fixture_rows r on r.table_name = 'college_attendance' and r.row_id = a.id
    union all select 'college_ilp_goals', s.user_id from public.college_ilp_goals g join public.college_students s on s.id = g.student_id join public.demo_fixture_rows r on r.table_name = 'college_ilp_goals' and r.row_id = g.id
    union all select 'college_tripartite_reviews', s.user_id from public.college_tripartite_reviews v join public.college_students s on s.id = v.student_id join public.demo_fixture_rows r on r.table_name = 'college_tripartite_reviews' and r.row_id = v.id
    union all select 'pastoral_notes', s.user_id from public.pastoral_notes v join public.college_students s on s.id = v.student_id join public.demo_fixture_rows r on r.table_name = 'pastoral_notes' and r.row_id = v.id
    union all select 'student_message_threads', s.user_id from public.student_message_threads v join public.college_students s on s.id = v.student_id join public.demo_fixture_rows r on r.table_name = 'student_message_threads' and r.row_id = v.id
    union all select 'college_observations', s.user_id from public.college_observations v join public.college_students s on s.id = v.college_student_id join public.demo_fixture_rows r on r.table_name = 'college_observations' and r.row_id = v.id
    union all select 'staff_compliance_records', st.user_id from public.staff_compliance_records v join public.college_staff st on st.id = v.college_staff_id join public.demo_fixture_rows r on r.table_name = 'staff_compliance_records' and r.row_id = v.id
    union all select 'college_student_assignments', a.student_id from public.college_student_assignments a join public.demo_fixture_rows r on r.table_name = 'college_student_assignments' and r.row_id = a.id
    union all select 'user_notifications', n.user_id from public.user_notifications n join public.demo_fixture_rows r on r.table_name = 'user_notifications' and r.row_id = n.id
  )
  select string_agg(distinct o.t, ', ') into v_owner from owned o left join auth.users u on u.id = o.uid
   where u.email is null or u.email not like 'founder+collegedemo-%';
  if v_owner is not null then
    raise exception 'SAFETY: seeded rows owned by a non-fixture account in: %. Rolled back.', v_owner;
  end if;
end $$;`);

for (const [t, trgs] of Object.entries(QUIET)) for (const g of trgs) sql(`alter table public.${t} enable trigger ${g};`);

const SUMMARY = `select jsonb_build_object(
  'mode', '${MODE}', 'today', '${TODAY}',
  'ledger', (select coalesce(jsonb_object_agg(k, n), '{}'::jsonb) from (select kind || ':' || table_name k, count(*) n from public.demo_fixture_rows group by 1) x),
  'learners', (select count(*) from public.college_students s join auth.users u on u.id = s.user_id where s.college_id = '${COLLEGE}' and u.email like 'founder+collegedemo-%'),
  'cohorts', (select jsonb_agg(jsonb_build_object('name', c.name, 'tutor', st.name, 'learners', (select count(*) from public.college_students s where s.cohort_id = c.id))) from public.college_cohorts c left join public.college_staff st on st.id = c.tutor_id where c.college_id = '${COLLEGE}')
) as summary`;

if (DRY) {
  sql(`do $$ declare v jsonb; begin ${SUMMARY.replace('select jsonb_build_object', 'v := jsonb_build_object').replace(' as summary', '')}; raise exception 'RESULTS:%', v; end $$;`);
  sql('rollback;');
} else {
  sql('commit;');
  if (SEEDING) {
    // Recompute risk for the fixture learners only (the same edge function the daily cron runs).
    sql(`select net.http_post(
      url := 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/compute-student-risk',
      headers := jsonb_build_object('content-type', 'application/json', 'x-scheduled', 'true',
        'authorization', 'Bearer ' || coalesce((select decrypted_secret from vault.decrypted_secrets where name = 'service_role_key' limit 1), '')),
      body := ${jb({ college_id: COLLEGE, student_ids: learnerRows })}, timeout_milliseconds := 60000);`);
  }
  sql(`${SUMMARY};`);
}

const text = out.join('\n') + '\n';
if (SQL_ONLY) {
  process.stdout.write(text); // no process.exit: it would truncate a piped write
} else {
  run(text);
}

function run(text) {
const file = path.join(os.tmpdir(), `seed_demo_college_${process.pid}.sql`);
fs.writeFileSync(file, text);
let stdout = '';
try {
  stdout = execFileSync('npx', ['--yes', 'supabase', 'db', 'query', '--linked', '--project-ref', PROJECT_REF, '-o', 'json', '-f', file], {
    cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024,
  });
} catch (e) {
  const msg = `${e.stdout || ''}${e.stderr || ''}`;
  const m = msg.match(/RESULTS:(\{.*?\})(?:\\n|"|$)/s);
  if (DRY && m) {
    console.log('Dry run (rolled back):');
    console.log(JSON.stringify(JSON.parse(m[1].replace(/\\"/g, '"')), null, 2));
    process.exit(0);
  }
  console.error(msg.replace(/\\n/g, '\n').slice(0, 4000));
  console.error(`SQL kept at ${file}`);
  process.exit(1);
} finally {
  if (!SQL_ONLY && fs.existsSync(file) && !process.exitCode) {
    /* keep the file only on failure (above) */
  }
}
const start = stdout.indexOf('{');
const json = start >= 0 ? JSON.parse(stdout.slice(start, stdout.lastIndexOf('}') + 1)) : null;
console.log(`${MODE} done.`);
console.log(JSON.stringify(json?.rows?.[0]?.summary ?? json, null, 2));
fs.rmSync(file, { force: true });
}
