import { assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';
import { keepOnlyListedRegulations } from './citation-guard.ts';

const allowed = ['526.1', '411.3.3', '134.1.1'];

Deno.test('an invented regulation becomes plain BS 7671', () => {
  const r = keepOnlyListedRegulations(
    'This condition is not compliant with Regulation 830.3.201 and may affect the outlet.',
    allowed
  );
  assertEquals(r.text, 'This condition is not compliant with BS 7671 and may affect the outlet.');
  assertEquals(r.removed, ['830.3.201']);
});

Deno.test('a listed regulation is left exactly as written', () => {
  const r = keepOnlyListedRegulations('Connections shall be secure (Regulation 526.1).', allowed);
  assertEquals(r.text, 'Connections shall be secure (Regulation 526.1).');
  assertEquals(r.removed, []);
});

Deno.test('a mixed list keeps the listed ones and drops the rest', () => {
  const r = keepOnlyListedRegulations(
    'Contrary to Regulations 411.3.3, 999.9.9 and 526.1.',
    allowed
  );
  assertEquals(r.text, 'Contrary to Regulations 411.3.3 and 526.1.');
  assertEquals(r.removed, ['999.9.9']);
});

Deno.test('a list that loses all but one drops the plural', () => {
  const r = keepOnlyListedRegulations('See Regulations 411.3.3 and 999.9.9.', allowed);
  assertEquals(r.text, 'See Regulation 411.3.3.');
});

Deno.test('measurements are not regulations', () => {
  const s = 'Measured 230.4 V at the origin; 2.5 mm² conductor; Zs 0.35 Ω; 30 mA RCD.';
  const r = keepOnlyListedRegulations(s, allowed);
  assertEquals(r.text, s);
  assertEquals(r.removed, []);
});

Deno.test('a bare two-dot number with no "Regulation" prefix is still caught', () => {
  const r = keepOnlyListedRegulations('Non-compliant per 830.3.201 as installed.', allowed);
  assertEquals(r.text, 'Non-compliant per BS 7671 as installed.');
});

Deno.test('"Reg." shorthand is handled', () => {
  const r = keepOnlyListedRegulations('Reg. 701.512.2 applies here.', allowed);
  assertEquals(r.text, 'BS 7671 applies here.');
});

Deno.test('two removals in a row do not stutter', () => {
  const r = keepOnlyListedRegulations('Contrary to Regulation 830.3.201 of 830.3.202.', allowed);
  assertEquals(r.text, 'Contrary to BS 7671.');
});
