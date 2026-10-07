/**
 * College Hub performance budget check (ELE-1912).
 *
 *   node scripts/perf/college-budget.mjs [perf-college.json] [--budget 1000] [--cold-budget 4000]
 *
 * Reads the output of scripts/perf/college-perf.mjs and fails (exit 1) when any
 * budgeted screen's warm p75 time-to-content is over the budget (default 1 s —
 * the ticket's "first useful paint under one second on college wi-fi"), or a
 * cold first load is over the cold budget, or a screen never became ready.
 * Prints the worst screens either way and, in GitHub Actions, writes a table
 * to the job summary.
 */
import fs from 'node:fs';

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith('--') && !/^\d+$/.test(a)) || 'perf-college.json';
const flag = (name, dflt) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? Number(argv[i + 1]) : dflt;
};
const BUDGET = flag('budget', Number(process.env.PERF_BUDGET_MS || 1000));
const COLD_BUDGET = flag('cold-budget', Number(process.env.PERF_COLD_BUDGET_MS || 4000));

if (!fs.existsSync(file)) {
  console.error(`[budget] ${file} not found — run scripts/perf/college-perf.mjs first`);
  process.exit(2);
}
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const rows = data.results.filter((r) => r.budgeted);
if (!rows.length) {
  console.error('[budget] no budgeted screens in the results');
  process.exit(2);
}

const failures = [];
for (const r of rows) {
  const why = [];
  if (r.timedOut || r.failed) why.push(r.failed ? 'failed to boot' : 'never became ready');
  if (r.warmP75 > BUDGET) why.push(`warm p75 ${r.warmP75} ms > ${BUDGET} ms`);
  if (r.coldMs > COLD_BUDGET) why.push(`cold ${r.coldMs} ms > ${COLD_BUDGET} ms`);
  if (why.length) failures.push({ ...r, why });
}

const kb = (b) => `${Math.round((b || 0) / 1024)} KB`;
const worst = [...rows].sort((a, b) => b.warmP75 - a.warmP75).slice(0, 15);
console.log(`College Hub performance — ${rows.length} screens, budget ${BUDGET} ms warm p75 / ${COLD_BUDGET} ms cold`);
console.log(`network: ${data.network.downloadThroughput * 8 / 1e6} Mbps down, ${data.network.latency} ms RTT; ${data.mode}; base ${data.base}`);
console.log('\nWorst 15 (warm p75):');
for (const r of worst) {
  console.log(
    `  ${String(r.warmP75).padStart(5)} ms  cold ${String(r.coldMs).padStart(5)} ms  sb ${String(r.supabase).padStart(3)}  js ${kb(r.coldJsBytes).padStart(8)}  ${r.role} ${r.route}`
  );
}
const p75s = rows.map((r) => r.warmP75).sort((a, b) => a - b);
const median = p75s[Math.floor(p75s.length / 2)];
console.log(`\nmedian screen warm p75: ${median} ms; over budget: ${failures.length}/${rows.length}`);

if (process.env.GITHUB_STEP_SUMMARY) {
  const lines = [
    `### College Hub performance budget`,
    `${rows.length} screens · budget ${BUDGET} ms (warm p75), ${COLD_BUDGET} ms (cold) · ${failures.length} over · median ${median} ms`,
    '',
    '| warm p75 | cold | Supabase calls | JS (cold) | screen |',
    '|---:|---:|---:|---:|---|',
    ...worst.map((r) => `| ${r.warmP75} ms | ${r.coldMs} ms | ${r.supabase} | ${kb(r.coldJsBytes)} | ${r.role} \`${r.route}\` |`),
  ];
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join('\n') + '\n');
}

if (failures.length) {
  console.log('\nOver budget:');
  for (const f of failures) console.log(`  ✗ ${f.role} ${f.route}: ${f.why.join('; ')}`);
  process.exit(1);
}
console.log('\nAll screens within budget.');
