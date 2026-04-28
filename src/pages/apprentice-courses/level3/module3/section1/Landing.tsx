/**
 * Module 3 · Section 1 — Landing
 * City & Guilds 2365-03 / Unit 302 — Electrical Science
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 1 — Electrical units and measurements | Level 3 Module 3.1 | Elec-Mate';
const DESCRIPTION =
  'Ohm\'s law, electrical quantities, measurement instruments, accuracy and SI units.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Mathematical principles for electrical work (AC 1.1)',
    description: 'Indices, scientific notation, transposition, trigonometry and percentage — the maths habits you need before any L3 power, voltage drop or transformer calculation.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module3-section1-1',
  },
  {
    number: 'Subsection 2',
    title: 'SI units and prefixes (AC 1.1)',
    description: 'The seven SI base units, the electrical derived units (V, A, Ω, W, F, H, Wb, T) and the prefix ladder you use every job — from picofarads to megavolt-amps.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module3-section1-2',
  },
  {
    number: 'Subsection 3',
    title: 'Mechanics: force, work, energy, power (AC 1.1)',
    description: 'Mass vs weight, force in newtons, work in joules, power in watts, energy conservation and efficiency.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module3-section1-3',
  },
  {
    number: 'Subsection 4',
    title: 'Electrical energy, power and efficiency (AC 1.1)',
    description: 'Joules vs kWh, instantaneous power vs average power, and how to calculate the efficiency of a real motor or heater from name-plate data.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module3-section1-4',
  },
  {
    number: 'Subsection 5',
    title: 'Measuring instruments',
    description: 'Voltmeter, ammeter, multimeter, MFT, clamp meter, power-quality analyser and oscilloscope.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module3-section1-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={1}
      title="Electrical units and measurements"
      description="Ohm's law, electrical quantities, measurement instruments, accuracy and SI units."
      tone="yellow"
      subsectionsCount={subsections.length}
      nextSectionHref="/study-centre/apprentice/level3-module3-section2"
      nextSectionLabel="Section 2"
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
