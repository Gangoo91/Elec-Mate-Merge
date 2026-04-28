/**
 * Module 3 · Section 4 — Landing
 * City & Guilds 2365-03 / Unit 302 — Electrical Science
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield, UserCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 4 — AC theory and waveforms | Level 3 Module 3.4 | Elec-Mate';
const DESCRIPTION =
  'AC waveforms, phasor diagrams, impedance, power and harmonics.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Magnetic circuits and properties (AC 1.2)',
    description: 'Φ, B, H, μ.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module3-section4-1',
  },
  {
    number: 'Subsection 2',
    title: 'Single-phase transformer principles (AC 1.2, 1.3)',
    description: 'Mutual induction, turns ratio V1/V2 = N1/N2, step-up vs step-down, ideal vs real transformer model and basic tests.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module3-section4-2',
  },
  {
    number: 'Subsection 3',
    title: 'Turns, voltage, current ratio worked examples (AC 1.3)',
    description: 'Voltage, current and turns ratios applied to single-phase, 3-phase delta/star, instrument transformers and CTs.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module3-section4-3',
  },
  {
    number: 'Subsection 4',
    title: 'Transformer losses: copper and iron (AC 1.2)',
    description: 'Iron loss (constant) + copper loss (∝ I²).',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module3-section4-4',
  },
  {
    number: 'Subsection 5',
    title: 'Transformer efficiency calculations and regulation (AC 1.2, 1.3)',
    description: 'Efficiency at any load, voltage regulation %, per-unit impedance, all-day efficiency, Ecodesign Tier 2 caps, vector groups and the loss-evaluation maths used on commercial transformer specifications.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module3-section4-5',
  },
  {
    number: 'Subsection 6',
    title: 'Transformer types, applications, generation & distribution (AC 1.2)',
    description: 'Generator step-up, grid, distribution, isolation, instrument, site, welding, EV, BESS and renewable export transformers — types, applications, vector groups, ventilation, oil bunding, and the regulatory anchors (Reg…',
    icon: UserCheck,
    href: '/study-centre/apprentice/level3-module3-section4-6',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={4}
      title="AC theory and waveforms"
      description="AC waveforms, phasor diagrams, impedance, power and harmonics."
      tone="yellow"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module3-section3"
      prevSectionLabel="Section 3"
      nextSectionHref="/study-centre/apprentice/level3-module3-section5"
      nextSectionLabel="Section 5"
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
