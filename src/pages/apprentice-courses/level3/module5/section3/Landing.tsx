/**
 * Module 5 · Section 3 — Landing
 * City & Guilds 2365-03 / Unit 304 — Inspection, Testing & Commissioning
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield, UserCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 3 — Testing procedures | Level 3 Module 5.3 | Elec-Mate';
const DESCRIPTION =
  'Continuity, insulation resistance, polarity, earth fault loop and RCD testing procedures.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'The dead-test sequence (Reg 643)',
    description: 'The Reg 643 dead-test sequence — order, dependencies, and what each test proves.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module5-section3-1',
  },
  {
    number: 'Subsection 2',
    title: 'Continuity of protective conductors (R1+R2 and R2-only)',
    description: 'The two methods for verifying continuity of protective conductors per Reg 643.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module5-section3-2',
  },
  {
    number: 'Subsection 3',
    title: 'Ring final continuity (3-step test)',
    description: 'The IET 3-step ring final test per BS 7671 Reg 643.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module5-section3-3',
  },
  {
    number: 'Subsection 4',
    title: 'Insulation resistance (Reg 643.3 / Table 64)',
    description: 'IR testing per BS 7671 Reg 643.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module5-section3-4',
  },
  {
    number: 'Subsection 5',
    title: 'Polarity verification (Reg 643.6)',
    description: 'Polarity testing per BS 7671 Reg 643.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module5-section3-5',
  },
  {
    number: 'Subsection 6',
    title: 'Earth electrode resistance (Reg 643.7.2)',
    description: 'Earth electrode testing per BS 7671 Reg 643.',
    icon: UserCheck,
    href: '/study-centre/apprentice/level3-module5-section3-6',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={3}
      title="Testing procedures"
      description="Continuity, insulation resistance, polarity, earth fault loop and RCD testing procedures."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module5-section2"
      prevSectionLabel="Section 2"
      nextSectionHref="/study-centre/apprentice/level3-module5-section4"
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
