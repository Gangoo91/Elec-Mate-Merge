/**
 * Module 4 · Section 2 — Landing
 * City & Guilds 2365-03 / Unit 303 — Fault Diagnosis
 */

import { AlertTriangle, ClipboardCheck, FileText, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 2 — Diagnostic tools and equipment | Level 3 Module 4.2 | Elec-Mate';
const DESCRIPTION =
  'Multimeters, testers, clamp meters, thermal imaging and safe instrument use.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'GS38 and selecting test instruments',
    description: 'HSE GS38 4th edition in detail — probe geometry, finger barriers, fused leads, low-impedance for proving dead, CAT II/III/IV ratings — applied to instrument selection for L3 fault diagnosis.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module4-section2-1',
  },
  {
    number: 'Subsection 2',
    title: 'Confirming instruments are fit for purpose',
    description: 'The pre-use verification routine for the L3 fault-diagnosis kit — visual / calibration / function — plus calibration certificates, UKAS traceability, the calibration register, and what to do when an instrument fails…',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module4-section2-2',
  },
  {
    number: 'Subsection 3',
    title: 'Multimeter, clamp, IR camera, oscilloscope basics',
    description: 'Beyond the MFT — the multimeter function by function, the clamp meter for live load and earth leakage, the IR / thermal camera for non-invasive fault location, oscilloscope basics for waveform diagnosis, motor…',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module4-section2-3',
  },
  {
    number: 'Subsection 4',
    title: 'MFT testing for fault diagnosis',
    description: 'The seven BS 7671 643 tests done with an MFT, framed as fault diagnosis — continuity, IR, polarity, EFLI, RCD, current/voltage, phase sequence.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module4-section2-4',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={2}
      title="Diagnostic tools and equipment"
      description="Multimeters, testers, clamp meters, thermal imaging and safe instrument use."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module4-section1"
      prevSectionLabel="Section 1"
      nextSectionHref="/study-centre/apprentice/level3-module4-section3"
      nextSectionLabel="Section 3"
    >
      {subsections.map((s, idx) => (
        <ModuleCard
          key={idx}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
}
