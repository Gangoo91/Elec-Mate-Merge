#!/usr/bin/env node
/**
 * Circuit Designer benchmark — runs a fixed set of standard jobs through the
 * LIVE designer-agent-v3 (direct mode: no job row, nothing saved) and checks
 * each answer against rules that don't depend on the designer's own code.
 *
 *   SUPABASE_SERVICE_ROLE_KEY=… node scripts/designer-benchmark.mjs [caseId…]
 *
 * Every circuit must either pass a check or carry a finding that says it
 * fails — a silent failure is the only thing scored as wrong. Costs one AI
 * design per case; run after designer changes, not on every commit.
 */
const URL = 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/designer-agent-v3';
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!KEY) {
  console.error('Set SUPABASE_SERVICE_ROLE_KEY');
  process.exit(2);
}

const domestic = (ze = 0.35, earthing = 'TN-C-S') => ({
  voltage: 230,
  phases: 'single',
  ze,
  pfc: 16000,
  earthingSystem: earthing,
  consumerUnitType: 'split-load',
  mainSwitchRating: 100,
});
const c = (name, loadType, loadPower, cableLength, extra = {}) => ({
  name,
  loadType,
  loadPower,
  cableLength,
  phases: 'single',
  specialLocation: 'none',
  ...extra,
});

/** expect(circuit) → list of problems for that case's own rules. */
const CASES = [
  {
    id: 'cu-change',
    type: 'domestic',
    supply: domestic(),
    circuits: [
      c('Downstairs sockets', 'socket', 7360, 40),
      c('Upstairs sockets', 'socket', 7360, 45),
      c('Downstairs lights', 'lighting', 600, 30),
      c('Upstairs lights', 'lighting', 500, 35),
      c('Cooker', 'cooker', 9000, 12),
      c('Immersion', 'immersion', 3000, 15),
    ],
  },
  {
    id: 'shower',
    type: 'domestic',
    supply: domestic(),
    circuits: [c('Electric shower', 'shower', 9500, 18, { specialLocation: 'bathroom' })],
  },
  {
    id: 'ev',
    type: 'domestic',
    supply: domestic(),
    circuits: [c('EV charger', 'ev-charger', 7400, 20, { outdoorInstall: true })],
  },
  {
    id: 'shed-swa',
    type: 'domestic',
    supply: domestic(),
    circuits: [c('Shed supply', 'outdoor', 5000, 40, { outdoorInstall: true })],
  },
  {
    id: 'long-lights',
    type: 'domestic',
    supply: domestic(),
    circuits: [c('Garden lighting', 'lighting', 800, 60, { outdoorInstall: true })],
  },
  {
    id: 'extension-ring',
    type: 'domestic',
    supply: domestic(),
    circuits: [c('Extension ring', 'socket', 7360, 55)],
  },
  {
    id: 'tns-high-ze',
    type: 'domestic',
    supply: domestic(0.8, 'TN-S'),
    circuits: [c('Kitchen sockets', 'socket', 7360, 35), c('Lights', 'lighting', 600, 30)],
  },
  {
    id: 'shop-3ph',
    type: 'commercial',
    supply: {
      voltage: 400,
      phases: 'three',
      ze: 0.2,
      pfc: 10000,
      earthingSystem: 'TN-S',
      consumerUnitType: 'distribution-board',
      mainSwitchRating: 100,
    },
    circuits: [
      c('Shop lighting', 'lighting', 1500, 35),
      c('Shop sockets', 'socket', 5000, 30),
      c('Air conditioning', 'hvac', 7000, 25, { phases: 'three' }),
      c('Compressor', 'motor', 5500, 30, { phases: 'three' }),
    ],
  },
  {
    id: 'bathroom',
    type: 'domestic',
    supply: domestic(),
    circuits: [
      c('Bathroom heated towel rail', 'heating', 500, 12, {
        specialLocation: 'bathroom',
        bathroomZone: '2',
      }),
    ],
  },
  {
    id: 'tt-outbuilding',
    type: 'domestic',
    supply: domestic(21, 'TT'),
    circuits: [c('Garage sockets', 'socket', 3680, 25)],
  },
  {
    id: 'storage-heaters',
    type: 'domestic',
    supply: domestic(),
    circuits: [c('Storage heater lounge', 'storage-heater', 3400, 20)],
  },
  {
    id: 'office-fire',
    type: 'commercial',
    supply: {
      voltage: 230,
      phases: 'single',
      ze: 0.3,
      pfc: 6000,
      earthingSystem: 'TN-S',
      consumerUnitType: 'distribution-board',
      mainSwitchRating: 100,
    },
    circuits: [
      c('Fire alarm panel', 'fire-alarm', 200, 15),
      c('Emergency lighting', 'emergency-lighting', 300, 40),
      c('Office lighting', 'lighting', 1200, 35),
      c('Office sockets', 'socket', 4600, 30),
    ],
  },
  {
    id: 'hob-oven',
    type: 'domestic',
    supply: domestic(),
    circuits: [c('Induction hob', 'cooker', 7400, 10), c('Single oven', 'cooker', 3000, 10)],
  },
];

const num = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

function check(kase, result) {
  const problems = [];
  const issues = Array.isArray(result.cableCapacityIssues) ? result.cableCapacityIssues : [];
  const flagged = (name, kind) =>
    issues.some((i) => i.circuitName === name && (!kind || i.kind === kind));
  const circuits = result.circuits ?? [];
  if (circuits.length !== kase.circuits.length)
    problems.push(`expected ${kase.circuits.length} circuits, got ${circuits.length}`);

  for (const ct of circuits) {
    const name = ct.name;
    const calc = ct.calculations ?? {};
    const inA = num(ct.protectionDevice?.rating);
    const ib = num(calc.Id) > 0 && !(num(calc.Id) > num(calc.Ib)) ? num(calc.Id) : num(calc.Ib);
    const iz = num(calc.Iz);
    const ring = ct.circuitTopology === 'ring';
    const p = (msg) => problems.push(`${name}: ${msg}`);

    // Ib ≤ In ≤ Iz (433.1.1) — radials; rings have their own rule.
    if (ib && inA && ib > inA * 1.01 && !flagged(name, 'design-current'))
      p(`Ib ${ib}A > In ${inA}A, not flagged`);
    if (!ring && iz && inA && iz < inA && !flagged(name)) p(`Iz ${iz}A < In ${inA}A, not flagged`);

    // Voltage drop within its limit, or flagged.
    const vd = calc.voltageDrop ?? {};
    const lighting = /light/i.test(`${ct.loadType} ${name}`);
    const limit = Math.min(num(vd.limit) ?? 5, lighting ? 3 : 5);
    if (
      num(vd.percent) !== null &&
      vd.percent > limit &&
      !flagged(name, 'voltage-drop') &&
      // VD worked from a current above the device is noise; that circuit
      // carries the design-current finding instead.
      !flagged(name, 'design-current')
    )
      p(`VD ${vd.percent}% > ${limit}%, not flagged`);

    // Zs: the stated verdict must match the numbers.
    const zs = ct.expectedTests?.zs;
    if (zs && num(zs.expected) !== null && num(zs.maxPermitted) !== null) {
      const ok = zs.expected <= zs.maxPermitted;
      if (zs.compliant !== ok)
        p(`Zs ${zs.expected} vs ${zs.maxPermitted} but compliant=${zs.compliant}`);
      if (!ok && kase.supply.earthingSystem !== 'TT' && !flagged(name, 'zs'))
        p(`Zs ${zs.expected} > ${zs.maxPermitted}, not flagged`);
    }

    // The cable name and the size field agree.
    const named = String(ct.cableType ?? '').match(/(\d+(?:\.\d+)?)\s*mm/);
    if (named && num(named[1]) !== num(ct.cableSize))
      p(`cableType "${ct.cableType}" vs cableSize ${ct.cableSize}`);

    // 30 mA additional protection: sockets ≤ 32 A, outdoor, bathroom, EV (411.3.3, 701, 722).
    const needsRcd =
      /socket/i.test(ct.loadType ?? '') ||
      /bathroom/i.test(ct.specialLocation ?? '') ||
      /ev/i.test(ct.loadType ?? '') ||
      // 411.3.4: lighting in domestic premises.
      (kase.type === 'domestic' && /light/i.test(`${ct.loadType ?? ''} ${name}`)) ||
      kase.circuits.find((x) => x.name === name)?.outdoorInstall;
    const dev = `${ct.protectionDevice?.type ?? ''} ${JSON.stringify(ct.rcdProtected ?? '')} ${JSON.stringify(ct.protectionDevice ?? {})}`;
    if (needsRcd && !/rcbo|rcd|true/i.test(dev))
      p(`needs 30 mA RCD protection, device ${ct.protectionDevice?.type}`);
  }

  // Case-specific expectations.
  const byName = (n) => circuits.find((x) => x.name === n);
  if (kase.id === 'shower') {
    const s = byName('Electric shower');
    if (s && num(s.protectionDevice?.rating) < 41.3)
      problems.push(`41.3 A shower on a ${s.protectionDevice?.rating} A device`);
  }
  if (kase.id === 'cu-change' || kase.id === 'hob-oven') {
    // Household cooking takes OSG Table A2 diversity — a cooker on 32 A is normal.
    for (const i of issues)
      if (i.kind === 'design-current' && /cook|hob|oven/i.test(i.circuitName ?? ''))
        problems.push(`cooker flagged Ib > In: ${i.error}`);
  }
  if (kase.id === 'tt-outbuilding') {
    const g = byName('Garage sockets');
    if (g && g.expectedTests?.zs?.maxPermitted !== 1667)
      problems.push(
        `TT RCD circuit judged against ${g.expectedTests?.zs?.maxPermitted} Ω, not Table 41.5`
      );
  }
  if (kase.id === 'office-fire') {
    // BS 7671 560.8.1: safety services that must work in a fire need
    // fire-resisting wiring. BS 5839-1: fire alarm supply not on an RCD
    // unless BS 7671 requires it (TN-S, surface wiring — it doesn't).
    for (const n of ['Fire alarm panel', 'Emergency lighting']) {
      const x = byName(n);
      if (x && !/fp\s?\d|fire.?resist|mineral|micc|\bmi\b/i.test(x.cableType ?? ''))
        problems.push(`${n}: not fire-resisting cable (${x.cableType})`);
    }
    const fa = byName('Fire alarm panel');
    if (fa && /rcbo|rcd/i.test(fa.protectionDevice?.type ?? ''))
      problems.push(`Fire alarm on ${fa.protectionDevice?.type} (BS 5839-1: no RCD unless needed)`);
  }
  if (kase.id === 'extension-ring') {
    const r = byName('Extension ring');
    if (r && r.circuitTopology === 'ring' && num(r.protectionDevice?.rating) !== 32)
      problems.push(`ring on ${r.protectionDevice?.rating}A`);
  }
  if (kase.id === 'tns-high-ze' || kase.id === 'tt-outbuilding') {
    // At the typical maximum there must be no Ze warning; TT has no Table 41.3 maxima.
    if (issues.some((i) => i.kind === 'supply-ze'))
      problems.push('Ze warning raised at/under the typical maximum or on TT');
  }
  return problems;
}

async function run(kase) {
  const t0 = Date.now();
  const res = await fetch(URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, apikey: KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'direct-design',
      projectInfo: { projectName: `Benchmark ${kase.id}`, installationType: kase.type },
      supply: kase.supply,
      circuits: kase.circuits,
      additionalPrompt: '',
      specialRequirements: [],
      installationConstraints: {},
    }),
  });
  const secs = Math.round((Date.now() - t0) / 1000);
  if (!res.ok)
    return {
      id: kase.id,
      secs,
      problems: [`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`],
    };
  const result = await res.json();
  return { id: kase.id, secs, problems: check(kase, result), result };
}

const only = process.argv.slice(2);
const cases = only.length ? CASES.filter((k) => only.includes(k.id)) : CASES;
const out = [];
for (let i = 0; i < cases.length; i += 3) {
  out.push(...(await Promise.all(cases.slice(i, i + 3).map(run))));
}
let failed = 0;
for (const r of out) {
  const ok = r.problems.length === 0;
  if (!ok) failed++;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${r.id.padEnd(16)} ${String(r.secs).padStart(3)}s${ok ? '' : '\n      ' + r.problems.join('\n      ')}`
  );
}
console.log(`\n${out.length - failed}/${out.length} cases clean`);
if (process.env.BENCH_DUMP) {
  const fs = await import('node:fs');
  fs.writeFileSync(process.env.BENCH_DUMP, JSON.stringify(out, null, 2));
}
process.exit(failed ? 1 : 0);
