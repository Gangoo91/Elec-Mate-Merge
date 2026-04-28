/**
 * Module 3 · Section 2 — Landing
 * City & Guilds 2365-03 / Unit 302 — Electrical Science
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield, UserCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 2 — Resistive, inductive and capacitive circuits | Level 3 Module 3.2 | Elec-Mate';
const DESCRIPTION =
  'Pure circuits, combinations, phase angle, power factor and resonance.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Electron theory and conductor properties (AC 2.1)',
    description: 'L3 view of electron theory: free electrons, valence band, temperature coefficient α, and the cable property table that drives conductor selection.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module3-section2-1',
  },
  {
    number: 'Subsection 2',
    title: 'Resistance, resistivity and DC circuits (AC 2.1)',
    description: 'R = ρL/A, Kirchhoff\\',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module3-section2-2',
  },
  {
    number: 'Subsection 3',
    title: 'Magnetism, electromagnetism and EMF generation (AC 2.1)',
    description: 'Magnetic fields around conductors and coils, Fleming',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module3-section2-3',
  },
  {
    number: 'Subsection 4',
    title: 'Sine waves: RMS, peak, average, frequency (AC 2.2)',
    description: '230 V RMS, 325 V peak.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module3-section2-4',
  },
  {
    number: 'Subsection 5',
    title: 'Inductance, capacitance and reactance (AC 2.1, 2.2)',
    description: 'X_L = 2πfL, X_C = 1/(2πfC).',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module3-section2-5',
  },
  {
    number: 'Subsection 6',
    title: 'Transient response: RC and RL time constants (AC 2.1, 2.2)',
    description: 'τ = RC for capacitors; τ = L/R for inductors.',
    icon: UserCheck,
    href: '/study-centre/apprentice/level3-module3-section2-6',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={2}
      title="Resistive, inductive and capacitive circuits"
      description="Pure circuits, combinations, phase angle, power factor and resonance."
      tone="yellow"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module3-section1"
      prevSectionLabel="Section 1"
      nextSectionHref="/study-centre/apprentice/level3-module3-section3"
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
