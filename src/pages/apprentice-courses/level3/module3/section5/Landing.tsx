/**
 * Module 3 · Section 5 — Landing
 * City & Guilds 2365-03 / Unit 302 — Electrical Science
 */

import { AlertTriangle, ClipboardCheck, FileText, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 5 — Electrical power and energy | Level 3 Module 3.5 | Elec-Mate';
const DESCRIPTION =
  'Power equations, efficiency and energy consumption in installations.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'DC machines: principles, types, applications',
    description: 'How a DC motor works: brushes, commutator, field winding.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module3-section5-1',
  },
  {
    number: 'Subsection 2',
    title: 'Single-phase AC motors',
    description: 'Capacitor-start, PSC, shaded-pole and universal motors.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module3-section5-2',
  },
  {
    number: 'Subsection 3',
    title: 'Three-phase induction motors, slip and torque',
    description: 'N_s = 120f/P.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module3-section5-3',
  },
  {
    number: 'Subsection 4',
    title: 'Synchronous motors, VFDs and motor control',
    description: 'Synchronous machines locked to grid frequency.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module3-section5-4',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={5}
      title="Electrical power and energy"
      description="Power equations, efficiency and energy consumption in installations."
      tone="yellow"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module3-section4"
      prevSectionLabel="Section 4"
      nextSectionHref="/study-centre/apprentice/level3-module3-section6"
      nextSectionLabel="Section 6"
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
