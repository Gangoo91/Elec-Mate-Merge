/**
 * The vibration switch — ELE-1805.
 *
 *   npm run check:haptics
 *
 * "Done when: haptics can be switched off and nothing buzzes afterwards."
 * 1. Behaviour: with the setting off the gate never reaches the real
 *    navigator.vibrate; with it on (or never set) it does.
 * 2. Coverage: every file that imports the native Capacitor Haptics plugin
 *    checks hapticsEnabled(); nothing keeps its own copy of navigator.vibrate
 *    (which would dodge the gate); main.tsx installs the gate.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

let failures = 0;
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures += 1;
};

// ── 1. Behaviour, against stand-in browser globals ─────────────────────────
const store = new Map<string, string>();
const g = globalThis as unknown as Record<string, unknown>;
g.localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => void store.set(k, String(v)),
  removeItem: (k: string) => void store.delete(k),
  key: () => null,
  length: 0,
};
let realCalls = 0;
const nav = { vibrate: (_p: number | number[]) => { realCalls++; return true; } };
Object.defineProperty(globalThis, 'navigator', { value: nav, configurable: true });

const { installHapticsGate, setHapticsEnabled, hapticsEnabled } = await import('@/lib/haptics');

console.log('\n1. Behaviour');
check('on by default (nothing stored)', hapticsEnabled() === true);
installHapticsGate();
nav.vibrate(10);
check('gate passes a vibration through when on', realCalls === 1, `${realCalls} real calls`);
setHapticsEnabled(false);
const blocked = nav.vibrate([10, 20]);
check('gate blocks when off, and reports false', realCalls === 1 && blocked === false, `${realCalls} real calls`);
setHapticsEnabled(true);
nav.vibrate(5);
check('back on, it vibrates again', realCalls === 2, `${realCalls} real calls`);
installHapticsGate();
setHapticsEnabled(false);
nav.vibrate(5);
check('installing twice does not stack or leak', realCalls === 2);

// ── 2. Coverage, by reading the source ─────────────────────────────────────
console.log('\n2. Coverage');
const files: string[] = [];
const walk = (dir: string) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name !== 'node_modules' && name !== '__checks__') walk(p);
    } else if (/\.(ts|tsx)$/.test(name)) files.push(p);
  }
};
walk('src');

const pluginUsers = files.filter((f) => readFileSync(f, 'utf8').includes("from '@capacitor/haptics'"));
const ungated = pluginUsers.filter((f) => !readFileSync(f, 'utf8').includes('hapticsEnabled('));
check(
  `every native Haptics plugin user checks the setting (${pluginUsers.length} files)`,
  ungated.length === 0,
  ungated.join(', ')
);

const captures = files.filter(
  (f) =>
    !f.endsWith('lib/haptics.ts') &&
    /(=\s*navigator\.vibrate\b(?!\s*\()|navigator\.vibrate\.bind|\{\s*vibrate\s*\}\s*=\s*navigator)/.test(
      readFileSync(f, 'utf8')
    )
);
check('nothing keeps its own copy of navigator.vibrate', captures.length === 0, captures.join(', '));

const main = readFileSync('src/main.tsx', 'utf8');
check('main.tsx installs the gate', /^installHapticsGate\(\);/m.test(main));

console.log(failures ? `\n${failures} FAILED` : '\nall passed');
if (failures) (globalThis as unknown as { process: { exitCode?: number } }).process.exitCode = 1;
