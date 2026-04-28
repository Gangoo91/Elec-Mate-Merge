/**
 * Module 3 · Section 3 — Landing
 * City & Guilds 2365-03 / Unit 302 — Electrical Science
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 3 — Electromagnetic principles | Level 3 Module 3.3 | Elec-Mate';
const DESCRIPTION =
  'Magnetic fields, electromagnetic induction, transformers and rotating machines.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Single-phase vs three-phase supplies (AC 2.7, 2.8)',
    description: 'Three sine waves 120° apart.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module3-section3-1',
  },
  {
    number: 'Subsection 2',
    title: 'Star and delta calculations (AC 2.8)',
    description: 'V_line = √3 × V_phase (star).',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module3-section3-2',
  },
  {
    number: 'Subsection 3',
    title: 'kW, kVAr, kVA and the power triangle (AC 2.3, 2.4)',
    description: 'Real power kW, reactive kVAr, apparent kVA.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module3-section3-3',
  },
  {
    number: 'Subsection 4',
    title: 'Power factor correction (AC 2.5, 2.6)',
    description: 'Q_C = P × (tan φ1 − tan φ2).',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module3-section3-4',
  },
  {
    number: 'Subsection 5',
    title: 'Neutral current, balancing and harmonics (AC 2.7)',
    description: 'Vector sum of unbalanced phase currents = neutral current.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module3-section3-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={3}
      title="Electromagnetic principles"
      description="Magnetic fields, electromagnetic induction, transformers and rotating machines."
      tone="yellow"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module3-section2"
      prevSectionLabel="Section 2"
      nextSectionHref="/study-centre/apprentice/level3-module3-section4"
      nextSectionLabel="Section 4"
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
