/**
 * Module 7 · Section 1 — Landing
 * City & Guilds 2365-03 / Unit 308 — Career Awareness
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 1 — The electrical industry and career pathways | Level 3 Module 7.1 | Elec-Mate';
const DESCRIPTION =
  'Industry roles, career progression routes and professional pathways.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Industry structure + roles in building services engineering',
    description: 'How the UK electrical contracting industry is structured — main contractor, sub-contractor, domestic installer — and the roles within a firm: Apprentice, Improver, Electrician, Approved Electrician, Technician,…',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module7-section1-1',
  },
  {
    number: 'Subsection 2',
    title: 'JIB grading deep dive',
    description: 'The JIB grading ladder — Apprentice, Stage 1-4, Improver, Electrician, Approved Electrician, Technician — what each grade means, the evidence you need to progress, and how the JIB pay framework links your grade to…',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module7-section1-2',
  },
  {
    number: 'Subsection 3',
    title: 'ECS card requirements + employer expectations',
    description: 'The Electrotechnical Certification Scheme (ECS) card — what it is, the ECS H&S assessment, specialist endorsements (PV, EV, Hazardous Areas), how to apply, and what employers and main contractors expect on UK sites.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module7-section1-3',
  },
  {
    number: 'Subsection 4',
    title: 'Scheme membership economics',
    description: 'NICEIC vs NAPIT vs ELECSA vs ECA vs SELECT — application fees, annual subscriptions, audit cycle, what each scheme unlocks, and how to choose when setting up a firm or comparing employers.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module7-section1-4',
  },
  {
    number: 'Subsection 5',
    title: 'Trade union landscape',
    description: 'Unite the Union, GMB, the JIB pay framework, what trade unions do for electricians, the legal right to join, and how union density varies across the UK electrical industry.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module7-section1-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module7"
      backLabel="Module 7"
      moduleNumber={7}
      sectionNumber={1}
      title="The electrical industry and career pathways"
      description="Industry roles, career progression routes and professional pathways."
      tone="purple"
      subsectionsCount={subsections.length}
      nextSectionHref="/study-centre/apprentice/level3-module7-section2"
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
