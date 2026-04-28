/**
 * Module 6 · Section 2 — Landing
 * City & Guilds 2365-03 / Unit 305 — Electrical Systems Design
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield, UserCheck } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 2 — Circuit design calculations | Level 3 Module 6.2 | Elec-Mate';
const DESCRIPTION =
  'Current ratings, cable sizing, voltage drop and protection calculations.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Maximum demand fundamentals',
    description: 'Connected load vs maximum demand.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module6-section2-1',
  },
  {
    number: 'Subsection 2',
    title: 'Diversity factors deep-dive',
    description: 'Diversity factors entry-by-entry.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module6-section2-2',
  },
  {
    number: 'Subsection 3',
    title: 'Domestic load assessment worked end-to-end',
    description: 'End-to-end domestic load assessment.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module6-section2-3',
  },
  {
    number: 'Subsection 4',
    title: 'Commercial load assessment worked end-to-end',
    description: 'Three-phase commercial fit-out load assessment.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module6-section2-4',
  },
  {
    number: 'Subsection 5',
    title: 'Industrial load assessment',
    description: 'Industrial load assessment for small / medium workshop and process sites.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module6-section2-5',
  },
  {
    number: 'Subsection 6',
    title: 'Load schedule consolidation',
    description: 'Consolidating diversity for a mixed commercial-plus-domestic block.',
    icon: UserCheck,
    href: '/study-centre/apprentice/level3-module6-section2-6',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={2}
      title="Circuit design calculations"
      description="Current ratings, cable sizing, voltage drop and protection calculations."
      tone="amber"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module6-section1"
      prevSectionLabel="Section 1"
      nextSectionHref="/study-centre/apprentice/level3-module6-section3"
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
