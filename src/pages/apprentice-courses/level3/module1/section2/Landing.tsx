/**
 * Module 1 · Section 2 — Landing
 * City & Guilds 2365-03 / Unit 201 — Health & Safety
 */

import { AlertTriangle, ClipboardCheck, FileText, Settings, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Section 2 — Risk assessment and method statements | Level 3 Module 1.2 | Elec-Mate';
const DESCRIPTION =
  'Advanced risk assessment techniques and comprehensive method statement development.';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Accident response and electric shock (supervisor-grade)',
    description: 'L3 refresher on accident response — supervisor-grade scene management, casualty handling, electric shock & burn treatment, witness handling and evidence preservation for the inevitable HSE follow-up.',
    icon: FileText,
    href: '/study-centre/apprentice/level3-module1-section2-1',
  },
  {
    number: 'Subsection 2',
    title: 'Emergency procedures: running the response',
    description: 'L3 emergency procedures — building evacuation, fire-alarm response, account-for, emergency services liaison, and the supervisor evidence trail.',
    icon: ClipboardCheck,
    href: '/study-centre/apprentice/level3-module1-section2-2',
  },
  {
    number: 'Subsection 3',
    title: 'Limits of responsibility: knowing when to escalate',
    description: 'L3 refresher on limits of responsibility — competence boundaries, escalation routes, ERA 1996 s.',
    icon: Shield,
    href: '/study-centre/apprentice/level3-module1-section2-3',
  },
  {
    number: 'Subsection 4',
    title: 'Reporting routes: the right responsible person',
    description: 'L3 refresher on H&S reporting routes — internal, RIDDOR, environmental, safeguarding, scheme bodies.',
    icon: AlertTriangle,
    href: '/study-centre/apprentice/level3-module1-section2-4',
  },
  {
    number: 'Subsection 5',
    title: 'RIDDOR F2508 process: responsible-person walkthrough',
    description: 'L3 walkthrough of the RIDDOR F2508 / F2508A process — trigger identification, online portal flow, retention, follow-up and the inevitable HSE conversation that follows.',
    icon: Settings,
    href: '/study-centre/apprentice/level3-module1-section2-5',
  },
];

export default function Landing() {
  useSEO(TITLE, DESCRIPTION);

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module1"
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={2}
      title="Risk assessment and method statements"
      description="Advanced risk assessment techniques and comprehensive method statement development."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="/study-centre/apprentice/level3-module1-section1"
      prevSectionLabel="Section 1"
      nextSectionHref="/study-centre/apprentice/level3-module1-section3"
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
