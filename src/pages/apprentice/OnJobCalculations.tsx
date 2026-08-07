/**
 * On-the-job calculations — the apprentice route to the same 63 calculators.
 *
 * This was a 400-line second copy of the calculations page: its own lazy
 * imports, its own switch, its own shell. The electrician route had a 269-line
 * copy with EAGER imports. Same calculators, two registries, two bundle
 * profiles, and they had already drifted apart.
 *
 * It is now a thin wrapper: same page component, different back destination and
 * masthead label. Adding a calculator touches `src/data/calculators.ts` and
 * `calculatorComponents.ts` — nothing else, and both routes get it.
 */
import Calculations from '@/pages/electrician-tools/Calculations';

const OnJobCalculations = () => (
  <Calculations backTo="/apprentice" section="Apprentice" title="Calculations" />
);

export default OnJobCalculations;
