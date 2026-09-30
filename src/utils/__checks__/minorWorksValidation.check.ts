/**
 * Minor Works validation — the rules that decide whether a certificate issues.
 *
 * Why this exists: until 30 Sep 2026 the RCD check read `rcdOperatingTime`, a
 * key the form never writes (the form stores `rcdOneX`), so the 300 ms limit
 * never blocked anything and every certificate with an RCD got a "not
 * recorded" warning. Four certificates also issued with insulation resistance
 * under 1 MΩ. These are the shapes that must keep holding.
 *
 *   npm run check:minor-works-validation
 */
import { validateMinorWorksFormData } from '@/utils/minorWorksValidation';

let failures = 0;
const check = (name: string, ok: boolean, detail = '') => {
  console.log(`${ok ? '  PASS' : '  FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
  if (!ok) failures += 1;
};
const base = {
  clientName: 'A Client', propertyAddress: '1 Test St', workDate: '2026-09-30', dateOfCompletion: '2026-09-30',
  electricianName: 'E Lectrician', signature: 'data:sig', supplyVoltage: '230V', frequency: '50Hz',
};
const run = (extra: Record<string, unknown>) => validateMinorWorksFormData({ ...base, ...extra });
const has = (list: Array<{ field: string; message: string }>, field: string, re: RegExp) =>
  list.some((e) => e.field === field && re.test(e.message));

// ── RCD: reads the key the form writes ───────────────────────────────────
let r = run({ protectionRcd: true, rcdOneX: '350', rcdType: 'A' });
check('general RCD at 350 ms is an error', !r.isValid && has(r.errors, 'rcdOneX', /300 ms/));
r = run({ protectionRcd: true, rcdOneX: '35', rcdType: 'A' });
check('general RCD at 35 ms passes', r.isValid && !has(r.warnings, 'rcdOneX', /not recorded/));
r = run({ protectionRcbo: true, rcdOneX: '90', rcdType: 'S' });
check('S-type at 90 ms is an error (must be 130–500 ms)', !r.isValid && has(r.errors, 'rcdOneX', /130 and 500/));
r = run({ protectionRcbo: true, rcdOneX: '200', rcdType: 'S' });
check('S-type at 200 ms passes', r.isValid);
r = run({ protectionRcd: true });
check('RCD fitted with no 1× time is a warning, not an error', r.isValid && has(r.warnings, 'rcdOneX', /not recorded/));
r = run({ rcdOneX: '900' });
check('no RCD fitted → the time is ignored', r.isValid);

// ── Insulation resistance below 1 MΩ ────────────────────────────────────
r = run({ insulationLiveEarth: '0.4' });
check('L–E 0.4 MΩ blocks issue', !r.isValid && has(r.errors, 'insulationLiveEarth', /1 MΩ/));
r = run({ insulationLiveEarth: '0.4', commentsOnExistingInstallation: 'Old rubber cable on this circuit, client advised to rewire.' });
check('…issues with a warning once the reason is recorded', r.isValid && has(r.warnings, 'insulationLiveEarth', /comment/));
r = run({ insulationLiveLive: '0.2' });
check('L–L is checked too', !r.isValid);
r = run({ insulationLiveEarth: '>999' });
check('off-the-scale reading is fine', r.isValid);
r = run({ insulationLiveEarth: '200' });
check('200 MΩ is fine', r.isValid);

console.log(failures === 0 ? '\nMinor Works validation guard: all checks passed' : `\nMinor Works validation guard: ${failures} FAILED`);
process.exit(failures === 0 ? 0 : 1);
