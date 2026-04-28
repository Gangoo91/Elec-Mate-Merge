/**
 * Module 6 · Section 5 — Landing
 * City & Guilds 2365-03 / Unit 305 — Electrical Systems Design
 */

import { AlertTriangle, ClipboardCheck, FileText, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 5 — System documentation and drawings | Level 3 Module 6.5 | Elec-Mate';
const DESCRIPTION =
  'Producing comprehensive design documentation, drawings and specifications.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Earth fault loop impedance framework',
    description: 'The Zs framework.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module6-section5-1',
  },
  {
    number: 'Subsection 2',
    title: 'Calculating Zs at design stage (Cmin 0.95)',
    description: 'The Cmin voltage factor minimum from BS 7671 Appendix 14.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module6-section5-2',
  },
  {
    number: 'Subsection 3',
    title: 'Maximum Zs vs measured Zs (the 80% rule)',
    description: 'The bridge between design Zs and measured Zs.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module6-section5-3',
  },
  {
    number: 'Subsection 4',
    title: 'TT systems and earth electrode design',
    description: 'TT system design end to end.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module6-section5-4',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={5}
      title="System documentation and drawings"
      description="Producing comprehensive design documentation, drawings and specifications."
      tone="amber"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module6-section4"
      prevSectionLabel="Section 4"
      nextSectionHref="/study-centre/apprentice/level3-module6-section6"
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
