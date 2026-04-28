/**
 * Module 3 · Section 6 — Landing
 * City & Guilds 2365-03 / Unit 302 — Electrical Science
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 6 — Cables and conductors | Level 3 Module 3.6 | Elec-Mate';
const DESCRIPTION =
  'Conductor materials, resistance, current-carrying capacity and thermal effects.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Contactors, relays and solenoids',
    description: 'Electromagnetic switching: how contactors, relays and solenoids work, utilisation categories AC-1 to AC-4, coil ratings and snubbing.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module3-section6-1',
  },
  {
    number: 'Subsection 2',
    title: 'Protective devices: fuses, MCBs, RCDs, RCBOs, AFDDs',
    description: 'BS 88, BS EN 60898 (MCB), BS EN 61008/61009 (RCD/RCBO), BS EN 62606 (AFDD).',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module3-section6-2',
  },
  {
    number: 'Subsection 3',
    title: 'Electronic components and semiconductors (AC 4.1)',
    description: 'Diodes, LEDs, transistors, thyristors, MOSFETs, op-amps, thermistors.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module3-section6-3',
  },
  {
    number: 'Subsection 4',
    title: 'Lighting principles: lumens, lux, inverse square, cosine, lumen method (AC 5.1, 5.2)',
    description: 'Inverse-square law, Lambert\\',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module3-section6-4',
  },
  {
    number: 'Subsection 5',
    title: 'Electric heating: principles, applications (AC 6.1, 6.2)',
    description: 'Resistive (I²R), induction, dielectric and infra-red heating.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module3-section6-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={6}
      title="Cables and conductors"
      description="Conductor materials, resistance, current-carrying capacity and thermal effects."
      tone="yellow"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module3-section5"
      prevSectionLabel="Section 5"
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
