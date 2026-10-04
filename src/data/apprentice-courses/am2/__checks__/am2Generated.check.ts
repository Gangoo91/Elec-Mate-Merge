/**
 * AM2 generated questions and paper — ELE-1808.
 *
 *   npm run check:am2-generated
 *
 * 1. RAG_CHECKED — the values the families rely on, as the RAG gave them on
 *    4 Oct 2026. The app's data modules must still agree with them.
 * 2. Every family, thousands of draws: four distinct options, no NaN, and the
 *    KEY RE-DERIVED HERE from the numbers printed in the question, using the
 *    frozen RAG values — not the generator's own arithmetic or data files.
 * 3. The paper: 30 questions, the plan's category split, nothing unverified,
 *    and three sittings in a row sharing well under a third of their questions.
 */
import {
  am2GeneratedFamilies,
  generateFamilyQuestion,
  mulberry32,
  type AM2Family,
} from '@/data/apprentice-courses/am2/generatedQuestions';
import { buildAM2Paper, AM2_PAPER_PLAN } from '@/data/apprentice-courses/am2/am2Paper';
import { am2QuestionBank } from '@/data/apprentice-courses/am2/questionBank';
import { MCB_RCBO_ZS_LIMITS } from '@/data/zsLimits';
import { CONDUCTOR_RESISTANCE } from '@/data/conductorResistance';
import { voltageDropFlatTwinEarth } from '@/lib/calculators/bs7671-data/voltageDropTables';
import { getCableCapacity } from '@/lib/calculators/bs7671-data/cableCapacities';
import {
  ambientTemperatureFactors,
  groupingFactorsTable4C1,
} from '@/lib/calculators/bs7671-data/temperatureFactors';

let failures = 0;
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures += 1;
};

// ---------------------------------------------------------------------------
// 1. What the RAG said (bs7671_facets / safety_facets, queried 4 Oct 2026)
// ---------------------------------------------------------------------------
export const RAG_CHECKED = {
  /** BS 7671:2018+A4:2026 Table 41.3 (Reg 411.4.204), 0.4 s, Cmin 0.95. */
  table41_3: {
    B: { 6: 7.28, 10: 4.37, 16: 2.73, 20: 2.19, 25: 1.75, 32: 1.37, 40: 1.09, 50: 0.87, 63: 0.69 },
    C: { 6: 3.64, 10: 2.19, 16: 1.37, 20: 1.09, 25: 0.87, 32: 0.68, 40: 0.55, 50: 0.44, 63: 0.35 },
    D: { 6: 1.82, 10: 1.09, 16: 0.68, 20: 0.55, 25: 0.44, 32: 0.34, 40: 0.27, 50: 0.22, 63: 0.17 },
  } as Record<'B' | 'C' | 'D', Record<number, number>>,
  /** BS 7671 Appendix 9 Table 9A, copper mΩ/m at 20 °C. */
  table9A: { 1: 18.1, 1.5: 12.1, 2.5: 7.41, 4: 4.61, 6: 3.08, 10: 1.83, 16: 1.15 } as Record<
    number,
    number
  >,
  /** GN3 Appendix 3: measured Zs ≤ 0.8 × tabulated. GN3: × 1.20 to 70 °C. */
  gn3Factor: 0.8,
  hotMultiplier: 1.2,
  /** GN3: 2.5/1.5 ring cpc ≈ 1.67 × r1; cross-connected readings = sum ÷ 4. */
  ringRatio: 1.67,
  /** Table 64. */
  table64: {
    selv: { volts: 250, min: 0.5 },
    upTo500: { volts: 500, min: 1.0 },
    over500: { volts: 1000, min: 1.0 },
  },
  /** Reg 643.8 NOTE, AC test at IΔn (general 300 ms); type S 130–500 ms from BS EN 61008-1 / 61009-1. */
  rcd: { generalMax: 300, sMin: 130, sMax: 500 },
  /**
   * Read off the PRINTED BS 7671:2018+A4:2026 (BS7671_ocr.pdf), 4 Oct 2026 —
   * the RAG holds no numeric rows for these tables.
   * Table 4D5: Reference Method C (clipped direct) amps, and mV/A/m.
   * Table 4B1: 70 °C thermoplastic column. Table 4C1: row 2, single layer on a
   * wall or floor (Reference Method C). Table 4Ab (RAG): 3% lighting, 5% other.
   */
  table4D5C: { 1: 16, 1.5: 20, 2.5: 27, 4: 37, 6: 47, 10: 64, 16: 85 } as Record<number, number>,
  table4D5mV: { 1: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8 } as Record<
    number,
    number
  >,
  table4B1_70: { 25: 1.03, 30: 1.0, 35: 0.94, 40: 0.87, 45: 0.79 } as Record<number, number>,
  /** Table 4B1, 90 °C thermosetting — checked against the page IMAGE (pdf p. 449). */
  table4B1_90: {
    25: 1.02,
    30: 1.0,
    35: 0.96,
    40: 0.91,
    45: 0.87,
    50: 0.82,
    55: 0.76,
    60: 0.71,
    65: 0.65,
    70: 0.58,
    75: 0.5,
    80: 0.41,
  } as Record<number, number>,
  table4C1_wall: { 2: 0.85, 3: 0.79, 4: 0.75, 5: 0.73, 6: 0.72 } as Record<number, number>,
  vdLimits: { lighting: 0.03 * 230, other: 0.05 * 230 },
  /** GN3 1.8: prospective fault current ≈ nominal voltage ÷ Zs. */
  u0: 230,
  /** Electrical H&S safe isolation procedure (safety_facets): proving-dead pairs. */
  provingDead: {
    single: ['L–N', 'L–E', 'N–E'],
    three: ['L1–L2', 'L1–L3', 'L2–L3', 'L1–N', 'L2–N', 'L3–N', 'L1–E', 'L2–E', 'L3–E', 'N–E'],
  },
  /** GN3 2.19: a spur reads locally higher; a misconnection rises then falls. */
  ringProfileRule: true,
  /** HSG85 paras 53–55 + electrical H&S procedure. */
  isolation: [
    'Take the load off the circuit',
    'Switch off the isolator and lock it off',
    'Prove the voltage indicator on a proving unit',
    'Test between all conductors to prove the circuit dead',
    'Prove the voltage indicator again on the proving unit',
  ],
};

console.log('\n1. Data modules still match the RAG');
for (const curve of ['B', 'C', 'D'] as const) {
  const table = MCB_RCBO_ZS_LIMITS[`type${curve}`]['0.4s'] as Record<number, number>;
  const bad = Object.entries(RAG_CHECKED.table41_3[curve]).filter(
    ([a, v]) => table[Number(a)] !== v
  );
  check(
    `zsLimits Type ${curve} 0.4 s = RAG Table 41.3`,
    bad.length === 0,
    bad.map(([a]) => a).join(',')
  );
}
{
  const bad = Object.entries(RAG_CHECKED.table9A).filter(
    ([s, v]) => CONDUCTOR_RESISTANCE[Number(s).toFixed(1)] !== v
  );
  check('conductorResistance = RAG Table 9A', bad.length === 0, bad.map(([s]) => s).join(','));
}

{
  const bad: string[] = [];
  for (const [size, amps] of Object.entries(RAG_CHECKED.table4D5C)) {
    if (getCableCapacity('pvc-twin-earth', Number(size))?.capacities?.C !== amps)
      bad.push(`C ${size}`);
  }
  for (const [size, mv] of Object.entries(RAG_CHECKED.table4D5mV)) {
    if (voltageDropFlatTwinEarth.find((e) => e.size === Number(size))?.twoCoreAc !== mv)
      bad.push(`mV ${size}`);
  }
  for (const [t, f] of Object.entries(RAG_CHECKED.table4B1_70)) {
    if (ambientTemperatureFactors.find((r) => r.ambientTemp === Number(t))?.factor70C !== f)
      bad.push(`4B1 ${t}`);
  }
  for (const [t, f] of Object.entries(RAG_CHECKED.table4B1_90)) {
    if (ambientTemperatureFactors.find((r) => r.ambientTemp === Number(t))?.factor90C !== f)
      bad.push(`4B1 90°C ${t}`);
  }
  for (const [n, f] of Object.entries(RAG_CHECKED.table4C1_wall)) {
    if (
      groupingFactorsTable4C1.find((g) => g.circuitsOrCables === Number(n))?.singleLayerWall !== f
    )
      bad.push(`4C1 ${n}`);
  }
  check('cable data modules = printed Tables 4D5 / 4B1 / 4C1', bad.length === 0, bad.join(', '));
}

// ---------------------------------------------------------------------------
// 2. Families
// ---------------------------------------------------------------------------
const num = (s: string, re: RegExp): number => {
  const m = s.match(re);
  if (!m) throw new Error(`no match for ${re} in: ${s}`);
  return Number(m[1]);
};
const f2 = (v: number) => v.toFixed(2);
const r2 = (v: number) => Math.round(v * 100) / 100;
const pairs: Record<string, [number, number]> = {
  '1.5/1.0': [1.5, 1],
  '2.5/1.5': [2.5, 1.5],
  '4/1.5': [4, 1.5],
  '6/2.5': [6, 2.5],
  '10/4': [10, 4],
  '16/6': [16, 6],
};
const perM = (q: string) => {
  const m = q.match(/in ([\d.]+\/[\d.]+) mm²/);
  if (!m) throw new Error('no cable in ' + q);
  const [a, b] = pairs[m[1]];
  return RAG_CHECKED.table9A[a] + RAG_CHECKED.table9A[b];
};
const device = (q: string) => {
  const m = q.match(/(\d+) A Type ([BC])|Type ([BC]) (\d+) A/);
  if (!m) throw new Error('no device in ' + q);
  const curve = (m[2] ?? m[3]) as 'B' | 'C';
  const rating = Number(m[1] ?? m[4]);
  return { curve, rating, max: RAG_CHECKED.table41_3[curve][rating] };
};

/** Independent key for each family, from the printed question. */
const expectedKey: Record<string, (q: string) => string | RegExp> = {
  'ring-step3-r1r2': (q) => {
    const r1 = num(q, /r1 = ([\d.]+)/);
    const rc = num(q, /r2 = ([\d.]+)/);
    return `${f2(r2((r1 + rc) / 4))} Ω`;
  },
  'ring-step2-ln': (q) => `${f2(r2((num(q, /r1 = ([\d.]+)/) + num(q, /rn = ([\d.]+)/)) / 4))} Ω`,
  'ring-r2-ratio': (q) => `${f2(r2(num(q, /r1 = ([\d.]+)/) * RAG_CHECKED.ringRatio))} Ω`,
  'ring-end-to-end-diagnosis': (q) => {
    if (/r1 = OL/.test(q)) return /line conductor ring is open/;
    if (/r2 = OL/.test(q)) return /cpc ring is open/;
    const r1 = num(q, /r1 = ([\d.]+)/);
    const rn = num(q, /rn = ([\d.]+)/);
    return rn - r1 > 0.2 ? /high-resistance joint/ : /continuous on all three/;
  },
  'radial-r1r2-from-length': (q) => `${f2(r2((perM(q) * num(q, /is (\d+) m long/)) / 1000))} Ω`,
  'design-zs-verdict': (q) => {
    const { max } = device(q);
    const ze = num(q, /Ze is ([\d.]+)/);
    const cold = r2((perM(q) * num(q, /protects a (\d+) m radial/)) / 1000);
    const zs = r2(ze + r2(cold * RAG_CHECKED.hotMultiplier));
    return `${f2(zs)} Ω — ${zs <= max ? 'complies with' : 'exceeds'} the ${f2(max)} Ω maximum`;
  },
  'measured-zs-verdict': (q) => {
    const { max } = device(q);
    const zs = r2(num(q, /Ze is ([\d.]+)/) + num(q, /\(R1 \+ R2\) is ([\d.]+)/));
    const site = r2(max * RAG_CHECKED.gn3Factor);
    // The verdict AND the limit it quotes: a wrong factor can still land on
    // the right verdict while printing a wrong number.
    return zs <= site
      ? `Satisfactory — ${f2(zs)} Ω is within 0.8 × ${f2(max)} = ${f2(site)} Ω`
      : `Unsatisfactory — ${f2(zs)} Ω exceeds 0.8 × ${f2(max)} = ${f2(site)} Ω`;
  },
  'max-measured-zs': (q) => `${f2(r2(device(q).max * RAG_CHECKED.gn3Factor))} Ω`,
  'earth-fault-current-far-end': (q) =>
    `${Math.round(RAG_CHECKED.u0 / r2(num(q, /origin is ([\d.]+)/) + num(q, /circuit is ([\d.]+)/)))} A`,
  'design-current-and-device': (q) => {
    const kw = /3 kW immersion/.test(q) ? 3 : num(q, /rated ([\d.]+) kW/);
    const ib = Math.round(((kw * 1000) / RAG_CHECKED.u0) * 10) / 10;
    const dev = [6, 10, 16, 20, 25, 32, 40, 50, 63].find((d) => d >= ib)!;
    return `Ib = ${ib.toFixed(1)} A — ${dev} A device`;
  },
  'insulation-resistance-verdict': (q) => {
    const row = /SELV/.test(q) ? RAG_CHECKED.table64.selv : RAG_CHECKED.table64.upTo500;
    const reading = num(q, /reads ([\d.]+) MΩ/);
    return `${row.volts} V d.c., ${row.min.toFixed(1)} MΩ minimum — ${reading >= row.min ? 'passes' : 'fails'}`;
  },
  'insulation-resistance-parallel': (q) => {
    const vals = [...q.matchAll(/(\d+) MΩ/g)].map((m) => Number(m[1]));
    return `${(Math.round((1 / vals.reduce((s, v) => s + 1 / v, 0)) * 10) / 10).toFixed(1)} MΩ`;
  },
  'insulation-resistance-diagnosis': (q) => {
    if (/lamps are still in/.test(q)) return /through the lamps/;
    const low = (pair: string) => !new RegExp(`${pair} >299`).test(q);
    if (low('L–N')) return /line and neutral/;
    if (low('L–E')) return /line and earth/;
    return /neutral and earth/;
  },
  'rcd-trip-time-verdict': (q) => {
    const t = num(q, /trips in (\d+) ms/);
    const pass = /type S/.test(q)
      ? t >= RAG_CHECKED.rcd.sMin && t <= RAG_CHECKED.rcd.sMax
      : t <= RAG_CHECKED.rcd.generalMax;
    return pass ? /^Pass/ : /^Fail/;
  },
  'safe-isolation-sequence': (q) => {
    const steps = RAG_CHECKED.isolation;
    const at = steps.findIndex((s) => q.includes(`“${s}”`));
    return steps[/immediately after/.test(q) ? at + 1 : at - 1];
  },
  'proving-dead-tests': (q) => {
    if (/How many/.test(q))
      return String(
        /three-phase/.test(q)
          ? RAG_CHECKED.provingDead.three.length
          : RAG_CHECKED.provingDead.single.length
      );
    const listed = q.slice(q.indexOf('tests: ') + 7, q.indexOf('. Which')).split(', ');
    const missing = RAG_CHECKED.provingDead.three.filter((t) => !listed.includes(t));
    if (missing.length !== 1) throw new Error('expected exactly one missing test');
    return missing[0];
  },
  'ring-step3-profile': (q) => {
    const vals = [...q.matchAll(/\d+: ([\d.]+) Ω/g)].map((m) => Number(m[1]));
    const sorted = [...vals].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    if (sorted[sorted.length - 1] - sorted[0] <= 0.02 + 1e-9) return /correctly connected/;
    const high = vals.map((v, i) => (v - median > 0.05 ? i + 1 : 0)).filter(Boolean);
    if (high.length === 1) return `Socket ${high[0]} is fed by a spur off the ring`;
    // Otherwise it must rise to a peak and fall away again.
    const peak = vals.indexOf(Math.max(...vals));
    const rises = vals.slice(0, peak + 1).every((v, i, a) => i === 0 || v >= a[i - 1]);
    const falls = vals.slice(peak).every((v, i, a) => i === 0 || v <= a[i - 1]);
    return rises && falls ? /misconnected/ : /^CANNOT-CLASSIFY$/;
  },
  'voltage-drop-verdict': (q) => {
    const size = num(q, /wired in ([\d.]+) mm²/);
    const ib = num(q, /design current is ([\d.]+) A/);
    const len = num(q, /, (\d+) m long/);
    const vd = r2((RAG_CHECKED.table4D5mV[size] * ib * len) / 1000);
    const limit = /lighting circuit/.test(q)
      ? RAG_CHECKED.vdLimits.lighting
      : RAG_CHECKED.vdLimits.other;
    return `${f2(vd)} V — ${vd <= limit ? 'within' : 'over'} the ${limit.toFixed(1)} V limit`;
  },
  'cable-size-correction-factors': (q) => {
    const rating = num(q, /protected by a (\d+) A circuit-breaker/);
    const ambient = num(q, /ambient temperature is (\d+) °C/);
    const circuits = num(q, /touching (\d+) other circuit/) + 1;
    const it =
      Math.round(
        (rating / (RAG_CHECKED.table4B1_70[ambient] * RAG_CHECKED.table4C1_wall[circuits])) * 10
      ) / 10;
    const size = [1.5, 2.5, 4, 6, 10, 16].find((s) => RAG_CHECKED.table4D5C[s] >= it);
    return `It ≥ ${it.toFixed(1)} A — ${size} mm²`;
  },
  'continuity-break-location': (q) => {
    const firstOl = num(q, /socket (\d+): OL/);
    return `Between socket ${firstOl - 1} and socket ${firstOl}`;
  },
};

const DRAWS = 3000;
console.log(`\n2. Families — ${DRAWS} draws each, keys re-derived from frozen RAG values`);
for (const fam of am2GeneratedFamilies) {
  const rng = mulberry32(fam.id * 7919);
  let structural = 0;
  let keyWrong = 0;
  let longestKey = 0;
  let firstBad = '';
  const keyShapes = new Set<string>();
  for (let i = 0; i < DRAWS; i++) {
    const q = generateFamilyQuestion(fam, rng);
    const text = [q.question, ...q.options, q.explanation, q.reference ?? ''].join(' ');
    const okShape =
      q.options.length === 4 &&
      new Set(q.options).size === 4 &&
      q.correctAnswer === 0 &&
      !/NaN|undefined|Infinity|null/.test(text) &&
      !!q.reference &&
      q.id === fam.id &&
      q.category === fam.category;
    if (!okShape) {
      structural++;
      firstBad ||= `shape: ${q.question}`;
    }
    const lens = q.options.map((o) => o.length);
    if (lens[0] === Math.max(...lens) && lens.filter((l) => l === lens[0]).length === 1)
      longestKey++;
    const derive = expectedKey[fam.key];
    if (derive) {
      let want: string | RegExp | undefined;
      try {
        want = derive(q.question);
      } catch {
        want = undefined;
      }
      // A question the check cannot even read back is as wrong as a wrong key.
      const ok =
        typeof want === 'string'
          ? q.options[0] === want
          : want instanceof RegExp && want.test(q.options[0]);
      if (!ok) {
        keyWrong++;
        firstBad ||= `key: ${q.question} → ${q.options[0]} (want ${want})`;
      }
    }
    keyShapes.add(q.options[0].split(' ')[0]);
    // Every numeric distractor's figure must be explained.
    for (const o of q.options.slice(1)) {
      const m = o.match(/^([\d.]+) (Ω|A|MΩ)$/);
      if (m && !q.explanation.includes(m[1])) {
        structural++;
        firstBad ||= `unexplained distractor ${o} in ${fam.key}`;
      }
    }
  }
  const pctLongest = Math.round((100 * longestKey) / DRAWS);
  check(
    `${fam.key}${fam.verified ? '' : ' (UNVERIFIED — off the paper)'}`,
    structural === 0 && keyWrong === 0 && (!!expectedKey[fam.key] || !fam.verified),
    `${keyWrong} wrong keys, ${structural} shape faults, key longest ${pctLongest}%${firstBad ? ' — ' + firstBad.slice(0, 220) : ''}`
  );
  if (pctLongest > 60)
    check(`${fam.key}: key not a "pick the longest" giveaway`, false, `${pctLongest}%`);
}

// Verdict families must not always land on the same verdict.
const verdictSplit = (key: string, re: RegExp) => {
  const fam = am2GeneratedFamilies.find((f) => f.key === key) as AM2Family;
  const rng = mulberry32(42);
  let hits = 0;
  for (let i = 0; i < 1000; i++) if (re.test(generateFamilyQuestion(fam, rng).options[0])) hits++;
  check(`${key}: both outcomes occur`, hits > 150 && hits < 850, `${hits / 10}% ${re}`);
};
verdictSplit('design-zs-verdict', /complies/);
verdictSplit('measured-zs-verdict', /^Satisfactory/);
verdictSplit('insulation-resistance-verdict', /passes/);
verdictSplit('rcd-trip-time-verdict', /^Pass/);

// ---------------------------------------------------------------------------
// 3. The paper
// ---------------------------------------------------------------------------
console.log('\n3. Paper');
{
  const paper = buildAM2Paper({ rng: mulberry32(1) });
  check('30 questions', paper.length === 30, String(paper.length));
  check('no question twice', new Set(paper.map((q) => q.id)).size === 30);
  const counts = new Map<string, number>();
  paper.forEach((q) => counts.set(q.category, (counts.get(q.category) ?? 0) + 1));
  const off = AM2_PAPER_PLAN.filter((p) => counts.get(p.category) !== p.total);
  check('category split follows the plan', off.length === 0, off.map((p) => p.category).join(', '));
  const unverified = new Set(am2GeneratedFamilies.filter((f) => !f.verified).map((f) => f.id));
  let leaked = 0;
  for (let s = 0; s < 300; s++)
    leaked += buildAM2Paper({ rng: mulberry32(s) }).filter((q) => unverified.has(q.id)).length;
  check('no unverified family ever reaches a paper (300 papers)', leaked === 0, String(leaked));
  const gen = paper.filter((q) => q.generated).length;
  check('generated questions on the paper', gen >= 8, String(gen));
  check(
    'fixedOnly leaves them out',
    buildAM2Paper({ rng: mulberry32(2), fixedOnly: true }).every((q) => !q.generated)
  );
  const small = buildAM2Paper({ count: 10, rng: mulberry32(3) });
  check(
    'a 10-question paper has 10',
    small.length === 10 && new Set(small.map((q) => q.id)).size === 10
  );
}
{
  // Three sittings in a row, each fed the ids of the ones before (ticket's "done when").
  let worst = 0;
  for (let trial = 0; trial < 200; trial++) {
    const rng = mulberry32(1000 + trial);
    const recent: number[] = [];
    const sittings: Set<number>[] = [];
    for (let s = 0; s < 3; s++) {
      const p = buildAM2Paper({ rng, recentIds: recent });
      const fixedIds = p.filter((q) => !q.generated).map((q) => q.id);
      sittings.push(new Set(p.map((q) => q.id)));
      recent.unshift(...fixedIds, ...p.filter((q) => q.generated).map((q) => q.id));
    }
    for (let a = 0; a < 3; a++)
      for (let b = a + 1; b < 3; b++) {
        // Same family = same id but different numbers, so count fixed overlaps only.
        const shared = [...sittings[a]].filter((id) => id < 9000 && sittings[b].has(id)).length;
        worst = Math.max(worst, shared);
      }
  }
  check(
    'three sittings in a row share under a third (fixed questions)',
    worst < 10,
    `worst ${worst} of 30`
  );
}
{
  const wrong = am2QuestionBank
    .filter((q) => q.category === 'Fault Finding')
    .slice(0, 2)
    .map((q) => q.id);
  let returned = 0;
  for (let s = 0; s < 50; s++) {
    const p = buildAM2Paper({ rng: mulberry32(s), missedIds: wrong });
    returned += p.some((q) => wrong.includes(q.id)) ? 1 : 0;
  }
  check('a question got wrong comes back', returned === 50, `${returned}/50 papers`);
}

console.log(failures ? `\n${failures} FAILED` : '\nall passed');
// Runs under node via esbuild; the app tsconfig has no node types.
if (failures) (globalThis as unknown as { process: { exitCode?: number } }).process.exitCode = 1;
