/**
 * Module 6 · Section 1 — Landing
 * City & Guilds 2365-03 / Unit 305 — Electrical Systems Design
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 1 — Design principles and requirements | Level 3 Module 6.1 | Elec-Mate';
const DESCRIPTION =
  'Fundamental design principles, compliance requirements and client specifications.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'What an L3 designer actually does',
    description: 'The shift from L2 installer to L3 designer.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module6-section1-1',
  },
  {
    number: 'Subsection 2',
    title: 'BS 7671 Parts 1, 2 and 3',
    description: 'The three Parts you read first on every new design.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module6-section1-2',
  },
  {
    number: 'Subsection 3',
    title: 'Statutory context',
    description: 'Building Regulations Part P (notifiable work in dwellings), Part L (energy efficiency, soon to drive AFDD recommendations harder), and the Building Safety Act 2022 footprint on higher-risk residential buildings.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module6-section1-3',
  },
  {
    number: 'Subsection 4',
    title: 'Equality Act + accessibility',
    description: 'How the Equality Act 2010 and Approved Document M push design decisions on socket heights, switch positions, lux levels, accessibility aids and dwelling adaptation.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module6-section1-4',
  },
  {
    number: 'Subsection 5',
    title: 'Sources of information',
    description: 'Client brief, architect drawings, structural engineer notes, DNO supply data, manufacturer datasheets, IET Guidance Notes, On-Site Guide.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module6-section1-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={1}
      title="Design principles and requirements"
      description="Fundamental design principles, compliance requirements and client specifications."
      tone="amber"
      subsectionsCount={subsections.length}
      nextSectionHref="/study-centre/apprentice/level3-module6-section2"
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
